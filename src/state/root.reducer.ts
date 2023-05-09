import { combineReducers } from "redux";
import remarksDataReducer from './remarks.slice'
import testPartsReducer from './testParts.slice';

const rootReducer = combineReducers({
    remarks:remarksDataReducer, 
    testParts: testPartsReducer
});

export default rootReducer;