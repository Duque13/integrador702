import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Cliente = () => {
    const [cliente, setCliente] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/apiPrueba/clientes.php');
                if (!response.ok) throw new Error('Network response was not ok');
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

    const clientesPorSexo = cliente.reduce((acc, cliente) => {
        acc[cliente.sexo] = (acc[cliente.sexo] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(clientesPorSexo),
        datasets: [
            {
                label: 'Clientes por sexo',
                data: Object.values(clientesPorSexo),
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Distribución de Clientes por Sexo' },
        },
    };

    return (
        <div>
            <h1 className="App App-link">LISTA DE CLIENTES</h1>
            <div>
    {error ? (
        <div>Error message</div>
    ) : null}
</div>
</div>
                            <hr />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cliente;