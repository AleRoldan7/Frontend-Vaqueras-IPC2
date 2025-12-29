import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporteEmpresaService } from '../../../../services/reportes-service/reportes-empresa/reporte-empresa-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top5juegos',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './top5juegos.component.html',
  styleUrl: './top5juegos.component.css',
})
export class Top5juegosComponent implements OnInit {

  idEmpresa: number = 0;
  inicio: string = '';
  fin: string = '';
  datos: any[] = [];
  cargando = false;

  constructor(private reporteService: ReporteEmpresaService) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idEmpresa = usuario.idEmpresa;
    this.setFechaDefault();
  }

  setFechaDefault() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    this.fin = `${año}-${mes}-${String(hoy.getDate()).padStart(2, '0')}`;
    this.inicio = `${año}-01-01`;
    this.buscar();
  }

  buscar() {
    if (!this.idEmpresa) return;

    this.cargando = true;
    this.reporteService.getTop5Juegos(this.idEmpresa, this.inicio, this.fin)
      .subscribe({
        next: (data) => {
          this.datos = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
          this.cargando = false;
        }
      });
  }

  descargarPDF() {
    this.reporteService.descargarPDFTop5(this.idEmpresa, this.inicio, this.fin)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Top5Ventas.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('Éxito', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}
