import React, { forwardRef, useState } from 'react';
import MaterialTable, { MTableBodyRow } from 'material-table';
import Typography from '@material-ui/core/Typography';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
  DetailPanel: forwardRef(() => <ChevronRight />),
  Filter: forwardRef(() => <FilterList />),
  FirstPage: forwardRef(() => <FirstPage />),
  LastPage: forwardRef(() => <LastPage />),
  NextPage: forwardRef(() => <ChevronRight />),
  PreviousPage: forwardRef(() => <ChevronLeft />),
  ResetSearch: forwardRef(() => <Clear />),
  Search: forwardRef(() => <Search />),
  SortArrow: forwardRef(() => <ArrowDownward />),
};

const columns = [

  {
    title: <Typography component="h6">Nombre Trabajador</Typography>,
    field: 'name',
    sorting: true,
    width: 20,
    filtering: false,
  },
  {
    title: <Typography component="h6">Categoría</Typography>,
    field: 'category',
    sorting: true,
    width: 20,
    lookup: { 'Waiter': 'Waiter', 'Cashier': 'Cashier' },
  },
  {
    title: <Typography component="h6">Mesas Atendidas</Typography>,
    field: 'tables',
    sorting: true,
    width: 20,
    filtering: false,
  },
  {
    title: <Typography component="h6">Cantidad Vendida</Typography>,
    field: 'total',
    sorting: true,
    width: 20,
    filtering: false,

  },
  
];

const TableWorkers = (props) => {
  const { data, handleClick } = props;

  return (
    <MaterialTable
      title={'Trabajadores'}
      icons={tableIcons}
      columns={columns}
      data={data}
      style={{ width: '100%', marginTop: '10px' }}
      onRowClick={(e, rowData) => handleClick(e, rowData.id)}
      options={{
        actionsColumnIndex: -1,
        filtering: true,
      }}

      localization={{
        pagination: {
          labelRowsSelect: 'Trabajadores',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
      
    />
  );
};

export default TableWorkers;