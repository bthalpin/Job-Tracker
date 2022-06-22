import React, {useState,useEffect} from 'react';
import {CompanyForm} from '../../components';
import Auth from '../../utils/auth';
import {Link, useParams,useNavigate} from 'react-router-dom';

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
           
           
        })
        
      };
  return (
    <div className="addCompanyContainer" >
        <CompanyForm newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} buttonName='Edit' />
    </div>
  );
}

export default EditCompany;
