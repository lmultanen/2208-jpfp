import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../store/studentsReducer";
import { Link } from "react-router-dom";

const Students = () => {
    const dispatch = useDispatch()
    const students = useSelector(state => state.students)

    React.useEffect(() => {
        dispatch(fetchStudents())
    },[])

    //may want to look into how to sort alphabetically
    return(
        <div id='student-list'>
            <h2>Students:</h2>
            {students.map((student,idx) => {
                return(
                <div className="student" key={idx}>
                    <Link to={`/students/${student.id}`}>
                        <div className="student-name">
                            {student.lastName + ', ' + student.firstName}
                        </div>             
                    </Link>
                </div>
                )
            })}
        </div>
    )
}

export default Students;