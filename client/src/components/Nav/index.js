import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Auth from '../../utils/auth';
import './nav.css';

function Nav() {
    const navigate = useNavigate()
    const logout = () => {
        Auth.logout()
    }
    return (
       <div className="navigation">
           {window.location.pathname!=='/'?
           <div onClick={()=>navigate(-1)}>Back</div>
           :<></>
           }
           <Link to="/">Companies</Link>
           <div onClick={logout}>Logout</div>
       </div>
    );
  }
  
  export default Nav;
  