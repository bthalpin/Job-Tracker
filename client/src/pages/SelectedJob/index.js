import React, { useState, useEffect } from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import {ConfirmModal,JobForm,JobPostData} from '../../components/';
import Auth from '../../utils/auth';
import './job.css'

function SelectedJob() {
    const {jobId,companyId} = useParams()
    const navigate = useNavigate()
    const [show,setShow] = useState('')
    const [job,setJob ] = useState()
    const [jobData,setJobData] = useState({})
    const [status,setStatus] = useState('created')
    const token = Auth.getToken();
    const [newJob,setNewJob] = useState({
        title:'',
        description:'',
        contactInfo:'',
        link:'',
        resumeLink:'',
        coverLetterLink: '',
        notes:'',
        status:'created',
        company:companyId
    })
    const [edit,setEdit] = useState(false)
    useEffect (()=>{
        if(jobData?.description?.length){
            if (jobData.title){
                setNewJob({...job,title:jobData.title,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})
                editJob({...job,title:jobData.title,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})
            }else{
                setNewJob({...job,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})
                editJob({...job,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})

            }
        }
    },[jobData])
    useEffect(() => {
        getJob();
      }, []);
    useEffect(()=>{
        if(newJob.title){
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
            });}
    },[newJob.status])
    
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
          .then(() => {
              navigate(`/company/${companyId}`)
            });
    }
    const changeStatus = async (e) => {
        e.preventDefault()
        setJob({...newJob,status:e.target.value})
        setNewJob({...newJob,status:e.target.value})
    }

    const editJob = (updatedData) => {
        let jobURL = `/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedData||newJob)

        })
          .then((res) => res.json())
          .then((response) => {
                setJob(response)
                setEdit(false)
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        editJob()
    }
    console.log(job)
    return (
        <div className={`${job?.status}job jobPage`} >
            <div className={`jobContainer`}>
                {edit
                ?
                    <>  
                        <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} setStatus={setStatus} setEdit={setEdit} buttonName='Save' />

                        
                    </>
                :
                    <>
                        <h2>{job?.title}</h2>
                        <p>{job?.contactInfo}</p>
               
                        <div>
                            <Link to={`/company/${job?.company?._id}`}>{job?.company?.name}</Link>
                        </div>
                        <a href={job?.link}>{job?.title} - Job Post</a>
                        <div className="resumeContainer">
                            {job?.resumeLink?
                                <a href={job.resumeLink}>Resume</a>
                            :<></>}
                            {job?.coverLetterLink?
                                <a href={job.coverLetterLink}>Cover Letter</a>
                            :<></>}

                        </div>
                        {job?.description?
                            <>
                                <h3>Description:</h3>
                                <p className="description">{job.description}</p>
                            </>
                        :<></>}
                        {job?.notes?
                            <>
                                <h3>Notes:</h3>
                                <p className="notes">{job?.notes}</p>
                            </>
                        :<></>}
                
                        <JobPostData setJobData={setJobData} />
                    
                        <label htmlFor="status">Set status: </label>
                        <select name="status" value={newJob.status} onChange={changeStatus}>
                            <option value="created" >---</option>
                            <option value="applied">Applied</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                            <option value="archived">Archive</option>
                        </select>

                        <div className="jobButtonContainer">
                            <button className="jobButton deleteJob" onClick={()=>setShow('show')}>Delete</button>
                            <button className="jobButton" onClick={()=>setEdit(true)}>Edit</button>
                        </div>
                
                    </>
            
                }
                <ConfirmModal show={show} setShow={setShow} callBack={deleteJob} action="delete" name={newJob.title} type="job"/>
            </div>

        </div>
  );
}

export default SelectedJob;
