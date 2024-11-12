import React, { useEffect, useState } from 'react';
import '../App.css'; // Asegúrate de que el archivo CSS correcto esté siendo importado

const Cliente = () => {
    const [cliente, setCliente] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/apiPrueba/clientes.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCliente(data);
            } catch (error) {
                setError(error);
                console.error('Fetch error:', error);
            }
        };
        fetchData();
        // Llama a la función una vez cuando el componente se monta
        fetchData();

        // Crea un intervalo que llama a la función cada 2 segundos
        const interval = setInterval(fetchData, 2000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1 className="App App-link">LISTA DE CLIENTES</h1>
            <div>
                {error ? (
                    <div>Error: {error.message}</div>
                ) : (
                    cliente.map((cliente) => (
                        <div key={cliente.id}>
                            <div>
                                ID: <strong>{cliente.id}</strong>
                            </div>
                            <div>
                                <p>Nombre: <strong>{cliente.nombre}</strong></p>
                            </div>
                            <div>
                                <p>Teléfono: <strong>{cliente.telefono}</strong></p>
                            </div>
                            <div>
                                <p>Sexo: <strong>{cliente.sexo}</strong></p>
                            </div>
                            <hr />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cliente;
