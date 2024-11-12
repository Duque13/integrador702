import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Importa el gráfico de tipo Line
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import '../App.css'; 

// Registra los componentes de Chart.js que usarás
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);

    // Cargar los datos de docentes al iniciar el componente
    useEffect(() => {
        const fetchDocentes = async () => {
            const response = await fetch('http://localhost/apiprueba/api.php');
            const data = await response.json();
            setDocentes(data);
        };

        // Llama a la función una vez cuando el componente se monta
        fetchDocentes();

        // Crea un intervalo que llama a la función cada 2 segundos
        const interval = setInterval(fetchDocentes, 2000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    // Datos para la gráfica
    const chartData = {
        labels: docentes.map(docente => docente.nombre), // Nombres de los docentes como etiquetas
        datasets: [
            {
                label: 'Clave ISSEMYN de los Docentes',
                data: docentes.map(docente => docente.issemyn), // Claves ISSEMYN para los datos
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de los puntos
                borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1 className="App App-link">DOCENTES INGENIERÍA INFORMÁTICA TESSFP</h1>

            {/* Mostrar la gráfica */}
            <div>
                <Line data={chartData} /> {/* Renderiza la gráfica con los datos */}
            </div>

            {/* Mostrar los docentes debajo de la gráfica */}
            <div>
                {docentes.map((docente) => (
                    <div key={docente.issemyn}>
                        <div>
                            Clave ISSEMYN: <strong>{docente.issemyn}</strong>
                        </div>
                        <div>
                            <p>Nombre: <strong>{docente.nombre}</strong></p>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaDocentes;
