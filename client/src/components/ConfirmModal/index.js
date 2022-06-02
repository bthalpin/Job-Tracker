import React, {useState} from 'react';
import './confirmModal.css';

function ConfirmModal({show,setShow,action,name,callBack}) {
    // const [show,setShow] = useState('')
    const handleConfirm = () => {
        callBack()
    }
    return (
        <>
        {/* <button onClick={()=>setShow('show')}>show</button> */}
        <div className={`confirmContainer ${show}`} onClick={()=>setShow('')}>
            <div className="confirmCard">
                <p>{`Are you sure you want to ${action} ${name}?`}</p>
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={()=>setShow('')}>Cancel</button>
            </div>
        </div>
        </>
    );
  }
  
  export default ConfirmModal;
  