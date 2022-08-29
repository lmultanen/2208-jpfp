import axios from "axios";

const SET_SINGLE_CAMPUS = 'SET_SINGLE_CAMPUS';

//action creators
const _setSingleCampus = campus => ({
    type: SET_SINGLE_CAMPUS,
    campus
})

export const fetchSingleCampus = (id) => {
    return async (dispatch) => {
        const {data: campus} = await axios.get(`/api/campuses/${id}`);
        dispatch(_setSingleCampus(campus))
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case SET_SINGLE_CAMPUS:
            return action.campus;
        default:
            return state;
    }
}