import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JuegoGrupo } from '../../../models/biblioteca-grupo/juego-grupo-biblioteca';
import { BibliotecaGrupoService } from '../../../services/biblioteca-grupo-service/biblioteca-grupo-service';
import Swal from 'sweetalert2';
import { GrupoFamiliar } from '../../../models/usuario/grupo-familiar';

@Component({
  selector: 'app-biblioteca-grupo',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './biblioteca-grupo.component.html',
  styleUrl: './biblioteca-grupo.component.css',
})
export class BibliotecaGrupoComponent implements OnInit {

  grupos: GrupoFamiliar[] = [];
  juegos: JuegoGrupo[] = [];
  idUsuario!: number;
  idGrupoSeleccionado: number | null = null;
  loadingJuegos = false;
  loadingGrupos = true;

  constructor(private grupoService: BibliotecaGrupoService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('usuario')!);
    this.idUsuario = user.idUsuario;

    this.cargarGrupos();
  }

  cargarGrupos() {
    this.loadingGrupos = true;
    this.grupoService.obtenerGruposDelUsuario(this.idUsuario).subscribe({
      next: (grupos: GrupoFamiliar[]) => {
        this.grupos = grupos;
        this.loadingGrupos = false;

        if (grupos.length > 0 && this.idGrupoSeleccionado === null) {
          this.idGrupoSeleccionado = grupos[0].idGrupo;
          this.cargarJuegos();
        }
      },
      error: (err: any) => {
        this.loadingGrupos = false;
        Swal.fire('Error', 'No se pudieron cargar tus grupos familiares', 'error');
      }
    });
  }

  onGrupoChange() {
    if (this.idGrupoSeleccionado) {
      this.cargarJuegos();
    } else {
      this.juegos = [];
    }
  }

  cargarJuegos() {
    if (!this.idGrupoSeleccionado) return;

    this.loadingJuegos = true;
    // ← Corregido: grupoService, no juegoService
    this.grupoService.obtenerJuegosGrupo(this.idGrupoSeleccionado, this.idUsuario).subscribe({
      next: (juegos: JuegoGrupo[]) => {
        this.juegos = juegos;
        this.loadingJuegos = false;
      },
      error: (err: any) => {
        this.loadingJuegos = false;
        const msg = err.error?.error || 'Error al cargar la biblioteca';
        Swal.fire('Error', msg, 'error');
        this.juegos = [];
      }
    });
  }

  toggleJuego(juego: JuegoGrupo) {
    const esInstalar = juego.estado === 'NO_INSTALADO';
    const servicio = esInstalar
      ? this.grupoService.instalar(this.idUsuario, juego.idVideojuego)
      : this.grupoService.desinstalar(this.idUsuario, juego.idVideojuego);

    servicio.subscribe({
      next: () => {
        this.cargarJuegos();
        Swal.fire(
          esInstalar ? '¡Instalado!' : 'Desinstalado',
          juego.nombre || 'El juego',  // ← Corregido
          esInstalar ? 'success' : 'info'
        );
      },
      error: (err: any) => {
        Swal.fire('Error', err.error || 'Operación fallida', 'error');
      }
    });
  }

  getNombreGrupoActual(): string {
    const grupo = this.grupos.find(g => g.idGrupo === this.idGrupoSeleccionado);
    return grupo ? grupo.nombreGrupo : 'Selecciona un grupo';
  }

  // biblioteca-grupo.component.ts

  esGrupoCreadoPorMi(grupo: GrupoFamiliar): boolean {
    return grupo.idUsuarioDueno === this.idUsuario;
  }

  getTextoPropiedad(grupo: GrupoFamiliar): string {
    return this.esGrupoCreadoPorMi(grupo) ? 'Creado por ti' : 'Compartido';
  }
}