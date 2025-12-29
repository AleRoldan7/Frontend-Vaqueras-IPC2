import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ReporteUsuarioService } from '../../../../services/reportes-service/reportes-usuario/reporte-usuario-service';

interface JuegoFamiliar {
  titulo: string;
  estado: string;
  esPrestado: boolean;
  calificacionComunidad: number;
  nickname: string;
}

@Component({
  selector: 'app-biblioteca-familiar',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './biblioteca-familiar.component.html',
  styleUrl: './biblioteca-familiar.component.css',
})
export class BibliotecaFamiliarComponent implements OnInit{
idUsuario: number = 0;
  nickname: string = '';
  juegos: JuegoFamiliar[] = [];
  juegosFiltrados: JuegoFamiliar[] = [];
  filtroTitulo: string = '';
  cargando = false;

  constructor(private reporteService: ReporteUsuarioService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idUsuario = usuario.idUsuario;
    this.nickname = usuario.nickname || usuario.nombre || 'Usuario';
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.reporteService.getUsoBibliotecaFamiliar(this.idUsuario)
      .subscribe({
        next: (data) => {
          this.juegos = data;
          this.juegosFiltrados = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudo cargar la biblioteca familiar', 'error');
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
    this.reporteService.descargarPDFBibliotecaFamiliar(this.idUsuario)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'BibliotecaFamiliar.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}