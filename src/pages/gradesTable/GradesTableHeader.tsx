import { TableCell, TableHead, TableRow } from "@mui/material"
import TestPart from "../../models/TestPart"

export const GradesTableHeader = ({ testPartsData }: { testPartsData: TestPart[] }) => {


  return <TableHead>
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
}