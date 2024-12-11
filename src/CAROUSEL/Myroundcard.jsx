import React, { useState, useEffect } from 'react';
import oa from './oa.png';
import HR from './HR.png';
import Technical from './technical-interview.jpg';
function Myroundcard() {
    return (
            <div className="card-wrapper">
                <div className="card">
                    <img src={oa} alt="oa" />
                    <h2 className="card-title">OA</h2>
                </div>
                <div className="card">
                    <img src={Technical} alt="Tech interview" />
                    <h2 className="card-title">Tech Interview</h2>
                </div>
                <div className="card">
                    <img src={HR} alt="HR interview" />
                    <h2 className="card-title">HR Interview</h2>
                </div>
            </div>
    );
}
export default Myroundcard;
