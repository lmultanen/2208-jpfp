import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Campuses from "./components/Campuses";
import Home from "./components/Home";
import Students from "./components/Students";


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
                <Route path='/campuses' element={<Campuses/>}/>
                <Route path='/students' element={<Students/>}/>
            </Routes>
        </>
    )
}

export default App;