import * as React from 'react';
import { useContext } from 'react';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import '../App.css'
import MeetingsForm from './MeetingsForm';
import { ColorContext } from '../clientScreen/color'
  ;


export default function SimplePaper(props) {
  const { id, name, description, price, duration, isAdmin } = {...props};
  const color = useContext(ColorContext).color;

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }} className={color} >


      <Paper elevation={3} className={color} ><div>

        <h2> {name} </h2>

        <h7 >{description}</h7>

        <h2> {price} $ </h2>


        <h2><AccessAlarmIcon style={{ marginTop: 3 }} /> {duration}</h2>
        
        {isAdmin ? <MeetingsForm serviceName={name} /> : ""}
      </div>
      </Paper>
    </Box>
  );
}