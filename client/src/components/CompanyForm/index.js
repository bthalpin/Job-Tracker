import React from 'react';
import './companyForm.css';

function CompanyForm({newCompany,setNewCompany,handleSubmit,buttonName,setAdd}) {

    // Adds https to the URL
    const checkURL = (value) => {
        const currentLength = value.length
        if (!value.startsWith('http'.slice(0,currentLength))&&value!==''){
            value = 'https://' + value;
        }
        setNewCompany({...newCompany,website:value})
    }

    return (
        <>
            {/* Form for creating a new company */}
            <form>
                <label htmlFor="company">Company Name</label>
                <input type="text" name="company" placeholder="Company name" value={newCompany.name} onChange={(e)=>setNewCompany({...newCompany, name:e.target.value})}></input>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" placeholder="Address" value={newCompany.address} onChange={(e)=>setNewCompany({...newCompany, address:e.target.value})}></input>
                <label htmlFor="phone">Phone Number</label>
                <input type="text" name="phone" placeholder="Phone" value={newCompany.phone} onChange={(e)=>setNewCompany({...newCompany, phone:e.target.value})}></input>
                <label htmlFor="website">Company Website</label>
                <input type="text" name="website" placeholder="Website" value={newCompany.website} onChange={(e)=>checkURL(e.target.value)}></input>
                <label htmlFor="logo">Company Logo</label>
                <input type="text" name="logo" placeholder="Logo" value={newCompany.logo} onChange={(e)=>setNewCompany({...newCompany, logo:e.target.value})}></input>
                <div className="companyFormBtn">
                    <button className='cancelButton' onClick={()=>setAdd(false)}>Cancel</button>
                    <button className="addButton" onClick={handleSubmit}>{buttonName}</button>

                </div>
            </form>
        </>
    );
  }
  
  export default CompanyForm;
  