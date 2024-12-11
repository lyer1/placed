import React from "react";
import logo from "./placed.png";
import profile from "./profile.png"
import "./navbarstyles.css";
import { Link } from "react-router-dom";

function NavBar()
{
    return(
        <div className="nav-containerf">
        <nav>
            <div className="nav-left-and-right">
                <div className="logo-imagef">
                    <Link to ="/"><img src={logo} alt="logo"></img></Link>
                </div>
                <div className="nav-linkf">
                    <ul>
                        <li><Link to="/comps">Companies</Link></li>
                        <li><Link to="/ques">Questions</Link></li>
                        <Link to="/prof">
                        <button className="profile-buttonf" onClick={""}><img src={profile}></img></button>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
        </div>
    );
}
export default NavBar;