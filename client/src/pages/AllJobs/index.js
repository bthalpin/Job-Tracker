import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
// import {Job} from '../../components/';
import Auth from '../../utils/auth';
import './allJobs.css';

function AllJobs() {
    const navigate = useNavigate()
    const [allJobs,setAllJobs ] = useState([])
    const [jobSearch,setJobSearch] = useState('');
    const [hideArchived,setHideArchived] = useState(true)
    const token = Auth.getToken();
    useEffect(() => {
        getAllJobs();
      }, []);
    
   const getAllJobs = () => {
       console.log(token)
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
      <input name="jobSearch" className="jobSearch" value={jobSearch} onChange={(e)=>setJobSearch(e.target.value)}></input>
                  <button className="clearJobSearch" onClick={()=>setJobSearch('')}>Clear</button>
            <div className="allJobContainer" >
                {hideArchived?
                <>
                <button onClick={()=>setHideArchived(!hideArchived)}>View Archived</button>
                {allJobs.filter(job=>job.title.includes(jobSearch)&&job.status!=='archived').map((job,index)=>{
                    return (
                        <Link to={`/jobs/${job.companyId}/${job._id}`} className={`companyCard ${job.status}`} key={index}>
                            <h3 className="jobTitle">{job.title}</h3>
                            {/* <p>{job.description}</p> */}
                            {/* <p>{job.Notes}</p> */}
                            <p>{job.link}</p>
                            <p>{job.contactInfo}</p>
                            {console.log(job)}
                            {job.createdAt?<p>Created at {job.date}</p>:<></>}
                        </Link>
                    )
                })}
                </>
                
                :
                <>
                <button onClick={()=>setHideArchived(!hideArchived)}>Hide Archived</button>
                {allJobs.filter(job=>job.title.includes(jobSearch)).map((job,index)=>{
                    return (
                        <Link to={`/jobs/${job.companyId}/${job._id}`} className={`companyCard ${job.status}`} key={index}>
                            <h3 className="jobTitle">{job.title}</h3>
                            {/* <p>{job.description}</p> */}
                            {/* <p>{job.Notes}</p> */}
                            <p>{job.link}</p>
                            <p>{job.contactInfo}</p>
                            {console.log(job)}
                            {job.createdAt?<p>Created at {job.date}</p>:<></>}
                        </Link>
                    )
                })}
                </>
                }
                {/* <Job /> */}

            </div>
      </div>
  );
}

export default AllJobs;
