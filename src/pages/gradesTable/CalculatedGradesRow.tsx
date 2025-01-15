import { TableCell, TableRow } from "@mui/material";
import TestPart from "../../models/TestPart";
import { useEffect, useState } from "react";

export const CalculatedGradesRow = ({ testPartsData }: { testPartsData: TestPart[] }) => {

  const [finalGrade, setFinalGrade] = useState(0);

  useEffect(() => {

    const sumPoints: number = testPartsData.reduce((prev, tp) =>
      prev + tp.TestPartPoints - (tp.PointsToReduce || 0)
      , 0);

    setFinalGrade(sumPoints);
  }, [testPartsData]);

  return <TableRow>
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
}