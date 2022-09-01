import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCampus, fetchCampuses } from "../store/campusesReducer";
import CampusFooter from "./CampusFooter";
import NewCampusForm from "./NewCampusForm";

const SHOW_HAS_STUDENTS = 'SHOW_HAS_STUDENTS';
const SHOW_NO_STUDENTS = 'SHOW_NO_STUDENTS';

const AllCampuses = () => {
    const dispatch = useDispatch();
    const campuses = useSelector(state => state.campuses)
    const visibilityFilter = useSelector(state => state.campusVisibility)
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        dispatch(fetchCampuses())
        setLoaded(true)
    },[])

    return( campuses ?
        <div id='list-form-container'>
            <div id='campuses-container'>
                <h1>List of Campuses:</h1>
                {campuses.length ?
                    campuses.filter(campus => {
                        switch (visibilityFilter) {
                            case SHOW_HAS_STUDENTS:
                                return campus.students.length;
                            case SHOW_NO_STUDENTS:
                                return !campus.students.length;
                            default:
                                return campus;
                        }
                    })
                      .map((campus, idx) => {
                        return(
                        <div className="campus" key={idx}>
                            <div  className="link-and-delete">
                                <h2 className="campus-name">
                                    <Link to={`/campuses/${campus.id}`} className='campus-name-link'>
                                        {campus.name} 
                                    </Link> 
                                    <span className="enrollment-num">
                                        {` (${campus.students.length} enrollments)`}
                                    </span> 
                                </h2>
                            
                                <button className="delete" onClick={() => dispatch(deleteCampus(campus.id))}>X</button>
                            </div>
                            <img src={campus.imageUrl} height='150px' width='150px'/>
                        </div>
                        )
                    })
                    : 
                    (campuses.length === 0 && loaded) ?
                    <div>No campuses to display</div> :
                    <div>Loading...</div>
                }
            </div>
            <div id='campus-form'>
                <NewCampusForm/>
                {campuses.length > 1 ? 
                    <CampusFooter/>
                    : <></>
                }
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default AllCampuses;