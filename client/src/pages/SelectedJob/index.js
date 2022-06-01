import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import {Job,JobForm} from '../../components/';
import Auth from '../../utils/auth';
import './job.css'

function SelectedJob() {
    const {jobId,companyId} = useParams()
    const navigate = useNavigate()
    const [job,setJob ] = useState()
    const [status,setStatus] = useState('created')
    const token = Auth.getToken();
    const [newJob,setNewJob] = useState({
        title:'',
        description:'',
        contactInfo:'',
        link:'',
        notes:'',
        status:'created',
        company:companyId
    })
    const [edit,setEdit] = useState(false)
    useEffect(() => {
        getJob();
      }, []);
    
    const getJob = () => {
        let jobURL = `/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => {
              setJob(response)
              setNewJob(response)
            });
    };
    
    const deleteJob = () => {
        let jobURL = `/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            },
            method:'DELETE'
        })
          .then((res) => res.json())
          .then((response) => {
              navigate(`/company/${companyId}`)
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let jobURL = `/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newJob)

        })
          .then((res) => res.json())
          .then((response) => {
                setJob(response)
                setEdit(false)
            });
    }

    return (
        <div className={`${job?.status}job jobContainer`} >
            
            {edit
            ?
            <>  
                <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} setStatus={setStatus} buttonName='Edit' />

                <button onClick={()=>setEdit(false)}>Cancel</button>
            </>
            :
            <>
            <div className="jobButtonContainer">
                <button className="jobButton" onClick={deleteJob}>Delete</button>
                <button className="jobButton" onClick={()=>setEdit(true)}>Edit</button>

            </div>
                <h2>{job?.title}</h2>
                <p>{job?.contactInfo}</p>
                <a href={job?.link}>{job?.title}</a>
                <p>{job?.description}</p>
                <p>{job?.notes}</p>
            </>
            
            }
        </div>
  );
}

export default SelectedJob;
