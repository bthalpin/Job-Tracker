import React, {useState,useEffect} from 'react';
import {JobForm} from '../../components';
import {Link,useParams} from 'react-router-dom';
// import './AddJob.css'

function AddJob() {
    const {companyId} = useParams()
    const [newJob,setNewJob] = useState({
        title:'',
        description:'',
        contactInfo:'',
        link:'',
        notes:'',
        applied:false,
        offer:false,
        rejected:false,
        company:companyId
    })
    const [created,setCreated] = useState('')
    const handleChange = (e) => {
        e.preventDefault();
        const {value} = e.target
        console.log(value,'change')
        switch (value){
            case 'applied':
                console.log('here')
                setNewJob({...newJob, applied:true,rejected:false,offer:false})
                break;
            
            case 'offer':
                setNewJob({...newJob, applied:true,rejected:false,offer:true})
                break;
            
            case 'rejected':
                setNewJob({...newJob, applied:true,rejected:true,offer:false})
                break;
            default:
                setNewJob({...newJob, applied:false,rejected:false,offer:false})
        }
        console.log(newJob)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newJob,'submit')
        fetch(`http://localhost:3001/api/jobs/${companyId}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newJob)

        }).then(response=>response.json())
        .then(job=>{
            setCreated(`The job ${job.title} was created successfully`)
            setNewJob({
                title:'',
                description:'',
                contactInfo:'',
                link:'',
                notes:'',
                applied:false,
                offer:false,
                rejected:false,
                company:companyId
            })

            // CHANGE LATER
            window.location = `/company/${companyId}`
        })
        // let jobURL = `http://localhost:3001/api/jobs/`;
        
        // fetch(jobURL)
        //   .then((res) => res.json())
        //   .then((response) => console.log(response));
      };
  return (
    <div className="AddJobContainer" >
        <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} handleChange={handleChange} buttonName='Add' />
        {created!==''
        ?<div>
            <p>{created}</p>
            <div className="backButtonContainer">
                <Link to={`/company/${companyId}`} className="back">Back</Link>
            </div>
        </div>
        :<></>}
    </div>
  );
}

export default AddJob;
