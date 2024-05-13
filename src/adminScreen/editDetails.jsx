import { useContext } from "react"

import { Button, TextField } from "@mui/material"

import '../App.css'
import store from "../dataStore/bussinessData"
import { ColorContext } from '../clientScreen/color'

export default function EditDetails(props) {
    const { ...data } = props
    const color = useContext(ColorContext).color;

    function SaveDetails(place, value) {
        data[place] = value;
    }

    function SubmitDetails() {
        store.addData(data);
        props.setIschecked(!props.ischeck)

    }

    
    return (<div style={{ fontFamily: { 'Franklin Gothic Medium': 'Arial Narrow' } }}>
        <h2 className={color}>Edit the Details</h2>
        {/* {console.log(data)} */}
        <TextField margin="dense" variant="outlined" color="secondary" label={data.name} placeholder={data.name} onBlur={(e) => SaveDetails("name", e.target.value)} className={color}> </TextField>
        <TextField margin="dense" variant="outlined" color="secondary" label={data.address} placeholder={data.address} onBlur={(e) => SaveDetails("address", e.target.value)} className={color}></TextField>
        <TextField margin="dense" variant="outlined" color="secondary" label={data.phone} placeholder={data.phone} onBlur={(e) => SaveDetails("phone", e.target.value)} className={color}></TextField>
        <TextField margin="dense" variant="outlined" color="secondary" label={data.owner} placeholder={data.owner} onBlur={(e) => SaveDetails("owner", e.target.value)} className={color}></TextField>
        <TextField margin="dense" variant="outlined" color="secondary" label={data.description} placeholder={data.description} onBlur={(e) => SaveDetails("description", e.target.value)} className={color}></TextField>
        <div style={{ marginleft: 0, paddingleft: 0 }} className={color + "logo"}>
            <TextField margin="dense" variant="outlined" color="secondary" label={data.logo} placeholder={data.logo} onBlur={(e) => SaveDetails("logo", e.target.value)} className={color}></TextField></div>
        <Button onClick={() => SubmitDetails()} className={color}>Save Changes</Button>
    </div>)
}