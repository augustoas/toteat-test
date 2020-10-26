import 'date-fns';
import React from 'react';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    date:{
        marginLeft:4,
        length:'3ch',
        width:'16ch',
        verticalAlign: 'baseline'
      },
      
  }));

const MaterialUIPickers = (props) => {
  // The first commit of Material-UI
  const {value, handleChange} = props
  const classes = useStyles();
  //const minDate = new Date(new Date().getTime() + 86400000);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          className = {classes.date}
          disableToolbar
          variant="inline"
          format="DD-MM-YYYY"
          margin="normal"
          id="date-picker-inline"
          value={value}
          onChange={e => handleChange(e.format())}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          minDate = {props.minDate}
          maxDate = {props.maxDate}
        />
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPickers;