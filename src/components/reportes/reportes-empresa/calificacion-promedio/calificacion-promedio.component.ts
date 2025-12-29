import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporteEmpresaService } from '../../../../services/reportes-service/reportes-empresa/reporte-empresa-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificacion-promedio',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './calificacion-promedio.component.html',
  styleUrl: './calificacion-promedio.component.css',
})
export class CalificacionPromedioComponent implements OnInit {

  idEmpresa: number = 0;
  promedio: number = 0;
  totalResenas: number = 0;
  cargando = false;
  datos: any[] = [];

  constructor(private reporteService: ReporteEmpresaService) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idEmpresa = usuario.idEmpresa;
    this.cargarDatos();
  }

  filtroNombre: string = "";
  filtroFechaInicio: string = "";
  filtroFechaFin: string = "";
  datosFiltrados: any[] = [];

  cargarDatos() {
    this.cargando = true;
    this.reporteService.getCalificacionPromedio(this.idEmpresa).subscribe({
      next: (data) => {
        this.datos = data;
        this.datosFiltrados = [...this.datos];
        this.cargando = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la calificación', 'error');
        this.cargando = false;
      }
    });
  }

  filtrarDatos() {
    this.datosFiltrados = this.datos.filter(item => {
      const coincideNombre = this.filtroNombre
        ? item.titulo.toLowerCase().includes(this.filtroNombre.toLowerCase())
        : true;

      const fechaData = new Date(item.fecha || '');
      const inicio = this.filtroFechaInicio ? new Date(this.filtroFechaInicio) : null;
      const fin = this.filtroFechaFin ? new Date(this.filtroFechaFin) : null;

      const coincideFecha =
        (!inicio || fechaData >= inicio) &&
        (!fin || fechaData <= fin);

      return coincideNombre && coincideFecha;
    });
  }

  descargarPDF() {
    this.reporteService.descargarPDFCalificacion(this.idEmpresa)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Calificacion_Promedio.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Descargado!', 'PDF de calificación generado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }

  limpiarFiltros() {
    this.filtroNombre = "";
    this.filtroFechaInicio = "";
    this.filtroFechaFin = "";
    this.datosFiltrados = [...this.datos]; 
  }

}
