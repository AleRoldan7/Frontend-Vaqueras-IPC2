import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReporteUsuarioService } from '../../../../services/reportes-service/reportes-usuario/reporte-usuario-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface JuegoBiblioteca {
  idVideojuego: number;
  titulo: string;
  calificacionComunidad: number;
  calificacionUsuario: number | null;
  estadoInstalacion: string;
  nickname: string;
}

@Component({
  selector: 'app-analisis-biblioteca',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './analisis-biblioteca.component.html',
  styleUrl: './analisis-biblioteca.component.css',
})
export class AnalisisBibliotecaComponent implements OnInit {

  idUsuario: number = 0;
  nickname: string = '';
  juegos: JuegoBiblioteca[] = [];
  juegosFiltrados: JuegoBiblioteca[] = [];
  filtroTitulo: string = '';
  cargando = false;

  constructor(private reporteService: ReporteUsuarioService) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idUsuario = usuario.idUsuario;
    this.nickname = usuario.nickname || usuario.nombre || 'Usuario';
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.reporteService.getAnalisisBiblioteca(this.idUsuario)
      .subscribe({
        next: (data) => {
          this.juegos = data;
          this.juegosFiltrados = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudo cargar tu biblioteca', 'error');
          this.cargando = false;
        }
      });
  }

  filtrarDatos(): void {
    this.juegosFiltrados = this.juegos.filter(j =>
      j.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase())
    );
  }

  limpiarFiltros(): void {
    this.filtroTitulo = '';
    this.juegosFiltrados = this.juegos;
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFBiblioteca(this.idUsuario)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'BibliotecaPersonal.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}
