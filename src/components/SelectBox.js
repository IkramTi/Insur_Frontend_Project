import React from 'react';
import Select from 'react-select';

const customSelect = {
  control: (base) => ({
    ...base,
    boxShadow: null,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.54)',
    borderRadius: 0,
    fontSize: '0.9rem',
  }),
};
const renderFieldSelect = (list = [], Libelle = 'Libelle', Id = 'Id') => ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
}) => (
    <div className="select-box-wrapper">
      <label htmlFor={label}>
        {label}
        <span className="text-errors">
          {' '}
          {touched && error && <span>({error})</span>}{' '}
        </span>
      </label>
      <Select
        invalid={error !== undefined && touched ? true : false}
        options={list}
        styles={customSelect}
        getOptionLabel={(e) => e[Libelle]}
        getOptionValue={(e) => e[Id]}
        onChange={(newValue) => {
          input.onChange(
            newValue !== undefined && newValue !== null ? newValue[Id] : null,
          );
        }}
        placeholder="Search..."
        value={
          list !== undefined ? list.filter((val) => val[Id] === input.value) : []
        }
        isClearable
        isSearchable
        isDisabled={custom.isDisabled}
        {...custom}
      />
    </div>
  );
export default renderFieldSelect;
