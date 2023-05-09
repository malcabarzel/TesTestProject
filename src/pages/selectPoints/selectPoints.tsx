import { PropsWithChildren } from "react";
import { SelectPointsData } from "./SelectPointsData";
import TextField from '@mui/material/TextField';


function SelectPoints(props:PropsWithChildren<SelectPointsData>){
  return <>
  <p>{props.type}</p>
   <TextField
          id={props.type+""}
          label=""
          type="number"
          variant="outlined"
        />
</>
} 

export default SelectPoints