import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampuses } from "../store/campusesReducer";
import NewCampusForm from "./NewCampusForm";

const Campuses = () => {
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
                            <h3>{campus.name}</h3>
                            <img src={campus.imageUrl} height='150px' width='150px'/>
                        </Link>
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

export default Campuses;