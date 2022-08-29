import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleCampus, unmountSingleCampus } from "../store/singleCampusReducer";

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

    // should put some classNames, etc in each section to better style later
    return ( campus.name ?
        <div id='single-campus'>
            <h2>{campus.name}</h2>
            <img src={campus.imageUrl} height='200px' width='200px'/>
            <div>{campus.description}</div>
            <div>{'Address: ' + campus.address}</div>
            <div>{'Enrolled students:'}</div>
            {campus.students.length ? 
                <ul>{campus.students.map((student,idx) => {
                    return (
                        <li key={idx}>
                            <Link to={`/students/${student.id}`}>
                                {student.lastName + ', ' + student.firstName}
                            </Link>
                        </li>
                    )
                })}</ul>
            : "No students currently enrolled"}
        </div>
        : <></>
    )
}

export default SingleCampus;