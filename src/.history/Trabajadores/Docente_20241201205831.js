import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

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

        fetchDocentes();
    }, []);

    // Preprocesa los datos para el gráfico
    const obtenerDatosGrafico = () => {
        const hombres = docentes.filter((docente) => docente.sexo === 'M').length;
        const mujeres = docentes.filter((docente) => docente.sexo === 'F').length;
        const mujeres = docentes.filter((docente) => docente.sexo === 'l').length;

        return {
            labels: ['Hombres', 'Mujeres'],
            datasets: [
                {
                    label: 'Cantidad por sexo',
                    data: [hombres, mujeres],
                    backgroundColor: ['#3498db', '#e74c3c'], // Colores de las barras
                    borderColor: ['#2980b9', '#c0392b'],
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div className="container">
            <h1 className="App-link text-center my-4">Lista de Clientes y Gráficos</h1>

            {/* Mensaje de error */}
            {error && (
                <div className="alert alert-danger text-center">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Lista de clientes */}
            <div className="row">
                {docentes.length > 0 ? (
                    docentes.map((docente) => (
                        <div className="col-md-4 mb-4" key={docente.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">ID: {docente.id}</h5>
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

            {/* Gráfico */}
            <div className="mt-5">
                <h2 className="text-center">Gráfico de Clientes por Sexo</h2>
                <Bar
                    data={obtenerDatosGrafico()}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ListaDocentes;
