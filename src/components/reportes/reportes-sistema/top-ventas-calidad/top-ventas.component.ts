import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ReporteService } from '../../../../services/reportes-service/reportes-sistema/reporte-service';

@Component({
  selector: 'app-top-ventas',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './top-ventas.component.html',
  styleUrl: './top-ventas.component.css',
})
export class TopVentasComponent implements OnInit {
  datos: any[] = [];
  cargando = false;

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.reporteService.getTopVentas()
      .subscribe({
        next: (data) => {
          this.datos = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudo cargar el top de ventas', 'error');
          this.cargando = false;
        }
      });
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFTopVentas()
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Top_Ventas.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}