import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { GrupoFamiliarService } from '../../../services/grupo-service/grupo-familiar-service';
@Component({
  selector: 'app-crear-grupo',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css',
})
export class CrearGrupoComponent {

  grupoForm: FormGroup;

  constructor(private fb: FormBuilder, private grupoService: GrupoFamiliarService, private router: Router) {
    this.grupoForm = this.fb.group({
      nombreGrupo: ['', Validators.required]
    });
  }

  crearGrupo(): void {
    if (this.grupoForm.valid) {
      const usuario = JSON.parse(localStorage.getItem('usuario')!);

      const nombre = this.grupoForm.value.nombreGrupo;
      const idUsuarioDueño = usuario.idUsuario;

      this.grupoService.crearGrupo(nombre, idUsuarioDueño).subscribe({
        next: (grupoCreado) => {
          Swal.fire('Éxito', 'Grupo creado correctamente', 'success');

          const idGrupo = grupoCreado.idGrupo;

         
          this.router.navigate(['/grupo', idGrupo, 'invitar-usuario']);
        },
        error: err => {
          console.error(err);
          Swal.fire('Error', 'No se pudo crear el grupo', 'error');
        }
      });
    }
  }
}