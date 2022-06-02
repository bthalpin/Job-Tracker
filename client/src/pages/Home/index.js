import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {Job} from '../../components/';
import Auth from '../../utils/auth';
import './home.css';

function Home() {
    const navigate = useNavigate()
    const token = Auth.getToken();
    const [search,setSearch] = useState('');
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
      <input name="search" className="search" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
      <button onClick={()=>setSearch('')}>Clear</button>
            {allComapnies.length?<></>
            :<div>
                <p className="welcomeMessage"><span className="welcome">Welcome to JobTracker!</span> To begin, start by adding a company that you are applying to.  Once the company is created you can then add individual jobs and mark the jobs once you apply, get an offer, or are rejected.</p>
            </div>}
        <div className="addContainer">
            <Link to={'/company/'} className="addCompany">Add Company</Link>

        </div>
        <div className="homeContainer" >
            {allComapnies.filter(company=>company.name.includes(search)).map((company,index)=>{
                return (
                    <div className="homeCard" key={index}>
                        
                        <Link to={`/company/${company._id}`} className="homeLink" key={index}>
                            <div>
                                <h2>{company.name}</h2>
                                <img src={company.logo||'/images/default.png'} alt="Company logo"></img>
                                <p>{company.jobs.length} {company.jobs.length===1?'Job':'Jobs'}</p>

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
