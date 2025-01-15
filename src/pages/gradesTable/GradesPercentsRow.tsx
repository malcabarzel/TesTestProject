import { TableCell, TableRow, TextField } from "@mui/material";
import TestPart from "../../models/TestPart";
import { BoldTableCell } from "../pagesStyle";

export const GradesPercentsRow = ({ testPartsData }: { testPartsData: TestPart[] }) => {


  return <TableRow>
    <TableCell style={{ fontWeight: "900", textAlign: "center" }}>
      אחוז

    </TableCell>
    {testPartsData.map(testPart =>
      <TableCell>

        % {Math.ceil((testPart.TeacherGrade || testPart.TestPartPoints) / testPart.TestPartPoints * 100)}

      </TableCell>
    )}
    <BoldTableCell style={{ fontWeight: "900" }}>


    </BoldTableCell>
    <BoldTableCell style={{ fontWeight: "900" }}>


    </BoldTableCell>
  </TableRow>

}