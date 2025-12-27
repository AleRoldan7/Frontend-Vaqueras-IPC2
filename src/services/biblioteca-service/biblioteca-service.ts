import { Injectable } from '@angular/core';
import { RestConstants } from '../../shared/rest-api-const';
import { HttpClient } from '@angular/common/http';
import { Biblioteca } from '../../models/usuario/biblioteca';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {

  restConstants = new RestConstants();

  constructor(private httpCliente: HttpClient) { }

  obtenerBibliotecaUsuario(idUsuario: number): Observable<Biblioteca[]> {
    return this.httpCliente.get<Biblioteca[]>(`${this.restConstants.getApiURL()}biblioteca/usuario/${idUsuario}`);
  }


  obtenerBibliotecaPorNickname(nickname: string): Observable<Biblioteca[]> {
    return this.httpCliente.get<Biblioteca[]>(`${this.restConstants.getApiURL()}biblioteca/usuario/buscar/${nickname}`);
  }

  cambiarEstadoInstalacion(idUsuario: number, idCompra: number, nuevoEstado: 'INSTALADO' | 'NO_INSTALADO'): Observable<any> {
    const body = { estado: nuevoEstado };
    return this.httpCliente.put(`${this.restConstants.getApiURL()}biblioteca/cambiar-estado/${idUsuario}/${idCompra}`, body,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  getImagenUrl(idImagen: number): string {
    return `${this.restConstants.getApiURL()}videojuego/imagen/${idImagen}`;
  }


  calificarVideojuego(idUsuario: number, idVideojuego: number, body: any) {
    return this.httpCliente.post(
      `${this.restConstants.getApiURL()}comentario-calificacion/videojuegos/${idVideojuego}/calificar?idUsuario=${idUsuario}`,
      body,
      { responseType: 'text'}
    );
  }

  comentarVideojuego(idUsuario: number, idVideojuego: number, body: any) {
    return this.httpCliente.post(
      `${this.restConstants.getApiURL()}comentario-calificacion/videojuegos/${idVideojuego}/comentar?idUsuario=${idUsuario}`,
      body,
      { responseType: 'text'}
    );
  }

  obtenerDetalle(idVideojuego: number, idUsuario: number) {
    return this.httpCliente.get(
      `${this.restConstants.getApiURL()}comentario-calificacion/videojuegos/${idVideojuego}/detalle?idUsuario=${idUsuario}`
    );
  }

}

