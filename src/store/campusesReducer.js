import axios from "axios";

const SET_CAMPUSES = 'SET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS'

//action creators
const _setCampuses = (campuses) => ({
    type: SET_CAMPUSES,
    campuses
})
const _createCampus = (campus) => ({
    type: CREATE_CAMPUS,
    campus
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
        console.log('\nLOGGING CAMPUS BEFORE AXIOS POST\n', campus)
        const {data: newCampus} = await axios.post('/api/campuses', campus)
        dispatch(_createCampus(newCampus))
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case SET_CAMPUSES:
            return action.campuses;
        case CREATE_CAMPUS:
            return [...state, action.campus]
        default:
            return state;
    }
}