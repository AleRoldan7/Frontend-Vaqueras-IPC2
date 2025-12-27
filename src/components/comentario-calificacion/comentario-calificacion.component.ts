import { Component, Input, OnInit } from '@angular/core';
import { ResumenReseñas } from '../../models/comentario-calificacion/comentario';
import { ComentarioCalificacionService } from '../../services/comentario-calificacion-service/comentario-calificacion-service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-comentario-calificacion',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './comentario-calificacion.component.html',
  styleUrl: './comentario-calificacion.component.css',
})
export class ComentarioCalificacionComponent  {

  

  

}
