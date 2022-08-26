import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../store/studentsReducer";

const Students = () => {
    const dispatch = useDispatch()
    const students = useSelector(state => state.students)

    React.useEffect(() => {
        dispatch(fetchStudents())
    },[])

    return(
        <div id='student-list'>
            <h2>Students:</h2>
            {students.map((student,idx) => {
                return(
                    <div className="student" key={idx}>
                        <div className="student-name">
                            {student.lastName + ', ' + student.firstName}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Students;