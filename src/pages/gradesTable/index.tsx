import { TableBody, TableContainer } from "@mui/material";
import { useSelector } from "react-redux";
import TestPart from "../../models/TestPart";
import { CalculatedGradesRow } from "./CalculatedGradesRow";
import { GradesPercentsRow } from "./GradesPercentsRow";
import { GradesTableHeader } from "./GradesTableHeader";
import { GradesTableStyle, SlidersWrapper } from "./GradesTableStyle";
import { LevelsRow } from "./LevelsRow";
import { TeacherGradesRow } from "./TeacherGradesRow";


export const GradesTable = () => {

  const testPartsData: TestPart[] = useSelector((state: any) => state.testParts.testPartsData);
  const { isPrintMode } = useSelector((state: any) => state.testParts);

  return <SlidersWrapper>

    <TableContainer>
      <GradesTableStyle>
        <GradesTableHeader testPartsData={testPartsData} />
        <TableBody>

          {!isPrintMode &&
            <CalculatedGradesRow testPartsData={testPartsData} />
          }

          <TeacherGradesRow testPartsData={testPartsData} />

          {!isPrintMode &&
            <GradesPercentsRow testPartsData={testPartsData} />
          }

          <LevelsRow testPartsData={testPartsData} />


        </TableBody>
      </GradesTableStyle>
    </TableContainer>

    {/* <div>
      <br />
      ציון מאמר חלקי שתים: {finalTeacherGrade / 2}
    </div> */}
  </SlidersWrapper>

};