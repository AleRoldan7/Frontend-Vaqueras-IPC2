import { Calificacion } from "./calificacion";
import { Comentario } from "./comentario";

export interface RsumenCalificacionComentario {

    calificacion: Calificacion;
    comentarios: Comentario[];
}