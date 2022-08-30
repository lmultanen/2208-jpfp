import axios from "axios";

const SET_SINGLE_CAMPUS = 'SET_SINGLE_CAMPUS';
const UNMOUNT_SINGLE_CAMPUS = 'UNMOUNT_SINGLE_CAMPUS';
const UPDATE_SINGLE_CAMPUS = 'UPDATE_SINGLE_CAMPUS';
const UNENROLL_STUDENT_FROM_CAMPUS = 'UNENROLL_STUDENT_FROM_CAMPUS';

//action creators
const _setSingleCampus = (campus) => ({
    type: SET_SINGLE_CAMPUS,
    campus
})
const _unmountSingleCampus = (campus) => ({
    type: UNMOUNT_SINGLE_CAMPUS,
    campus
})
const _updateSingleCampus = (campus) => ({
    type: UPDATE_SINGLE_CAMPUS,
    campus
})
const _unenrollStudentFromCampus = (campus) => ({
    type: UNENROLL_STUDENT_FROM_CAMPUS,
    campus
})

//thunks
export const fetchSingleCampus = (id) => {
    return async (dispatch) => {
        const {data: campus} = await axios.get(`/api/campuses/${id}`);
        dispatch(_setSingleCampus(campus))
    }
}
export const unmountSingleCampus = () => {
    return dispatch => {
        dispatch(_unmountSingleCampus({}))
    }
}
export const updateSingleCampus = (campus) => {
    return (dispatch) => {
        dispatch(_updateSingleCampus(campus))
    }
}
export const unenrollStudentFromCampus = (studentId, campusId) => {
    return async (dispatch) => {
        const {data: campus} = await axios.put(`/api/campuses/${campusId}`, {studentId: studentId});
        dispatch(_unenrollStudentFromCampus(campus));
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case SET_SINGLE_CAMPUS:
            return action.campus;
        case UNMOUNT_SINGLE_CAMPUS:
            return action.campus;
        case UPDATE_SINGLE_CAMPUS:
            return action.campus;
        case UNENROLL_STUDENT_FROM_CAMPUS:
            return action.campus
        default:
            return state;
    }
}