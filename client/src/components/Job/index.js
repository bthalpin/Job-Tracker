import React from 'react';
import './job.css';

function Job({job,setAllJobs}) {
    const deleteJob = () => {
        let jobURL = `http://localhost:3001/api/jobs/${job._id}`;
        
        fetch(jobURL,{
            method:'DELETE'
        })
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
      };
    return (
        <>
            {job?   
                <>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>{job.Notes}</p>
                    <p>{job.link}</p>
                    <p>{job.contactInfo}</p>
                </>
            :
            <></>}
        </>
    );
  }
  
  export default Job;
  