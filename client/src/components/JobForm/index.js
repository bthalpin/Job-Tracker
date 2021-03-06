import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import './jobForm.css';

function JobForm({newJob,setNewJob,handleSubmit,buttonName,setEdit}) {
    const navigate = useNavigate()
    const {companyId} = useParams()
    return (
        <div className="jobFormContainer">
            <form>
                <label htmlFor="Job">Job Title</label>
                <input type="text" name="Job" placeholder="Job Title" value={newJob.title} onChange={(e)=>setNewJob({...newJob, title:e.target.value})}></input>
                <label htmlFor="Description">Description</label>
                <textarea name="Description" placeholder="Description" value={newJob.description} onChange={(e)=>setNewJob({...newJob, description:e.target.value})}></textarea>
                <label htmlFor="contact">Contact Information</label>
                <input type="text" name="contact" placeholder="Contact Information" value={newJob.contactInfo} onChange={(e)=>setNewJob({...newJob, contactInfo:e.target.value})}></input>
                <label htmlFor="link">Link</label>
                <input type="text" name="link" placeholder="URL of job post" value={newJob.link} onChange={(e)=>setNewJob({...newJob, link:e.target.value})}></input>
                <label htmlFor="resume">Link to Resume</label>
                <input type="text" name="resume" placeholder="URL of resume" value={newJob.resumeLink} onChange={(e)=>setNewJob({...newJob, resumeLink:e.target.value})}></input>
                <label htmlFor="cover">Link to Cover Letter</label>
                <input type="text" name="cover" placeholder="URL of cover letter" value={newJob.coverLetterLink} onChange={(e)=>setNewJob({...newJob, coverLetterLink:e.target.value})}></input>
                <label htmlFor="notes">Notes</label>
                <textarea name="notes" placeholder="Notes" value={newJob.notes} onChange={(e)=>setNewJob({...newJob, notes:e.target.value})}></textarea>

                <div>
                    {buttonName==='Save'?
                        <button className="jobFormCancelBtn" onClick={()=>setEdit(false)}>Cancel</button>
                        :
                        <button className="jobFormCancelBtn" onClick={()=>navigate(`/company/${companyId}`)}>Cancel</button>
                    }
                    <button className="jobFormAddBtn" onClick={handleSubmit}>{buttonName}</button>

                </div>
            </form>
        </div>
    );
  }
  
  export default JobForm;
  