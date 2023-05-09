import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestPart from "../../models/TestPart";
import { SelecedRemark } from "../../models/SelectedRemark";
import { SlidersContext, SlidersWrapper, TestPartStyle } from "./testPartsViewStyle";
import { updateTestPart } from "../../state/testParts.slice";


export const TestPartsView = () => {

    const testPartsData: TestPart[] = useSelector((state: any) => state.testParts.testPartsData);
    const selectedRemarks: SelecedRemark[] = useSelector((state: any) => state.remarks.selectedRemarks);

    const { isPrintMode } = useSelector((state: any) => state.testParts);

    const dispatch = useDispatch();

    const updateTeacherGrade = (testPart: TestPart, grade: number) => {

        // testPart.TeacherGrade = grade;
        dispatch(updateTestPart({ ...testPart, TeacherGrade: grade }));
    }

    // useEffect(() => {

    //     selectedRemarks.forEach(selectedRemark=>{

    //     })
    //     // selectedRemarks.filter(selectedRemark=>se)
    //     console.log("selected remarks changed");
    // }, [selectedRemarks])

    return <SlidersWrapper>

        {
            testPartsData.map(testPart =>

                <TestPartStyle key={testPart.TestPartId}>
                    <p>  {testPart.TestPartDsc}</p>
                    <p> ציון מחושב: {testPart.TestPartPoints - (testPart.PointsToReduce || 0)} </p>
                   
                    {isPrintMode && 
                       <p> ציון המורה: {testPart.TeacherGrade|| testPart.TestPartPoints} </p>
                    }
                   {!isPrintMode && <TextField
                        id="combo-box-demo"
                        label="ציון המורה"
                        type="number"
                        defaultValue={testPart.TestPartPoints}
                        InputProps={{ inputProps: { min: 0, max: testPart.TestPartPoints } }}
                        style={{ width: 100 }}
                        onChange={(event) => updateTeacherGrade(testPart, Number(event.target.value))}
                    />}

                </TestPartStyle>


                // <SlidersContext key={testPart.TestPartId}>

                //     <Grid container alignItems="center">
                //         <Grid item xs>
                //             <Typography gutterBottom variant="h4" component="div">
                //             {testPart.TestPartDsc}
                //             </Typography>
                //         </Grid>
                //         {/* <Grid item>
                //             <Typography gutterBottom variant="h6" component="div">
                //                 $4.50
                //             </Typography>
                //         </Grid> */}
                //     </Grid>
                //     <Typography color="text.secondary" variant="body2">
                //     ציון ממוחשב: {testPart.TestPartPoints - (testPart.PointsToReduce || 0)} 
                //     </Typography>
                //     <Typography color="text.secondary" variant="body2">
                //     <TextField
                //         id="combo-box-demo"
                //         label="ציון המורה"
                //         type="number"
                //         defaultValue={testPart.TestPartPoints}
                //         InputProps={{ inputProps: { min: 0, max: testPart.TestPartPoints } }}
                //         style={{ width: 100 }}
                //         onChange={(event)=>updateTeacherGrade(testPart, Number(event.target.value))}
                //     />
                //     </Typography>

                //     {/* {testPart.TestPartDsc}
                //     <br />
                //     {testPart.TestPartPoints - (testPart.PointsToReduce || 0)} ציון ממוחשב: */}
                // </SlidersContext>
            )
        }
    </SlidersWrapper>

};