import React from "react";

//will pass in student or campus into type when student/campus not found respectively
const NotFound = (props) => {
    return(
        <div id='not-found'>
            <h1>{`Looks like the ${props.type ? props.type : 'page'} you were looking for doesn't exist.`}</h1>
            <h3>Please use the navigation links in the toolbar above.</h3>
        </div>
        
    )
}

export default NotFound;