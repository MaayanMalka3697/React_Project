import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'

import store from '../dataStore/appointment';
import DateAndTimePicker from './dateTimePicker';
import '../App.css';
import { ColorContext } from './color'
import { Accessible } from '@mui/icons-material';


const MeetingsForm = observer((props) => {

  // store.getMeetings;
  const color= useContext(ColorContext)?.color;
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const  [Name,setServiceName]  = useState(props.serviceName);// .serviceName;
  const [isOk, setIsOk] = useState(true);
  const [objAppointment, setObjAppointment] = useState({
    serviceType: Name==="Enter A New Service" ? "" :Name,
    dateTime: date,
    clientName: "",
    clientPhone: 0,
    clientEmail: ""
  })
console.log("serviceName",Name);

  useEffect(() => {
    setIsOk(isOk)
  }, [])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleOK() {

    if (isOk == true) {

      const result = await store.CheckTheDate(objAppointment)
      if (result == 400) {

        handleClose();

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The date is busy, try another date",
        });

      } else if (result == 200) {

        handleClose();
        Swal.fire("The appointment was successfully set 😊");

      }
    }
    else if (!isOk) {

      handleClose();
      await Swal.fire("Incorrect details have been entered 😏");
      handleClickOpen();
    }


  }

  function handleChange(place, value) {

    (place === "clientName") ? validationUserName(value) : (place === "clientPhone") ? validationPhone(value) : ""

    var {...obj} = {...objAppointment};
    console.log( "obj",obj);
    obj[place] = value;
    setObjAppointment(obj);
  }


  function validationUserName(username) {
    for (let i = 0; i < username.length; i++) {
    
        if (username[i] < "a" || username[i] > "z") {      
           setIsOk(false);
           return false;
      }
    }
     setIsOk(true);
      return true;
  }

  
  function validationPhone(phone) {
    if (phone.length != 10) {
    
        setIsOk(false);
        return false;
    }
    setIsOk(true);
    return true;
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}  className={color} >
        Set A meeting...!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
             Object.fromEntries(formData.entries());
      
          },
        }} className={color}
      >
        <DialogTitle>Create A meeting...!</DialogTitle>
        <DialogContent >

          <TextField required id="clientName" color='secondary' autoComplete='none' margin="dense" onChange={(e) => handleChange("clientName", e.target.value)} label="Enter your name" variant="outlined"  />
          <br />
          <TextField required id="clientEmail" color='secondary' autoComplete='none' type='email' margin="dense" onChange={(e) => handleChange("clientEmail", e.target.value)} label="Enter your email" variant="outlined"  />
          <br />
          <TextField required id="clientPhone" color='secondary' autoComplete='none' type='tel' margin="dense" onChange={(e) => handleChange("clientPhone", e.target.value)} label="Enter your phone" variant="outlined"  />
          <br />
          <DateAndTimePicker required id="dateTime" color='secondary' margin="dense" date={date} setDate={setDate} handleChange={handleChange} label="choose the date and the time" variant="outlined"  />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
})
export default MeetingsForm;













