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
                <img classname='student-img' src={student.imageUrl} height='200px' width='200px'/>
                <div id='student-details'>
                    <div><span className='tag'>{'Email: '}</span><span className="student-detail">{student.email}</span></div>
                    <div><span className='tag'>{'GPA: '}</span><span className="student-detail">{student.gpa ? student.gpa : 'N/A'}</span></div>
                    <div><span className='tag'>{'Campus: '}</span>
                        {student.campusId && student.campus ?
                            <span>
                                <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link>
                            </span>
                            : <span className="student-detail">Not enrolled</span>
                        }
                    </div>
                </div> 
            </div>
            <div id='update-student-form'>
                <UpdateStudentForm/>
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default SingleStudent;