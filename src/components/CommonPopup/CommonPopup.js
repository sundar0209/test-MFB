import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import checkImg from '../../assets/img/check.png';
import errorImg from '../../assets/img/close.png';
import warningImg from '../../assets/img/warning.png';
import "./commonPopup.css"

const CommonPopup = props => {
    const navigate = useNavigate();



    // Example values for reference

    // const { handleClose, 
    //     popupTitle = "ERROR",
    //     popupMsg = "something went wrong please try again", 
    //     popupType = 'error',             //("success or error or confirm")
    //     popupActionType = 'close',       //("redirect  or close or confirm or refresh")
    //     popupActionValue = 'close',      //("any string you like to display")
    //     popupActionPath } = props;       //("where you like to redirect")

    const { handleClose, popupTitle, popupMsg, popupType, popupActionType, popupActionValue, popupActionPath, Confirmation } = props;
    return (
        <div className="popup-box">
            <div id="" className="CommonModels-box">
                <div className="Commonfullformblock col-lg-6">
                    <div className="CommonContainer">
                        <div className="CommonModalcontent">
                            <div className="Commonfull-icon">
                                <img className={popupType.toLowerCase() === "success" ? "successImg" : popupType.toLowerCase() === "error" ? "errorImg" : warningImg} alt="" src={popupType.toLowerCase() === "success" ? checkImg : popupType.toLowerCase() === "error" ? errorImg : warningImg} />
                            </div>
                            <div className="CommonModalbody">
                                {popupTitle !== "" && <h2>{popupTitle}</h2>}
                                <p>{popupMsg}</p>
                            </div>
                            <div className="CommonModalfooter ">


                                {popupActionType.toLowerCase() === "confirm" && (<div className="CommonModalfooter session">
                                    <button className="btn btn-primary  smallBtn btn-outline" onClick={handleClose} >Cancel</button>
                                    <button className="btn btn-primary  smallBtn" onClick={Confirmation} >OK</button>
                                    <button className="cta-btn btn-smlprimary" onClick={handleClose} >CANCEL</button>
                                    <button className="btn btn-smlprimary" onClick={Confirmation} >OK</button>
                                </div>)}

                                {popupActionType.toLowerCase() === "redirect" && <a className="btn btn-primary  smallBtn" onClick={() => navigate(popupActionPath)} >{popupActionValue}</a>}
                                {popupActionType.toLowerCase() === "close" && <button className="btn btn-primary btn-outline  smallBtn" onClick={handleClose} >{popupActionValue}</button>}
                                {popupActionType.toLowerCase() === "refresh" && <a class="btn btn-primary  smallBtn" href={popupActionPath}>{popupActionValue}</a>}

                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}

CommonPopup.propTypes = {
    handleClose: PropTypes.func,
    popupTitle: PropTypes.string,
    popupMsg: PropTypes.string,
    popupType: PropTypes.string,
    popupActionType: PropTypes.string,
    popupActionValue: PropTypes.string,
    popupActionPath: PropTypes.string,
    Confirmation: PropTypes.func
}

export default CommonPopup;