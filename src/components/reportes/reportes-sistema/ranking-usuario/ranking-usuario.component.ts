import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ReporteService } from '../../../../services/reportes-service/reportes-sistema/reporte-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ranking-usuario',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './ranking-usuario.component.html',
  styleUrl: './ranking-usuario.component.css',
})
export class RankingUsuarioComponent {
inicio: string = '';
  fin: string = '';
  datos: any[] = [];
  datosFiltrados: any[] = [];
  filtroNickname: string = '';
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
    this.reporteService.getRankingUsuarios(this.inicio, this.fin)
      .subscribe({
        next: (data) => {
          this.datos = data;
          this.filtrarDatos();
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudo cargar el ranking', 'error');
          this.cargando = false;
        }
      });
  }

  filtrarDatos(): void {
    this.datosFiltrados = this.datos.filter(d => 
      d.nickname.toLowerCase().includes(this.filtroNickname.toLowerCase())
    );
  }

  limpiarFiltros(): void {
    this.filtroNickname = '';
    this.datosFiltrados = this.datos;
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFRanking(this.inicio, this.fin)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Ranking_Usuarios.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }
}
