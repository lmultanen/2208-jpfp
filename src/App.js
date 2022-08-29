import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import AllCampuses from "./components/AllCampuses";
import Home from "./components/Home";
import SingleCampus from "./components/SingleCampus";
import SingleStudent from "./components/SingleStudent";
import AllStudents from "./components/AllStudents";


function App(){
    
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
                    to='/campuses' 
                    className='menu-link'
                    style={({isActive}) => ({color: isActive ? '#3380FF' : 'white'})}>
                        Campuses
                </NavLink>
                <NavLink 
                    to='/students' 
                    className='menu-link'
                    style={({isActive}) => ({color: isActive ? '#3380FF' : 'white'})}>
                        Students
                </NavLink>
            </nav>
            <Routes>
                <Route index element ={<Home/>}/>
                <Route path='/campuses' element={<AllCampuses/>}/>
                <Route path='/students' element={<AllStudents/>}/>
                <Route path='/students/:id' element={<SingleStudent/>}/>
                <Route path='/campuses/:id' element={<SingleCampus/>}/>
            </Routes>
        </>
    )
}

export default App;