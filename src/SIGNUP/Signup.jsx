import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [resume, setResume] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  var userId = -1;
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // First API call: Create user
    const signupData = {
      id: 0,
      name: name,
      email_id: email,
      questions: [], // As per the schema
      profile_pic_url: profilePic,
      password: password,
    };

    try {
      console.log("Signup Data:", signupData);
      const createUserResponse = await fetch("https://api-lyart-delta.vercel.app/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      // if (!createUserResponse.ok) {
      //   console.log(signupData, createUserResponse)
      //   throw new Error("Failed to create user");
      // }
      console.log("User created successfully");

      // Second API call: Get user ID
      const loginData = {
        email: email,
        password: password,
      };

      console.log("Login Data:", JSON.stringify(loginData));
      await fetch("https://api-lyart-delta.vercel.app/get_id/", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify(loginData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched ID:", data);
        userId = data;
        // props.
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

      // Third API call: Add user info
      const userInfoData = {
        id: Number(userId),
        resume: resume,
        github: github,
        website: website,
        linkedin: linkedin,
      };
      console.log(userInfoData)
      // const addUserInfoResponse =  fetch("http://127.0.0.1:8000/add_user_info/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userInfoData),
      // });

      // if (!addUserInfoResponse.ok) {
      //   throw new Error("Failed to add user info");
      // }
      await fetch("https://api-lyart-delta.vercel.app/add_user_info/", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify(userInfoData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Fetched ID:", data);
        // userId = data;
        // props.
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
      console.log("User info added successfully");

      alert("Signup successful!");
    } catch (error) {
      console.error("Error during signup process:", error);
      alert("An error occurred during the signup process.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile-pic">Profile Picture URL:</label>
            <input
              type="url"
              id="profile-pic"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="resume">Resume URL:</label>
            <input
              type="url"
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="github">GitHub URL:</label>
            <input
              type="url"
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website:</label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn URL:</label>
            <input
              type="url"
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <button type="submit" className="button-that">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
