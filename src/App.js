import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import AllCampuses from "./components/AllCampuses";
import Home from "./components/Home";
import SingleCampus from "./components/SingleCampus";
import SingleStudent from "./components/SingleStudent";
import AllStudents from "./components/AllStudents";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampuses } from "./store/campusesReducer";
import { fetchStudents } from "./store/studentsReducer";
import NotFound from "./components/NotFound";


function App(){
    const dispatch = useDispatch();
    const campuses = useSelector(state => state.campuses);
    const students = useSelector(state => state.students)

    React.useEffect(() => {
        // document.getElementsByTagName('body').style.backgroundImage = "url('booksbg.jpg')";
        // document.body.style.backgroundImage = "url('booksbg.jpg')";
        dispatch(fetchCampuses());
        dispatch(fetchStudents());
    },[])

    return(
        <>  
            <nav> Menu
                <NavLink 
                    to='/' 
                    className='menu-link'
                    style={({isActive}) => ({color: isActive ? '#3380FF' : 'white'})}>
                        Home
                </NavLink>
                <NavLink 
                    end to='/campuses' 
                    className='menu-link'
                    style={({isActive}) => ({color: isActive ? '#3380FF' : 'white'})}>
                        Campuses ({campuses.length})
                </NavLink>
                <NavLink 
                    end to='/students' 
                    className='menu-link'
                    style={({isActive}) => ({color: isActive ? '#3380FF' : 'white'})}>
                        Students ({students.length})
                </NavLink>
            </nav>
            <Routes>
                <Route index element ={<Home/>}/>
                <Route path='/campuses' element={<AllCampuses/>}/>
                <Route path='/students' element={<AllStudents/>}/>
                <Route path='/students/:id' element={<SingleStudent/>}/>
                <Route path='/campuses/:id' element={<SingleCampus/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App;