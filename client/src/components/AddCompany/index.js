import React, {useState} from 'react';
import {CompanyForm, ConfirmModal} from '..';
import {useNavigate} from 'react-router-dom';
import Auth from '../../utils/auth';
import './addCompany.css'

function AddCompany() {
    const navigate = useNavigate()
    const [show,setShow] = useState('')
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const addCompany = () => {
        fetch('/api/company',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newCompany,userId:Auth.getProfile().data._id})

        }).then(response=>response.json())
        .then(company=>{
            setNewCompany({
                name:'',
                address:'',
                phone:'',
                website:'',
                logo:'',
            })
            navigate('/home/')
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCompany.name.trim()===''){
            return
        }
        setShow('show')
      };
  return (
    <div className="addCompanyContainer" >
        <CompanyForm newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} buttonName='Add' />
       
        <ConfirmModal show={show} setShow={setShow} callBack={addCompany} action="create" name={newCompany.name}/>
    </div>
  );
}

export default AddCompany;
