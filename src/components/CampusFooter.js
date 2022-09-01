import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByStudents } from "../store/campusesReducer";
import { setCampusVisibilityFilter } from "../store/campusVisibilityReducer";

const SHOW_ALL = 'SHOW_ALL';
const SHOW_HAS_STUDENTS = 'SHOW_HAS_STUDENTS';
const SHOW_NO_STUDENTS = 'SHOW_NO_STUDENTS';

const CampusFooter = () => {
    const visibilityFilter = useSelector(state => state.campusVisibility)
    const dispatch = useDispatch();

    const campuses = useSelector(state => state.campuses)
    const [sortStudentsDescending, setSortStudentsDescending] = React.useState(true);

    React.useEffect(() => {
        return () => {
            dispatch(setCampusVisibilityFilter(SHOW_ALL));
        }
    },[])

    const sortByStudentsHandler = () => {
        dispatch(sortByStudents(campuses, sortStudentsDescending));
        setSortStudentsDescending(!sortStudentsDescending)
    }

    return(
        <div className="footer">
            <div className="sort-div">
                <button type='submit' onClick={sortByStudentsHandler}>{'Sort by enrollment ' + (sortStudentsDescending ? '(desc.)':'(asc.)')}</button>
            </div>
            <div className="filter-div">
                {'Show: '}
                <span 
                className={visibilityFilter===SHOW_ALL?'activeFilter':'notActive'}
                onClick={() => dispatch(setCampusVisibilityFilter(SHOW_ALL))}>
                    All
                </span> 
                <span 
                className={visibilityFilter===SHOW_HAS_STUDENTS?'activeFilter':'notActive'}
                onClick={() => dispatch(setCampusVisibilityFilter(SHOW_HAS_STUDENTS))}>
                    Has Students
                </span> 
                <span 
                className={visibilityFilter===SHOW_NO_STUDENTS?'activeFilter':'notActive'}
                onClick={() => dispatch(setCampusVisibilityFilter(SHOW_NO_STUDENTS))}>
                    No Students
                </span> 
            </div>
        </div>
    )
}

export default CampusFooter