import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database"; // Agregar funciones necesarias
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCQnHCqsmgmfoi_21uVqfn065dYjN-IcQ8",
    authDomain: "padel-corev1.firebaseapp.com",
    projectId: "padel-corev1",
    storageBucket: "padel-corev1.firebasestorage.app",
    messagingSenderId: "756826483871",
    appId: "1:756826483871:web:4dc13da3b47b575c7a46aa",
    measurementId: "G-L6H6TSX6PV"
}; 

const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);

// Exportar funciones de Realtime Database
export { ref, set, onValue };
