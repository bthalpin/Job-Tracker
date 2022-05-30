import React from 'react';
// import './job.css';

function JobForm({newJob,setNewJob,handleSubmit,handleChange,buttonName}) {
    
    return (
        <>
        <form>
            <label htmlFor="Job">Job Title</label>
            <input type="text" name="Job" placeholder="Job Title" value={newJob.title} onChange={(e)=>setNewJob({...newJob, title:e.target.value})}></input>
            <label htmlFor="Description">Description</label>
            <input type="text" name="Description" placeholder="Description" value={newJob.description} onChange={(e)=>setNewJob({...newJob, description:e.target.value})}></input>
            <label htmlFor="contact">Contact Information</label>
            <input type="text" name="contact" placeholder="Contact Information" value={newJob.contactInformation} onChange={(e)=>setNewJob({...newJob, contactInfo:e.target.value})}></input>
            <label htmlFor="link">Link</label>
            <input type="text" name="link" placeholder="Link" value={newJob.link} onChange={(e)=>setNewJob({...newJob, link:e.target.value})}></input>
            <label htmlFor="notes">Notes</label>
            <textarea name="notes" placeholder="Notes" value={newJob.notes} onChange={(e)=>setNewJob({...newJob, notes:e.target.value})}></textarea>
            <select  onChange={handleChange}>
                <option value="none">---</option>
                <option value="applied">Applied</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select>
            <button className="addButton" onClick={handleSubmit}>{buttonName}</button>
        </form>
        </>
    );
  }
  
  export default JobForm;
  