import React, {useState, useEffect} from 'react';
import { Pie } from 'react-chartjs-2'
//import { makeStyles } from '@material-ui/core/styles';


/* 
const useStyles = makeStyles((theme) => ({
    //Styles
    toolbar: theme.mixins.toolbar,
  
})); */

const PieChart = ({data, labels, titulo, tooltip}) => {

    const [chartData, setChartData] = useState({});
    const colors = ['rgba(255, 99, 132, 0.8)',
                    'rgba(54, 80, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(85, 159, 200, 0.8)',
                    'rgba(170, 110, 150, 0.8)',
                    'rgba(89, 80, 64, 0.8)',
                    'rgba(10, 140, 64, 0.8)']

    useEffect(() => {
        AddDatachart(data, labels, titulo)
    }, [data, labels]);

    const AddDatachart = (data, labels) => {

        setChartData({
            labels: labels,
            datasets: [
                {
                    backgroundColor: colors,
                    data: data,
                }
            ]
        });
    };

    return (
        <div className="App">
            <div>
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { 
                            text: titulo, 
                            display: true,
                            fontSize:20 
                        },
                        legend:{
                            display:true,
                            position:'right'
                        },
                    }}
                />
            </div>
        </div>
    );
  };

export default PieChart;