import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortAlphabetically, sortByGpa } from "../store/studentsReducer";
import { setStudentVisibilityFilter } from "../store/studentVisibilityReducer";

const SHOW_ALL = 'SHOW_ALL';
const SHOW_REGISTERED = 'SHOW_REGISTERED';
const SHOW_UNREGISTERED = 'SHOW_UNREGISTERED';

const StudentFooter = () => {
    const visibilityFilter = useSelector(state => state.studentVisibility)
    const dispatch = useDispatch();

    const students = useSelector(state => state.students)
    const [lastNameAToZ, setLastNameAToZ] = React.useState(true);
    const [gpaDescending, setGpaDescending] = React.useState(true)

    React.useEffect(() => {
        return () => {
            dispatch(setStudentVisibilityFilter(SHOW_ALL))
        }
    },[])

    const alphabetSortHandler = () => {
        dispatch(sortAlphabetically(students, lastNameAToZ));
        setLastNameAToZ(!lastNameAToZ);
        setGpaDescending(true);
    }
    const gpaSortHandler = () => {
        dispatch(sortByGpa(students, gpaDescending));
        setGpaDescending(!gpaDescending);
        setLastNameAToZ(true);
    }

    return(
        <div className='footer'>
            <div className="sort-div">
                <span>Sort:</span>
                <button type='submit' onClick={alphabetSortHandler}>{'by last name ' + (lastNameAToZ ? '(AtoZ)' : '(ZtoA)')}</button>
                <button type='submit' onClick={gpaSortHandler}>{'by gpa ' + (gpaDescending ? '(desc.)' : '(asc.)')}</button>
            </div>
            <div className="filter-div">
                {'Show: '}
                <span 
                className={visibilityFilter===SHOW_ALL?'activeFilter':'notActive'}
                onClick={() => dispatch(setStudentVisibilityFilter(SHOW_ALL))}>
                    All
                </span> 
                <span 
                className={visibilityFilter===SHOW_REGISTERED?'activeFilter':'notActive'}
                onClick={() => dispatch(setStudentVisibilityFilter(SHOW_REGISTERED))}>
                    Registered
                </span> 
                <span 
                className={visibilityFilter===SHOW_UNREGISTERED?'activeFilter':'notActive'}
                onClick={() => dispatch(setStudentVisibilityFilter(SHOW_UNREGISTERED))}>
                    Unregistered
                </span> 
            </div>
        </div>
    )
}

export default StudentFooter;

// add campus filtering now