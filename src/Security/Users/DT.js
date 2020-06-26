import React from 'react';
import { MXGrid } from '../../../components';
import GridHOC from '../../../commons/HOCs/DataTable';
import { Account_service } from '../../../services/Security';

const DT = props => {
  const { Users, toggle, remove } = props;
  const Columns = [
    { dataField: 'FirstName', text: 'FirstName' },
    { dataField: 'LastName', text: 'LastName' },
    { dataField: 'UserName', text: 'UserName' },
    { dataField: 'Email', text: 'Email' },
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
      data={Users}
      columns={Columns}
    />
  );
};

export default GridHOC(DT, Account_service);