import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCampuses } from "../store/campusesReducer";
import { fetchSingleStudent, unmountSingleStudent } from "../store/singleStudentReducer";
import UpdateStudentForm from "./UpdateStudentForm";

const SingleStudent = () => {
    const dispatch = useDispatch();
    const student = useSelector(state => state.singleStudent)
    const params = useParams();

    React.useEffect(() => {
        dispatch(fetchSingleStudent(params.id))
        return () => {
            dispatch(unmountSingleStudent())
        }
    },[])

    // checking for firstName to exist so that not displaying 'undefined' while loading
    // also prevents undefined fields if student doesn't exist; will handle that case later
    return( student.firstName ?
        <div id='single-student-container'>
            <div id='student-info'>
                <h1>{student.firstName + ' ' + student.lastName}</h1>
                <img src={student.imageUrl} height='200px' width='200px'/>
                <div>{'Email: ' + student.email}</div>
                <div>{'GPA: ' + (student.gpa ? student.gpa : 'N/A')}</div>
                {/* <div>{'Campus: ' + (student.campusId ? <Link to={`/campuses/${student.campusId}`}>{student.campus.name}</Link> : "Not currently enrolled!")}</div> */}
                {student.campusId && student.campus ?
                    <div>{'Campus: '}
                        <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link>
                    </div>
                    : <div>Campus: Not enrolled</div>
                }
            </div>
            <div id='update-student-form'>
                <UpdateStudentForm/>
            </div>
        </div>
        :  <div>Loading...</div>
    )
    
    // should put a navlink/link in the campus ternary statement
    // can probably put student info in some sort of flex box container
}

export default SingleStudent;