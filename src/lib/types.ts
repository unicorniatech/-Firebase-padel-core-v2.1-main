// types.ts
export interface Usuario {
    nombre_completo: string;
    email: string;
    rating_inicial?: number;
    club?: string | null;
}

export interface Torneo {
    nombre: string;
    sede: string;
    fecha_inicio: string;
    fecha_fin: string;
    premio_dinero: number;
    puntos: number;
    imagen_url: string;
    tags: string[];
}

export interface Partido {
    equipo_1: string[];
    equipo_2: string[];
    fecha_hora: string;
    resultado?: string;
    torneo: string;
}
