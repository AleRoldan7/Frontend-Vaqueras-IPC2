import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReporteService } from '../../../../services/reportes-service/reportes-sistema/reporte-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ganancia-global',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './ganancia-global.component.html',
  styleUrl: './ganancia-global.component.css',
})
export class GananciaGlobalComponent implements OnInit{
datos: any = {};
  cargando = false;

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.reporteService.getGananciasGlobales()
      .subscribe({
        next: (data) => {
          this.datos = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar las ganancias', 'error');
          this.cargando = false;
        }
      });
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFGanancias()
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'GananciasGlobales.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}
