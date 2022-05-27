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
        let jobURL = `http://localhost:3001/api/company/`;
        
        fetch(jobURL)
          .then((res) => res.json())
          .then((response) => setAllCompanies(response));
      };
    
  return (
      <>
        <button className="addCompany">Add Company</button>
        <div className="homeContainer" >
            {allComapnies.map((company,index)=>{
                return (
                    <Link to={`/company/${company._id}`} className="homeCard" key={index}>
                        <h2>{company.name}</h2>
                        <img src={company.logo} alt="Company logo"></img>
                        <p>{company.jobs.length} Jobs</p>
                    </Link>
                )
            })}
            <Job />

        </div>
      </>
  );
}

export default Home;
