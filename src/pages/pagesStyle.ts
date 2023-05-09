import { Grid } from '@mui/material';
import styled from 'styled-components';

export const RootGrid  = styled(Grid)`
    flexGrow: 1
`

export const SelectPointsDiv = styled.div`
    width: "65%",
    height: "605px",
    backgroundColor: "#babad7",
    float: "right",
    padding: "36px",
    margin:"20px"
`

export const SelectedRemarksDiv = styled.div`
    float: "left",
    backgroundColor: "#92e4fb",
    width: "25%",
    height: "760px",
    padding: "3px",
    marginTop: "20px",
    overflow: "scroll",
    border: "3px solid #870b9f"
`