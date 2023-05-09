import { ActionFromReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remarks as dataRemarks, students as dataStudents, testParts as dataTestParts } from '../initialData';
import { Remark } from "../models/Remark";
// import {TestPart} from '../models/TestPart';
import { SelecedRemark } from "../models/SelectedRemark";
import TestPart from "../models/TestPart";

export interface TestPartsSateIfc{
  testPartsData:TestPart[],
  isPrintMode:boolean
}

const testPartsSlice = createSlice({
    name: "testParts",
    initialState: <TestPartsSateIfc>{
      testPartsData:dataTestParts,
      isPrintMode:false
    },  
    reducers: {

      updateTestPart:(state,action:PayloadAction<TestPart>)=>{
          const testPartIndex = state.testPartsData.findIndex(tp=>tp.TestPartId===action.payload.TestPartId);
          state.testPartsData[testPartIndex]=action.payload;
      },
      updateTestParts:(state,action:PayloadAction<TestPart[]>)=>{
          state.testPartsData = action.payload;
      },
      setPoints:(state, action:PayloadAction<{testPart:number, points:number}>)=>{
       
        // console.log({state, action})
        // console.log({testParts:state.testPartsData});

        // const testPart = state.testPartsData.find(tp=>tp.TestPartId===action.payload.testPart);
        // if(tes)
        // testPart?.PointsToReduce =action.payload.points;
        // console.log({testPart});
      },
      reducePoints:(state, action:PayloadAction<{testPart:number, pointsToReduce:number}>)=>{
       
        // console.log({state, action})
        // console.log({testParts:state.testPartsData});

        const testPart = state.testPartsData.find(tp=>tp.TestPartId===action.payload.testPart);
        if(testPart){
          testPart.PointsToReduce =(testPart.PointsToReduce||0) +action.payload.pointsToReduce;
        }
        // // console.log({testPart});
      },
      updatePrintMode:(state, action:PayloadAction<boolean>)=>{
          state.isPrintMode = action.payload
      }
    }
});

export default testPartsSlice.reducer;
export const {reducePoints, setPoints,updateTestPart,updateTestParts,updatePrintMode } = testPartsSlice.actions;