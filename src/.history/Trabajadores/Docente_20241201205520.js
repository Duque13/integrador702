import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

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
                setError(null);
            } catch (error) {
                setError(error.message);
                console.error('Fetch error:', error);
            }
        };

        fetchDocentes();
    }, []);
    // Resto del código...

        fetchDocentes();
    }, []);

    // Datos para la gráfica por Sexo
    const obtenerDatosPorSexo = () => {
        const hombres = docentes.filter((docente) => docente.sexo === 'M').length;
        const mujeres = docentes.filter((docente) => docente.sexo === 'F').length;

        return {
            labels: ['Hombres', 'Mujeres'],
            datasets: [
                {
                    label: 'Cantidad por sexo',
                    data: [hombres, mujeres],
                    backgroundColor: ['#3498db', '#e74c3c'],
                    borderColor: ['#2980b9', '#c0392b'],
                    borderWidth: 1,
                },
            ],
        };
    };

    // Datos para la gráfica de ID
    const obtenerDatosPorID = () => {
        const labels = docentes.map((docente) => `ID: ${docente.id}`); // Etiquetas con los IDs
        const data = docentes.map(() => 1); // Asigna el valor 1 a cada ID para que todos aparezcan

        return {
            labels,
            datasets: [
                {
                    label: 'Clientes por ID',
                    data,
                    backgroundColor: '#2ecc71',
                    borderColor: '#27ae60',
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

            {/* Gráfico de Clientes por Sexo */}
            <div className="mt-5">
                <h2 className="text-center">Gráfico de Clientes por Sexo</h2>
                <Bar
                    data={obtenerDatosPorSexo()}
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

            {/* Gráfico de Clientes por ID */}
            <div className="mt-5">
                <h2 className="text-center">Gráfico de Clientes por ID</h2>
                <Line
                    data={obtenerDatosPorID()}
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
                            x: {
                                ticks: {
                                    autoSkip: false, // Muestra todas las etiquetas
                                    maxRotation: 90, // Rotación máxima
                                    minRotation: 45, // Rotación mínima
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ListaDocentes;
