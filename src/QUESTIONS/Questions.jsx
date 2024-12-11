// import React from 'react'
import "./questions.css"
import NavBar from '../NAVBAR/NavBar'
import SearchBar from '../SEARCHBAR/SearchBar'
import QuestionCard from '../QUESTIONCARD/QuestionCard'
import { useState, useEffect } from 'react'

function Questions() {
    const [currSearchText, setSearchText] = useState("");
    const [allQues, setAllQues] = useState([]);
    const [selectedTags, setSelectedTags] = useState(new Set());
    const [ques, setQues] = useState([]) 
    const [tags, setTags] = useState([]);
    const handleSearchChange = (e) => {
        setSearchText(e);
    };
    const handleTagClick = (e) => {
        console.log(e.target.textContent);
        var selectedTagsnew = new Set([...selectedTags]);
        if(selectedTags.has(e.target.textContent)){
            selectedTagsnew.delete(e.target.textContent);
        }
        else{
            selectedTagsnew.add(e.target.textContent);
        }
        setSelectedTags(selectedTagsnew);
    }
    useEffect(() =>{
        var new_ques = [...allQues];
        new_ques = new_ques.filter(function (q) { return q.title.toLowerCase().includes(currSearchText)});
        setQues(new_ques);

    },[currSearchText])
    
    useEffect(() => {
        fetch("https://api-lyart-delta.vercel.app/questions", {
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
            setQues(data);
            setAllQues(data);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }, []);

      useEffect(() => {
        fetch("https://api-lyart-delta.vercel.app/get_tags", {
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
            setTags(data);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }, []);


  return (
    <div className="questions-container">
        <NavBar/>
        <div className="top">
                <div className="searchbar">
                    <SearchBar onSearchChange = {handleSearchChange}/>
                </div>
        </div>
        <div className="right">
            <div className="tags-menu">
                {/* <div className="tags-title">Tags</div> */}
            {tags.map((item) =>(
                    <button className={selectedTags.has(item)? "tag-selected": "tag-select"} onClick={handleTagClick}>{item}</button>
                    )                            
                )}
            </div>
            <div className="tab-items">
            {ques.map((item) => {
                    const shouldRender = selectedTags.size === 0 || item.tags.some(tag => selectedTags.has(tag));
                    
                    return shouldRender && (
                        <div className="tab-item" key={item.id}>
                            <QuestionCard 
                                content={item.content} 
                                title={item.title} 
                                username={item.user_name} 
                                user_url={item.user_profile_pic} 
                                tags={item.tags}
                            />
                        </div>
                    );
                })}
                
            </div>
        </div>
    </div>
  )
}

export default Questions