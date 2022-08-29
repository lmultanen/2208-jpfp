import axios from "axios";

const SET_CAMPUSES = 'SET_CAMPUSES';

//action creators
const _setCampuses = (campuses) => ({
    type: SET_CAMPUSES,
    campuses
})

//thunks
export const fetchCampuses = () => {
    return async (dispatch) => {
        const {data: campuses} = await axios.get('/api/campuses')
        dispatch(_setCampuses(campuses))
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case SET_CAMPUSES:
            return action.campuses;
        default:
            return state;
    }
}