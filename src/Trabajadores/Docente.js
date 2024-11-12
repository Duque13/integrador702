import React, { useEffect, useState } from 'react';
import '../App.css';

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }
                const data = await response.json();
                setDocentes(data);
                setError(null); // Limpia el error si la solicitud fue exitosa
            } catch (error) {
                setError(error.message);
                console.error('Fetch error:', error);
            }
        };

        // Llama a `fetchDocentes` inicialmente y luego cada 2 segundos
        fetchDocentes();
        const interval = setInterval(fetchDocentes, 2000);

        // Limpia el intervalo en caso de desmontaje del componente
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1 className="App App-link">DOCENTES INGENIERÍA INFORMÁTICA TESSFP</h1>
            
            {/* Muestra un mensaje de error si lo hay */}
            {error && <p className="error-message">Error: {error}</p>}
            
            {/* Renderiza la lista de docentes si no hay errores */}
            <div>
                {docentes.length > 0 ? (
                    docentes.map((docente) => (
                        <div key={docente.issemyn}>
                            <div>
                                Clave ISSEMYN: <strong>{docente.issemyn}</strong>
                            </div>
                            <div>
                                <p>Nombre: <strong>{docente.nombre}</strong></p>
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    !error && <p>Cargando docentes...</p>
                )}
            </div>
        </div>
    );
};

export default ListaDocentes;
