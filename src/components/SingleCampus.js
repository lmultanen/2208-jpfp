import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearError } from "../store/errorReducer";
import { fetchSingleCampus, unenrollStudentFromCampus, unmountSingleCampus } from "../store/singleCampusReducer";
import NotFound from "./NotFound";
import UpdateCampusForm from "./UpdateCampusForm";

const SingleCampus = () => {
    const dispatch = useDispatch();
    const campus = useSelector(state => state.singleCampus);
    const params = useParams();
    const error = useSelector(state => state.error);

    React.useEffect(() => {
        dispatch(fetchSingleCampus(params.id))
        return () => {
            dispatch(unmountSingleCampus())
            dispatch(clearError())
        }
    },[])

    const unenrollClickHandler = (studentId) => {
        dispatch(unenrollStudentFromCampus(studentId, params.id))
        dispatch(fetchSingleCampus(params.id))
    }

    return ( error ?
        <NotFound type={'campus'}/>
        :
        (campus.name ?
        <div id='single-campus-container'>
            <div id='single-campus-info'>
                <h1>{campus.name}</h1>
                <img src={campus.imageUrl} height='200px' width='200px'/>
                <div id='single-campus-details'>
                    <div><span className='tag'>Bio:</span> <span className="campus-detail">{campus.description}</span></div>
                    <div><span className='tag'>Address: </span> <span className='campus-detail'>{campus.address}</span></div>
                </div>
            </div>
            <div>
                <UpdateCampusForm/>
            </div>
            <div className="enrolled-students-list">
                <h4>{'Enrolled students:'}</h4>
                {campus.students.length ? 
                        <ul>{campus.students.map((student,idx) => {
                            return (
                                <li key={idx}>
                                    <div className="student-unenroll-li">
                                        <Link to={`/students/${student.id}`}>
                                            {student.lastName + ', ' + student.firstName}
                                        </Link>
                                        <button className="unenroll-button" type='submit' onClick={() => unenrollClickHandler(student.id)}>Unregister</button>
                                    </div>
                                </li>
                            )
                        })}</ul>
                : "No students currently enrolled"}
            </div>
        </div>
        : <div>Loading...</div>)
    )
}

export default SingleCampus;