import { Component } from '@angular/core';
import { Videojuego } from '../../../models/empresa/videojuego';
import { VideojuegoService } from '../../../services/videojuego-service/videojuego-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CompraService } from '../../../services/compra-service/compra-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-videojuego',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './compra-videojuego.component.html',
  styleUrl: './compra-videojuego.component.css',
})
export class CompraVideojuegoComponent {

  resultados: any[] = [];
  titulo = '';
  categoria = '';
  precioMin?: number;
  precioMax?: number;
  empresa = '';
  idUsuario: number = Number(localStorage.getItem("idUsuario")); 

  constructor(
    private videojuegoService: VideojuegoService,
    private compraService: CompraService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void { this.buscar(); }

  buscar(): void {
    this.videojuegoService.buscarVideojuegos(
      this.titulo, this.categoria, this.precioMin, this.precioMax, this.empresa
    ).subscribe(juegos => {
      this.resultados = juegos.map(j => ({
        ...j,
        imagenes: j.imagenes?.map((img: any) =>
          this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${img}`)
        ) || []
      }));
    });
  }

  comprar(idVideojuego: number): void {
    let fecha = new Date().toISOString();

    if (!this.idUsuario) {
      Swal.fire("NO disponible", "EL videojuego no esta disponible", "warning");
      return;
    }

    this.compraService.comprar(this.idUsuario, idVideojuego, fecha).subscribe({
      next: () => {
        Swal.fire({
          title: "Compra Exitosa",
          text: "El videojuego ahora está en tu biblioteca",
          icon: "success",
          confirmButtonText: "Aceptar"
        });
      },
      error: (err) => {
        Swal.fire({
          title: "Error al comprar",
          text: "No fue posible realizar la compra.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    });
  }
}