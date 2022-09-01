import {createStore, applyMiddleware, combineReducers} from "redux";
import loggingMiddleware from 'redux-logger'
import thunk from "redux-thunk";
import campusesReducer from "./campusesReducer";
import campusVisibilityReducer from "./campusVisibilityReducer";
import errorReducer from "./errorReducer";
import singleCampusReducer from "./singleCampusReducer";
import singleStudentReducer from "./singleStudentReducer";
import studentsReducer from "./studentsReducer";
import studentVisibilityReducer from "./studentVisibilityReducer";

const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer,
    singleCampus: singleCampusReducer,
    singleStudent: singleStudentReducer,
    error: errorReducer,
    studentVisibility: studentVisibilityReducer,
    campusVisibility: campusVisibilityReducer
})


function configureStore() {
    // return createStore(########, applyMiddleware(thunk));
    return createStore(reducer, applyMiddleware(thunk, loggingMiddleware))
}

export default configureStore;