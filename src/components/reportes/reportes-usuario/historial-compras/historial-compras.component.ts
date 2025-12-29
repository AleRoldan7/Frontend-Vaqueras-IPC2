import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ReporteUsuarioService } from '../../../../services/reportes-service/reportes-usuario/reporte-usuario-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-historial-compras',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css',
})
export class HistorialComprasComponent {
idUsuario: number = 0;
  nickname: string = '';
  datos: any[] = [];
  datosFiltrados: any[] = [];
  filtroTitulo: string = '';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';
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
    this.reporteService.getHistorialCompras(this.idUsuario)
      .subscribe({
        next: (data) => {
          this.datos = data;
          this.datosFiltrados = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudo cargar el historial de compras', 'error');
          this.cargando = false;
        }
      });
  }

  filtrarDatos(): void {
    this.datosFiltrados = this.datos.filter(item => {
      const coincideTitulo = !this.filtroTitulo || 
        item.tituloVideojuego.toLowerCase().includes(this.filtroTitulo.toLowerCase());

      const fechaCompra = new Date(item.fechaCompra);
      const inicio = this.filtroFechaInicio ? new Date(this.filtroFechaInicio) : null;
      const fin = this.filtroFechaFin ? new Date(this.filtroFechaFin) : null;

      const coincideFecha = (!inicio || fechaCompra >= inicio) && 
                           (!fin || fechaCompra <= fin);

      return coincideTitulo && coincideFecha;
    });
  }

  limpiarFiltros(): void {
    this.filtroTitulo = '';
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.datosFiltrados = this.datos;
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFHistorial(this.idUsuario)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ReporteHistorialCompras.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}