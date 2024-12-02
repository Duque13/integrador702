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
                </div>
            )}
        </div>
    );
};

export default Cliente;
