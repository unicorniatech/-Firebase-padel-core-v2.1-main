// types.ts
export interface Usuario {
    id: string;
    nombre_completo: string;
    email: string;
    rating_inicial?: number;
    club?: string | null;
}

export interface Torneo {
    id: string;
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
    id: string;
    equipo_1: string[];
    equipo_2: string[];
    fecha_hora: string;
    resultado?: string;
    torneo: string;
}

export interface PendingApproval {
    id: string;
    type: 'ranking' | 'match' | 'tournament';
    title: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    timestamp: string;
  }
  
export interface PartidoForm {
    equipo_1: string[];
    equipo_2: string[];
    fecha_hora: string;
    resultado?: string;
    torneo: string;
  }

  export interface UsuarioForm {
    nombre_completo: string;
    email: string;
    rating_inicial: number;
    club: string;
  }
  
  export interface TorneoForm {
    nombre: string;
    sede: string;
    fecha_inicio: string;
    fecha_fin: string;
    premio_dinero: number;
    puntos: number;
    imagen_url: string;
    tags: string[];
  }