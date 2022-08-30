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

    return( campuses.length ?
        <div id='list-form-container'>
            <div id='campuses-container'>
                <h1>List of Campuses:</h1>
                {campuses.map((campus, idx) => {
                    return(
                    <div className="campus" key={idx}>
                        <div  className="link-and-delete">
                            <Link to={`/campuses/${campus.id}`} className='campus-name-img'>
                                <h2 className="campus-name">{campus.name} </h2>
                            </Link>
                            <button className="delete" onClick={() => dispatch(deleteCampus(campus.id))}>X</button>
                        </div>
                        <img src={campus.imageUrl} height='150px' width='150px'/>
                    </div>
                    )
                })}
            </div>
            <div id='campus-form'>
                <NewCampusForm/>
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default AllCampuses;