import { Injectable } from '@angular/core';
import { RestConstants } from '../../../shared/rest-api-const';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GananciaGlobal } from '../../../models/reportes/reporte-sistema/gananciaGlobal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {

  private apiUrl = new RestConstants().getApiURL() + 'reportes/';

  constructor(private http: HttpClient) { }

  // Ganancias globales
  getGananciasGlobales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}ganancias-globales`);
  }

  descargarPDFGanancias(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}ganancias-globales/pdf`, { responseType: 'blob' });
  }

  // Top ventas
  getTopVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}top-ventas`);
  }

  descargarPDFTopVentas(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}top-ventas/pdf`, { responseType: 'blob' });
  }

  // Ingresos por empresa (con fechas)
  getIngresosEmpresa(inicio?: string, fin?: string): Observable<any[]> {
    let params: any = {};
    if (inicio) params.fechaInicio = inicio;
    if (fin) params.fechaFin = fin;
    return this.http.get<any[]>(`${this.apiUrl}ingresos-empresa`, { params });
  }

  descargarPDFIngresos(inicio?: string, fin?: string): Observable<Blob> {
    let params: any = {};
    if (inicio) params.fechaInicio = inicio;
    if (fin) params.fechaFin = fin;
    return this.http.get(`${this.apiUrl}ingresos-empresa/pdf`, { params, responseType: 'blob' });
  }

  // Ranking usuarios (con fechas)
  getRankingUsuarios(inicio?: string, fin?: string): Observable<any[]> {
    let params: any = {};
    if (inicio) params.fechaInicio = inicio;
    if (fin) params.fechaFin = fin;
    return this.http.get<any[]>(`${this.apiUrl}ranking-usuarios`, { params });
  }

  descargarPDFRanking(inicio?: string, fin?: string): Observable<Blob> {
    let params: any = {};
    if (inicio) params.fechaInicio = inicio;
    if (fin) params.fechaFin = fin;
    return this.http.get(`${this.apiUrl}ranking-usuarios/pdf`, { params, responseType: 'blob' });
  }
}
