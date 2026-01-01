import { Injectable, Sanitizer } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Videojuego } from '../../models/empresa/videojuego';
import { HttpClient } from '@angular/common/http';
import { RestConstants } from '../../shared/rest-api-const';
import { VideojuegoResponse } from '../../models/empresa/videojuego-response';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class VideojuegoService {

  restConstants = new RestConstants();

  constructor(private httpCliente: HttpClient, private sanitizer: DomSanitizer) { }

  crearVideojuego(videojuego: Videojuego): Observable<Videojuego> {
    return this.httpCliente.post<Videojuego>(`${this.restConstants.getApiURL()}videojuego/crear-videojuego`, videojuego);
  }

  agregarImagenesVideojuego(idVideojuego: number, imagenes: File[]) {

    const formData = new FormData();

    imagenes.forEach(archivo => {
      formData.append('imagenes', archivo);
    });

    formData.append('idVideojuego', idVideojuego.toString());

    return this.httpCliente.post(`${this.restConstants.getApiURL()}videojuego/agregar-imagen`, formData);
  }

  getVideojuegosEmpresa(idEmpresa: number) {
    return this.httpCliente.get<any>(`${this.restConstants.getApiURL()}videojuego/empresa/${idEmpresa}`);
  }


  listarVideojuegoDisponibles() {
    return this.httpCliente.get<VideojuegoResponse[]>(`${this.restConstants.getApiURL()}videojuego/disponibles`);
  }

  actualizarVideojuego(data: any): Observable<any[]> {
    return this.httpCliente.put<any[]>(`${this.restConstants.getApiURL()}videojuego/actualizar`, data);
  }

  buscarVideojuegos(titulo?: string, categoria?: string, precioMin?: number, precioMax?: number, empresa?: string): Observable<Videojuego[]> {
    let params: any = {};
    if (titulo) params.titulo = titulo;
    if (categoria) params.categoria = categoria;
    if (precioMin) params.precioMin = precioMin;
    if (precioMax) params.precioMax = precioMax;
    if (empresa) params.empresa = empresa;

    return this.httpCliente.get<Videojuego[]>(`${this.restConstants.getApiURL()}videojuego/buscar-videojuego`, { params });
  }

  getImagenesVideojuego(idVideojuego: number): Observable<number[]> {
    return this.httpCliente.get<number[]>(
      `${this.restConstants.getApiURL()}videojuego/${idVideojuego}/imagenes`
    );
  }


  getImagenPorId(idImagen: number): Observable<SafeUrl> {
    return this.httpCliente.get(`${this.restConstants.getApiURL()}videojuego/imagen/${idImagen}` , { responseType: 'blob' })
      .pipe(
        map(blob => {
          const objectURL = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
      );
  }



  private getPlaceholder(): SafeResourceUrl {
    const svg = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <text x="50%" y="50%" font-size="18" text-anchor="middle" fill="#6c757d" dy=".3em">
          Sin Imagen
        </text>
      </svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
