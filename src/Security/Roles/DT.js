import React from 'react';
import { MXGrid } from '../../../components';
import GridHOC from '../../../commons/HOCs/DataTable';
import { Role_service } from '../../../services/Security';

const DT = props => {
  const { Roles, toggle, remove } = props;
  const Columns = [
    { dataField: 'Code', text: 'Code' },
    { dataField: 'Name', text: 'Name' },
    { dataField: 'Description', text: 'Description' },
    {
      dataField: '', text: 'Actions', headerStyle: { width: '5rem' }, formatter: (cell, row) => {
        return (
          <div className="actions">
            {/* <i className="fa fa-eye blue"/> */}
            <i className="fa fa-pencil orange" onClick={e => toggle(e, row, true)} />
            <i className="fa fa-trash red" onClick={() => remove(row)} />
          </div>
        );
      }
    }
  ];
  return (
    <MXGrid
      data={Roles}
      columns={Columns}
    />
  );
};

export default GridHOC(DT, Role_service);