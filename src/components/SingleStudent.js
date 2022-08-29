import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleStudent, unmountSingleStudent } from "../store/singleStudentReducer";

const SingleStudent = () => {
    const dispatch = useDispatch();
    const student = useSelector(state => state.singleStudent)
    const params = useParams()

    React.useEffect(() => {
        console.log('logging before trying to fetch')
        dispatch(fetchSingleStudent(params.id))
        return () => {
            dispatch(unmountSingleStudent())
        }
    },[])

    // checking for firstName to exist so that not displaying 'undefined' while loading
    // also prevents undefined fields if student doesn't exist; will handle that case later
    return( student.firstName ?
        <div id='single-student'>
            <h2>{student.firstName + ' ' + student.lastName}</h2>
            <img src={student.imageUrl} height='200px' width='200px'/>
            <div>{'Email: ' + student.email}</div>
            <div>{'GPA: ' + student.gpa}</div>
            <div>{'Campus: ' + (student.campusId ? student.campus.name : "Not currently enrolled!")}</div>
        </div> 
        : <></>
    )
    
    // should put a navlink/link in the campus ternary statement
    // can probably put student info in some sort of flex box container
}

export default SingleStudent;