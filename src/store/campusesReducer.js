import axios from "axios";
import { updateSingleCampus } from "./singleCampusReducer";

const SET_CAMPUSES = 'SET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const SORT_BY_STUDENTS = 'SORT_BY_STUDENTS';

//action creators
const _setCampuses = (campuses) => ({
    type: SET_CAMPUSES,
    campuses
})
const _createCampus = (campus) => ({
    type: CREATE_CAMPUS,
    campus
})
const _deleteCampus = (campus) => ({
    type: DELETE_CAMPUS,
    campus
})
const _updateCampus = (campus) => ({
    type: UPDATE_CAMPUS,
    campus
})
const _sortByStudents = (campuses, descending) => ({
    type: SORT_BY_STUDENTS,
    campuses,
    descending
})

//thunks
export const fetchCampuses = () => {
    return async (dispatch) => {
        const {data: campuses} = await axios.get('/api/campuses')
        dispatch(_setCampuses(campuses))
    }
}
export const createCampus = (campus) => {
    return async (dispatch) => {
        const {data: newCampus} = await axios.post('/api/campuses', campus)
        dispatch(_createCampus(newCampus))
    }
}
export const deleteCampus = (id) => {
    return async (dispatch) => {
        const {data: campus} = await axios.delete(`/api/campuses/${id}`)
        dispatch(_deleteCampus(campus))
    }
}
export const updateCampus = (campus) => {
    return async (dispatch) => {
        const {data: updated} = await axios.put(`/api/campuses/${campus.id}`,campus);
        dispatch(_updateCampus(updated))
        dispatch(updateSingleCampus(updated))
    }
}
export const sortByStudents = (campuses, descending) => {
    return (dispatch) => {
        dispatch(_sortByStudents(campuses,descending))
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case SET_CAMPUSES:
            return action.campuses;
        case CREATE_CAMPUS:
            return [...state, action.campus]
        case DELETE_CAMPUS:
            return state.filter(campus => campus.id !== action.campus.id)
        case UPDATE_CAMPUS:
            return state.map(campus => campus.id === action.campus.id ? action.campus : campus)
        case SORT_BY_STUDENTS:
            let sorted = [...action.campuses]
            action.descending ?
                sorted = sorted.sort((campusA,campusB) => campusB.students.length - campusA.students.length)
                : sorted = sorted.sort((campusA,campusB) => campusA.students.length - campusB.students.length)
            return sorted;
        default:
            return state;
    }
}