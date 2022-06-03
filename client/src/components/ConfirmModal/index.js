import React, {useState} from 'react';
import './confirmModal.css';

function ConfirmModal({show,setShow,action,name,type,callBack}) {
    // const [show,setShow] = useState('')
    const handleConfirm = () => {
        callBack()
    }
    return (
        <>
        {/* <button onClick={()=>setShow('show')}>show</button> */}
        <div className={`confirmContainer ${show}`} onClick={()=>setShow('')}>
            <div className="confirmCard">
                <p>{`Are you sure you want to ${action} the ${type} ${name}?`}</p>
                <div className="confirmBtnContainer">
                    <button className="confirmBtn" onClick={handleConfirm}>Confirm</button>
                    <button className="confirmBtn" onClick={()=>setShow('')}>Cancel</button>

                </div>
            </div>
        </div>
        </>
    );
  }
  
  export default ConfirmModal;
  