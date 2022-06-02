import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import {Job,JobForm} from '../../components/';

function SelectedJob() {
    const {jobId,companyId} = useParams()
    const navigate = useNavigate()
    const [job,setJob ] = useState()
    const [status,setStatus] = useState('created')
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
        let jobURL = `http://localhost:3001/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL)
          .then((res) => res.json())
          .then((response) => {
              setJob(response)
              setNewJob(response)
            });
    };
    
    const deleteJob = () => {
        let jobURL = `http://localhost:3001/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            method:'DELETE'
        })
          .then((res) => res.json())
          .then((response) => {
              navigate(`/company/${companyId}`)
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let jobURL = `http://localhost:3001/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
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
        <div className="companyContainer" >
            <button onClick={deleteJob}>Delete</button>
            {edit
            ?
            <>
                <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} setStatus={setStatus} buttonName='Edit' />

                <button onClick={()=>setEdit(false)}>Cancel</button>
            </>
            :
            <>
                <button onClick={()=>setEdit(true)}>Edit</button>
                <p>{job?.title}</p>
                <a href={job?.link}>{job?.link}</a>
                <p>Contact Information{job?.contactInfo}</p>
                <p>Description: {job?.description}</p>
                <p>Notes: {job?.notes}</p>
            </>
            
            }
        </div>
  );
}

export default SelectedJob;
