import 'bootstrap/dist/css/bootstrap.min.css';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import '../App.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Cliente = () => {
    const [cliente, setCliente] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }
                const data = await response.json();
                setCliente(data);
                setError(null); // Limpiamos el error si la solicitud es exitosa
            } catch (error) {
                setError(error);
                console.error('Fetch error:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);  // Actualiza los datos cada 2 segundos

        return () => clearInterval(interval);  // Limpia el intervalo al desmontar el componente
    }, []);

    // Filtra y cuenta los clientes masculinos (M) y femeninos (F)
    const sexCount = cliente.reduce((acc, curr) => {
        if (curr.sexo === 'M') {
            acc.male += 1;
        } else if (curr.sexo === 'F') {
            acc.female += 1;
        }
        return acc;
    }, { male: 0, female: 0 });

    // Datos para el gráfico
    const chartData = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
            {
                label: 'Cantidad de Clientes por Sexo',
                data: [sexCount.male, sexCount.female],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Opciones de configuración para el gráfico
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad de Clientes',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Sexo',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div>
            <h1 className="App App-link">LISTA DE CLIENTES</h1>
            
            {/* Mostrar mensaje de error si ocurre */}
            {error ? (
                <div className="alert alert-danger text-center">
                    <strong>Error:</strong> {error.message}
                </div>
            ) : (
                // Tabla de clientes
                <div className="container mt-4">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Sexo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cliente.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.telefono}</td>
                                    <td>{cliente.sexo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Gráfico de barras */}
            <div style={{ width: '50%', margin: '0 auto', padding: '20px 0' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Cliente;
