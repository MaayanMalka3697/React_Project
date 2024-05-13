import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from 'sweetalert2'

import '../App.css';
import store from "../dataStore/logIn"
import { ColorContext } from '../clientScreen/color'


export default function FormDialog() {
  
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const color = useContext(ColorContext).color;

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  };

  const nav = useNavigate()

  async function handleOK() {

    const data = { "name": userName, "password": password }
    const res = await store.postLogin(data)
    if (res.status == 401) {

      handleClose()
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Admin login attempt failed",

      });
      handleClickOpen()
    }

    else if (res.status == 200) {
      handleClose();
      nav('/admin/meetingTable');

    }

  }

  function handleChange(event) {
    if (event.id == "userName") {
      setUserName(event.value);
    }
    else {
      setPassword(event.value);
    }
  }
  return (
    <React.Fragment >
      <Button variant="outlined" onClick={handleClickOpen} sx={{ marginRight: 0, left: 0, color: 'white', marginTop: 0 }} className={color}>
        <AccountCircleIcon sx={{ color: "white" }} className={color} /> log in

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
        }}
      >
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField color='secondary' id="userName" margin="dense" onChange={(event) => handleChange(event.target)} label="Enter your user name" variant="outlined" required value={userName} />
            <br />
            <TextField color='secondary' type='password' id="password" margin="dense" onChange={(event) => handleChange(event.target)} label="Enter your password" variant="outlined" required value={password} />
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
