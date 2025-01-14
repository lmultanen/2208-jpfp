import React from "react";

const Home = () => {
    return(
        <div id='home-page-container'>
            <div id='welcome-page'>
                <h1>Welcome to Acme Schools</h1>
                <h3>Here at acme schools, we provide you with the tools to manage all of your students across all of your campuses.</h3>
                <h4>Please use the links above in the nav bar to get started!</h4>
            </div>
            <div id='carousel'>
                <div>  
                    <img className="carousel-img" src="learn.jpg"/>
                </div> 

                <div>
                    <img className="carousel-img" src="teachapple.jpg"/>
                </div>

                <div>
                    <img className="carousel-img" src="grow.jpg"/>
                </div>
            </div>
        </div>
    )
}

export default Home;