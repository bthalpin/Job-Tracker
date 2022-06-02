import React, {useState,useEffect} from 'react';
import {CompanyForm} from '../../components';
import {Link,useNavigate} from 'react-router-dom';
import './addCompany.css'

function AddCompany() {
    const navigate = useNavigate()
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
        fetch('http://localhost:3001/api/company',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newCompany)

        }).then(response=>response.json())
        .then(company=>{
            navigate('/')
            // setCreated(`The company ${company.name} was created successfully`)
            // setNewCompany({
            //     name:'',
            //     address:'',
            //     phone:'',
            //     website:'',
            //     logo:'',
            // })
        })
        // let jobURL = `http://localhost:3001/api/jobs/`;
        
        // fetch(jobURL)
        //   .then((res) => res.json())
        //   .then((response) => console.log(response));
      };
  return (
    <div className="addCompanyContainer" >
        <CompanyForm newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} buttonName='Add' />
        {/* {created!==''
        ?<div>
            <p>{created}</p>
            <div className="homeButtonContainer">
                <Link to='/' className="homeButton">Home</Link>
            </div>
        </div>
        :<></>} */}
    </div>
  );
}

export default AddCompany;
