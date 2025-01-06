import axios from 'axios';

// Configura la instancia de Axios
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Dirección base del backend
});

// Función para obtener todos los usuarios
export const fetchUsuarios = async () => {
    const response = await API.get('/usuarios/');
    return response.data;
};

// Función para obtener todos los torneos
export const fetchTorneos = async () => {
    const response = await API.get('/torneos/');
    return response.data;
};

// Función para crear un nuevo usuario
export const createUsuario = async (usuario: {
    nombre_completo: string;
    email: string;
    rating_inicial?: number;
    club?: string | null; // El ? es para que sea opcional
}) => {
    const response = await API.post('/usuarios/', usuario);
    return response.data;
};

export const createTorneo = async (torneo: {
    nombre: string;
    sede: string;
    fecha_inicio: string;
    fecha_fin: string;
    premio_dinero: number;
    puntos: number;
    imagen_url: string;
    tags: string[];
}) => {
    const response = await API.post('/torneos/', torneo);
    return response.data;
};
export const createPartido = async (partido: {
    equipo_1: string;
    equipo_2: string;
    fecha_hora: string;
    resultado?: string;
    torneo: string; // ID del torneo
}) => {
    const response = await API.post('/partidos/', partido);
    return response.data;
};

