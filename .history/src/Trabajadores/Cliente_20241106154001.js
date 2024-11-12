import React, { useEffect, useState } from 'react';
import '../App.css';
import { Bar } from 'react-chartjs-2';  // Importar el componente de gráfico de barras
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los componentes de Chart.js necesarios
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    // Lógica para graficar la cantidad de clientes por sexo
    const sexCount = cliente.reduce((acc, curr) => {
        if (curr.sexo === 'Masculino') {
            acc.male += 1;
        } else if (curr.sexo === 'Femenino') {
            acc.female += 1;
        }
        return acc;
    }, { male: 0, female: 0 });

    // Datos para la gráfica
    const chartData = {
        labels: ['Masculino', 'Femenino'],  // Las categorías (Eje X)
        datasets: [
            {
                label: 'Cantidad de Clientes por Sexo',  // Etiqueta de la serie de datos
                data: [sexCount.male, sexCount.female], // Cantidades por cada categoría
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Colores
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Opciones para la gráfica
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true, // El eje Y comienza en 0
            },
        },
    };

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

            {/* Mostrar la gráfica */}
            <div style={{ width: '50%', margin: '0 auto' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Cliente;
