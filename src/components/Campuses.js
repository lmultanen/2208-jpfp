import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampuses } from "../store/campusesReducer";

const Campuses = () => {
    const dispatch = useDispatch();
    const campuses = useSelector(state => state.campuses)

    React.useEffect(() => {
        dispatch(fetchCampuses())
    },[])

    return(
        <div id='campuses-container'>
            <h1>List of Campuses:</h1>
            {campuses.map((campus, idx) => {
                return(
                <div className="campus" key={idx}>
                    <h3>{campus.name}</h3>
                    <img src={campus.imageUrl} height='150px' width='150px'/>
                </div>
                )
            })}
        </div>
    )
}

export default Campuses;