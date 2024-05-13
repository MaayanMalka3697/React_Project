import React from "react";
import { useEffect, useState, useContext } from "react"

import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import HomeIcon from '@mui/icons-material/Home';

import '../App.css';
import EditDetails from "../adminScreen/editDetails";
import { ColorContext } from './color'


const Details = React.memo(function Details(props) {

    const { ...data } = { ...props }
    const color = useContext(ColorContext).color;

    const [ischeck, setIschecked] = useState('')

    useEffect(() => {
        setIschecked(props.ischecked)
    }, [props.ischecked])


    return (<>
        {ischeck == false ?
            <div style={{ display: 'inline', marginTop: "0", width: "50%",fontFamily:{'Franklin Gothic Medium':'Arial Narrow' }}} className={color}>
                
                <div style={{ width: 100, height: 70,marginBottom:-75,fontFamily:{'Franklin Gothic Medium':'Arial Narrow' }}} className={color}>
                    <img src={data.logo} alt="logo" style={{ position: "static", width: 120, height: 100 }} />
                </div>

                <p style={{ fontSize: 30, margin: 0, marginTop: "0%" }} className={color}>{data.name}</p>
                <p className={color}>{data.description}</p>
                <p className={color}><HomeIcon />{data.address}</p>
                <h4 className={color}> <WifiCalling3Icon /> {data.phone} </h4>
                <h5 className={color}>  {data.owner}</h5>

            </div> :
            <>
                <EditDetails {...data} setIschecked={setIschecked} ischeck={ischeck}></EditDetails>

            </>
        }
    </>)
})
export default Details