import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import "./commonPopup.css"

const SessionConfirmationPopup = props => {
    const history = useHistory();
    const [isContinue, setIsContinue] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [countDown, setCountDown] = useState(30)

    useEffect(() => {
        props.isToggle(isOpen);
        const timeout = setTimeout(()=>{
            if(!isContinue){    
                window.localStorage.clear();
                history.push("/")
                setIsOpen(false)
            }
        },30000)
        return () => clearTimeout(timeout);
    }, [isContinue,isOpen]);

    useEffect(() => {
        if(countDown>0){
            const interval = setInterval(() => {
                setCountDown(countDown-1)
              }, 1000);
            return () => clearInterval(interval);
        }        
      }, [countDown]);


    const Continue = () => {
        setIsContinue(true)
        setIsOpen(false)
    }

    const Close = () => {
        setIsContinue(false)
        setIsOpen(false)
        window.localStorage.clear();
        history.push("/")
    }

    return (
        <div className="popup-box">
            <div id="" className="CommonModels-box">
                <div className="Commonfullformblock col-lg-9">
                    <div className="CommonContainer">
                        <div className="CommonModalcontent">
                            <div className="CommonModalbody">
                                <h2>{"Session Timeout"}</h2>
                                <p>{`The current session is about to expire in ${countDown}sec`}</p>
                                <p>{`Would you like to continue the session?`}</p>
                            </div>
                            <div className="CommonModalfooter session">
                                <button className="cta-btns" onClick={Continue} >continue</button> 
                                <button className="cta-btns" onClick={Close} >logout</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
SessionConfirmationPopup.propTypes = {
    isToggle: PropTypes.func,
  }

export default SessionConfirmationPopup;