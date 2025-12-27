import { Component, OnInit } from '@angular/core';
import { Videojuego } from '../../models/empresa/videojuego';
import { BibliotecaService } from '../../services/biblioteca-service/biblioteca-service';
import { Biblioteca } from '../../models/usuario/biblioteca';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-biblioteca-usuario',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './biblioteca-usuario.component.html',
  styleUrl: './biblioteca-usuario.component.css',
})
export class BibliotecaUsuarioComponent implements OnInit {

  biblioteca: Biblioteca[] = [];
  usuarioId!: number;
  busquedaNickname: string = '';
  bibliotecaBusqueda: Biblioteca[] = [];

  constructor(private bibliotecaService: BibliotecaService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      this.usuarioId = JSON.parse(usuarioData).idUsuario;
      this.cargarBiblioteca();
    }
  }

  cargarBiblioteca(): void {
    this.bibliotecaService.obtenerBibliotecaUsuario(this.usuarioId).subscribe({
      next: (res) => this.biblioteca = res,
      error: (err) => console.error('Error', err)
    });
  }

  buscarBiblioteca(): void {
    if (this.busquedaNickname.trim()) {
      this.bibliotecaService.obtenerBibliotecaPorNickname(this.busquedaNickname.trim())
        .subscribe(data => this.bibliotecaBusqueda = data);
    } else {
      this.bibliotecaBusqueda = [];
    }
  }

  obtenerUrlImagen(idImagen: number): string {
    return this.bibliotecaService.getImagenUrl(idImagen);
  }

  actualizarEstado(juego: Biblioteca, nuevoEstado: 'INSTALADO' | 'NO_INSTALADO'): void {
    this.bibliotecaService.cambiarEstadoInstalacion(this.usuarioId, juego.idVideojuego, nuevoEstado)
      .subscribe({
        next: () => {
          juego.estadoInstalacion = nuevoEstado;
          Swal.fire('Éxito', `Juego ${nuevoEstado.toLowerCase()}`, 'success');
        },
        error: (e) => Swal.fire('Error', 'No se pudo actualizar el estado', 'error')
      });
  }

  calificar(idVideojuego: number) {
    Swal.fire({
      title: 'Califica este juego',
      input: 'number',
      inputAttributes: { min: "1", max: "5" },
      inputLabel: 'Ingresa una calificación del 1 al 5',
      showCancelButton: true,
      confirmButtonText: 'Guardar'
    }).then(result => {
      
        const request = { calificacion: result.value };
        this.bibliotecaService.calificarVideojuego(this.usuarioId, idVideojuego, request)
          .subscribe({
            next: () => Swal.fire("Calificado", "Calificación registrada", "success"),
            error: e => {
              
              Swal.fire("Error", "Error", "error");
            }
          });
      
    });
  }


  comentar(idVideojuego: number) {
    Swal.fire({
      title: 'Escribe tu comentario',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonText: 'Publicar'
    }).then(result => {
      
        const request = { comentario: result.value };
        this.bibliotecaService.comentarVideojuego(this.usuarioId, idVideojuego, request)
          .subscribe({
            next: () => Swal.fire("Publicado", "Tu comentario fue agregado", "success"),
            error: e => {
              
              Swal.fire("Error", "Error", "error");
            }
          });
      
    });
  }


  

}