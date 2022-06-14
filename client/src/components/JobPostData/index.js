import React, {useState} from 'react';
import './jobPostData.css';


function JobPostData({setJobData}) {
    const [jobPostURL,setJobPostURL] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    const clearSearch = (e) => {
        e.preventDefault()
        setJobPostURL('')
    }

    const trimURL = () => {
        const splitURL = jobPostURL.split(' ')
        if (splitURL.length ===1){
            return splitURL
        }
        return splitURL.filter(url=>url.startsWith('http'))
    }
    const findJobPost = (e) => {
        e.preventDefault()
        let jobURL = `/api/job/description`;
        const trimmedURL = trimURL()
        fetch(jobURL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({URL:trimmedURL})
        })
          .then((res) => res.json())
          .then((response) =>{
            // console.log(response,'HERE')
            if (response.error){
                setErrorMessage(response.error)
                return
            }
            if (!response.description.length){
                setErrorMessage('Unable to get job post data.')
                return
            }
            setErrorMessage('')
            setJobData({...response,URL:jobPostURL})
            

            })
            .catch(err=>console.log(err));
            setJobPostURL('')

      };
    return (
        <div className="jobScraper">
                    <p>Enter the URL of the job posting and Job Tracker will attempt to pull out relevant data to add to the job description.</p>
        <form onSubmit={findJobPost}>
            <button className="clearBtn" onClick={clearSearch}>Clear</button>
            <input type='text' placeholder='Enter URL of Job Post' onChange={(e)=>setJobPostURL(e.target.value)} value={jobPostURL}></input>
            <button className="scrapeBtn">Search</button>
        </form>
        <p className="jobScrapeWarning">*WILL REPLACE YOUR CURRENT JOB INFORMATION</p>
                    <p>*Does not work with all job postings, and may require editing to complete the description</p>
        <p className="jobScrapeWarning">{errorMessage}</p>
                </div>
    );
  }
  
  export default JobPostData;
  