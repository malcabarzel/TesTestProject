import { ActionFromReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remarks as dataRemarks, students as dataStudents, testParts as dataTestParts } from '../initialData';
import { Remark } from "../models/Remark";
// import {TestPart} from '../models/testPart';
import { SelecedRemark } from "../models/SelectedRemark";


export interface RemarksStateIfc {
    remarksData: Remark[],
    selectedRemarks: SelecedRemark[],
    // testParts:TestPart[]
}

const remarksDataSlice = createSlice({
    name: "remarks",
    initialState: <RemarksStateIfc>{
        remarksData: dataRemarks,
        selectedRemarks: [],
        // testParts:dataTestParts
    },  
    reducers: {
        setRemarksData: (state, action: PayloadAction<Remark[]>) => {
            state.remarksData = action.payload;
        },
        addRemark: (state, action: PayloadAction<Remark>) => {
           
            console.log({state, action})
            console.log({selectedRemarks:state.selectedRemarks});
            
            const selectedRemarks = state.selectedRemarks;
            const remark = action.payload;
            const existsIndex = selectedRemarks.findIndex((r) => r.Remark.RemarkId === remark.RemarkId);

            if (existsIndex >= 0) {
                selectedRemarks[existsIndex].Sum++;
            }
            else {
                selectedRemarks.push({ Remark: remark, Sum: 1 });
            }
        },
        deleteRemark:(state, action:PayloadAction<string>)=>{
            const selectedRemarks = state.selectedRemarks;
            const remarkId = action.payload;
            const existsIndex = selectedRemarks.findIndex((r) => r.Remark.RemarkId === remarkId);
            if (existsIndex >= 0) {
                if (selectedRemarks[existsIndex].Sum > 1) {
                    selectedRemarks[existsIndex].Sum--;
                }
                else {
                    selectedRemarks.splice(existsIndex, 1);
                }
            }
        }
    }
});

export default remarksDataSlice.reducer;
export const { setRemarksData, addRemark , deleteRemark} = remarksDataSlice.actions;