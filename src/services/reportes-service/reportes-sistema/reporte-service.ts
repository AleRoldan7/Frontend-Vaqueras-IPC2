import { Injectable } from '@angular/core';
import { RestConstants } from '../../../shared/rest-api-const';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GananciaGlobal } from '../../../models/reportes/reporte-sistema/gananciaGlobal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {

  restConstants = new RestConstants();

  constructor(private httpClient: HttpClient) { }

  /*Url para reportes de sistema */
  getGananciasGlobales() {
    return this.httpClient.get<any>(`${this.restConstants.getApiURL()}reportes/ganancias-globales`);
  }

   getIngresosPorEmpresa(fechaInicio?: string | null, fechaFin?: string | null) {

    let params = new HttpParams();

    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio);
    }
    if (fechaFin) {
      params = params.set('fechaFin', fechaFin);
    }

    return this.httpClient.get<any[]>(
      `${this.restConstants.getApiURL()}reportes/ingresos-empresa`,
      { params }
    );
  }

  descargarPDFIngresosEmpresa(fechaInicio?: string | null, fechaFin?: string | null) {

    let params = new HttpParams();

    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio);
    }
    if (fechaFin) {
      params = params.set('fechaFin', fechaFin);
    }

    return this.httpClient.get(
      `${this.restConstants.getApiURL()}reportes/ingresos-empresa/pdf`,
      {
        params,
        responseType: 'blob'
      }
    );
  }

  descargarPDFGanancias() {
    return this.httpClient.get(`${this.restConstants.getApiURL()}reportes/ganancias-globales/pdf`, { responseType: 'blob' });
  }

 



}
