import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCampus, fetchCampuses } from "../store/campusesReducer";
import NewCampusForm from "./NewCampusForm";

const AllCampuses = () => {
    const dispatch = useDispatch();
    const campuses = useSelector(state => state.campuses)

    React.useEffect(() => {
        dispatch(fetchCampuses())
    },[])

    return(
        <div id='list-form-container'>
            <div id='campuses-container'>
                <h1>List of Campuses:</h1>
                {campuses.map((campus, idx) => {
                    return(
                    <div className="campus" key={idx}>
                        <Link to={`/campuses/${campus.id}`}>
                            <h3>{campus.name} </h3>
                            <img src={campus.imageUrl} height='150px' width='150px'/>
                        </Link>
                        <span>
                            <button className="delete" onClick={() => dispatch(deleteCampus(campus.id))}>X</button>
                        </span>
                    </div>
                    )
                })}
            </div>
            <div id='campus-form'>
                <NewCampusForm/>
            </div>
        </div>
    )
}

export default AllCampuses;