import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2'

const BarChart = ({data, labels, titulo}) => {

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        AddDatachart(data, labels, titulo)
    }, [data, labels]);

    const AddDatachart = (data, labels) => {
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: titulo,
                    data: data,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                }
            ]
        });
    };

    return (
        <div className="App">
            <div>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: titulo, display: true },
                        scales: {
                            yAxes: [
                                {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
                                    beginAtZero: true,
                                    userCallback: function(value) {
                                        value = value.toString();
                                        value = value.split(/(?=(?:...)*$)/);
                                        value = value.join('.');
                                        return '$' + value;
                                    }
                                },
                                gridLines: {
                                    display: true
                                },
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var value = data.datasets[0].data[tooltipItem.index]
                                    value = value.toString();
                                    value = value.split(/(?=(?:...)*$)/);
                                    value = value.join('.')
                                    return 'Ingresos: $'+ value;
                                },
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
  };

export default BarChart;