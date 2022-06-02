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
        if (Auth.loggedIn() && location.pathname==='/'){
            navigate('/home');
        }
    },[location.pathname])

    return (
       <div className="navigation">
           {isloggedIn?
            <>
            <Link to="/home/">
                <h2 className="navTitle">JobTracker</h2>
            </Link>
            <div className="navButtons">
            {/* {window.location.pathname.substr(0,8)!=='/company'?
            <></>
            :
            <Link to="/home/">Companies</Link>
        } */}
        {window.location.pathname!=='/'&&window.location.pathname!=='/home/'?
        <div className="back navLink" onClick={()=>navigate(-1)}><p>Back</p></div>
        :<></>
    }
    <Link to='/myjobs' className="allJobLink navLink">All Jobs</Link>
            <div className="logout navLink" onClick={logout}>Logout</div>

            </div>
            </>
            :<div className="titleContainer">
            <p className="navTitle">Job Tracker</p>
        </div>}
          
       </div>
    );
  }
  
  export default Nav;
  