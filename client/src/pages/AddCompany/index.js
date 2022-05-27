import React, {useState} from 'react';

function AddCompany() {
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newCompany)
        // let jobURL = `http://localhost:3001/api/jobs/`;
        
        // fetch(jobURL)
        //   .then((res) => res.json())
        //   .then((response) => console.log(response));
      };
  return (
    <div className="" >
        <form>
            <input type="text" placeholder="Company name" value={newCompany.name} onChange={(e)=>setNewCompany({...newCompany, name:e.target.value})}></input>
            <input type="text" placeholder="Address" value={newCompany.address} onChange={(e)=>setNewCompany({...newCompany, address:e.target.value})}></input>
            <input type="text" placeholder="Phone" value={newCompany.phone} onChange={(e)=>setNewCompany({...newCompany, phone:e.target.value})}></input>
            <input type="text" placeholder="Website" value={newCompany.website} onChange={(e)=>setNewCompany({...newCompany, website:e.target.value})}></input>
            <input type="text" placeholder="Logo" value={newCompany.logo} onChange={(e)=>setNewCompany({...newCompany, logo:e.target.value})}></input>
            <button onClick={handleSubmit}>Add</button>
        </form>
    </div>
  );
}

export default AddCompany;
