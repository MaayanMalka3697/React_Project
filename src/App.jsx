import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import './App.css'
import AdminScreen from './adminScreen/adminscreen';
import DataTable from './adminScreen/meetingTable';
import MainScreen from './clientScreen/mainScreen';
import { Services } from './clientScreen/mainScreen';
import ColorTabs from './adminScreen/tabs';
import Color from './clientScreen/color';
import LoginSite from './adminScreen/loginSite';
import BussinessData from './clientScreen/bussinessdata';
import FormDialog from './clientScreen/FormDialog';
import Bussiness from './dataStore/bussinessData'
import DataServices from './dataStore/dataServices'


ReactDOM.render(
  <Color>
    <App />
  </Color>,
  document.getElementById('root')
)

function App() {
 

  return (<div style ={{ margintop: '150px' }}>
   
      <BrowserRouter>
        <Routes>
     
          {/* <Route path="/" element={<> <LoginSite /></>} /> */}
         <Route path="/" element={ < MainScreen />} /> 
         
          <Route path="/admin" element={<><BussinessData/> <FormDialog /></>} />
          <Route path="/admin/meetingTable" element={<> <AdminScreen /><br /><ColorTabs /> <DataTable /></>} />
          <Route path="/admin/services" element={<> <AdminScreen /> <Grid container spacing={3}><ColorTabs /><Services /></Grid> </>} />

        </Routes>
      </BrowserRouter>
 

  </div>)}

export default App;

