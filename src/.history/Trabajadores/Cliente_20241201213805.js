import 'bootstrap/dist/css/bootstrap.min.css';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import '../App.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Cliente = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiAlumnos.php');
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }
                const data = await response.json();
                setAlumnos(data);
                setError(null); // Limpiamos el error si la solicitud es exitosa
            } catch (error) {
                setError(error);
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    // Prepara los datos para el gráfico
    const chartData = {
        labels: alumnos.map((alumno) => alumno.nombre), // Nombres de los alumnos
        datasets: [
            {
                label: 'Práctica de Hilos',
                data: alumnos.map((alumno) => alumno.practicas.practica_hilos),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Práctica de Socket',
                data: alumnos.map((alumno) => alumno.practicas.practica_socket),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Práctica de Node',
                data: alumnos.map((alumno) => alumno.practicas.practica_node),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'Práctica de React',
                data: alumnos.map((alumno) => alumno.practicas.practica_react),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Práctica de Git',
                data: alumnos.map((alumno) => alumno.practicas.practica_git),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Calificaciones',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Alumnos',
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
            <h1 className="App App-link">CALIFICACIONES DE LOS ALUMNOS</h1>

            {/* Mostrar mensaje de error si ocurre */}
            {error ? (
                <div className="alert alert-danger text-center">
                    <strong>Error:</strong> {error.message}
                </div>
            ) : (
                // Tarjetas de alumnos con sus calificaciones
                <div className="container mt-4">
                    <div className="row">
                        {alumnos.map((alumno) => (
                            <div className="col-md-6 mb-4" key={alumno.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">ID: {alumno.id}</h5>
                                        <p><strong>Cuenta:</strong> {alumno.cuenta}</p>
                                        <p><strong>Nombre:</strong> {alumno.nombre}</p>
                                        <h6>Calificaciones:</h6>
                                        <ul>
                                            <li>Práctica de Hilos: {alumno.practicas.practica_hilos}</li>
                                            <li>Práctica de Socket: {alumno.practicas.practica_socket}</li>
                                            <li>Práctica de Node: {alumno.practicas.practica_node}</li>
                                            <li>Práctica de React: {alumno.practicas.practica_react}</li>
                                            <li>Práctica de Git: {alumno.practicas.practica_git}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gráfico de barras */}
                    <div style={{ width: '80%', margin: '0 auto', padding: '20px 0' }}>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cliente;
