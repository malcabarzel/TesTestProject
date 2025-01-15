import { TableCell, TableRow, TextField, TextareaAutosize } from "@mui/material"
import TestPart from "../../models/TestPart"
//import { finalGradeLevels } from "../../initialData"

export const LevelsRow = ({ testPartsData }: { testPartsData: TestPart[] }) => {

  return <TableRow>
    <TableCell style={{ fontWeight: "900", textAlign: "center" }}>
      רמה
    </TableCell>
    {testPartsData.map(testPart =>
      <TableCell>

        {testPart.LevelsDsc?.map(dsc =>
          <p>{dsc}</p>
        )}

      </TableCell>

    )}
    <TableCell >

    </TableCell>
    <TableCell>
{/*       {finalGradeLevels.map(dsc =>
        <p>{dsc}</p>
      )} */}
    </TableCell>
  </TableRow>

}
