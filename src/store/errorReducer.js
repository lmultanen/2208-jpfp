const SET_ERROR = 'SET_ERROR';

const _setError = (error) => ({
    type: SET_ERROR,
    error
})

export const setError = () => {
    return (dispatch) => {
        dispatch(_setError(true));
    }
}
export const clearError = () => {
    return (dispatch) => {
        dispatch(_setError(false));
    }
}

export default (state = false, action) => {
    switch (action.type) {
        case SET_ERROR:
            return action.error
        default:
            return state;
    }
}