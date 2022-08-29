import axios from "axios";

const SET_SINGLE_STUDENT = 'SET_SINGLE_STUDENT';
const UNMOUNT_SINGLE_STUDENT = 'UNMOUNT_SINGLE_STUDENT';
const UPDATE_SINGLE_STUDENT = 'UPDATE_SINGLE_STUDENT';

//action creators
const _setSingleStudent = (student) => ({
    type: SET_SINGLE_STUDENT,
    student
})
const _unmountSingleStudent = (student) => ({
    type: UNMOUNT_SINGLE_STUDENT,
    student
})
const _updateSingleStudent = (student) => ({
    type: UPDATE_SINGLE_STUDENT,
    student
})

//thunks
export const fetchSingleStudent = (id) => {
    return async (dispatch) => {
        const {data: student} = await axios.get(`/api/students/${id}`);
        dispatch(_setSingleStudent(student))
    }
}
export const unmountSingleStudent = () => {
    return dispatch => {
        dispatch(_unmountSingleStudent({}))
    }
}
export const updateSingleStudent = (student) => {
    return (dispatch) => {
        // const {data: updated} = await axios.put(`/api/students/${student.id}`)
        dispatch(_updateSingleStudent(student))
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case SET_SINGLE_STUDENT:
            return action.student;
        case UNMOUNT_SINGLE_STUDENT:
            return action.student;
        case UPDATE_SINGLE_STUDENT:
            return action.student;
        default:
            return state;
    }
}