import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2'

const LineChart = ({data, labels, titulo}) => {

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        AddDatachart(data, labels, titulo)
    }, [data, labels]);

    const AddDatachart = (data, labels, titulo) => {
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: titulo,
                    data: data,
                    backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                }
            ]
        });
    };

    return (
        <div className="App">
            <div>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: titulo, display: true },
                        scales: {
                            yAxes: [
                                {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 15,
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
                                        display: true
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
                        },
                        
                    }}
                />
            </div>
        </div>
    );
  };

export default LineChart;