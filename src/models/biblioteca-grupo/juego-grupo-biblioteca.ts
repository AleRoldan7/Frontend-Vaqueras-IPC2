export interface JuegoGrupo {
    idVideojuego: number;
    nombre: string;        
    esPropio: boolean;
    estado: 'INSTALADO' | 'NO_INSTALADO';
    imagenBase64?: string;  
}