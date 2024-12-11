import React from 'react'
import "./companycardstyle.css";


function CompanyCard(props) {
  return (
    <div className='company-card'>
        <span className="imspan">
            <img className='company-img' src = {props.url}/>
        </span>
        <span className='textspan'>
            <div className='company-name'>{props.company.name}</div>
            <div className='company-name-by'>{props.company.type}</div>
        </span>
    </div>
  )
}

export default CompanyCard