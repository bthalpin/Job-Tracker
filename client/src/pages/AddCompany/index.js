import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './addCompany.css'

function AddCompany() {
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const [created,setCreated] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newCompany)
        fetch('http://localhost:3001/api/company',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newCompany)

        }).then(response=>response.json())
        .then(company=>{
            setCreated(`The company ${company.name} was created successfully`)
            setNewCompany({
                name:'',
                address:'',
                phone:'',
                website:'',
                logo:'',
            })
        })
        // let jobURL = `http://localhost:3001/api/jobs/`;
        
        // fetch(jobURL)
        //   .then((res) => res.json())
        //   .then((response) => console.log(response));
      };
  return (
    <div className="addCompanyContainer" >
        <form>
            <label htmlFor="company">Company Name</label>
            <input type="text" name="company" placeholder="Company name" value={newCompany.name} onChange={(e)=>setNewCompany({...newCompany, name:e.target.value})}></input>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" placeholder="Address" value={newCompany.address} onChange={(e)=>setNewCompany({...newCompany, address:e.target.value})}></input>
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" placeholder="Phone" value={newCompany.phone} onChange={(e)=>setNewCompany({...newCompany, phone:e.target.value})}></input>
            <label htmlFor="website">Company Website</label>
            <input type="text" name="website" placeholder="Website" value={newCompany.website} onChange={(e)=>setNewCompany({...newCompany, website:e.target.value})}></input>
            <label htmlFor="logo">Company Logo</label>
            <input type="text" name="logo" placeholder="Logo" value={newCompany.logo} onChange={(e)=>setNewCompany({...newCompany, logo:e.target.value})}></input>
            <button className="addButton" onClick={handleSubmit}>Add</button>
        </form>
        {created!==''
        ?<div>
            <p>{created}</p>
            <div className="homeButtonContainer">
                <Link to='/' className="homeButton">Home</Link>
            </div>
        </div>
        :<></>}
    </div>
  );
}

export default AddCompany;
