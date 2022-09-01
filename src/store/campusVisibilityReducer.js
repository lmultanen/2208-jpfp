const SHOW_ALL = 'SHOW_ALL';
const SET_CAMPUS_VISIBILITY_FILTER = 'SET_CAMPUS_VISIBILITY_FILTER';

const _setCampusVisibilityFilter = (filter) => ({
    type: SET_CAMPUS_VISIBILITY_FILTER,
    filter
})

export const setCampusVisibilityFilter = (filter) => {
    return (dispatch) => {
        dispatch(_setCampusVisibilityFilter(filter))
    }
}

export default (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_CAMPUS_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}