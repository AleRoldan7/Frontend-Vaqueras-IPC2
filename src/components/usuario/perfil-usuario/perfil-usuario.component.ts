import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario/usuario-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css',
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: any = {};
  usuarioOriginal: any = {};
  montoFondos: number = 0;
  cargando = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const usuarioSesion = localStorage.getItem('usuario');
    if (usuarioSesion) {
      this.usuario = JSON.parse(usuarioSesion);
      this.usuarioOriginal = { ...this.usuario };
    }
  }

  hayCambios(): boolean {
    return JSON.stringify(this.usuario) !== JSON.stringify(this.usuarioOriginal);
  }

  actualizarPerfil(): void {
    if (!this.hayCambios()) {
      Swal.fire('Sin cambios', 'No has modificado ningún campo', 'info');
      return;
    }

    const datosActualizar = {
      nombre: this.usuario.nombre,
      nickname: this.usuario.nickname,
      correo: this.usuario.correo,
      pais: this.usuario.pais,
      numeroTelefono: this.usuario.numeroTelefono,
      fechaNacimiento: this.usuario.fechaNacimiento
    };

    this.cargando = true;
    this.usuarioService.actualizarJugador(this.usuario.idUsuario, datosActualizar)
      .subscribe({
        next: () => {
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          this.usuarioOriginal = { ...this.usuario };
          Swal.fire('¡Actualizado!', 'Tu perfil ha sido actualizado correctamente', 'success');
          this.cargando = false;
        },
        error: (err) => {
          Swal.fire('Error', err.error?.error || 'No se pudo actualizar el perfil', 'error');
          this.cargando = false;
        }
      });
  }

  agregarFondos(): void {
    if (this.montoFondos <= 0) {
      Swal.fire('Monto inválido', 'Ingresa un monto mayor a 0', 'warning');
      return;
    }

    Swal.fire({
      title: '¿Confirmar recarga?',
      text: `Vas a agregar Q${this.montoFondos} a tu cartera`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.usuarioService.agregarFondos(this.usuario.idUsuario, this.montoFondos)
          .subscribe({
            next: () => {
              this.usuario.dineroCartera += this.montoFondos;
              localStorage.setItem('usuario', JSON.stringify(this.usuario));
              Swal.fire('¡Fondos agregados!', `Ahora tienes Q${this.usuario.dineroCartera}`, 'success');
              this.montoFondos = 0;
              this.cargando = false;
            },
            error: (err) => {
              Swal.fire('Error', err.error?.error || 'No se pudieron agregar los fondos', 'error');
              this.cargando = false;
            }
          });
      }
    });
  }

  eliminarCuenta(): void {
    Swal.fire({
      title: '¿Estás completamente seguro?',
      text: 'Esta acción eliminará tu cuenta permanentemente. ¡No podrás deshacerla!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar mi cuenta'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Confirma escribiendo tu nickname',
          input: 'text',
          inputLabel: 'Escribe tu nickname para confirmar',
          inputValue: '',
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value || value !== this.usuario.nickname) {
              return '¡El nickname no coincide!';
            }
            return null;
          }
        }).then(confirm => {
          if (confirm.isConfirmed) {
            this.cargando = true;
            this.usuarioService.eliminarJugador(this.usuario.idUsuario)
              .subscribe({
                next: () => {
                  localStorage.removeItem('usuario');
                  Swal.fire('Cuenta eliminada', 'Tu cuenta ha sido eliminada permanentemente', 'success')
                    .then(() => {
                      window.location.href = '/login';
                    });
                },
                error: (err) => {
                  Swal.fire('Error', err.error?.error || 'No se pudo eliminar la cuenta', 'error');
                  this.cargando = false;
                }
              });
          }
        });
      }
    });
  }
}