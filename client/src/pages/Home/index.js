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
        <div className="addContainer">
            <Link to={'/company/'} className="addCompany">Add Company</Link>

        </div>
        <div className="homeContainer" >
            {allComapnies.map((company,index)=>{
                return (
                    <div className="homeCard">
                        <Link to={`/company/${company._id}`} className="homeCard" key={index}>
                            <h2>{company.name}</h2>
                            <img src={company.logo} alt="Company logo"></img>
                            <p>{company.jobs.length} Jobs</p>
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
