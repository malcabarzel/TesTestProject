import { useEffect } from 'react';
// import './App.css';
import SelectRemark from './pages/selectRemark/selectRemark';
import SelectTest from './pages/selectTest/selectTest';
import SelectedRemarksList from './pages/selectedRemarksList/selectedRemarksList';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { StyledEngineProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Directions from './helpers/Directions';
import { students as dataStudents, testParts as dataTestParts } from './initialData';
import { Student } from './models/Student';
import TestPart from './models/TestPart';
import { GradesTable } from './pages/gradesTable';
import { SelectedRemarksDiv } from './pages/pagesStyle';
import { updatePrintMode } from './state/testParts.slice';

export const App = () => {
  const [students, setStudents] = useState<Student[]>([]);
  // const [remarks, setRemarks] = useState<Remark[]>([]);
  const [testParts, setTestParts] = useState<TestPart[]>([]);

  const dispatch = useDispatch();

  const { isPrintMode } = useSelector((state: any) => state.testParts);

  const changePrintMode = (event: any) => {
    dispatch(updatePrintMode(event.target.checked));
  }

  useEffect(() => {
    // setRemarks(dataRemarks);
    setStudents(dataStudents);
    setTestParts(dataTestParts)
  }, [])

  return (

    <StyledEngineProvider>
      <Directions>


        <Box style={{ padding: '10px' }} sx={{ flexGrow: 1, maxWidth: 7520 }}>
          <Switch onChange={changePrintMode}
            inputProps={{ 'aria-label': 'controlled' }}></Switch>
          <Container fixed style={{ padding: "20px" }}>

            <SelectTest students={students} />

          </Container>
         

          
         
          {/* <Grades></Grades> */}
          <Container fixed style={{ padding: "20px" }}>
            {!isPrintMode && <>
              <SelectRemark testParts={testParts} />
            </>
            }
          </Container>
          <SelectedRemarksDiv>
            <SelectedRemarksList></SelectedRemarksList>
          </SelectedRemarksDiv>
          <GradesTable></GradesTable>
          {/* <SelectPointsDiv>
         <SelectPoints type={1} partName1={"d"}>  </SelectPoints>  
      </SelectPointsDiv> */}
        </Box>
      </Directions>
    </StyledEngineProvider>
  );
}

// export default App;
