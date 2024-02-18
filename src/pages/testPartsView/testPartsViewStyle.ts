import { Table } from "@mui/material";
import styled from "styled-components";

export const SlidersWrapper = styled.div`
   display: inline-block;
 `

 export const TestPartStyle = styled.div`
    width: 150px;
    float: left;
 `

export const SlidersContext = styled.div`
    border: 3px solid black;
    min-height: 150px;
    min-width: 150px;
    display: inline-block;
    width: 47%;
 `

export const GradesTable = styled(Table)`
table: {
  minWidth: 650,
  "& .MuiTableCell-root": {
    border: '1px solid black'
  }
}
`;