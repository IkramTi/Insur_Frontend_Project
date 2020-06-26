import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import React from 'react';
import ToolkitProvider /*, { Search, CSVExport }*/ from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

// import MXHeaderNav from './MXHeaderNav';

// const { ExportCSVButton } = CSVExport;
// const { SearchBar } = Search;

const initColumns = [
  { dataField: 'id', text: 'Product ID' },
  { dataField: 'name', text: 'Product Name' },
];

const DataGrid = ({
  data,
  columns,
  selectRow,
  displayHeader = true,
  size,
  ...dataGridProps
}) => {
  const options = {
    hideSizePerPage: true, // Hide the sizePerPage dropdown always
    sizePerPage: size,
  };

  return (
    <ToolkitProvider
      keyField="id"
      data={data ? data : []}
      columns={columns.map((col) => {
        return { ...col, sort: true };
      })}
      exportCSV
      search
    >
      {(props) => (
        <React.Fragment>
          {/* {
              displayHeader &&
              <>
                <SearchBar {...props.searchProps} />
                <MXHeaderNav>
                  <ExportCSVButton className="btn-warning btn-square" {...props.csvProps}>
                    <i className="fa fa-download" /> Export CSV
                  </ExportCSVButton>
                </MXHeaderNav>
              </>
            } */}
          <BootstrapTable
            {...props.baseProps}
            classes="dashboard-table"
            sizePerPage={size}
            pagination={paginationFactory(options)}
            noDataIndication={'No Data'}
            hover
            condensed
            bordered={true}
            selectRow={selectRow}
            {...dataGridProps}
          />
        </React.Fragment>
      )}
    </ToolkitProvider>
  );
};

DataGrid.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  selectRow: PropTypes.object,
};

DataGrid.defaultProps = {
  data: [],
  columns: initColumns,
};

export default DataGrid;
