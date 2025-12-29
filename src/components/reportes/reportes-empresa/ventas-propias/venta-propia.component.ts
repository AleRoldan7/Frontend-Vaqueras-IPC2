import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ReporteEmpresaService } from '../../../../services/reportes-service/reportes-empresa/reporte-empresa-service';

@Component({
  selector: 'app-venta-propia',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './venta-propia.component.html',
  styleUrl: './venta-propia.component.css',
})
export class VentaPropiaComponent implements OnInit {
  idEmpresa: number = 0;
  datos: any[] = [];
  cargando = false;

  filtroNombre: string = "";
  filtroFechaInicio: string = "";
  filtroFechaFin: string = "";
  datosFiltrados: any[] = [];

  constructor(private reporteService: ReporteEmpresaService) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idEmpresa = usuario.idEmpresa;
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.reporteService.getVentasPropias(this.idEmpresa)
      .subscribe({
        next: (data) => {
          this.datos = data;
          this.datosFiltrados = [...this.datos];
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar las ventas', 'error');
          this.cargando = false;
        }
      });
  }

  descargarPDF() {
    this.reporteService.descargarPDFVentasPropias(this.idEmpresa)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ReporteVentaPropia.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Descargado!', 'PDF de ventas propias generado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
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

  limpiarFiltros() {
    this.filtroNombre = "";
    this.filtroFechaInicio = "";
    this.filtroFechaFin = "";
    this.datosFiltrados = [...this.datos];
  }

}