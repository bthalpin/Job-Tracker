import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './nav.css';

function Nav() {
    const navigate = useNavigate()
    
    return (
       <div className="navigation">
           {window.location.pathname!=='/'?
           <div onClick={()=>navigate(-1)}>Back</div>
           :<></>
           }
           <Link to="/">Companies</Link>
           <Link to='/'>Logout</Link>
       </div>
    );
  }
  
  export default Nav;
  