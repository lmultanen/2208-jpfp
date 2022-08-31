import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents, sortAlphabetically, sortByGpa } from "../store/studentsReducer";
import { Link } from "react-router-dom";
import NewStudentForm from "./NewStudentForm";

const AllStudents = () => {
    const dispatch = useDispatch()
    const students = useSelector(state => state.students)

    //will pass these variables into reducer methods to determine whether to sort ascending or descending
    const [lastNameAToZ, setLastNameAToZ] = React.useState(true);
    const [gpaDescending, setGpaDescending] = React.useState(true)

    React.useEffect(() => {
        dispatch(fetchStudents())
    },[])

    const alphabetSortHandler = () => {
        dispatch(sortAlphabetically(students, lastNameAToZ));
        setLastNameAToZ(!lastNameAToZ);
        setGpaDescending(true);
    }

    const gpaSortHandler = () => {
        dispatch(sortByGpa(students, gpaDescending));
        setGpaDescending(!gpaDescending);
        setLastNameAToZ(true);
    }

    return( students ?
        <div id='list-form-container'>
            <div>
                <h1>Current Students:</h1>
                    <ul id='student-list'>
                    {students.map((student,idx) => {
                        return(
                        <li className="student" key={idx}>
                            <div className="link-and-delete">
                                <div>
                                    <Link to={`/students/${student.id}`}>
                                            {student.lastName + ', ' + student.firstName}             
                                    </Link>
                                    {student.campus ? <span className="attend-status">{' - attends ' + student.campus.name}</span> : <></>}
                                </div>
                            
                                <button className="delete" onClick={() => dispatch(deleteStudent(student.id))}>X</button>
                            </div>
                        </li>
                        )
                    })}
                </ul>

                {students.length > 1 ?
                    <div className="sort-div">
                        <span>Sort:</span>
                        <button type='submit' onClick={alphabetSortHandler}>by last name</button>
                        <button type='submit' onClick={gpaSortHandler}>by gpa</button>
                    </div>
                    : <></>
                }
            </div>
            <div id='student-form'>
                <NewStudentForm/>
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default AllStudents;