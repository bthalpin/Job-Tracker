import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import {ConfirmModal,CompanyForm} from '../../components/';
import Auth from '../../utils/auth';
import './company.css';

function Company() {
    const {companyId} = useParams()
    const navigate = useNavigate()
    const [show,setShow] = useState('')
    const [edit,setEdit] = useState(false)
    const [allJobs,setAllJobs ] = useState([])
    const [company,setCompany ] = useState({})
    const [hideArchived,setHideArchived] = useState('archived')
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const [jobSearch,setJobSearch] = useState('');
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
          .then((response) => {
              setNewCompany(response)
              setCompany(response)});
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
     const deleteCompany = () => {
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
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCompany.name){
            return
        }
        console.log(newCompany)
        fetch(`/api/company/${companyId}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            
            body:JSON.stringify(newCompany)

        }).then(response=>response.json())
        .then(company=>{
            setCompany(company)
            setNewCompany(company)
            setEdit(false)
        })
      };
  return (
      <div>
            {edit?
                <div className='addCompanyContainer'>
                    <CompanyForm setEdit={setEdit} newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} buttonName='Save' />
                </div>
            :
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
                        <button className="companyEdit" onClick={()=>setEdit(true)}>Edit</button>
                        <button className="delete" onClick={()=>setShow('show')}>Delete</button>
                    </div>
                </div>
            }
            <div className="addJobContainer">

                <Link className="addJobBtn" to={`/company/add/${companyId}`} >Add Job</Link>
            </div>
            {company?.jobs?.length?
                <>
                {hideArchived?
                    <button className="archiveButton" onClick={()=>setHideArchived('')}>View Archived</button>
                    :
                    <button className="archiveButton" onClick={()=>setHideArchived('archived')}>Hide Archived</button>
                }
                <input name="jobSearch" className="jobSearch"  placeholder={`Filter ${company.name} jobs`} value={jobSearch} onChange={(e)=>setJobSearch(e.target.value)}></input>
                <button className="clearJobSearch" onClick={()=>setJobSearch('')}>Clear</button>
                <div className="companyJobContainer" >
                                
                    {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                        return (
                            <Link to={`/jobs/${companyId}/${job._id}`} className={`companyCard ${job.status}`} key={index}>
                                <h3 className="jobTitle">{job.title}</h3>
                                <p>{job.contactInfo}</p>
                                {console.log(job)}
                                {job.createdAt?<p>Created at {job.date}</p>:<></>}
                            </Link>
                    )
                    })}

                </div>
                </>
            :
                <div>
                    <h3 className="noJobs">You currently do not have any jobs for {company.name}, press the add job button to track your first job.</h3>
                </div>}
            <ConfirmModal show={show} setShow={setShow} callBack={deleteCompany} action="delete" name={company.name} type="company"/>

        </div>
  );
}

export default Company;
