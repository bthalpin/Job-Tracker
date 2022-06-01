import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {Job} from '../../components/';
import Auth from '../../utils/auth';
import './home.css';

function Home() {
    const navigate = useNavigate()
    const token = Auth.getToken();
    const [allComapnies,setAllCompanies ] = useState([])
    useEffect(() => {
        getCompanies();
      }, []);
    
   const getCompanies = () => {
        let companyURL = `/api/company/`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
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
                    <div className="homeCard" key={index}>
                        
                        <Link to={`/company/${company._id}`} className="homeLink" key={index}>
                            <div>
                                <h2>{company.name}</h2>
                                <img src={company.logo||'/images/default.png'} alt="Company logo"></img>
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
