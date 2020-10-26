import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({

  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: 25,
    marginLeft: 200
  },
}));

const Navbar = (props) => {

  const classes = useStyles();
  return (
    
      <AppBar >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            La Pikada De La Esquina
          </Typography>
        </Toolbar>
      </AppBar>
    
  );
}

export default Navbar;