import { Calificacion } from "./calificacion";

export interface Comentario {
    idComentario: number;
    idUsuario: number;
    nicknameUsuario: string;
    texto: string;
    visible: boolean;
    fecha: string;
    respuestas: Comentario[];
}

export interface ResumenReseñas {
  calificacion: Calificacion;
  comentarios: Comentario[];
}