import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

// Registrar elementos de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchDocentes = async () => {
            const response = await fetch('http://localhost/apiprueba/api.php');
            const data = await response.json();
            setDocentes(data);
        };

        fetchDocentes();
        const interval = setInterval(fetchDocentes, 2000);
        return () => clearInterval(interval);
    }, []);

    // Configuración de datos para Chart.js
    const chartData = {
        labels: docentes.map(docente => docente.nombre),
        datasets: [
            {
                label: 'Cantidad de docentes',
                data: docentes.map(docente => docente.cantidad || 1), // Usa una propiedad numérica
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Distribución de Docentes' },
        },
    };

    return (
        <div>
            <h1 className="App App-link">DOCENTES INGENIERÍA INFORMÁTICA TESSFP</h1>
            <div>
                {docentes.map((docente) => (
                    <div key={docente.issemyn}>
                        <div>Clave ISSEMYN: <strong>{docente.issemyn}</strong></div>
                        <div><p>Nombre: <strong>{docente.nombre}</strong></p></div>
                        <hr />
                    </div>
                ))}
            </div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ListaDocentes;
