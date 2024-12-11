import React, {useContext, useState} from 'react';
import NavBar from "../NAVBAR/NavBar.jsx";
import Carousel from '../CAROUSEL/Carousel.jsx';
import Others from '../OTHERS/Others.jsx';
import Login from '../LOGIN/Login.jsx';
import { UserContext } from '../UserProvider.jsx';


function Home(props){
    const handleUserIdRetrieved = (e) => {
        props.UserIdRetrieved(e);
    }
    const { userId } = useContext(UserContext);
    if(userId==-1){
        return <Login UserIdRetrieved={(e) => handleUserIdRetrieved(e)} />
    }
    console.log("at home: ", userId);
    return(
        <>
        <NavBar/>
        <div className="home-container">
            <div className="tagline">
                <h1>Experience-Powered</h1>
                <h1>Placement Insights.</h1>                
                <h3
                 className="subtext">Your placement story starts from here.</h3>
            </div>
            <div className="Search">
                <input type="text" className="search-box" placeholder="   Search or Jump To.."></input>
                <button className="search-button"> Search </button>
            </div > 
            <div className="question-container">
                <div class="question">
                    <span>What are you looking for?</span> 
                </div>  
            </div>           
        </div>
        <Carousel></Carousel>
        <Others></Others>
        </>
    );
}
export default Home;