import React, {useState,useEffect} from 'react';
import {CompanyForm, ConfirmModal} from '../../components';
import {Link,useNavigate} from 'react-router-dom';
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
    const [created,setCreated] = useState('')
    const token = Auth.getToken();
    const addCompany = () => {
        fetch('/api/company',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newCompany,userId:Auth.getProfile().data._id})

        }).then(response=>response.json())
        .then(company=>{
            // setCreated(`The company ${company.name} was created successfully`)
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
        // console.log(Auth.getProfile())
        console.log(newCompany)
        if (newCompany.name.trim()===''){
            return
        }
        setShow('show')
        // let jobURL = `https://localhost:3001/api/jobs/`;
        
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
        <ConfirmModal show={show} setShow={setShow} callBack={addCompany} action="create" name={newCompany.name}/>
    </div>
  );
}

export default AddCompany;
