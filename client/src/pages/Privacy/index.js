import React from 'react';
import {Link} from 'react-router-dom';

function Privacy() {
    
    return (
        <div>  
            <h2>Job Tracker Privacy Policy</h2>
            <p>
                Your name and email are stored in our database for the sole purpose of creating your user account.  The information is never shared to anyone or used for any other purpose.
            </p>
            <br></br>
            <Link to={'/'} >Return to Login</Link>
        
        </div>
    );
}

export default Privacy;
