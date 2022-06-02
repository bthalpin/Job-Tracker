import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import {Job} from '../../components/';
import './company.css';

function Company() {
    const navigate = useNavigate()
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
    
      const deleteCompany = (companyId) => {
        console.log(companyId)
        let companyURL = `http://localhost:3001/api/company/${companyId}`;
        
        fetch(companyURL,{
            method:'DELETE'
        })
          .then((res) => res.json())
          .then((response) => navigate('/'))
      };
    
  return (
      <div>

            <div className="companyContainer">
                <h2>{company.name}</h2>
                <img className="companyLogo" src={company.logo} alt="logo"></img>
                <p>
                    {company.address}
                </p>
                <p>
                    {company.phone}
                </p>
                <a href={company.website}>{company.name}</a>
                <div className="homeBtnContainer">
                    <button onClick={()=>navigate(`/company/edit/${company._id}`)}>Edit Company</button>
                    <button onClick={()=>deleteCompany(company._id)}>Delete Company</button>
                </div>
            </div>
            <div className="addJobContainer">

                <Link className="addJobBtn" to={`/company/add/${companyId}`} >Add Job</Link>
            </div>
            <div className="companyJobContainer" >
                
                {allJobs.map((job,index)=>{
                    return (
                        <Link to={`/jobs/${companyId}/${job._id}`} className={`companyCard ${job.status}`} key={index}>
                            <h3>{job.title}</h3>
                            <p>{job.description.substr(0,200)}...</p>
                            <p>{job.Notes}</p>
                            <p>{job.link}</p>
                            <p>{job.contactInfo}</p>
                        </Link>
                    )
                })}
                <Job />

            </div>
      </div>
  );
}

export default Company;
