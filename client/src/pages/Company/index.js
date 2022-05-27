import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {Job} from '../../components/';
import './company.css';

function Company() {
    const {companyId} = useParams()
    const [allJobs,setAllJobs ] = useState([])
    useEffect(() => {
        getJobs();
      }, []);
    
   const getJobs = () => {
        let jobURL = `http://localhost:3001/api/jobs/${companyId}`;
        
        fetch(jobURL)
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
      };
    
  return (
    <div className="companyContainer" >
        <button>Add Job</button>
        {allJobs.map((job,index)=>{
            return (
                <div className="companyCard" key={index}>
                    <Job job={job} setAllJobs={setAllJobs}/>
                </div>
            )
        })}
        <Job />

    </div>
  );
}

export default Company;
