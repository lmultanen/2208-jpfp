const SHOW_ALL = 'SHOW_ALL';
const SET_STUDENT_VISIBILITY_FILTER = 'SET_STUDENT_VISIBILITY_FILTER';

const _setStudentVisibilityFilter = (filter) => ({
    type: SET_STUDENT_VISIBILITY_FILTER,
    filter
})

export const setStudentVisibilityFilter = (filter) => {
    return (dispatch) => {
        dispatch(_setStudentVisibilityFilter(filter));
    }
}

export default (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_STUDENT_VISIBILITY_FILTER:
            console.log('in visibility reducer, action is', action.filter)
            return action.filter;
        default:
            return state;
    }
} 