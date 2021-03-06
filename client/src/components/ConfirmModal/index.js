import React from 'react';
import './confirmModal.css';

function ConfirmModal({show,setShow,action,name,type,callBack}) {
    const handleConfirm = () => {
        callBack()
    }
    return (
        <>
        <div className={`confirmContainer ${show}`} onClick={()=>setShow('')}>
            <div className="confirmCard">

                {/* Context sensitive confirm message */}
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
  