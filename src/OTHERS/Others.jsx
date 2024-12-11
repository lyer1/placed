import React from 'react';

function Others() {
    return (
        <>
            <div className="others-container">
                <div className="experience-container">
                    <div className="experience" style={{ width: '20%', float: 'left' }}>
                        <h1>Willing to add your placement experience?</h1>
                        <h3 className="subtext1">Your journey, shared.</h3>
                        <button className="add-btn">ADD NOW</button>            
                    </div>
                </div>
                <div className="discussion-container">
                <div className="discussion-forums" style={{ width: '80%', float: 'right' }}>
                    <h1>Be a part of our discussion forums.</h1>
                    <h3 className="subtext1">Talk, Share, Grow.</h3>
                    <button className="discuss-btn">DISCUSS</button>            
                </div>
                </div>
            </div>
        </>
    );
}

export default Others;
