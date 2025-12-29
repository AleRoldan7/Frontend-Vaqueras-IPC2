import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ListaService } from '../../../services/lista-service/lista-service';
import { EmpresaService } from '../../../services/empresa-service/empresa-service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-registro-empresa',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registro-empresa.component.html',
  styleUrl: './registro-empresa.component.css',
})
export class RegistroEmpresaComponent implements OnInit {

  nuevoAdmin = {
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: ''
  };

  nombreEmpresa: string = '';
  descripcionEmpresa: string = '';
  paisEmpresa: string = '';
  adminSeleccionado: any = null;

  admins: any[] = [];

  constructor(private lista: ListaService, private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.cargarAdmins();
  }

  cargarAdmins() {
    this.lista.obtenerAdminEmpresa().subscribe({
      next: (data) => this.admins = Array.isArray(data) ? data : [data],
      error: () => Swal.fire('Error', 'No se pudieron cargar los administradores', 'error')
    });
  }

  registrarAdmin() {
    if (!this.nuevoAdmin.nombre || !this.nuevoAdmin.correo || !this.nuevoAdmin.password) {
      Swal.fire('Campos incompletos', 'Debe llenar todos los campos.', 'warning');
      return;
    }

    this.empresaService.registrarAdminEmpresa(this.nuevoAdmin).subscribe({
      next: (res) => {
        Swal.fire('✔ Registro Exitoso', `Administrador creado con ID: ${res.idAdministrador}`, 'success');
        this.nuevoAdmin = { nombre: '', correo: '', password: '', fechaNacimiento: ''};
        this.cargarAdmins();
      },
      error: (err) => {
        Swal.fire('❌ Error', err.error || 'No se pudo registrar el administrador.', 'error');
      }
    });
  }


  seleccionarAdmin(admin: any) {
    this.adminSeleccionado = admin;
  }

  // Crear y asignar empresa al administrador
  asignarEmpresa() {
    if (!this.adminSeleccionado || !this.nombreEmpresa || !this.descripcionEmpresa || !this.paisEmpresa) {
      Swal.fire('Error', 'Complete todos los campos.', 'error');
      return;
    }

    const empresaData = {
      nombreEmpresa: this.nombreEmpresa,
      descripcionEmpresa: this.descripcionEmpresa,
      idUsuario: this.adminSeleccionado.idUsuario,
      paisEmpresa: this.paisEmpresa,
    };

    this.empresaService.crearEmpresa(empresaData).subscribe({
      next: () => {
        Swal.fire('✔ Registro Exitoso', 'La empresa fue creada y asignada correctamente.', 'success');
        this.nombreEmpresa = '';
        this.descripcionEmpresa = '';
        this.paisEmpresa = '';
        this.adminSeleccionado = null;
      },
      error: (err) => {
        console.error(err);
        Swal.fire('❌ Error', err.error || 'No se pudo registrar la empresa.', 'error');
      }
    });
  }
}