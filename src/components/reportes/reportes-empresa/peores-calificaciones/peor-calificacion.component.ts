import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReporteEmpresaService } from '../../../../services/reportes-service/reportes-empresa/reporte-empresa-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CalificacionBaja {
  idVideojuego: number;
  tituloJuego: string;
  calificacion: number;
  idUsuario: number;
  nickname: string;
  fecha: string;
  nombreEmpresa: string;
}

@Component({
  selector: 'app-peor-calificacion',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './peor-calificacion.component.html',
  styleUrl: './peor-calificacion.component.css',
})
export class PeorCalificacionComponent implements OnInit {
  idEmpresa: number = 0;
  nombreEmpresa: string = '';
  calificaciones: CalificacionBaja[] = [];
  calificacionesFiltradas: CalificacionBaja[] = [];
  filtroTitulo: string = '';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';
  cargando = false;

  constructor(private reporteService: ReporteEmpresaService) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idEmpresa = usuario.idEmpresa;
    this.nombreEmpresa = usuario.nombreEmpresa || 'Mi Empresa';
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.reporteService.getPeoresCalificaciones(this.idEmpresa)
      .subscribe({
        next: (data) => {
          this.calificaciones = data;
          this.calificacionesFiltradas = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar las calificaciones', 'error');
          this.cargando = false;
        }
      });
  }

  filtrarDatos(): void {
    this.calificacionesFiltradas = this.calificaciones.filter(c => {
      const coincideTitulo = !this.filtroTitulo ||
        c.tituloJuego.toLowerCase().includes(this.filtroTitulo.toLowerCase());

      const fechaCal = new Date(c.fecha);
      const inicio = this.filtroFechaInicio ? new Date(this.filtroFechaInicio) : null;
      const fin = this.filtroFechaFin ? new Date(this.filtroFechaFin) : null;

      const coincideFecha = (!inicio || fechaCal >= inicio) &&
        (!fin || fechaCal <= fin);

      return coincideTitulo && coincideFecha;
    });
  }

  limpiarFiltros(): void {
    this.filtroTitulo = '';
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.calificacionesFiltradas = this.calificaciones;
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFPeores(this.idEmpresa)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'PeoresCalificaciones.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}
