import React, {useState, useEffect} from 'react';
import axios from "axios";

//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import MaterialUIPicker from '../../components/MaterialUIPicker';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//COMPONENTES
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'

const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const useStyles = makeStyles((theme) => ({

    toolbar: theme.mixins.toolbar,
    title: {
        textAlign: 'center'
    },
    buttonContainer: {
        margin: 'auto',
        textAlign: 'center',
        paddingBottom: 50
    }
  
}));

const DashboardGeneral = (props) => {

    const [data, setData] = useState([])
    const [firstDate, setFirstDate] = useState('')
    const [lastDate, setLastDate] = useState('')
    const [hideCharts, setHideCharts] = useState(false)
    const [ready, setReady] = useState(false)

    //GRÁFICOS ESTADÍSTICAS GENERALES

    //GRAFICO LINEAL

    const [lineChartDataIngresos, setLineChartDataIngresos] = useState([])
    const [lineChartLabelsIngresos, setLineChartLabelsIngresos] = useState([])

    //GRAFICOS BARRA

    const [barChartDataIngresosDia, setBarChartDataIngresosDia] = useState([])
    const [barChartLabelsIngresosDia, setBarChartLabelsIngresosDia] = useState([])

    const [barChartDataIngresosMes, setBarChartDataIngresosMes] = useState([])
    const [barChartLabelsIngresosMes, setBarChartLabelsIngresosMes] = useState([])

    const [barChartDataIngresosHora, setBarChartDataIngresosHora] = useState([])
    const [barChartLabelsIngresosHora, setBarChartLabelsIngresosHora] = useState([])

    const [barChartDataIngresosMesaPromMes, setBarChartDataIngresosMesaPromMes] = useState([])
    const [barChartLabelsIngresosMesaPromMes, setBarChartLabelsIngresosMesaPromMes] = useState([])

    const [barChartDataIngresosMesaPromDia, setBarChartDataIngresosMesaPromDia] = useState([])
    const [barChartLabelsIngresosMesaPromDia, setBarChartLabelsIngresosMesaPromDia] = useState([])

    const [barChartDataIngresosMesaPromHora, setBarChartDataIngresosMesaPromHora] = useState([])
    const [barChartLabelsIngresosMesaPromHora, setBarChartLabelsIngresosMesaPromHora] = useState([])

    //GRAFICOS PIE

    const [pieChartDataDiners, setPieChartDataDiners] = useState([])
    const [pieChartLabelsDiners, setPieChartLabelsDiners] = useState([])

    const [pieChartDataPayment, setPieChartDataPayment] = useState([])
    const [pieChartLabelsPayment, setPieChartLabelsPayment] = useState([])

    const [pieChartDataDuration, setPieChartDataDuration] = useState([])
    const [pieChartLabelsDuration, setPieChartLabelsDuration] = useState([])

    const [pieChartDataZone, setPieChartDataZone] = useState([])
    const [pieChartLabelsZone, setPieChartLabelsZone] = useState([])

    // FILTROS

    const [filterStartDate, setFilterStartDate] = useState('') //month/day/year
    const [filterFinishDate, setFilterFinishDate] = useState('')

    const classes = useStyles();

    useEffect(() => {

        //var url = 'https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json'
        var url = "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json"
        axios
            .get(url)
            .then(res => {

                setData(res.data)
                const dataAux = {}

                //GRAFICO LINEAL INGRESOS x FECHA

                for (var x of res.data) {
                    var date = new Date(x.date_closed);
                    var newdate = moment(date, "DD-MM-YYYY").format("DD-MM-YYYY")
                    if (newdate in dataAux){
                        dataAux[newdate] += x.total
                    }
                    else {
                        dataAux[newdate] = x.total
                    }
                }

                var ordered = {};
                Object.keys(dataAux).sort(function(a, b) {
                    return moment(b, 'DD-MM-YYYY').toDate() - moment(a, 'DD-MM-YYYY').toDate();
                }).reverse().forEach(function(key) {
                    ordered[key] = dataAux[key];
                })

                setLineChartDataIngresos(Object.values(ordered))
                setLineChartLabelsIngresos(Object.keys(ordered))

                //GRAFICO BARRA INGRESOS x DIA
                //GRAFICO BARRA INGRESOS PROMEDIO x MESA DIA

                const dataAux2 = {'Monday': 0, 'Tuesday': 0, 'Wednesday':0, 'Thursday':0, 'Friday':0, 'Saturday':0, 'Sunday':0}
                const contAux2 = {'Monday': 0, 'Tuesday': 0, 'Wednesday':0, 'Thursday':0, 'Friday':0, 'Saturday':0, 'Sunday':0}
                
                for (var x of res.data) {
                    var date = new Date(x.date_closed);
                    var newdate = moment(date, "DD-MM-YYYY").format("dddd")
                    if (newdate in dataAux2){
                        dataAux2[newdate] += x.total
                        contAux2[newdate] += 1
                    }
                    else {
                        dataAux2[newdate] = x.total
                        contAux2[newdate] = 1
                    }
                }
                setBarChartDataIngresosDia(Object.values(dataAux2))
                setBarChartLabelsIngresosDia(Object.keys(dataAux2))

                for (var y of Object.keys(dataAux2)) {
                    dataAux2[y] = (dataAux2[y]/contAux2[y]).toString().split('.')[0]
                }
                setBarChartDataIngresosMesaPromDia(Object.values(dataAux2))
                setBarChartLabelsIngresosMesaPromDia(Object.keys(dataAux2))

                //GRAFICO BARRA INGRESOS x MES
                //GRAFICO BARRA INGRESOS PROMEDIO x MESA MES

                const dataAux3 = {}
                const contAux3 = {}
                for (var x of res.data) {
                    var date = new Date(x.date_closed);
                    var newdate = moment(date).format("MMMM")
                    if (newdate in dataAux3){
                        dataAux3[newdate] += x.total
                        contAux3[newdate] += 1
                    }
                    else {
                        dataAux3[newdate] = x.total
                        contAux3[newdate] = 1
                    }
                }

                setBarChartDataIngresosMes(Object.values(dataAux3))
                setBarChartLabelsIngresosMes(Object.keys(dataAux3))

                for (var y of Object.keys(dataAux3)) {
                    dataAux3[y] = (dataAux3[y]/contAux3[y]).toString().split('.')[0]
                }
                setBarChartDataIngresosMesaPromMes(Object.values(dataAux3))
                setBarChartLabelsIngresosMesaPromMes(Object.keys(dataAux3))

                //GRAFICO BARRA INGRESOS x HORA
                //GRAFICO BARRA INGRESOS PROMEDIO x MESA HORA

                const dataAux4 = {}
                const contAux4 = {}
                for (var x of res.data) {
                    var date = new Date(x.date_closed);
                    var newdate = moment(date).format("HH:00")
                    if (newdate in dataAux4){
                        dataAux4[newdate] += x.total
                        contAux4[newdate] += 1
                    }
                    else {
                        dataAux4[newdate] = x.total
                        contAux4[newdate] = 1
                    }
                }

                var ordered2 = {};
                Object.keys(dataAux4).sort(function(a, b) {
                    return moment(b, 'HH:00').toDate() - moment(a, 'HH:00').toDate();
                }).reverse().forEach(function(key) {
                    ordered2[key] = dataAux4[key];
                })

                setBarChartDataIngresosHora(Object.values(ordered2))
                setBarChartLabelsIngresosHora(Object.keys(ordered2))

                setBarChartDataIngresosMesaPromHora(Object.values(ordered2))
                setBarChartLabelsIngresosMesaPromHora(Object.keys(ordered2))

                //GRAFICO PIE MIEMBROS POR MESA

                const dataAux5 = {}
                for (var x of res.data) {
                    var diners = x.diners
                    if (diners in dataAux5){
                        dataAux5[diners] += 1
                    }
                    else {
                        dataAux5[diners] = 1
                    }
                }
                setPieChartDataDiners(Object.values(dataAux5))
                setPieChartLabelsDiners(Object.keys(dataAux5))

                //GRAFICO PIE METODOS DE PAGO

                const dataAux6 = {}
                for (var x of res.data) {
                    var payments = x.payments
                    for (var p of payments){
                        var type = p.type
                        if (type in dataAux6){
                            dataAux6[type] += p.amount
                        }
                        else {
                            dataAux6[type] = p.amount
                        }
                    }
                }

                setPieChartDataPayment(Object.values(dataAux6))
                setPieChartLabelsPayment(Object.keys(dataAux6))

                //GRAFICO PIE DURACION COMIDAS

                const dataAux7 = {'0 - 20 min': 0, '20 - 40 min': 0, '40 - 60 min': 0, '1 hora - 1 hora 20 min': 0, '1 hora 20 min- 1 hora 40 min': 0, '1 hora 40 min - 2 horas': 0, '>= 2 horas': 0}
                for (var x of res.data) {
                    var dateClosed = new Date(x.date_closed);
                    var dateOpened = new Date(x.date_opened);
                    var diff = dateClosed - dateOpened
                    var diffHrs = Math.floor((diff % 86400000) / 3600000);
                    var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);

                    if (diffHrs === 0){
                        if (diffMins <= 20){
                            dataAux7['0 - 20 min'] += 1
                        }
                        else if (diffMins > 20 && diffMins <= 40){
                            dataAux7['20 - 40 min'] +=1
                        }

                        else {
                            dataAux7['40 - 60 min'] += 1
                        }
                    }

                    else if (diffHrs === 1){
                        if (diffMins <= 20){
                            dataAux7['1 hora - 1 hora 20 min'] += 1
                        }
                        else if (diffMins > 20 && diffMins <= 40){
                            dataAux7['1 hora 20 min- 1 hora 40 min'] += 1
                        }

                        else {
                            dataAux7['1 hora 40 min - 2 horas'] += 1
                        }
                    }

                    else if (diffHrs === 2){
                        dataAux7['>= 2 horas'] += 1
                        
                    }
                }

                setPieChartDataDuration(Object.values(dataAux7))
                setPieChartLabelsDuration(Object.keys(dataAux7))

                //GRAFICO ZONAS

                const dataAux8 = {}
                for (var x of res.data) {
                    var zone = x.zone
                    if (zone in dataAux8){
                        dataAux8[zone] += 1
                    }
                    else {
                        dataAux8[zone] = 1
                    }
                }
                setPieChartDataZone(Object.values(dataAux8))
                setPieChartLabelsZone(Object.keys(dataAux8))

                //FILTROS

                setFilterStartDate(Object.keys(ordered)[0])
                setFirstDate(Object.keys(ordered)[0])
                setFilterFinishDate(moment('31-03-2019',"DD-MM-YYYY"))
                setLastDate(moment('31-03-2019',"DD-MM-YYYY"))
                //setLineChartFinishDate(moment(Object.keys(ordered)[Object.keys(ordered).length - 1]),"DD-MM-YYYY")
                //setFilterFinishDate(Object.keys(ordered)[res.data.length-1])
                setReady(true)
            })
        
    },[])

    const handleButtonClick = e => {
        const { value } = e.target;
        const boton1 = value === "boton1";

        if (boton1) {

            var startDate = new Date(filterStartDate)
            var endDate = new Date(filterFinishDate)
            const diff = getDifferenceInDays(startDate, endDate)
            var range = moment.range(startDate, endDate.setDate(endDate.getDate() + 1));
            const dataAux = {}
            const dataAux2 = {'Monday': 0, 'Tuesday': 0, 'Wednesday':0, 'Thursday':0, 'Friday':0, 'Saturday':0, 'Sunday':0}
            const contAux2 = {'Monday': 0, 'Tuesday': 0, 'Wednesday':0, 'Thursday':0, 'Friday':0, 'Saturday':0, 'Sunday':0}
            const dataAux3 = {}
            const contAux3 = {}
            const dataAux4 = {}
            const contAux4 = {}
            const dataAux5 = {}
            const dataAux6 = {}
            const dataAux7 = {'0 - 20 min': 0, '20 - 40 min': 0, '40 - 60 min': 0, '1 hora - 1 hora 20 min': 0, '1 hora 20 min- 1 hora 40 min': 0, '1 hora 40 min - 2 horas': 0, '>= 2 horas': 0}
            const dataAux8 = {}

            if (diff === 0){
                setHideCharts(true)
                for (var x of data) {
                    var date = new Date(x.date_closed);
                    var dateClosed = new Date(x.date_closed);
                    var dateOpened = new Date(x.date_opened);
                    var diff2 = dateClosed - dateOpened
                    var diffHrs = Math.floor((diff2 % 86400000) / 3600000);
                    var diffMins = Math.round(((diff2 % 86400000) % 3600000) / 60000);

                    if (range.contains(date)){
                        var newdate = moment(date, "HH:mm:ss").format("HH:mm:ss")
                        var newdate2 = moment(date).format("HH:00")
                        var diners = x.diners
                        var payments = x.payments
                        var zone = x.zone                        

                        if (newdate in dataAux){
                            dataAux[newdate] += x.total
                        }
                        else {
                            dataAux[newdate] = x.total
                        }
                        if (newdate2 in dataAux4){
                            dataAux4[newdate2] += x.total
                            contAux4[newdate2] += 1
                        }
                        else {
                            dataAux4[newdate2] = x.total
                            contAux4[newdate2] = 1
                        }
                        if (diners in dataAux5){
                            dataAux5[diners] += 1
                        }
                        else {
                            dataAux5[diners] = 1
                        }

                        for (var p of payments){
                            var type = p.type
                            if (type in dataAux6){
                                dataAux6[type] += p.amount
                            }
                            else {
                                dataAux6[type] = p.amount
                            }
                        }

                        if (diffHrs === 0){
                            if (diffMins <= 20){
                                dataAux7['0 - 20 min'] += 1
                            }
                            else if (diffMins > 20 && diffMins <= 40){
                                dataAux7['20 - 40 min'] +=1
                            }

                            else {
                                dataAux7['40 - 60 min'] += 1
                            }
                        }

                        else if (diffHrs === 1){
                            if (diffMins <= 20){
                                dataAux7['1 hora - 1 hora 20 min'] += 1
                            }
                            else if (diffMins > 20 && diffMins <= 40){
                                dataAux7['1 hora 20 min- 1 hora 40 min'] += 1
                            }

                            else {
                                dataAux7['1 hora 40 min - 2 horas'] += 1
                            }
                        }

                        else if (diffHrs === 2){
                            dataAux7['>= 2 horas'] += 1
                            
                        }

                        if (zone in dataAux8){
                            dataAux8[zone] += 1
                        }
                        else {
                            dataAux8[zone] = 1
                        }
                    }
                }

                var ordered = {};
                Object.keys(dataAux).sort(function(a, b) {
                    return moment(b, 'HH:mm:ss').toDate() - moment(a, 'HH:mm:ss').toDate();
                }).reverse().forEach(function(key) {
                    ordered[key] = dataAux[key];
                })
            }

            else {
                setHideCharts(false)
                for (var x of data) {
                    var date = new Date(x.date_closed);
                    var diners = x.diners
                    var payments = x.payments
                    var zone = x.zone
                    var dateClosed = new Date(x.date_closed);
                    var dateOpened = new Date(x.date_opened);
                    var diff2 = dateClosed - dateOpened
                    var diffHrs = Math.floor((diff2 % 86400000) / 3600000);
                    var diffMins = Math.round(((diff2 % 86400000) % 3600000) / 60000);

                    if (range.contains(date)){
                        var newdate = moment(date, "DD-MM-YYYY").format("DD-MM-YYYY")
                        var newdate2 = moment(date).format("dddd")
                        var newdate3 = moment(date).format("MMMM")
                        var newdate4 = moment(date).format("HH:00")

                        if (newdate in dataAux){
                            dataAux[newdate] += x.total
                        }
                        else {
                            dataAux[newdate] = x.total
                        }
                        if (newdate2 in dataAux2){
                            dataAux2[newdate2] += x.total
                            contAux2[newdate2] += 1
                        }
                        else {
                            dataAux2[newdate2] = x.total
                            contAux2[newdate2] = 1
                        }
                        if (newdate3 in dataAux3){
                            dataAux3[newdate3] += x.total
                            contAux3[newdate3] += 1
                        }
                        else {
                            dataAux3[newdate3] = x.total
                            contAux3[newdate3] = 1
                        }
                        if (newdate4 in dataAux4){
                            dataAux4[newdate4] += x.total
                            contAux4[newdate4] += 1
                        }
                        else {
                            dataAux4[newdate4] = x.total
                            contAux4[newdate4] = 1
                        }
                        if (diners in dataAux5){
                            dataAux5[diners] += 1
                        }
                        else {
                            dataAux5[diners] = 1
                        }
                        for (var p of payments){
                            var type = p.type
                            if (type in dataAux6){
                                dataAux6[type] += p.amount
                            }
                            else {
                                dataAux6[type] = p.amount
                            }
                        }
                        if (diffHrs === 0){
                            if (diffMins <= 20){
                                dataAux7['0 - 20 min'] += 1
                            }
                            else if (diffMins > 20 && diffMins <= 40){
                                dataAux7['20 - 40 min'] +=1
                            }

                            else {
                                dataAux7['40 - 60 min'] += 1
                            }
                        }

                        else if (diffHrs === 1){
                            if (diffMins <= 20){
                                dataAux7['1 hora - 1 hora 20 min'] += 1
                            }
                            else if (diffMins > 20 && diffMins <= 40){
                                dataAux7['1 hora 20 min- 1 hora 40 min'] += 1
                            }

                            else {
                                dataAux7['1 hora 40 min - 2 horas'] += 1
                            }
                        }

                        else if (diffHrs === 2){
                            dataAux7['>= 2 horas'] += 1
                        }

                        if (zone in dataAux8){
                            dataAux8[zone] += 1
                        }
                        else {
                            dataAux8[zone] = 1
                        }
                        
                    }
                }

                var ordered = {};
                Object.keys(dataAux).sort(function(a, b) {
                    return moment(b, 'DD-MM-YYYY').toDate() - moment(a, 'DD-MM-YYYY').toDate();
                }).reverse().forEach(function(key) {
                    ordered[key] = dataAux[key];
                })
            }

            setLineChartDataIngresos(Object.values(ordered))
            setLineChartLabelsIngresos(Object.keys(ordered))

            setBarChartDataIngresosDia(Object.values(dataAux2))
            setBarChartLabelsIngresosDia(Object.keys(dataAux2))

            for (var y of Object.keys(dataAux2)) {
                dataAux2[y] = dataAux2[y]/contAux2[y]
            }

            setBarChartDataIngresosMesaPromDia(Object.values(dataAux2))
            setBarChartLabelsIngresosMesaPromDia(Object.keys(dataAux2))

            setBarChartDataIngresosMes(Object.values(dataAux3))
            setBarChartLabelsIngresosMes(Object.keys(dataAux3))

            for (var y of Object.keys(dataAux3)) {
                dataAux3[y] = dataAux3[y]/contAux3[y]
            }

            setBarChartDataIngresosMesaPromMes(Object.values(dataAux3))
            setBarChartLabelsIngresosMesaPromMes(Object.keys(dataAux3))

            setBarChartDataIngresosHora(Object.values(dataAux4))
            setBarChartLabelsIngresosHora(Object.keys(dataAux4))

            for (var y of Object.keys(dataAux4)) {
                dataAux4[y] = dataAux4[y]/contAux4[y]
            }

            setBarChartDataIngresosMesaPromHora(Object.values(dataAux4))
            setBarChartLabelsIngresosMesaPromHora(Object.keys(dataAux4))

            setPieChartDataDiners(Object.values(dataAux5))
            setPieChartLabelsDiners(Object.keys(dataAux5))

            setPieChartDataPayment(Object.values(dataAux6))
            setPieChartLabelsPayment(Object.keys(dataAux6))

            setPieChartDataDuration(Object.values(dataAux7))
            setPieChartLabelsDuration(Object.keys(dataAux7))

            setPieChartDataZone(Object.values(dataAux8))
            setPieChartLabelsZone(Object.keys(dataAux8))
        }
    }

    function getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    }

    return (
        <div>
            {   ready ?
                    <div >
                        <header>
                            <h1 className={classes.title} >Estadísticas Generales</h1>
                        </header>

                        <div className={classes.buttonContainer}>
                            Desde:
                            <MaterialUIPicker
                                handleChange = {setFilterStartDate}
                                value = {filterStartDate}
                                name = "lineChartStartDate"
                                minDate={new Date(firstDate)}
                                maxDate={new Date(lastDate)}  //maxDate
                            />
                            Hasta:
                            <MaterialUIPicker
                                handleChange = {setFilterFinishDate}
                                value = {filterFinishDate}
                                name = "lineChartFinishDate"
                                minDate={firstDate}
                                maxDate={lastDate}  //maxDate
                            />
                        </div>

                        <div className={classes.buttonContainer}>
                            <Button variant="contained" color="primary"  onClick={handleButtonClick} value="boton1">
                                Aplicar Filtro
                            </Button>
                        </div>

                        { hideCharts ?
                            <Container>
                                <Grid container spacing={4}>

                                    <Grid item xs={12}>
                                        <LineChart
                                            data={lineChartDataIngresos}
                                            labels={lineChartLabelsIngresos}
                                            titulo = 'INGRESOS TOTALES POR FECHA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            data={barChartDataIngresosHora}
                                            labels={barChartLabelsIngresosHora}
                                            titulo = 'INGRESOS TOTALES POR HORA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            data={barChartDataIngresosMesaPromHora}
                                            labels={barChartLabelsIngresosMesaPromHora}
                                            titulo = 'INGRESO PROMEDIO POR MESA POR HORA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataDuration}
                                            labels={pieChartLabelsDuration}
                                            titulo = 'DURACIÓN ATENCIÓN'
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataPayment}
                                            labels={pieChartLabelsPayment}
                                            titulo = 'MÉTODOS DE PAGO UTILIZADOS'
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataDiners}
                                            labels={pieChartLabelsDiners}
                                            titulo = 'INTEGRANTES POR MESA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataZone}
                                            labels={pieChartLabelsZone}
                                            titulo = 'ZONA UTILIZADA'
                                        />
                                    </Grid>
                                    
                                    
                                </Grid>  
                            </Container>:
                            <Container >
                                <Grid container spacing={4}>

                                    <Grid item xs={12}>
                                        <LineChart
                                            data={lineChartDataIngresos}
                                            labels={lineChartLabelsIngresos}
                                            titulo = 'INGRESOS TOTALES POR FECHA'
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            titulo = 'INGRESOS TOTALES POR MES'
                                            data={barChartDataIngresosMes}
                                            labels={barChartLabelsIngresosMes}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            data={barChartDataIngresosMesaPromMes}
                                            labels={barChartLabelsIngresosMesaPromMes}
                                            titulo = 'INGRESO PROMEDIO POR MESA POR MES'
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            data={barChartDataIngresosDia}
                                            labels={barChartLabelsIngresosDia}
                                            titulo = 'INGRESOS TOTALES POR DIA DE SEMANA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            data={barChartDataIngresosMesaPromDia}
                                            labels={barChartLabelsIngresosMesaPromDia}
                                            titulo = 'INGRESO PROMEDIO POR MESA POR DIA DE SEMANA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            data={barChartDataIngresosHora}
                                            labels={barChartLabelsIngresosHora}
                                            titulo = 'INGRESOS TOTALES POR HORA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <BarChart
                                            data={barChartDataIngresosMesaPromHora}
                                            labels={barChartLabelsIngresosMesaPromHora}
                                            titulo = 'INGRESO PROMEDIO POR MESA POR HORA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataDuration}
                                            labels={pieChartLabelsDuration}
                                            titulo = 'DURACIÓN ATENCIÓN'
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataPayment}
                                            labels={pieChartLabelsPayment}
                                            titulo = 'MÉTODOS DE PAGO UTILIZADOS'
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataDiners}
                                            labels={pieChartLabelsDiners}
                                            titulo = 'INTEGRANTES POR MESA'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <PieChart
                                            data={pieChartDataZone}
                                            labels={pieChartLabelsZone}
                                            titulo = 'ZONA UTILIZADA'
                                        />
                                    </Grid>

                                </Grid>

                            </Container>
                        
                        }

                    </div>:
                    <CircularProgress color="primary"/> 
            }
        </div>
    );
  }

export default DashboardGeneral;