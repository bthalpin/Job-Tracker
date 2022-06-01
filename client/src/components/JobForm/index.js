import React from 'react';
import './jobForm.css';

function JobForm({newJob,setNewJob,handleSubmit,buttonName,setEdit}) {
    
    return (
        <div className="jobFormContainer">
        <form>
            {console.log(newJob)}
            <label htmlFor="Job">Job Title</label>
            <input type="text" name="Job" placeholder="Job Title" value={newJob.title} onChange={(e)=>setNewJob({...newJob, title:e.target.value})}></input>
            <label htmlFor="Description">Description</label>
            <input type="text" name="Description" placeholder="Description" value={newJob.description} onChange={(e)=>setNewJob({...newJob, description:e.target.value})}></input>
            <label htmlFor="contact">Contact Information</label>
            <input type="text" name="contact" placeholder="Contact Information" value={newJob.contactInfo} onChange={(e)=>setNewJob({...newJob, contactInfo:e.target.value})}></input>
            <label htmlFor="link">Link</label>
            <input type="text" name="link" placeholder="Link" value={newJob.link} onChange={(e)=>setNewJob({...newJob, link:e.target.value})}></input>
            <label htmlFor="notes">Notes</label>
            <textarea name="notes" placeholder="Notes" value={newJob.notes} onChange={(e)=>setNewJob({...newJob, notes:e.target.value})}></textarea>
            {/* {buttonName==='Add'?<></>:
            <select className onChange={(e)=>setNewJob({...newJob,status:e.target.value})}>
                <option value="created">---</option>
                <option value="applied">Applied</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select>
            } */}
            <div>
            <button className="jobFormButton" onClick={handleSubmit}>{buttonName}</button>
            {buttonName==='Save'?
            <button className="jobFormButton" onClick={()=>setEdit(false)}>Cancel</button>
            :<></>}

            </div>
        </form>
        </div>
    );
  }
  
  export default JobForm;
  