import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "../store/studentsReducer";
import { Link } from "react-router-dom";
import NewStudentForm from "./NewStudentForm";
import StudentFooter from "./StudentFooter";

const SHOW_REGISTERED = 'SHOW_REGISTERED';
const SHOW_UNREGISTERED = 'SHOW_UNREGISTERED';

const AllStudents = () => {
    const dispatch = useDispatch()
    const students = useSelector(state => state.students)
    const visibilityFilter = useSelector(state => state.studentVisibility)
    const [loaded, setLoaded] = useState(false)

    React.useEffect(() => {
        dispatch(fetchStudents())
        setLoaded(true)
    },[])

    return( students ?
        <div id='list-form-container'>
            <div>
                <h1>Current Students:</h1>
                    <ul id='student-list'>
                    {students.length ?
                        students.filter(student => {
                            switch (visibilityFilter) {
                                case SHOW_REGISTERED:
                                    return student.campus;
                                case SHOW_UNREGISTERED:
                                    return !student.campus;
                                default:
                                    return student;
                            }
                        })
                          .map((student,idx) => {
                            return(
                            <li className="student" key={idx}>
                                <div className="link-and-delete">
                                    <div>
                                        <Link to={`/students/${student.id}`}>
                                                {student.lastName + ', ' + student.firstName}             
                                        </Link>
                                        {student.campus ? <span className="attend-status">{' - attends ' + student.campus.name}</span> : <></>}
                                        <div className="GPA">{`GPA: (${student.gpa})`}</div>
                                    </div>
                                
                                    <button className="delete" onClick={() => dispatch(deleteStudent(student.id))}>X</button>
                                </div>
                            </li>
                            )
                        })
                        :
                        loaded ?
                        <div>No students to display</div> :
                        <div>Loading...</div>
                    }
                </ul>
                {students.length > 1 ?
                    <StudentFooter/> :
                    <></>}
            </div>
            <div id='student-form'>
                <NewStudentForm/>
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default AllStudents;