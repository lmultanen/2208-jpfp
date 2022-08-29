import axios from "axios";

const SET_SINGLE_STUDENT = 'SET_SINGLE_STUDENT';
const UNMOUNT_SINGLE_STUDENT = 'UNMOUNT_SINGLE_STUDENT';

//action creators
const _setSingleStudent = student => ({
    type: SET_SINGLE_STUDENT,
    student
})

const _unmountSingleStudent = student => ({
    type: UNMOUNT_SINGLE_STUDENT,
    student
})

//thunks
export const fetchSingleStudent = (id) => {
    return async (dispatch) => {
        console.log('logging before await')
        const {data: student} = await axios.get(`/api/students/${id}`);
        console.log('logging after await')
        dispatch(_setSingleStudent(student))
    }
}

export const unmountSingleStudent = () => {
    return dispatch => {
        dispatch(_unmountSingleStudent({}))
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case SET_SINGLE_STUDENT:
            return action.student;
        default:
            return state;
    }
}