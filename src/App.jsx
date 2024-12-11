import Companies from "./COMPANIES/Companies.jsx";
import Home from "./HOME/Home.jsx";
import Questions from './QUESTIONS/Questions.jsx';
import ProfileComp from './PROFILE/ProfileComp.jsx';
import Signup from './SIGNUP/signup.jsx';
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const handleUserIdRetrieved = (e) => {
    update_user_id(e);
    console.log(e);
    setTimeout(() => { window.location.href = "#/prof"; }, 0); // Update URL with '#' for HashRouter
  };

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/prof" element={<ProfileComp />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/comps" element={<Companies />} />
          <Route path="/ques" element={<Questions />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
