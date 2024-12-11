import React from 'react'
import "./profilestyle.css";
import { Link } from "react-router-dom";
import profilePicture from './profilepic.jpg';
import AppDrawer from "./AppDrawer";
import SubmitForm from "./submitform";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserProvider';

function ProfileComp(props) {
    const { userId } = useContext(UserContext);
    const [a, update_a] = useState("Loading");
    const [b,  update_b] = useState("4th Year");
    const [pfp, update_pfp] = useState("f");
    const [current_user, update_user] = useState(userId);
    const [questions, update_questions] = useState([]);
    const [question_strings, update_question_string] = useState([]); 
    const [user_info, update_info] = useState({
        "id": 5,
        "resume": "test.com",
        "github": "test",
        "website": "google.com",
        "linkedin": "string"
      })

      console.log("at profile", userId);
    useEffect(() => {
        fetch("https://api-lyart-delta.vercel.app/users/" + String(userId), {
            method:"GET"
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log("Fetched data:", data);
            update_a(data.name);
            update_pfp(data.profile_pic_url);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }, []);

      useEffect(() => {


        fetch("https://api-lyart-delta.vercel.app/get_packed_info/" + String(userId), {
            method:"GET"
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            update_question_string(data.questions);
            update_info(data.info);
            
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }, []);

      


    const [showForm, setShowForm] = useState(false); 
  
    const handleToggleForm = () => {
      setShowForm(!showForm);
    };
  
    return (
      <>
      <AppDrawer>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
        </AppDrawer>
  
        <section className="header">
          <div className="name-year">
            <div className="name">
              <h1>Name: {a}</h1>
            </div>
            <div className="year">
              <h2>Year: {b}</h2>
            </div>
          </div>
          <div className="profile-picture">
          <i><img src={pfp} alt="Profile" /></i>
          </div>
        </section>
        
        <section className="content">
          {/* <div className="companies">
            <h2>Companies</h2>
            <div className="company-list">
              <p>Company 1</p>
              <p>Company 2</p>
            </div>
          </div> */}
          <div className="pubs">
            <h2>Questions Asked</h2>
            <div className="pub-list">
                <p>
                {question_strings.map((item) =>(
                    <p>
                        <Link to='/ques' className='link-f'> {item     } </Link> 
                    </p>
                    )                            
                )}
                </p>
            </div>
          </div>
        </section>
        {/* Table Section */}
        <section className="links-table">
          <h2>My Links</h2>
          <table>
            <thead>
              <tr>
                <th>Resume</th>
                <th>GitHub</th>
                <th>Website</th>
                <th>LinkedIn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href={user_info["resume"]} target="_blank" rel="noopener noreferrer">View Resume</a>
                </td>
                <td>
                  <a href={user_info["github"]} target="_blank" rel="noopener noreferrer">GitHub</a>
                </td>
                <td>
                  <a href={user_info["website"]} target="_blank" rel="noopener noreferrer">Website</a>
                </td>
                <td>
                  <a href={user_info["linkedin"]} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <div className="button-div">
            <button onClick={handleToggleForm} className='button-f'>
            {showForm ? 'Hide Submission Form' : 'Show Submission Form'}
            </button>
        </div>
        {showForm && <SubmitForm />} {/* Conditionally render the form */}
  
      </>
    );
}

export default ProfileComp