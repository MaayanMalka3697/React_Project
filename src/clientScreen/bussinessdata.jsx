import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { observer } from "mobx-react-lite";

import '../App.css';
import FormDialog from './FormDialog.jsx';
import Details from './details.jsx'
import store from '../dataStore/bussinessData.js'
import ColorSiteIcon from "./colorSiteIcon.jsx"
import { ColorContext } from './color'


const BussinessData = observer((props) => {
  const data = store.getData;
  const { isAdmin } = props;
  const color = useContext(ColorContext).color;

  const [ischecked, setIschecked] = useState(false)
  const nav = useNavigate();
  function handleClickLogOut() {
    nav('/');
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "whitesmoke", color: 'papayawhip', width: '100%' }} style={{ padding: 0, width: '100%' }} >
      <AppBar position="absolute" style={{ backgroundColor: "#c57db9" }} className={color} >
        <Toolbar className={color}>

          <br />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }} className={color}
          >
            <ColorSiteIcon />
          </IconButton>
          {!isAdmin ? <Button onClick={(() => setIschecked(!ischecked))} className={color}> 
            <EditIcon onClick={(() => setIschecked(true))} className={color} /> </Button> : ""}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }} className={color}>

            <Details {...data} ischecked={ischecked}  ></Details>


          </Typography>
          <Button color="inherit" style={{ padding: 0, marginTop: 0 }}>
            {isAdmin ? <FormDialog /> : ""}

            {!isAdmin ? <Button variant="outlined" onClick={(() => handleClickLogOut())} sx={{ marginRight: 0, left: 0, color: 'white', marginTop: 0 }}>
              <AccountCircleIcon sx={{ color: "white" }} /> log out
            </Button> : ""}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
})
export default BussinessData;