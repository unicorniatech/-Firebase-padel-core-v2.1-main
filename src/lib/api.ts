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

// Función para crear un nuevo usuario
export const createUsuario = async (usuario: {
    nombre_completo: string;
    email: string;
    rating_inicial: number;
    club?: string | null;
}) => {
    const response = await API.post('/usuarios/', usuario);
    return response.data;
};
