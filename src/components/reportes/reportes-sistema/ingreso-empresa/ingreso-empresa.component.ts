import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../../services/reportes-service/reportes-sistema/reporte-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ingreso-empresa',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './ingreso-empresa.component.html',
  styleUrl: './ingreso-empresa.component.css',
})
export class IngresoEmpresaComponent implements OnInit {

  ingresosEmpresa: any[] = [];
  fechaInicio: string | null = null;
  fechaFin: string | null = null;

  constructor(private reporteIngreso: ReporteService) { }

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos() {
    this.reporteIngreso
      .getIngresosPorEmpresa(this.fechaInicio, this.fechaFin)
      .subscribe(data => {
        this.ingresosEmpresa = data;
      });
  }

  limpiarFiltros() {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.cargarIngresos();
  }

  descargarIngresoPDF() {
    this.reporteIngreso
      .descargarPDFIngresosEmpresa(this.fechaInicio, this.fechaFin)
      .subscribe(blob => {
        this.descargarArchivo(blob, 'ReporteIngresosEmpresas.pdf');
      });
  }

  private descargarArchivo(blob: Blob, nombre: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}