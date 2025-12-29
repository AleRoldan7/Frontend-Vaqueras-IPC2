import { Injectable } from '@angular/core';
import { RestConstants } from '../../../shared/rest-api-const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteEmpresaService {
  
  private apiUrl = new RestConstants().getApiURL() + 'empresa/reportes/';

  constructor(private http: HttpClient) {}

  // 1. Ventas propias
  getVentasPropias(idEmpresa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}ventas-propias/${idEmpresa}`);
  }

  descargarPDFVentasPropias(idEmpresa: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}ventas-propias/${idEmpresa}/pdf`, { responseType: 'blob' });
  }

  // 2. Calificación promedio
  getCalificacionPromedio(idEmpresa: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}feedback/calificaciones/${idEmpresa}`);
  }

  descargarPDFCalificacion(idEmpresa: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}feedback/calificaciones/${idEmpresa}/pdf`, { responseType: 'blob' });
  }

  // 3. Mejores comentarios
  getMejoresComentarios(idEmpresa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}feedback/comentarios/${idEmpresa}`);
  }

  descargarPDFComentarios(idEmpresa: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}feedback/comentarios/${idEmpresa}/pdf`, { responseType: 'blob' });
  }

  // 4. Peores calificaciones
  getPeoresCalificaciones(idEmpresa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}feedback/peores-calificaciones/${idEmpresa}`);
  }

  descargarPDFPeores(idEmpresa: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}feedback/peores-calificaciones/${idEmpresa}/pdf`, { responseType: 'blob' });
  }

  // 5. Top 5 juegos
  getTop5Juegos(idEmpresa: number, inicio: string, fin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}top5-juegos/${idEmpresa}/${inicio}/${fin}`);
  }

  descargarPDFTop5(idEmpresa: number, inicio: string, fin: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}top5-juegos/${idEmpresa}/${inicio}/${fin}/pdf`, { responseType: 'blob' });
  }
}
