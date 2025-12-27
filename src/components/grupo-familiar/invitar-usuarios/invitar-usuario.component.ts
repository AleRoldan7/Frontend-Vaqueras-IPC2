import { Component, OnInit } from '@angular/core';
import { GrupoFamiliarService } from '../../../services/grupo-service/grupo-familiar-service';
import { ListaService } from '../../../services/lista-service/lista-service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-invitar-usuario',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './invitar-usuario.component.html',
  styleUrl: './invitar-usuario.component.css',
})
export class InvitarUsuarioComponent implements OnInit {


  usuarios: any[] = [];
  idGrupo!: number;

  constructor(private grupoFamiliar: GrupoFamiliarService, private usuarioComun: ListaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.idGrupo = Number(this.route.snapshot.paramMap.get('idGrupo'));
  }

  cargarUsuarios() {
    this.usuarioComun.obtenerUsuarioComun()
      .subscribe(res => this.usuarios = res);
  }

  InvitarUsuario(idUsuario: number) {
    const data = {
      idGrupo: this.idGrupo,
      idUsuario: idUsuario
    };

    this.grupoFamiliar.enviarInvitacion(data).subscribe({
      next: () => Swal.fire("Enviada", "Invitación enviada correctamente", "success"),
      error: () => Swal.fire("Error", "No se pudo enviar la invitación", "error")
    });
  }

}
