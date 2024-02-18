import { TableCell, TableRow, TextField } from "@mui/material";
import TestPart from "../../models/TestPart";
import { useDispatch, useSelector } from "react-redux";
import { BoldTableCell } from "../pagesStyle";
import { useEffect, useState } from "react";
import { updateTestPart } from "../../state/testParts.slice";

export const TeacherGradesRow = ({ testPartsData }: { testPartsData: TestPart[] }) => {

  const dispatch = useDispatch();

  const { isPrintMode } = useSelector((state: any) => state.testParts);

  const [finalTeacherGrade, setFinalTeacherGrade] = useState(0);

  useEffect(() => {
    const sumTeacherPoints: number = testPartsData.reduce((prev, tp) =>
      prev + (tp.TeacherGrade || tp.TestPartPoints)
      , 0);

    setFinalTeacherGrade(sumTeacherPoints);

  }, [testPartsData]);

  const updateTeacherGrade = (testPart: TestPart, grade: number) => {
    dispatch(updateTestPart({ ...testPart, TeacherGrade: grade }));
  }

  return <TableRow>
    <TableCell style={{ fontWeight: "900", textAlign: "center" }}>
      ציון
      {!isPrintMode && " המורה" }
    </TableCell>
    {testPartsData.map(testPart =>
      <TableCell> 
        {!isPrintMode && <TextField
          id="combo-box-demo"
          type="number"
          hidden={!isPrintMode}
          defaultValue={testPart.TestPartPoints}
          InputProps={{ inputProps: { min: 0, max: testPart.TestPartPoints } }}
          style={{ width: 100 }}
          onChange={(event) => updateTeacherGrade(testPart, Number(event.target.value))}
        />}
        {isPrintMode &&
          <>{testPart.TeacherGrade || testPart.TestPartPoints} </>
        }
      <br/> 
  מתוך  {testPart.TestPartPoints}
      </TableCell>

    )}
    <BoldTableCell style={{ fontWeight: "900" }}>
      {finalTeacherGrade}

    </BoldTableCell>
    <BoldTableCell style={{ fontWeight: "900" }}>
      {finalTeacherGrade / 2}

    </BoldTableCell>
  </TableRow>

}