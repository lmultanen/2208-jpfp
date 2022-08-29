import axios from "axios";

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

//action creators
const _setStudents = (students) => ({
    type: SET_STUDENTS,
    students
})
const _createStudent = (student) => ({
    type: CREATE_STUDENT,
    student
})
const _deleteStudent = (student) => ({
    type: DELETE_STUDENT,
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
export const deleteStudent = (id) => {
    return async (dispatch) => {
        const {data: student} = await axios.delete(`/api/students/${id}`);
        dispatch(_deleteStudent(student))
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return action.students;
        case CREATE_STUDENT:
            return [...state, action.student]
        case DELETE_STUDENT:
            return state.filter(student => student.id !== action.student.id)
        default:
            return state
    }
}