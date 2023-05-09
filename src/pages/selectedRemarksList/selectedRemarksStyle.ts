import { List } from "@mui/material";
import styled from "styled-components";

export const RemarksList = styled.div`
    width: 40%;
    min-width:800px;
    float: right;
    direction: rtl;

    li:nth-child(odd){
        border: 1px solid black;
        border-width: 1px 0px;
    }

    li{
        padding: 0px 16px 0px 48px;
    }
 `

 export const RemarkContect = styled.div`
    color: black;
    font-size: 15px;
 `