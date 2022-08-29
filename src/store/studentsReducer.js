import axios from "axios";
import { updateSingleStudent } from "./singleStudentReducer";

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

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
const _updateStudent = (student) => ({
    type: UPDATE_STUDENT,
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
export const updateStudent = (student, campus) => {
    return async (dispatch) => {
        const {data: updated} = await axios.put(`/api/students/${student.id}`, {
            student: student,
            campus: campus
        })
        dispatch(_updateStudent(updated))
        dispatch(updateSingleStudent(updated))
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
        case UPDATE_STUDENT:
            return state.map(student => student.id === action.student.id ? action.student : student)
        default:
            return state
    }
}