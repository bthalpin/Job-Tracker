import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {ConfirmModal,CompanyForm} from '../../components/';
import Auth from '../../utils/auth';
import './home.css';

function Home() {
    const navigate = useNavigate()
    const token = Auth.getToken();
    const [show,setShow] = useState('')
    const [edit,setEdit] = useState(false)
    const [search,setSearch] = useState('');
    const [order,setOrder] = useState('Ascending');
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const [allCompanies,setAllCompanies ] = useState([])
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
  
    const addCompany = () => {
        fetch('/api/company',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newCompany,userId:Auth.getProfile().data._id})

        }).then(response=>response.json())
        .then(company=>{
            getCompanies()
            setNewCompany({
                name:'',
                address:'',
                phone:'',
                website:'',
                logo:'',
            })
            setEdit(false)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCompany.name.trim()){
            return
        }
        setShow('show')
    };
    return (
        <div className="page">    
            <input name="search" className="search" placeholder="Filter Your Companies" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            <button className="clearSearch" onClick={()=>setSearch('')}>Clear</button>

            {allCompanies.length?<></>
            :<div>
                <p className="welcomeMessage"><span className="welcome">Welcome to JobTracker!</span> To begin, start by adding a company that you are applying to.  Once the company is created you can then add individual jobs and mark the jobs once you apply, get an offer, or are rejected.</p>
            </div>}

            {edit?
                <div className="addCompanyContainer" >
                    <CompanyForm newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} buttonName='Add' />
           
                    <ConfirmModal show={show} setShow={setShow} callBack={addCompany} action="create" name={newCompany.name} type="company"/>
                </div>
            :
                <div className="addContainer">
                    <button className="addCompany" onClick={()=>setEdit(true)}>Add Company</button>
                </div>
            }
            <div className="homeContainer" >
                {allCompanies.filter(company=>company.name.toUpperCase().includes(search.toUpperCase())).map((company,index)=>{
                    return (
                        <div className="homeCard" key={index}>
                        
                            <Link to={`/company/${company._id}`} className="homeLink" key={index}>
                                <div>
                                    <h2>{company.name}</h2>
                                    <img src={company.logo||'/images/default.png'} alt="Company logo"></img>
                                    <p>{company.jobs.length} {company.jobs.length===1?'Job':'Jobs'} - Applied {company.jobs.filter(job=>job.status!=='created').length}</p>

                                </div>
                            </Link>
                        </div>
                    )
                })}

            </div>
        </div>
  );
}

export default Home;
