import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';
import './allJobs.css';

function AllJobs() {
    const [allJobs,setAllJobs ] = useState([])
    const [jobSearch,setJobSearch] = useState('');
    const [hideArchived,setHideArchived] = useState('archived')
    const token = Auth.getToken();
    
    useEffect(() => {
        getAllJobs();
    }, []);

    const getAllJobs = () => {
        let jobURL = `/api/jobs/myjobs`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
    };

    
  return (
      <div>
            {hideArchived?
                <button className="archiveBtn" onClick={()=>setHideArchived('')}>View Archived</button>
                :<button className="archiveBtn" onClick={()=>setHideArchived('archived')}>Hide Archived</button>}
                
            <input name="jobSearch" className="jobSearch"  placeholder="Search your jobs" value={jobSearch} onChange={(e)=>setJobSearch(e.target.value)}></input>
            <button className="clearJobSearch" onClick={()=>setJobSearch('')}>Clear</button>

            <div className="allJobContainer" >
                
                {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                    return (
                        <Link to={`/jobs/${job.company}/${job._id}`} className={`allJobCard ${job.status}`} key={index}>
                            <h3 className="jobTitle">{job.title}</h3>
                            <p>{job.contactInfo}</p>
                            {job.createdAt?<p>Created on {job.date}</p>:<></>}
                        </Link>
                    )
                })}

            </div>
      </div>
  );
}

export default AllJobs;
