import React from 'react'


function Profile(prop) {
    useEffect(() => {
        fetch("https://api-lyart-delta.vercel.app/users/" + String(prop.id), {
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
  return (
    <div>Profile</div>
  )
}

export default Profile