import {createStore, applyMiddleware, combineReducers} from "redux";
import loggingMiddleware from 'redux-logger'
import thunk from "redux-thunk";
import campusesReducer from "./campusesReducer";
import singleCampusReducer from "./singleCampusReducer";
import singleStudentReducer from "./singleStudentReducer";
import studentsReducer from "./studentsReducer";

const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer,
    singleCampus: singleCampusReducer,
    singleStudent: singleStudentReducer,
})


function configureStore() {
    // return createStore(########, applyMiddleware(thunk));
    return createStore(reducer, applyMiddleware(thunk, loggingMiddleware))
}

export default configureStore;