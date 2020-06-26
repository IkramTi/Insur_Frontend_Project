import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export const renderDatePickerField = ({
    input,
    label,
    id,
    format = "dd/MM/yyyy",
    disableToolbar = true,
    defaultValue,
    ...props 
  }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar={disableToolbar}
      variant="inline"
      format={format}
      margin="normal"
      id={id}
      label={label}
      value={input.value || defaultValue || null}
      onChange={input.onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      {...props}
    />
  </MuiPickersUtilsProvider>
)

export default renderDatePickerField;