import React, { useEffect, useState } from 'react';
import '../App.css';
import { Bar } from 'react-chartjs-2';  // Importa Chart.js para gráficos de barras
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Cliente = () => {
    const [cliente, setCliente] = useState([]);
    const [error, setError] = useState(null);

    // Función para obtener los datos de la API
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
        labels: ['Masculino', 'Femenino'],  // Las categorías que se mostrarán en el eje X
        datasets: [
            {
                label: 'Cantidad de Clientes por Sexo',  // Etiqueta de la serie de datos
                data: [sexCount.male, sexCount.female],  // Cantidades de clientes por cada sexo
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Colores para cada barra
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],  // Bordes de las barras
                borderWidth: 1,
            },
        ],
    };

    // Opciones de configuración para el gráfico
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,  // Asegura que el eje Y comience en 0
            },
        },
    };

    return (
        <div>
            <h1 className="App App-link">LISTA DE CLIENTES</h1>
            
            {/* Mostrar los errores si ocurren */}
            {error ? (
                <div>Error: {error.message}</div>
            ) : (
                // Mostrar los datos de los clientes
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

            {/* Mostrar la gráfica */}
            <div style={{ width: '50%', margin: '0 auto' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Cliente;
