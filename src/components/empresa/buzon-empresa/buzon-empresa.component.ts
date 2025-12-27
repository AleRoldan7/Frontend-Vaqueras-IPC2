import { Component, OnInit } from '@angular/core';
import { SistemaService } from '../../../services/sistema-service/sistema-service';
import { Notificacion } from '../../../models/empresa/notificacion';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buzon-empresa',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './buzon-empresa.component.html',
  styleUrl: './buzon-empresa.component.css',
})
export class BuzonEmpresaComponent implements OnInit{

  notificaciones: Notificacion[] = [];
  idUsuario: number;
  loading = true;

  constructor(private sistemaService: SistemaService) {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idUsuario = user.idUsuario;
  }

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    this.loading = true;
    this.sistemaService.obtenerNotificaciones(this.idUsuario).subscribe({
      next: (data) => {
        this.notificaciones = data.sort((a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las notificaciones', 'error');
        this.loading = false;
      }
    });
  }

  marcarComoLeida(notif: Notificacion) {
    if (notif.leida) return;

    this.sistemaService.marcarComoLeida(notif.idNotificacion).subscribe({
      next: () => {
        notif.leida = true;
      }
    });
  }

  getBadgeClass(notif: Notificacion): string {
    return notif.leida ? 'bg-secondary' : 'bg-danger';
  }

}
