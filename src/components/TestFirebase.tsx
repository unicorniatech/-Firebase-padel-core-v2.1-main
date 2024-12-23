import  { useEffect, useState } from 'react';
import { database, ref, set, onValue } from '@/lib/firebase-config';


function TestFirebase() {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const messageRef = ref(database, 'test/message');
        onValue(messageRef, (snapshot) => {
            const data = snapshot.val();
            setMessage(data || 'No message yet');
        });
    }, []);

    const sendMessage = () => {
        const messageRef = ref(database, 'test/message');
        set(messageRef, '¡Hola desde Firebase!');
    };

    return (
        <div>
            <h2>Mensaje desde Firebase: {message}</h2>
            <button onClick={sendMessage}>Enviar Mensaje</button>
        </div>
    );
}

export default TestFirebase;
