import React, { useState } from 'react';
import './submitform.css'; // Assuming the CSS file is already linked
import { useContext } from 'react';
import { UserContext } from '../UserProvider';

function QuestionSubmissionForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [companyUrl, setcompurl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tags, setTags] = useState('');
  const { userId } = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();

    const questionData = {
      user_id: userId,
      title,
      content,
      type,
      company_name: companyName,
      tags: tags.split(',').map((tag) => tag.trim()),
      company_img_url: companyUrl
    };
    console.log("full data :", questionData);
    try {
      const response = fetch('https://api-lyart-delta.vercel.app/questions_with_company/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',  },
        body: JSON.stringify(questionData)
      });

      if (response.ok) {
        // Handle successful submission
        alert('Question submitted successfully!');
        // Reset the form fields
        setTitle('');
        setContent('');
        setType('');
        setCompanyName('');
        setTags('');
      } else {
        // Handle server-side errors
        alert('Failed to submit the question.');
      }
    } catch (error) {
      // Handle network errors
      alert('An error occurred while submitting the question.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <h2>Submit a Question</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="companyname">Company Name:</label>
        <input
          type="text"
          id="companyname"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="companyurl">Company Logo URL (Optional):</label>
        <input
          type="text"
          id="companyurl"
          value={companyUrl}
          onChange={(e) => setcompurl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="types">Type:</label>
        <input
          type="text"
          id="types"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionSubmissionForm;
