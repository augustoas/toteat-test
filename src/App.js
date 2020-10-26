import React, {useState} from 'react';
import './App.css';
import DashboardGeneral from './containers/DashboardGeneral'
import DashboardTable from './containers/DashboardTable'
import Layout from './containers/Layout'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  toolbar: theme.mixins.toolbar,
  
  content: {
    flexGrow: 1,
    backgroundColor: 'primary',
  },
  gridItemStyle : {
    marginLeft: 240,
    
  },

}));

const App = () => {
  const [sideBarIndex, setSideBarIndex] = useState(0)
  const classes = useStyles();

  return (
    <div className="App">
      <Layout setIndex = {setSideBarIndex}/>
      <div className = {classes.content}>
        <div>
          <Grid item  sm = {12}   className={classes.gridItemStyle} >
            { sideBarIndex === 0 ?
              <DashboardGeneral index = {sideBarIndex}/>
              : sideBarIndex === 1 ?
              <DashboardTable index = {sideBarIndex}/>:
              <DashboardTable index = {sideBarIndex}/>
            }
          </Grid>   
        </div>
      </div>
    </div>
  );
}

export default App;
