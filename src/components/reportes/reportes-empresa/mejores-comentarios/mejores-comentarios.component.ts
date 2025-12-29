import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReporteEmpresaService } from '../../../../services/reportes-service/reportes-empresa/reporte-empresa-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Comentario } from '../../../../models/comentario-calificacion/comentario';

@Component({
  selector: 'app-mejores-comentarios',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './mejores-comentarios.component.html',
  styleUrl: './mejores-comentarios.component.css',
})
export class MejoresComentariosComponent implements OnInit{

  idEmpresa: number = 0;
  nombreEmpresa: string = '';
  comentarios: Comentario[] = [];
  comentariosFiltrados: Comentario[] = [];
  filtroTitulo: string = '';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';
  cargando = false;

  constructor(private reporteService: ReporteEmpresaService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idEmpresa = usuario.idEmpresa;
    this.nombreEmpresa = usuario.nombreEmpresa || 'Mi Empresa';
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.reporteService.getMejoresComentarios(this.idEmpresa)
      .subscribe({
        next: (data) => {
          this.comentarios = data;
          this.comentariosFiltrados = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar los comentarios', 'error');
          this.cargando = false;
        }
      });
  }

  filtrarDatos(): void {
    this.comentariosFiltrados = this.comentarios.filter(c => {
      const coincideTitulo = !this.filtroTitulo || 
        c.tituloJuego.toLowerCase().includes(this.filtroTitulo.toLowerCase());

      const fechaComentario = new Date(c.fecha);
      const inicio = this.filtroFechaInicio ? new Date(this.filtroFechaInicio) : null;
      const fin = this.filtroFechaFin ? new Date(this.filtroFechaFin) : null;

      const coincideFecha = (!inicio || fechaComentario >= inicio) && 
                           (!fin || fechaComentario <= fin);

      return coincideTitulo && coincideFecha;
    });
  }

  limpiarFiltros(): void {
    this.filtroTitulo = '';
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.comentariosFiltrados = this.comentarios;
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFComentarios(this.idEmpresa)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'MejoresComentarios.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}