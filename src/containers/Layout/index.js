import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

const useStyles = makeStyles((theme) => ({
    //Styles
    toolbar: theme.mixins.toolbar,
  
    root: {
      display: 'flex',
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
}));

const Layout = ({setIndex}) => {

    const classes = useStyles();
    
    return (
      <>
        <div className={classes.root}>
          <SideBar
            variant="permanent"
            open={true}
            setIndex = {setIndex}
          />
          <Navbar/>

          <div className = {classes.content}>
            <div className={classes.toolbar}></div>
          </div>

        </div>
      </>
    );
  }

export default Layout;