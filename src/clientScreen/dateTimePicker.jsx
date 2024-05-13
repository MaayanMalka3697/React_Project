import * as React from 'react';

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateAndTimePicker({date,setDate,handleChange}) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} sx={{ minWidth: 305 }}>
        <DateTimePicker 
          value={date}
          onChange={(newValue)=>{{setDate(newValue)};console.log("value: ",newValue)}}       
          defaultValue={dayjs('2024-04-09T00:00:00.000Z')}
          onClose={()=>handleChange("dateTime",date)}
          
        />
  
      </Stack>
    </LocalizationProvider>
  );
}