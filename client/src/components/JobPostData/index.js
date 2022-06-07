import React, {useState} from 'react';
import './jobPostData.css';


function JobPostData({setJobData}) {
    const [jobPostURL,setJobPostURL] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const findJobPost = (e) => {
        e.preventDefault()
        let jobURL = `/api/job/description`;
        
        fetch(jobURL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({URL:jobPostURL})
        })
          .then((res) => res.json())
          .then((response) =>{
            console.log(response,'HERE')
            if (response.error){
                setErrorMessage(response.error)
                return
            }
            setErrorMessage('')
            setJobData({...response,URL:jobPostURL})
            

            });
      };
    return (
        <div className="jobScraper">
                    <p>Enter the URL of the job posting and Job Tracker will attempt to pull out relevant data to add to the job description.</p>
                    
        <form onSubmit={findJobPost}>
            <input type='text' placeholder='Enter URL of Job Post' onChange={(e)=>setJobPostURL(e.target.value)} value={jobPostURL}></input>
            <button>Search</button>
        </form>
        <p className="jobScrapeWarning">*WILL REPLACE YOUR CURRENT JOB INFORMATION</p>
                    <p>*Does not work with all job postings, and may require editing to complete the description</p>
        <p className="jobScrapeWarning">{errorMessage}</p>
                </div>
    );
  }
  
  export default JobPostData;
  