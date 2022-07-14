import React, {useState,useEffect} from 'react';
import { ConfirmModal } from '../../components';
import {Link,useNavigate}from 'react-router-dom';
import Auth from '../../utils/auth';
import './profile.css'

function Profile() {
    const navigate = useNavigate()
    const profileData = Auth.getProfile()
    let currentUser={name:'',email:''};
    if (profileData){
        currentUser = {...profileData.data}
    }
    const [user,setUser] = useState({
        name:currentUser.name,
        email:currentUser.email,
        newPassword:''
    });
    const [show,setShow] = useState('')
    
    // useEffect(()=>{
    //     if(user.name!==currentUser.name){
    //         console.log(currentUser)
    //         setUser({...user,name:currentUser.name,email:currentUser.email})
    //     }
    // },[currentUser])
    const updateUser = (e) => {
        e.preventDefault();
        let updatedUser;
        if (user.newPassword){
            updatedUser = {...user}
        } else {
            updatedUser = {name:user.name,email:user.email}
        }
        if (user.email===''&&user.password===''&&user.name===''){
            return
        }
        fetch(`/user/${currentUser._id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...updatedUser,email:updatedUser.email.toLowerCase()})

        }).then(response=>response.json())
        .then(data=>{
            if (data.code===11000){
                console.log('email taken')
                return
            }
            if (!data.token){
                console.log('oops')
                return
            }
            Auth.login(data.token)
            console.log('success',data)
                    })
    }

    const deleteUser = () => {
        fetch(`/user/${currentUser._id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            
        }).then(response=>response.json())
        .then(data=>{
            Auth.logout()
            navigate('/')
                    })
    }
    console.log('user',user,'current',currentUser)
    return (
        <div>  
            <h2>Profile</h2>
            <form>
                        <div className="profileInput">
                            <label htmlFor="name">Name:</label>
                            <input name="name" type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} placeholder="Enter Name" required autoComplete='name'></input>
                            <label htmlFor="email">Email:</label>
                            <input name="email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email" required autoComplete='email'></input>
                            <label htmlFor="password">Password:</label>
                            <input name="password" type="password" value={user.newPassword} onChange={(e)=>setUser({...user,newPassword:e.target.value})} placeholder="Enter Password" required></input>
                        
                        </div>
                        <button type="submit" className="" onClick={updateUser}>Update</button>
                        
                    </form>
                    <button onClick={()=>setShow('show')}>Delete Your Account</button>
            <ConfirmModal show={show} setShow={setShow} callBack={deleteUser} action="delete" name={currentUser.name} type="user"/>
        </div>
    );
}

export default Profile;
