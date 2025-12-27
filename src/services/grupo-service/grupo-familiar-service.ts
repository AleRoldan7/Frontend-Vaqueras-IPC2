import { Injectable } from '@angular/core';
import { RestConstants } from '../../shared/rest-api-const';
import { HttpClient } from '@angular/common/http';
import { GrupoFamiliar, InvitacionGrupo } from '../../models/usuario/grupo-familiar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrupoFamiliarService {

  restConstants = new RestConstants();

  constructor(private httpCliente: HttpClient) { }

  listarGrupos(): Observable<GrupoFamiliar[]> {
    return this.httpCliente.get<GrupoFamiliar[]>(`${this.restConstants.getApiURL()}grupo-familiar/listar`);
  }

  crearGrupo(nombreGrupo: string, idUsuarioDueño: number): Observable<GrupoFamiliar> {
    return this.httpCliente.post<GrupoFamiliar>(`${this.restConstants.getApiURL()}grupo-familiar/crear`, {
      nombreGrupo,
      idUsuarioDueño
    });
  }

  actualizarGrupo(idGrupo: number, nombreNuevo: string) {
    return this.httpCliente.put(
      `${this.restConstants.getApiURL()}grupo-familiar/actualizar/${idGrupo}`,
      { nombreNuevo },
      { responseType: 'text' }
    );
  }


  eliminarGrupo(idGrupo: number): Observable<any> {
    return this.httpCliente.delete(`${this.restConstants.getApiURL()}grupo-familiar/eliminar/${idGrupo}`);
  }

  agregarUsuario(idGrupo: number, idUsuario: number): Observable<any> {
    return this.httpCliente.post(`${this.restConstants.getApiURL()}grupo-familiar/agregar-usuario?idGrupo=${idGrupo}&idUsuario=${idUsuario}`, {});
  }

  eliminarUsuario(idGrupo: number, idUsuario: number): Observable<any> {
    return this.httpCliente.delete(`${this.restConstants.getApiURL()}grupo-familiar/eliminar-usuario?idGrupo=${idGrupo}&idUsuario=${idUsuario}`,
      { responseType: 'text' });
  }

  enviarInvitacion(data: any): Observable<any> {
    return this.httpCliente.post(`${this.restConstants.getApiURL()}grupo-familiar/invitar-usuario`, data, { responseType: 'text' });
  }

  responderInvitacion(idGrupo: number, idUsuario: number, respuesta: 'ACEPTADA' | 'RECHAZADA'): Observable<any> {
    return this.httpCliente.post(`${this.restConstants.getApiURL()}grupo-familiar/responder-invitacion`, { idGrupo, idUsuario, respuesta }, { responseType: 'text'});
  }

  obtenerInvitacionesPendientes(idUsuario: number): Observable<InvitacionGrupo[]> {
    return this.httpCliente.get<InvitacionGrupo[]>(`${this.restConstants.getApiURL()}grupo-familiar/invitaciones-pendientes/${idUsuario}`);
  }

  getMisGrupos(idUsuario: number) {
    return this.httpCliente.get<any[]>(`${this.restConstants.getApiURL()}grupo-familiar/mis-grupos/${idUsuario}`);
  }

  getMisGruposConMiembros(idUsuario: number) {
    return this.httpCliente.get<any[]>(
      `${this.restConstants.getApiURL()}grupo-familiar/mis-grupos-con-miembros/${idUsuario}`
    );
  }


  eliminarMiembro(idGrupo: number, idEliminar: number, idSolicitante: number) {
    return this.httpCliente.delete(
      `${this.restConstants.getApiURL()}grupo-familiar/${idGrupo}/miembro/${idEliminar}?idSolicitante=${idSolicitante}`
    );
  }

}
