import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCampus, fetchCampuses, sortByStudents } from "../store/campusesReducer";
import NewCampusForm from "./NewCampusForm";

const AllCampuses = () => {
    const dispatch = useDispatch();
    const campuses = useSelector(state => state.campuses)
    const [sortStudentsDescending, setSortStudentsDescending] = React.useState(true);

    React.useEffect(() => {
        dispatch(fetchCampuses())
    },[])

    const sortByStudentsHandler = () => {
        dispatch(sortByStudents(campuses, sortStudentsDescending));
        setSortStudentsDescending(!sortStudentsDescending)
    }

    return( campuses ?
        <div id='list-form-container'>
            <div id='campuses-container'>
                <h1>List of Campuses:</h1>
                {campuses.length ?
                    campuses.map((campus, idx) => {
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
                    : <div>Loading...</div>
                }
                {/* may need to add another ternary for if length === 0; say nothing to display rather than loading */}
            </div>
            <div id='campus-form'>
                <NewCampusForm/>
                {campuses.length > 1 ? 
                    <div className="sort-div">
                        <button type='submit' onClick={sortByStudentsHandler}>{'Sort by enrollment ' + (sortStudentsDescending ? '(desc.)':'(asc.)')}</button>
                    </div>
                    : <></>
                }
            </div>
        </div>
        :  <div>Loading...</div>
    )
}

export default AllCampuses;