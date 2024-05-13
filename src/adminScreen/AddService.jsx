import * as React from 'react';
import { useState, useContext } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2'

import '../App.css';
import Store from '../dataStore/dataServices';
import { ColorContext } from '../clientScreen/color'


export default function AddService() {

  const [open, setOpen] = React.useState(false);
  const color = useContext(ColorContext).color;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [serviceObj, setServiceObj] = useState({ name: "", description: "", price: 0, duration: 0 })

  function SaveChanges(place, value) {
    var temp = serviceObj;
    temp[place] = value;
    setServiceObj(temp)

  }
  async function Submit() {
    const res = await Store.addService(serviceObj);

    if (res.status == 400) {
      handleClose();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The service name already exists",

      });
    }
    else { Store.init() }
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} style={{ height: "50px", marginTop: "15%" }} className={color}>
        <AddIcon></AddIcon>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }} className={color}
      >
        <DialogTitle>ADD A NEW SERVICE</DialogTitle>
        <DialogContent>
          <TextField required margin="dense" label="Name" type="text" variant="outlined" autoFocus onBlur={(e) => SaveChanges("name", e.target.value)} className={color} /><br />
          <TextField required margin="dense" label="Description" type="text" variant="outlined" onBlur={(e) => SaveChanges("description", e.target.value)} className={color}></TextField><br />
          <TextField required margin="dense" label="Price" type="tel" variant="outlined" onBlur={(e) => SaveChanges("price", e.target.value)} className={color}></TextField><br />
          <TextField required margin="dense" label="Duration" type="tel" variant="outlined" onBlur={(e) => SaveChanges("duration", e.target.value)} className={color}></TextField><br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={color}>Cancel</Button>
          <Button type="submit" onClick={Submit} className={color}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}