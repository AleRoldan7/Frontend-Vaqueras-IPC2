import { Calificacion } from "./calificacion";

export interface Comentario {
    idComentario: number;
    idUsuario: number;
    tituloJuego: string;
    nicknameUsuario: string;
    texto: string;
    visible: boolean;
    fecha: string;
    respuestas: Comentario[];
    totalRespuestas: number;
}

export interface ResumenReseñas {
  calificacion: Calificacion;
  comentarios: Comentario[];
}