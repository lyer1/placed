import React, { useState } from 'react';
import Mycompanycard from './Mycompanycard';
import Myroundcard from './Myroundcard';


function Carousel() {
    const [showCompanies, setShowCompanies] = useState(true);
    const showCompaniesHandler = () => setShowCompanies(true);
    const showRoundsHandler = () => setShowCompanies(false);
    
    return (
        <>
            <div className="carousel-container">
                <div className="button-row">
                    <button className="option-btns" onClick={showCompaniesHandler}>Company</button>
                    <button className="option-btns" onClick={showRoundsHandler}>Rounds</button>
                </div>
                {showCompanies && (
                    <div className="cards-row-companies">
                        <button className="pre-btn">&lt;</button>
                        <div className="card-wrapper">
                            <Mycompanycard company="Google" />
                            <Mycompanycard company="Microsoft" />
                            <Mycompanycard company="Apple" />
                            <Mycompanycard company="DELL" />
                            <Mycompanycard company="PayPal" />
                        </div>
                        <button className="next-btn" >&gt;</button>
                    </div>
                )}
        
                {!showCompanies && (
                    <div className="cards-row-companies">
                        <button className="pre-btn" >&lt;</button>
                            <Myroundcard></Myroundcard>
                        <button className="next-btn" >&gt;</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Carousel;
