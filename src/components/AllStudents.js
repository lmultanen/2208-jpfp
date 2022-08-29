import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "../store/studentsReducer";
import { Link } from "react-router-dom";
import NewStudentForm from "./NewStudentForm";

const AllStudents = () => {
    const dispatch = useDispatch()
    const students = useSelector(state => state.students)

    React.useEffect(() => {
        dispatch(fetchStudents())
    },[])

    //may want to look into how to sort alphabetically
    return(
        <div id='list-form-container'>
            <div id='student-list'>
                <h2>Students:</h2>
                {students.map((student,idx) => {
                    return(
                    <div className="student" key={idx}>
                        <span>
                            <Link to={`/students/${student.id}`}>
                                    {student.lastName + ', ' + student.firstName}             
                            </Link>
                        
                            <button className="delete" onClick={() => dispatch(deleteStudent(student.id))}>X</button>
                        </span>
                    </div>
                    )
                })}
            </div>
            <div id='student-form'>
                <NewStudentForm/>
            </div>
        </div>
    )
}

export default AllStudents;