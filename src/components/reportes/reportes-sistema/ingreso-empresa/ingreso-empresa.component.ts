import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../../services/reportes-service/reportes-sistema/reporte-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-empresa',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './ingreso-empresa.component.html',
  styleUrl: './ingreso-empresa.component.css',
})
export class IngresoEmpresaComponent implements OnInit {

  inicio: string = '';
  fin: string = '';
  datos: any[] = [];
  datosFiltrados: any[] = [];
  filtroEmpresa: string = '';
  cargando = false;

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.setFechasDefault();
  }

  setFechasDefault() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    this.fin = `${año}-${mes}-${String(hoy.getDate()).padStart(2, '0')}`;
    this.inicio = `${año}-01-01`;
    this.buscar();
  }

  buscar(): void {
    this.cargando = true;
    this.reporteService.getIngresosEmpresa(this.inicio, this.fin)
      .subscribe({
        next: (data) => {
          this.datos = data;
          this.filtrarDatos();
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar los ingresos', 'error');
          this.cargando = false;
        }
      });
  }

  filtrarDatos(): void {
    this.datosFiltrados = this.datos.filter(d => 
      d.nombreEmpresa.toLowerCase().includes(this.filtroEmpresa.toLowerCase())
    );
  }

  limpiarFiltros(): void {
    this.filtroEmpresa = '';
    this.datosFiltrados = this.datos;
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFIngresos(this.inicio, this.fin)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'IngresosEmpresas_Global.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}