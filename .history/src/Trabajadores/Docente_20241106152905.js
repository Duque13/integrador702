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
            label: 'Cantidad de Docentes',
            data: docentes.map(docente => docente.cantidad || 1), // Valores de cantidad
            backgroundColor: docentes.map((_, index) => `rgba(${75 + index * 20}, ${192 - index * 10}, 192, 0.6)`), // Gama de colores
            borderColor: docentes.map((_, index) => `rgba(${75 + index * 20}, ${192 - index * 10}, 192, 1)`),
            borderWidth: 1.5,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.7)', // Color de resaltado
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
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
