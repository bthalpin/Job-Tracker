import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import {Job} from '../../components/';
import Auth from '../../utils/auth';
import './company.css';

function Company() {
    const {companyId} = useParams()
    const navigate = useNavigate()
    const [allJobs,setAllJobs ] = useState([])
    const [company,setCompany ] = useState({})
    const token = Auth.getToken();
    useEffect(() => {
        getCompany()
        getJobs();
      }, []);
    
   const getCompany = () => {
        let companyURL = `/api/company/${companyId}`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setCompany(response));
      };
   const getJobs = () => {
        let jobURL = `/api/jobs/${companyId}`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
      };
     const deleteCompany = (companyId) => {
        console.log(companyId)
        let companyURL = `/api/company/${companyId}`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            },
            method:'DELETE'
        })
          .then((res) => res.json())
          .then((response) => navigate('/home/'))
      };
  return (
      <div>

            <div className="companyContainer">
                <h2>{company.name}</h2>
                <img className="companyLogo" src={company.logo||'/images/default.png'} alt="logo"></img>
                <p>
                    {company.address}
                </p>
                <p>
                    {company.phone}
                </p>
                <a href={company.website}>{company.name}</a>
                <div className="companyBtnContainer">
                            <button className="companyEdit" onClick={()=>navigate(`/company/edit/${company._id}`)}>Edit</button>
                            <button className="delete" onClick={()=>deleteCompany(company._id)}>Delete</button>
                        </div>
            </div>
            <div className="addJobContainer">

                <Link className="addJobBtn" to={`/company/add/${companyId}`} >Add Job</Link>
            </div>
            <div className="companyJobContainer" >
                
                {allJobs.map((job,index)=>{
                    return (
                        <Link to={`/jobs/${companyId}/${job._id}`} className={`companyCard ${job.status}`} key={index}>
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
                <Job />

            </div>
      </div>
  );
}

export default Company;
