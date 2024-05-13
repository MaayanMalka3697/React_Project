import * as React from 'react';
import { useContext } from 'react'

import { DataGrid } from '@mui/x-data-grid';
import { observer } from "mobx-react-lite";

import '../App.css';
import { ColorContext } from '../clientScreen/color'
import store from '../dataStore/appointment'



const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'serviceType', headerName: 'serviceType', width: 170},
  { field: 'date', headerName: 'date', width: 180},
  {field: 'time',headerName:'Time', width: 100},
  { field: 'clientName',headerName: 'clientName',width:170, },
  { field: 'clientPhone', headerName: 'clientPhone', width: 170,
    valueGetter: (params) =>
      `${params.row.clientPhone || ''}`,},
  { field: 'clientEmail', headerName: 'clientEmail', width:170 },
  {field: 'Is Over', headerName:'Is Over', width:100,
  valueGetter: (params) =>
  `${params.row.IsOver || ''}`,},

];

 const DataTable = observer(() => {



const color = useContext(ColorContext).color;
const rowsData = (store.getMeetings).map(i => ({ ...i }));


  return (
    <div style={{ height: 400, width: 1200}}>
      <DataGrid
        rows= {rowsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
       className={color}
      />
    </div>
  );

})
export default DataTable;