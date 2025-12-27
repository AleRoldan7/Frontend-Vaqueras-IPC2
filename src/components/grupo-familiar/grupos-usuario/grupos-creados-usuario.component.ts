import { Component } from '@angular/core';
import { GrupoFamiliarService } from '../../../services/grupo-service/grupo-familiar-service';
import { GrupoFamiliar } from '../../../models/usuario/grupo-familiar';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-grupos-creados-usuario',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './grupos-creados-usuario.component.html',
  styleUrl: './grupos-creados-usuario.component.css',
})
export class GruposCreadosUsuarioComponent {

  grupos: GrupoFamiliar[] = [];
  usuario: any;
  grupoEditando: GrupoFamiliar | null = null;
  grupoForm!: FormGroup;

  constructor(
    private grupoService: GrupoFamiliarService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);

    this.grupoForm = this.fb.group({
      nombreGrupo: ['', Validators.required]
    });

    this.cargarMisGrupos();
  }

  cargarMisGrupos(): void {
    this.grupoService.getMisGrupos(this.usuario.idUsuario).subscribe({
      next: res => this.grupos = res,
      error: err => console.error(err)
    });
  }

  editarGrupo(grupo: GrupoFamiliar): void {
    this.grupoEditando = grupo;
    this.grupoForm.patchValue({
      nombreGrupo: grupo.nombreGrupo
    });
  }

  actualizarGrupo(): void {
    if (!this.grupoEditando || this.grupoForm.invalid) return;

    const nombreNuevo = this.grupoForm.value.nombreGrupo;

    this.grupoService
      .actualizarGrupo(this.grupoEditando.idGrupo, nombreNuevo)
      .subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Grupo actualizado correctamente', 'success');
          this.grupoEditando = null;
          this.cargarMisGrupos();
        },
        error: () => {
          Swal.fire('Error', 'Error al actualizar el grupo', 'error');
        }
      });
  }

  cancelarEdicion(): void {
    this.grupoEditando = null;
  }

  eliminarGrupo(idGrupo: number): void {
    Swal.fire({
      title: '¿Eliminar grupo?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoService.eliminarGrupo(idGrupo).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El grupo fue eliminado', 'success');
            this.cargarMisGrupos();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el grupo', 'error');
          }
        });
      }
    });
  }
}