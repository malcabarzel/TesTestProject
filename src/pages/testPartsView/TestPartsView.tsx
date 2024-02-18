import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestPart from "../../models/TestPart";
import { SelecedRemark } from "../../models/SelectedRemark";
import { GradesTable, SlidersContext, SlidersWrapper, TestPartStyle } from "./testPartsViewStyle";
import { updateTestPart } from "../../state/testParts.slice";
import { BoldTableCell } from "../pagesStyle";


export const TestPartsView = () => {

  const testPartsData: TestPart[] = useSelector((state: any) => state.testParts.testPartsData);
  const selectedRemarks: SelecedRemark[] = useSelector((state: any) => state.remarks.selectedRemarks);

  const { isPrintMode } = useSelector((state: any) => state.testParts);

  const [finalGrade, setFinalGrade] = useState(0);

  const [finalTeacherGrade, setFinalTeacherGrade] = useState(0);

  useEffect(() => {

    const sumPoints: number = testPartsData.reduce((prev, tp) =>
      prev + tp.TestPartPoints - (tp.PointsToReduce || 0)
      , 0);

    setFinalGrade(sumPoints);

    const sumTeacherPoints: number = testPartsData.reduce((prev, tp) =>
      prev + (tp.TeacherGrade || tp.TestPartPoints)
      , 0);

    setFinalTeacherGrade(sumTeacherPoints);

  }, [testPartsData]);

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

    <TableContainer>
      <GradesTable>
        <TableHead>
          <TableRow>
            <TableCell>
            חישוב נק'
            </TableCell>
            {testPartsData.map(testPart =>
              <TableCell>
                {testPart.TestPartDsc}
              </TableCell>

            )}
            <TableCell>ס"ה %
              
            </TableCell>
            <TableCell>
              ציון חלק ב
              <br />
              הבעה
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {testPartsData.map(testPart => */}
          <TableRow>
            <TableCell style={{ fontWeight: "900", textAlign: "center" }}>
              ציון מחושב
            </TableCell>
            {testPartsData.map(testPart =>
              <TableCell>
                {testPart.TestPartPoints - (testPart.PointsToReduce || 0)}
              </TableCell>

            )}
            <TableCell >
              {finalGrade}
            </TableCell>
            <TableCell>
              
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "900", textAlign: "center" }}>
              ציון המורה
            </TableCell>
            {testPartsData.map(testPart =>
              <TableCell>
                {isPrintMode &&
                  <p> {testPart.TeacherGrade || testPart.TestPartPoints} </p>
                }
                {!isPrintMode && <TextField
                  id="combo-box-demo"
                  type="number"
                  hidden={!isPrintMode}
                  defaultValue={testPart.TestPartPoints}
                  InputProps={{ inputProps: { min: 0, max: testPart.TestPartPoints } }}
                  style={{ width: 100 }}
                  onChange={(event) => updateTeacherGrade(testPart, Number(event.target.value))}
                />}

              </TableCell>

            )}
            <BoldTableCell style={{ fontWeight: "900" }}>
              {finalTeacherGrade}

            </BoldTableCell>
            <BoldTableCell style={{ fontWeight: "900" }}>
              {finalTeacherGrade / 2}

            </BoldTableCell>
          </TableRow>
          
          {/* )} */}
        </TableBody>
      </GradesTable>
    </TableContainer>

    {/* <div>
      <br />
      ציון מאמר חלקי שתים: {finalTeacherGrade / 2}
    </div> */}
  </SlidersWrapper>

};