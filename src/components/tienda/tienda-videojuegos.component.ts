import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Videojuego } from '../../models/empresa/videojuego';
import { CompraService } from '../../services/compra-service/compra-service';
import { VideojuegoService } from '../../services/videojuego-service/videojuego-service';
import { VideojuegoResponse } from '../../models/empresa/videojuego-response';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tienda-videojuegos',
  imports: [CommonModule, RouterModule],
  templateUrl: './tienda-videojuegos.component.html',
  styleUrl: './tienda-videojuegos.component.css',
})
export class TiendaVideojuegosComponent {

  videojuegos: any[] = [];
  idUsuario!: number;

  constructor(
    private videojuegoService: VideojuegoService,
    private compraService: CompraService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const usuarioSesion = localStorage.getItem('usuario');

    if (usuarioSesion) {
      const usuario = JSON.parse(usuarioSesion);
      this.idUsuario = usuario.idUsuario;
      this.cargar();
    }
  }

  cargar() {
    this.videojuegoService.listarVideojuegoDisponibles()
      .subscribe(juegos => {
        this.videojuegos = juegos;
        this.cargarVideojuegos();
      });
  }

  cargarVideojuegos(): void {
    this.videojuegoService.listarVideojuegoDisponibles()
      .subscribe({
        next: (juegos) => {
          this.videojuegos = juegos || [];

          this.videojuegos.forEach(juego => {
            juego.imagenPrincipal = this.getPlaceholderUrl();

            const idsImagenes: number[] = juego.idsImagenes || [];

            if (idsImagenes.length > 0) {
              this.videojuegoService.getImagenPorId(idsImagenes[0])
                .subscribe((safeUrl: SafeResourceUrl) => {
                  juego.imagenPrincipal = safeUrl;
                });
            }
          });
        },
        error: (err) => {
          console.error('Error al cargar videojuegos:', err);
          Swal.fire('Error', 'No se pudieron cargar los videojuegos', 'error');
        }
      });
  }

  private getPlaceholderUrl(): SafeResourceUrl {
    const svg = `
    <svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#f0f0f0"/>
      <text x="150" y="100" font-family="Arial" font-size="20" text-anchor="middle" fill="#999">
        Sin Imagen
      </text>
    </svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  comprarVideojuego(idVideojuego: number) {

    Swal.fire({
      title: 'Fecha de compra',
      input: 'date',
      inputLabel: 'Seleccione la fecha',
      inputValue: new Date().toISOString().split('T')[0],
      showCancelButton: true,
      confirmButtonText: 'Comprar'
    }).then(result => {

      if (result.isConfirmed && result.value) {

        this.compraService
          .comprar(this.idUsuario, idVideojuego, result.value)
          .subscribe({
            next: () => {
              Swal.fire('Éxito', 'Compra realizada correctamente', 'success');
            },
            error: err => {
              Swal.fire(
                'Error',
                err.error?.mensaje || 'No se pudo realizar la compra',
                'error'
              );
            }
          });
      }
    });
  }
}

