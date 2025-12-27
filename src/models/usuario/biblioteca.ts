export interface Biblioteca {
    idVideojuego: number;
    idCompra?: number; 
    titulo: string; 
    precioPagado: number;
    clasificacionEdad: string;
    fechaCompra: string; 
    estadoInstalacion: 'INSTALADO' | 'NO_INSTALADO';
    idImagen: number; 
    descripcion: string;
}