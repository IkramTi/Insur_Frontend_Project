import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <div>
      <TextField
        //variant="outlined"
        margin="normal"
        fullWidth
        error={touched && error}
        label={label}
        id={input.name}
        helperText={touched && (error && "Obligatoire")}
        {...input}
        {...custom}
      />
    </div>
  );

export default renderTextField;
