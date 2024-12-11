import React from 'react';
import { useState, useEffect } from 'react';
import "./scrollcontainerstyle.css";
import CompanyCard from './CompanyCard';
 

const list = [
  { name: "Google", type: "SDE", img: "123.png", id: 1 },
  { name: "Microsoft", type: "Fullstack Developer", img: "123.png", id: 2 },
  { name: "Amazon", type: "Backend Developer", img: "123.png", id: 3 },
  { name: "Facebook", type: "Front End Developer", img: "123.png", id: 4 },
  { name: "Apple", type: "iOS Developer", img: "123.png", id: 5 },
  { name: "Netflix", type: "Software Engineer", img: "123.png", id: 6 },
  { name: "Tesla", type: "Embedded Systems Engineer", img: "123.png", id: 7 },
  { name: "Airbnb", type: "DevOps Engineer", img: "123.png", id: 8 },
  { name: "Uber", type: "Data Scientist", img: "123.png", id: 9 },
  { name: "Spotify", type: "ML Engineer", img: "123.png", id: 10 },
  { name: "Snapchat", type: "Game Developer", img: "123.png", id: 11 },
  { name: "Twitter", type: "Cloud Engineer", img: "123.png", id: 12 },
  { name: "LinkedIn", type: "Security Engineer", img: "123.png", id: 13 },
  { name: "Adobe", type: "UI/UX Designer", img: "123.png", id: 14 },
  { name: "Slack", type: "SDE II", img: "123.png", id: 15 },
  { name: "GitHub", type: "Fullstack Engineer", img: "123.png", id: 16 },
  { name: "Zoom", type: "Platform Engineer", img: "123.png", id: 17 },
  { name: "Shopify", type: "Mobile Developer", img: "123.png", id: 18 },
  { name: "Salesforce", type: "AI Engineer", img: "123.png", id: 19 },
  { name: "Pinterest", type: "Software Architect", img: "123.png", id: 20 }]

function filterto(companies, searchtext){
  console.log(searchtext);
  if (searchtext === '') {
    return companies;
  }
  return companies.toLowerCase().includes(searchtext);
}

function ScrollContainer(props) {

  const [companies, setCompanies] = useState(props.comps)
  // setCompanies(props.comps);
  const handleClick = (e) =>{
    console.log(e);
    props.companyClicked(e);
  }

  var temp = companies.filter(function (comp) { return (comp.name.toLowerCase().includes(props.value.toLowerCase()))});
  useEffect(() => {setCompanies(props.comps)}, [props.comps])
  return (
    <div className="scroll-container">
      {/* <button onClick={() => console.log(props.value)}>print</button> */}
      <ul className='scroll-list'>
        {temp.map((company) =>(
          <div className="company" key={company.id} onClick={() => handleClick(company.name)}>
            <CompanyCard company = {company} url={company.icon_url} />
          </div >
        ))}
      </ul>
    </div>
  )
}

export default ScrollContainer