import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import campusesReducer from "./campusesReducer";
import studentsReducer from "./studentsReducer";

const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer
})


function configureStore() {
    // return createStore(########, applyMiddleware(thunk));
    return createStore(reducer, applyMiddleware(thunk))
}

export default configureStore;