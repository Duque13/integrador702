import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <div className="container">
            <h1 className="App App-link text-center my-4">LISTA DE CLIENTES</h1>

            {/* Mostrar mensaje de error si ocurre */}
            {error && (
                <div className="alert alert-danger text-center">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Mostrar tarjetas de docentes */}
            <div className="row">
                {docentes.length > 0 ? (
                    docentes.map((docente) => (
                        <div className="col-md-4 mb-4" key={docente.issemyn}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">ID: {docente.issemyn}</h5>
                                    <p><strong>Nombre:</strong> {docente.nombre}</p>
                                    <p><strong>Teléfono:</strong> {docente.telefono || 'No disponible'}</p>
                                    <p><strong>Sexo:</strong> {docente.sexo || 'No especificado'}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !error && <p className="text-center">Cargando clientes...</p>
                )}
            </div>
        </div>
    );
};

export default ListaDocentes;
