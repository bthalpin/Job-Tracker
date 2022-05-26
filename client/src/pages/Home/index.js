import React, { useState, useEffect } from 'react';
import {Job} from '../../components/'
import './home.css';

function Home() {
    const [allJobs,setAllJobs ] = useState([])
    useEffect(() => {
        getJobs();
      }, []);
    
   const getJobs = () => {
        let jobURL = `http://localhost:3001/api/jobs/`;
        
        fetch(jobURL)
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
      };
    
  return (
    <div className="homeContainer" >
        <button>Add Job</button>
        {allJobs.map((job,index)=>{
            return (
                <div className="homeCard" key={index}>
                    <Job job={job} setAllJobs={setAllJobs}/>
                </div>
            )
        })}
        <Job />

    </div>
  );
}

export default Home;
