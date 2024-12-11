import NavBar from "../NAVBAR/NavBar.jsx";
import SearchBar from "../SEARCHBAR/SearchBar.jsx";
import "./companyStyles.css";
import ScrollContainer from "../SCROLLCONTAINER/ScrollContainer.jsx";
import CompanyCard from "../SCROLLCONTAINER/CompanyCard.jsx";
import QuestionCard from "../QUESTIONCARD/QuestionCard.jsx";
import { useState, useEffect } from "react";

const tempQuestion = "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.";
const tempQuestion2 = `The minimum absolute difference of an array a is defined as the minimum value of |a[i] - a[j]|, where 0 <= i < j < a.length and a[i] != a[j]. If all elements of a are the same, the minimum absolute difference is -1.

For example, the minimum absolute difference of the array [5,2,3,7,2] is |2 - 3| = 1. Note that it is not 0 because a[i] and a[j] must be different.
You are given an integer array nums and the array queries where queries[i] = [li, ri]. For each query i, compute the minimum absolute difference of the subarray nums[li...ri] containing the elements of nums between the 0-based indices li and ri (inclusive).`

const defaultComp = {
    "id": 5,
    "name": "Google",
    "icon_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuVHnOHxw4UwNMQR2hJIWYINqMOf85mCDDWw&s",
    "questions": [1, 2, 3],
    "packed_questions": [
      {
        "id": 1,
        "title": "Two Sum",
        "content": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
        "user_id": 1,
        "type": "OA",
        "tags": [
          "Hashing",
          "Array"
        ],
        "user_name": "User A",
        "user_profile_pic": "https://upload.wikimedia.org/wikipedia/commons/4/44/Shri_Narendra_Modi%2C_Prime_Minister_of_India.jpg"
      },
      {
        "id": 2,
        "title": "Maximal Rectangle",
        "content": "Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.",
        "user_id": 1,
        "type": "OA",
        "tags": [
          "Matrix"
        ],
        "user_name": "User B",
        "user_profile_pic": "https://www.whitehouse.gov/wp-content/uploads/2021/04/P20210303AS-1901-cropped.jpg?w=1536"
      },
      {
        "id": 3,
        "title": "HR Questions",
        "content": "Tell me about an experience when you faced difficulty at work while working on a project?",
        "user_id": 1,
        "type": "HR",
        "tags": [
          "string"
        ],
        "user_name": "User B",
        "user_profile_pic": "https://www.whitehouse.gov/wp-content/uploads/2021/04/P20210303AS-1901-cropped.jpg?w=1536"
      }
    ]
  };
const info = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const tabs = [[{"label": "Tab A", "content": tempQuestion}, {"label": "Tab A", "content": tempQuestion2}], [{"label": "Tab X", "content": "222dfasdfas"}]]
const tabInfo = {"Tab A": tabs[0], "Tab X": tabs[1]};

// function submit(body){
//     fetch("https://api-lyart-delta.vercel.app/questions_with_company/", {
//         method:"POST",
//         body: body,
//     }
// };


function Companies(){
    const [companies, setCompanies] = useState([defaultComp])
    const [currSearchText, setSearchText] = useState("");
    const [alltabs, setAllTab] = useState([]);
    const [currCompany, setCurrCompany] = useState(defaultComp);
    const [currTab, setTab] = useState("Tab A");

    useEffect(() => {
        fetch("https://api-lyart-delta.vercel.app/companies_with_question/", {
            method:"GET"
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            // console.log("Fetched data:", data[0]);
            setCurrCompany(data[0]);
            setCompanies(data);
            var new_tab = new Set();
            data[0].packed_questions.map((item) =>{
                new_tab.add(item.type);
            })
            setAllTab([...new_tab]);
            setTab(data[0].packed_questions[0].type);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }, []);

    const handleChange = (e) => {
        setSearchText(e);
    };
    const handleCompClicked = (e) => {
      companies.forEach((item) =>
      {
        if(item.name==e){
          setCurrCompany(item);
          var new_tab = new Set();
          item.packed_questions.map((itemf) =>{
              new_tab.add(itemf.type);
          })
          setAllTab([...new_tab]);
          setTab(item.packed_questions[0].type);
        }
      }
      
      )
    }
    const changeTab = (e) => {
        // console.log(e.target.innerText);
        setTab(e.target.innerText);
    };
    return (
        <>
            <NavBar/>
            <div className="top">
                <div className="searchbar">
                    <SearchBar onSearchChange = {handleChange}/>
                </div>
                <div className="company-top">
                        <CompanyCard company = {{ name: currCompany.name, type: "SDE", id: currCompany.id}} url={currCompany.icon_url}/>
                        <div class="tabs">
                                <div class="tab-list">
                                    {alltabs.map((curr) =>(
                                        
                                        <div>
                                            <button className="tab-tab" id={curr} onClick={changeTab}>{curr}</button>
                                        </div>
                                    ))}
                                </div>
                        </div>
                </div>
            </div>
            {/* <button onClick={() => console.log(currSearchText)}>aa</button> */}
            <div className="overall">
                <div className="scroll-container-left">
                    <ScrollContainer value = {currSearchText} comps={companies} companyClicked={(e) => handleCompClicked(e)}/>
                </div>
                <div className="company-details-right">
                    <div className="info-text">
                        <div className="tab-items">
                            {currCompany.packed_questions.map((item) =>(
                                <>
                                {currTab==item.type? 
                                    (
                                    <div className="tab-item">
                                        <QuestionCard content={item.content} tags={item.tags} title={item.title} username={item.user_name} user_url={item.user_profile_pic} />
                                    </div>
                                    ) :(<></>)
                                }
                                </>
                                )                   

                            )}
                            
                        </div>
                        {/* hello */}
                    </div>
                </div>
            </div>
        </>

    );
}

export default Companies;