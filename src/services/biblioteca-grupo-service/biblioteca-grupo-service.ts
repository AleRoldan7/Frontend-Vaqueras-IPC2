import { Injectable } from '@angular/core';
import { RestConstants } from '../../shared/rest-api-const';
import { HttpClient } from '@angular/common/http';
import { JuegoGrupo } from '../../models/biblioteca-grupo/juego-grupo-biblioteca';
import { Observable } from 'rxjs';
import { GrupoFamiliar } from '../../models/usuario/grupo-familiar';

@Injectable({
  providedIn: 'root',
})
export class BibliotecaGrupoService {

  restConsts = new RestConstants;

  constructor(private httpCliente: HttpClient) { }

  
  obtenerGruposDelUsuario(idUsuario: number): Observable<GrupoFamiliar[]> {
    return this.httpCliente.get<GrupoFamiliar[]>(`${this.restConsts.getApiURL()}grupo-familiar/todos/${idUsuario}`);
   
  }

  obtenerJuegosGrupo(idGrupo: number, idUsuario: number): Observable<JuegoGrupo[]> {
    return this.httpCliente.get<JuegoGrupo[]>(`${this.restConsts.getApiURL()}biblioteca-grupo/${idGrupo}/usuario/${idUsuario}`);
  }

  instalar(idUsuario: number, idVideojuego: number): Observable<string> {
    return this.httpCliente.post(`${this.restConsts.getApiURL()}biblioteca-grupo/instalar?idUsuario=${idUsuario}&idVideojuego=${idVideojuego}`,
      {}, { responseType: 'text' });
  }

  desinstalar(idUsuario: number, idVideojuego: number): Observable<string> {
    return this.httpCliente.post(`${this.restConsts.getApiURL()}biblioteca-grupo/desinstalar?idUsuario=${idUsuario}&idVideojuego=${idVideojuego}`,
      {}, { responseType: 'text' });
  }
}
