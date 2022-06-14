import React, {useState,useEffect} from 'react';
import {Link, useNavigate,useLocation} from 'react-router-dom';
import Auth from '../../utils/auth';
import './nav.css';

function Nav() {
    const navigate = useNavigate()
    const location = useLocation()
    const [collapse,setCollapse] = useState(true)
    // const [close,setClose] = useState(true)
    const [isLoggedIn,setIsLoggedIn] = useState()
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
    
    const close = (e) => {
        console.log(e.target.className)
        e.target.className==='menu'?setCollapse(false):setCollapse(true)
    }
    return (
        <div className={"navContainer"+(window.location.pathname==='/'?' hide':'')}>
           
        <div className={(collapse?'':' expanded')} onClick={(e)=>close(e)}>
       <div className="navigation">
           {isLoggedIn?
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
    <div className={`toggle ${collapse?' ':'expand'}`} onClick={()=>setCollapse(!collapse)}>
        <img className="menu" src="/images/menu.png" alt="menu"></img>
        {/* <div className={`allJobLink navLink`}> */}
            <div className={`home navLink  ${collapse?'collapse':''}`}><Link to="/home/">Home</Link></div>
    <div className={`allJobLink navLink  ${collapse?'collapse':''}`}><Link to='/myjobs'>All Jobs</Link></div>
            <div className={`logout navLink ${collapse?'collapse':''}`} onClick={logout}>Logout</div>
        </div>
        {/* </div> */}
            </div>
            </>
            :<div className="titleContainer">
            <p className="navTitle">Job Tracker</p>
        </div>}
          
       </div>
       </div>
        
       </div>
    );
  }
  
  export default Nav;
  