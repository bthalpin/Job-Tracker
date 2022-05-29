import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Job} from '../../components/';
import './home.css';

function Home() {
    const [allComapnies,setAllCompanies ] = useState([])
    useEffect(() => {
        getCompanies();
      }, []);
    
   const getCompanies = () => {
        let companyURL = `http://localhost:3001/api/company/`;
        
        fetch(companyURL)
          .then((res) => res.json())
          .then((response) => setAllCompanies(response));
      };
   const deleteCompany = (companyId) => {
        console.log(companyId)
        let companyURL = `http://localhost:3001/api/company/${companyId}`;
        
        fetch(companyURL,{
            method:'DELETE'
        })
          .then((res) => res.json())
          .then((response) => setAllCompanies(response))
      };
 
  return (
      <>
        <div className="addContainer">
            <Link to={'/company/'} className="addCompany">Add Company</Link>

        </div>
        <div className="homeContainer" >
            {allComapnies.map((company,index)=>{
                return (
                    <div className="homeCard">
                        <Link to={`/company/edit/${company._id}`}>Edit</Link>
                        <button onClick={()=>deleteCompany(company._id)}>Delete</button>
                        <Link to={`/company/${company._id}`} className="homeLink" key={index}>
                            <div>
                                <h2>{company.name}</h2>
                                <img src={company.logo} alt="Company logo"></img>
                                <p>{company.jobs.length} Jobs</p>

                            </div>
                        </Link>
                    </div>
                )
            })}
            <Job />

        </div>
      </>
  );
}

export default Home;
