import {createContext, useState} from 'react'
import ColorSiteIcon from './colorSiteIcon';


export const ColorContext = createContext('light');

export default ({ children }) => { 
    
  const [color, setColor] = useState('light')
 
  const siteColor={
    "color":color ,
    "setColor": setColor
  }

  return <ColorContext.Provider value={{...siteColor}} > 
  {children}
  <ColorSiteIcon setColor={siteColor.setColor}/>
  </ColorContext.Provider>
}