import {useContext} from 'react';
import PaletteIcon from '@mui/icons-material/Palette';
import '../App.css';
import { ColorContext } from './color'


export default function ColorSiteIcon(props)
{
      
    const color = useContext(ColorContext)?.color;
    const setColor={...props};
   
    return(<>
    <button className={color} onClick={()=>{setColor(color==='light'?'dark':'light')}}>
        <PaletteIcon/>
    </button>
    </>
    )
}