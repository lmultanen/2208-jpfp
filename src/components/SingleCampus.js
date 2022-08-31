import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleCampus, unenrollStudentFromCampus, unmountSingleCampus } from "../store/singleCampusReducer";
import UpdateCampusForm from "./UpdateCampusForm";

const SingleCampus = () => {
    const dispatch = useDispatch();
    const campus = useSelector(state => state.singleCampus);
    const params = useParams();

    React.useEffect(() => {
        dispatch(fetchSingleCampus(params.id))
        return () => {
            dispatch(unmountSingleCampus())
        }
    },[])

    // sometimes works, sometimes needs two clicks...
    const unenrollClickHandler = (studentId) => {
        dispatch(unenrollStudentFromCampus(studentId, params.id))
        dispatch(fetchSingleCampus(params.id))
    }

    // should put some classNames, etc in each section to better style later
    // will need to refactor this and SingleStu; combine with Update forms to match wireframe images

    return ( campus.name ?
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
                                        <button className="unenroll-button" type='submit' onClick={() => unenrollClickHandler(student.id)}>Unenroll Student</button>
                                    </div>
                                </li>
                            )
                        })}</ul>
                : "No students currently enrolled"}
            </div>
        </div>
        : <div>Loading...</div>
    )
}

export default SingleCampus;