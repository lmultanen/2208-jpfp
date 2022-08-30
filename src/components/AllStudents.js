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

    //for filtering, may need to clone the students array and filter/sort on that
    //may want to look into how to sort alphabetically
    return( students.length ?
        <div id='list-form-container'>
            <div id='student-list'>
                <h1>Current Students:</h1>
                {students.map((student,idx) => {
                    return(
                    <div className="student" key={idx}>
                        <div className="link-and-delete">
                            <div>
                                <Link to={`/students/${student.id}`}>
                                        {student.lastName + ', ' + student.firstName}             
                                </Link>
                                {student.campus ? <span className="attend-status">{' - attends ' + student.campus.name}</span> : <></>}
                            </div>
                        
                            <button className="delete" onClick={() => dispatch(deleteStudent(student.id))}>X</button>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div id='student-form'>
                <NewStudentForm/>
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default AllStudents;