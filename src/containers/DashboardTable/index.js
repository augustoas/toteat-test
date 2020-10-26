import React, {useState, useEffect} from 'react';
import axios from "axios";

//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';


//COMPONENTS
import TableProductos from './components/TableProductos'
import TableWorkers from './components/TableWorkers';

const Moment = require('moment');
const MomentRange = require('moment-range');

const useStyles = makeStyles((theme) => ({

    toolbar: theme.mixins.toolbar,
    title: {
        textAlign: 'center'
    },
}));

const DashboardTable = (index) => {

    const [data, setData] = useState([])
    const [ready, setReady] = useState(false)
    const [indexSideBar, setIndexSideBar] = useState(index)
    const [prodData, setProdData] = useState([])
    const [workerData, setWorkerData] = useState([])

    // FILTROS

    const classes = useStyles();

    useEffect(() => {

        var url = "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json"
        axios
            .get(url)
            .then(res => {
                setData(res.data)
                setReady(true)
                setIndexSideBar(index.index)
                
                //POBLAR TABLA PRODUCTOS
                const dataAux2 = {}
                const dataProdTable = []
                for (var x of res.data) {
                    var products = x.products
                    for (var p of products) {
                    
                        if (p.name in dataAux2) {
                            dataAux2[p.name] += p.quantity * p.price
                        }
                        else {
                            dataAux2[p.name] = p.quantity * p.price
                            const dataAux = {}
                            dataAux['name'] = p.name
                            dataAux['category'] = p.category
                            dataAux['price'] = p.price
                            dataProdTable.push(dataAux)
                        }
                    }
                }
                for (var obj of dataProdTable) {
                    obj['quantity'] = dataAux2[obj.name]/obj.price
                    obj['total'] = '$' + dataAux2[obj.name].toString().split(/(?=(?:...)*$)/).join('.')
                    obj['price'] = '$' + obj['price'].toString().split(/(?=(?:...)*$)/).join('.')
                }
                setProdData(dataProdTable)

                //POBLAR TABLA TRABAJADORES
                const dataCashiers = {}
                const countCashiersTables = {}
                const dataWaiters = {}
                const countWaitersTables = {}
                const dataWorkersTable = []
                for (var x of res.data) {
                    if (x.waiter in dataWaiters) {
                        dataWaiters[x.waiter] += x.total
                        countWaitersTables[x.waiter] += 1
                    }
                    else {
                        dataWaiters[x.waiter] = x.total
                        countWaitersTables[x.waiter] = 1
                        const dataAux = {}
                        dataAux['name'] = x.waiter
                        dataAux['category'] = 'Waiter'
                        dataWorkersTable.push(dataAux)
                    }
                    if (x.cashier in dataCashiers) {
                        dataCashiers[x.cashier] += x.total
                        countCashiersTables[x.cashier] += 1
                    }
                    else {
                        dataCashiers[x.cashier] = x.total
                        countCashiersTables[x.cashier] = 1
                        const dataAux = {}
                        dataAux['name'] = x.cashier
                        dataAux['category'] = 'Cashier'
                        dataWorkersTable.push(dataAux)
                    }
                }
                for (var obj of dataWorkersTable) {
                    if (obj.category === 'Waiter') {
                        obj['tables'] = countWaitersTables[obj.name]
                        obj['total'] = '$' + dataWaiters[obj.name].toString().split(/(?=(?:...)*$)/).join('.')
                    }
                    else {
                        obj['tables'] = countCashiersTables[obj.name]
                        obj['total'] = '$' + dataCashiers[obj.name].toString().split(/(?=(?:...)*$)/).join('.')
                    }
                }
                setWorkerData(dataWorkersTable);
            })
        
    },[index])

    return (
        <div>
            {   ready ?
                    <Container >
                        { indexSideBar === 1 ?
                            <div>
                                <header>
                                    <h1 className={classes.title}>Productos</h1>
                                </header>
                                <TableProductos className={classes.tableStyle} data = {prodData}/>
                            </div>:
                            <div>
                                <header>
                                    <h1 className={classes.title}>Trabajadores</h1>
                                </header>
                                <TableWorkers className={classes.tableStyle} data = {workerData}/>
                            </div>                        
                        }
                    </Container>:
                    <CircularProgress color="primary"/> 
            }
        </div>
    );
  }

export default DashboardTable;