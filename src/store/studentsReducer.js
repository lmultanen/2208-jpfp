import axios from "axios";

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

//action creators
const _setStudents = (students) => ({
    type: SET_STUDENTS,
    students
})
const _createStudent = (student) => ({
    type: CREATE_STUDENT,
    student
})

//thunks
export const fetchStudents = () => {
    return async (dispatch) => {
        const {data: students} = await axios.get('/api/students')
        dispatch(_setStudents(students))
    }
}
export const createStudent = (student) => {
    return async (dispatch) => {
        const {data: newStudent} = await axios.post('/api/students', student)
        dispatch(_createStudent(newStudent));
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return action.students;
        case CREATE_STUDENT:
            return [...state, action.student]
        default:
            return state
    }
}