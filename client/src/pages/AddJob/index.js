import React, {useState,useEffect} from 'react';
import {JobForm,ConfirmModal,JobPostData} from '../../components';
import {useParams,useNavigate} from 'react-router-dom';
import Auth from '../../utils/auth';

function AddJob() {
    const {companyId} = useParams()
    const navigate = useNavigate()
    const [show,setShow] = useState('')
    const [jobData,setJobData] = useState([])
    const [newJob,setNewJob] = useState({
        title:'',
        description:'',
        contactInfo:'',
        link:'',
        notes:'',
        status:'created',
        company:companyId
    })
    useEffect (()=>{
        if(jobData?.description?.length){

            setNewJob({...newJob,description:`-${jobData.description.join('\n-')}`,link:jobData.URL,title:jobData.title})
        }
    },[jobData,newJob])
  
    const addJob = () =>{
        fetch(`/api/jobs/${companyId}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newJob,userId:Auth.getProfile().data._id})

        }).then(response=>response.json())
        .then(job=>{
            setNewJob({
                title:'',
                description:'',
                contactInfo:'',
                link:'',
                notes:'',
                status:'created',
                company:companyId
            })

            navigate(`/company/${companyId}`)
            
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setShow('show')
      };
  return (
    <div className="AddJobContainer" >
        <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} buttonName='Add' />
        <JobPostData setJobData={setJobData}/>
       
        <ConfirmModal show={show} setShow={setShow} callBack={addJob} action="create" name={newJob.title} type="job"/>

    </div>
  );
}

export default AddJob;
