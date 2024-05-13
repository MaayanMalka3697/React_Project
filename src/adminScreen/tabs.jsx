import * as React from 'react';
import { useNavigate } from "react-router-dom";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import '../App.css';

export default function ColorTabs() {
  const [value, setValue] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const nav = useNavigate();


  return (
    <Box sx={{ width: '100%',paddingTop:"10%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="secondary tabs example"
       
      >
        <Tab value="one" onClick={()=>nav("/admin/meetingTable")}  label="MeetingTable" />
        <Tab value="two" onClick={()=>nav("/admin/services")}  label="Services" />
        
      </Tabs>
    </Box>
  );
}