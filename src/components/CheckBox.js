import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const renderChackboxField = ({ input, label, className }) => (
  <FormControlLabel
    className={className}
    control={
      <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        color="primary"
      />
    }
    label={label}
  />
)

export default renderChackboxField;
