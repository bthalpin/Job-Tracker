import React, {useState,useEffect} from 'react';
import {CompanyForm} from '../../components';
import Auth from '../../utils/auth';
import {Link, useParams,useNavigate} from 'react-router-dom';
// import './editCompany.css'

function EditCompany() {
    const {companyId} = useParams()
    const navigate = useNavigate()
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const [created,setCreated] = useState('')
    const token = Auth.getToken();
    useEffect(()=>{
        fetch(`/api/company/${companyId}`,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(company=>{
            setNewCompany(company)})

    },[setNewCompany])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newCompany)
        fetch(`/api/company/${companyId}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            
            body:JSON.stringify(newCompany)

        }).then(response=>response.json())
        .then(company=>{
            navigate(`/company/${companyId}`)
            // setCreated(`The company ${company.name} was edited successfully`)
           
        })
        // let jobURL = `http://localhost:3001/api/jobs/`;
        
        // fetch(jobURL)
        //   .then((res) => res.json())
        //   .then((response) => console.log(response));
      };
  return (
    <div className="addCompanyContainer" >
        <CompanyForm newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} buttonName='Edit' />
        
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

export default EditCompany;
