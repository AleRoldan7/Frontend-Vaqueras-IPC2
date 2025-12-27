import { Injectable } from '@angular/core';
import { RestConstants } from '../../shared/rest-api-const';
import { HttpClient } from '@angular/common/http';
import { RsumenCalificacionComentario } from '../../models/comentario-calificacion/comentario-calificacion';
import { Observable } from 'rxjs';
import { ResumenReseñas } from '../../models/comentario-calificacion/comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentarioCalificacionService {

  restConsts = new RestConstants();

  constructor(private httpCliente: HttpClient) { }

 

}
