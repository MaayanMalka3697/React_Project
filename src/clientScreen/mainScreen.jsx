import { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite";

import Grid from '@mui/material/Grid';

import '../App.css';
import SimplePaper from "./papper";
import BussinessData from "./bussinessdata"
import AddService from "../adminScreen/AddService";
import { ColorContext } from '../clientScreen/color'
import DataServices from '../dataStore/dataServices'
import { formToJSON } from "axios";
import Bussiness from "../dataStore/bussinessData";
import LoginSite from "../adminScreen/loginSite";


export default function MainScreen() {

  const color = useContext(ColorContext).color;

 const mylocalStorage= localStorage.getItem("exist");
  const [exist, setExist] = useState( mylocalStorage=="true" || mylocalStorage== true?true:mylocalStorage==null?false:false);

  useEffect(() => {
    console.log("DataServices.getUsed",DataServices.getUsed);
   
    if(DataServices.getUsed===true)
        { setExist(true)
          console.log("exist -change",exist)
          // localStorage.setItem("exist","true");
        } 
        console.log("mylocalStorage",mylocalStorage);
    }, [exist,DataServices.getUsed]);

  //  console.log("come into site...! ------------------------");


//  console.log(DataServices.getUsed);
//  console.log(Bussiness.getUsed);

return (<>
{console.log("exist",exist)}
  {exist===true ?
    <div>
      <BussinessData isAdmin={true}></BussinessData>

      <Grid container spacing={3} className={color}>
        <Services isAdmin={true} />
      </Grid>

    </div> : <LoginSite />}
</>
)
}

export const Services = observer((props) => {
  const data = DataServices.getAllService;
  console.log("dataaa", formToJSON(data));
  const newData = formToJSON(data);
  const isAdmin = props.isAdmin;
  const color = useContext(ColorContext).color;
  let id = 1;
  function getId() {
    return ++id;
  }
  // name={service.name}
  return (<>

    {data.map(service => <div key={getId()}>
      <SimplePaper id={id}  {...service} isAdmin={isAdmin}></SimplePaper></div>)}

    <br />
    {!isAdmin ? <AddService /> : ""}
  </>)

});
