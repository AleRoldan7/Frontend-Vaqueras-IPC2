import { Injectable } from '@angular/core';
import { RestConstants } from '../../../shared/rest-api-const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteUsuarioService {
  
  private apiUrl = new RestConstants().getApiURL() + 'usuario/reportes/';

  constructor(private http: HttpClient) {}

  // 1. Historial de compras
  getHistorialCompras(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}historial-compras/${idUsuario}`);
  }

  descargarPDFHistorial(idUsuario: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}historial-compras/${idUsuario}/pdf`, { responseType: 'blob' });
  }

  // 2. Análisis de biblioteca personal
  getAnalisisBiblioteca(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}biblioteca-analisis/${idUsuario}`);
  }

  descargarPDFBiblioteca(idUsuario: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}biblioteca-analisis/${idUsuario}/pdf`, { responseType: 'blob' });
  }

  // 3. Categorías favoritas
  getCategoriasFavoritas(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categorias-favoritas/${idUsuario}`);
  }

  descargarPDFCategorias(idUsuario: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}categorias-favoritas/${idUsuario}/pdf`, { responseType: 'blob' });
  }

  // 4. Uso de biblioteca familiar
  getUsoBibliotecaFamiliar(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}uso-biblioteca-familiar/${idUsuario}`);
  }

  descargarPDFBibliotecaFamiliar(idUsuario: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}uso-biblioteca-familiar/${idUsuario}/pdf`, { responseType: 'blob' });
  }
}
