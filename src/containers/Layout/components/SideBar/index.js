import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Drawer} from '@material-ui/core'
import Lists from '../Lists'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    sidebarPadd: {
        marginTop: theme.spacing(12)
    },

    root: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width:drawerWidth,
        backgroundColor: '#F3F4F6',
    },
}))

const SideBar = (props) => {

    const classes = useStyles();    
    return (
        <Drawer 
            className = {classes.drawer}
            variant = {props.variant}
            classes={{
                paper: classes.drawerPaper
            }}
            anchor = 'left'
            open ={props.open}
            onClose={props.onClose ? props.onClose : null}
        >
            <div className={classes.sidebarPadd}></div>
            <Lists setIndex = {props.setIndex}/>
        </Drawer>
    );
};


export default SideBar;