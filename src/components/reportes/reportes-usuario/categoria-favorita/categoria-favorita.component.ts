import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReporteUsuarioService } from '../../../../services/reportes-service/reportes-usuario/reporte-usuario-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CategoriaFavorita {
  categoria: string;
  cantidadComprados: number;
  nickname: string;
}

@Component({
  selector: 'app-categoria-favorita',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './categoria-favorita.component.html',
  styleUrl: './categoria-favorita.component.css',
})
export class CategoriaFavoritaComponent implements OnInit{

  idUsuario: number = 0;
  nickname: string = '';
  categorias: CategoriaFavorita[] = [];
  categoriasFiltradas: CategoriaFavorita[] = [];
  filtroCategoria: string = '';
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
    this.reporteService.getCategoriasFavoritas(this.idUsuario)
      .subscribe({
        next: (data) => {
          this.categorias = data;
          this.categoriasFiltradas = data;
          this.cargando = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
          this.cargando = false;
        }
      });
  }

  filtrarDatos(): void {
    this.categoriasFiltradas = this.categorias.filter(c => 
      c.categoria.toLowerCase().includes(this.filtroCategoria.toLowerCase())
    );
  }

  limpiarFiltros(): void {
    this.filtroCategoria = '';
    this.categoriasFiltradas = this.categorias;
  }

  descargarPDF(): void {
    this.reporteService.descargarPDFCategorias(this.idUsuario)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'CategoriaFavorita.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('¡Éxito!', 'PDF descargado', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo generar el PDF', 'error')
      });
  }

}
