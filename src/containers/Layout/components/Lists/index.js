import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    
} from '@material-ui/core'

import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import FastfoodSharpIcon from '@material-ui/icons/FastfoodSharp';

const Lists = (props) => {

    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        props.setIndex(index)
    };

    return (
        <div>
            <List component='nav'>

                <ListItem 
                    button 
                    selected={selectedIndex === 0} 
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <TimelineSharpIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Estadísticas Generales
                    </ListItemText>
                </ListItem>

                    
                <ListItem 
                    button 
                    selected={selectedIndex === 1} 
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <FastfoodSharpIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Productos
                    </ListItemText>
                </ListItem>

                <ListItem 
                    button 
                    selected={selectedIndex === 2} 
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon>
                        <GroupSharpIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Trabajadores
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    )
}

export default Lists
