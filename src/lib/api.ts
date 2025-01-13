import axios from 'axios';
import { Usuario, Torneo, Partido, PartidoCreate } from './types';

// Configura la instancia de Axios
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Dirección base del backend
});

// Función para obtener todos los usuarios
export const fetchUsuarios = async (): Promise<Usuario[]> => {
    const response = await API.get('/usuarios/');
    return response.data;
  };
  

// Función para obtener todos los torneos
export const fetchTorneos = async () => {
    try {
        const response = await API.get('/torneos/');
        return response.data;
    } catch (error: any) {
        console.error('Error fetching torneos:', error.response || error.message);
        throw new Error('Error al obtener torneos');
    }
};

//función para obtener todos los partidos
export const fetchPartidos = async (): Promise<Partido[]> => {
    const response = await API.get('/partidos/');
    return response.data;
  };


// Función para crear un nuevo usuario
export const createUsuario = async (usuario: Usuario) => {
    const response = await API.post('/usuarios/', usuario);
    return response.data;
};

export const createTorneo = async (torneo: Torneo) => {
    if (!torneo.nombre || !torneo.sede || !torneo.fecha_inicio || !torneo.fecha_fin) {
        throw new Error('Faltan campos obligatorios en el torneo.');
    }

    try {
        const response = await API.post('/torneos/', torneo);
        return response.data;
    } catch (error: any) {
        console.error('Error creando torneo:', error.response || error.message);
        throw new Error('Error al crear torneo');
    }
};

export const createPartido = async (partido: PartidoCreate) => {
    const response = await API.post('/partidos/', partido);
    return response.data;
  };

