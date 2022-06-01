import React, {useState,useEffect} from 'react';
import {Link, useNavigate,useLocation} from 'react-router-dom';
import Auth from '../../utils/auth';
import './nav.css';

function Nav() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isloggedIn,setIsLoggedIn] = useState()
    const logout = () => {
        Auth.logout()
        navigate('/')
    }
    useEffect(()=>{
        // const checkAuthorized = async () => {
        //     const token = await Auth.getToken() || '';
        //     if (token===''){
        //             navigate('/login/')
        //     }
        // }
        // console.log(location)
        // checkAuthorized()
        if(Auth.loggedIn()){
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            navigate('/')
        }
    },[location.pathname])

    return (
       <div className="navigation">
           {isloggedIn?
            <>
            {window.location.pathname!=='/'?
            <div className="back" onClick={()=>navigate(-1)}>Back</div>
            :<></>
            }
            <div>
                <h2 className="navTitle">Job Tracker</h2>
            </div>
            <div className="navButtons">
            {window.location.pathname.substr(0,8)!=='/company'?
            <></>
            :
            <Link to="/home/">Companies</Link>
            }
            <div className="logout" onClick={logout}>Logout</div>

            </div>
            </>
            :<div className="titleContainer">
            <p className="navTitle">Job Tracker</p>
        </div>}
          
       </div>
    );
  }
  
  export default Nav;
  