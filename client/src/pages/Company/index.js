import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {Job} from '../../components/';
import './company.css';

function Company() {
    const {companyId} = useParams()
    const [allJobs,setAllJobs ] = useState([])
    const [company,setCompany ] = useState({})
    useEffect(() => {
        getCompany()
        getJobs();
      }, []);
    
   const getCompany = () => {
        let companyURL = `http://localhost:3001/api/company/${companyId}`;
        
        fetch(companyURL)
          .then((res) => res.json())
          .then((response) => setCompany(response));
      };
   const getJobs = () => {
        let jobURL = `http://localhost:3001/api/jobs/${companyId}`;
        
        fetch(jobURL)
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
      };
    
  return (
    <div className="companyContainer" >
        <div>
            <h2>{company.name}</h2>
            <img className="companyLogo" src={company.logo} alt="logo"></img>
            <p>
                {company.address}
            </p>
            <p>
                {company.phone}
            </p>
            <a href={company.website}>{company.name}</a>
        </div>
        <Link to={`/company/add/${companyId}`} >Add Job</Link>
        {allJobs.map((job,index)=>{
            return (
                <Link to={`/jobs/${companyId}/${job._id}`} className="companyCard" key={index}>
                    <Job job={job} setAllJobs={setAllJobs}/>
                </Link>
            )
        })}
        <Job />

    </div>
  );
}

export default Company;
