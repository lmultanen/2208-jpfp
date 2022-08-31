import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents, sortAlphabetically, sortByGpa } from "../store/studentsReducer";
import { Link } from "react-router-dom";
import NewStudentForm from "./NewStudentForm";

const AllStudents = () => {
    const dispatch = useDispatch()
    const students = useSelector(state => state.students)

    React.useEffect(() => {
        dispatch(fetchStudents())
    },[])

    const alphabetSortHandler = () => {
        dispatch(sortAlphabetically(students));
        // dispatch(fetchStudents());
    }

    const gpaSortHandler = () => {
        dispatch(sortByGpa(students));
        // dispatch(fetchStudents());
    }

    // sorting alphabetically works descending; may want to add functionality for other way?

    // can make a new component with handling ordering once functionality written
    // maybe can make these functions in the reducer; clicking on them will reorder the state
    // that way, don't need to make a duplicate here.

    //for filtering, may need to clone the students array and filter/sort on that
    //may want to look into how to sort alphabetically
    return( students.length ?
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
                <div>
                    Sort:
                    <button type='submit' onClick={alphabetSortHandler}>last name alphabetically</button>
                    <button type='submit' onClick={gpaSortHandler}>by gpa</button>
                </div>
            </div>
            <div id='student-form'>
                <NewStudentForm/>
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default AllStudents;