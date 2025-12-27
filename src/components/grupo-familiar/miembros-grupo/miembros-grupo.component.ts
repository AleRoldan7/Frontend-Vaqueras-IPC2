import { Component, Input, OnInit } from '@angular/core';
import { GrupoFamiliarService } from '../../../services/grupo-service/grupo-familiar-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-miembros-grupo',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './miembros-grupo.component.html',
  styleUrl: './miembros-grupo.component.css',
})
export class MiembrosGrupoComponent implements OnInit {

  grupos: any[] = [];
  usuario: any;

  constructor(private grupoService: GrupoFamiliarService) {}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);
    this.cargarGruposConMiembros();
  }

  cargarGruposConMiembros(): void {
    this.grupoService
      .getMisGruposConMiembros(this.usuario.idUsuario)
      .subscribe({
        next: (grupos: any[]) => {
          this.grupos = grupos;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar los grupos', 'error');
        }
      });
  }

  eliminarMiembro(idGrupo: number, miembro: any): void {

    Swal.fire({
      title: '¿Eliminar miembro?',
      text: `Se eliminará a ${miembro.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(result => {

      if (result.isConfirmed) {
        this.grupoService.eliminarMiembro(
          idGrupo,
          miembro.idUsuario,
          this.usuario.idUsuario
        ).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Usuario eliminado', 'success');
            this.cargarGruposConMiembros();
          },
          error: (err) => {
            Swal.fire('Error', err.error || 'No autorizado', 'error');
          }
        });
      }
    });
  }
}
