import React, { useState, useEffect } from 'react';
import { InputText } from '../../components/FormFields';
import logo from '../../assets/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";
import { axiosObject } from '../../services/BaseService';
import CommonPopup from '../../components/CommonPopup/CommonPopup';


const ForgotPasswordChange = () => {
    let navigate = useNavigate();

    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [invalidLinkCheck, setInvalidLinkCheck] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState('');

    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    let value = window.location.href.split("id=");
    console.log("value for id ====", value);

    const changePasswordSubmit = () => {
        setOldPasswordError("");
        setNewPasswordError("");


        if (!oldPassword) {
            setOldPasswordError("password is required")
            return;
        }
        else if (oldPassword && !new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}))/).test(oldPassword)) {
            setOldPasswordError("Password must have minimum of 8 characters with the combination of upper ,lower case letters , number and a special character")
            return;
        }
        if (!newPassword) {
            setNewPasswordError("Confirm Password is required")
            return;
        }
        else if (newPassword && !new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}))/).test(newPassword)) {
            setNewPasswordError("Confirm Password must have minimum of 8 characters with the combination of upper ,lower case letters , number and a special character")
            return;
        }
        else if (oldPassword !== newPassword) {
            setErrorMessage("Password and Confirm password doesn't match ! ");
            return;
        }

        let request = {

            user_id: value[1],
            newpassword: newPassword

        }
        console.log("==Req==", request)
        axiosObject.post("forgotpasswordEdit/update ", request)
            .then((response) => {
                console.log("response.data.data", response.data.data)
                if (response.data.success == true) {
                    togglePopup()
                    setPopupTitle("CHANGE PASSWORD");
                    setPopupMsg("Your Password has bean Changed Successfully");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/login")
                }
                else {
                    togglePopup()
                    setPopupTitle("CHANGE PASSWORD");
                    setPopupMsg(response.data.error.err);
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }
            )

    }

    const checkValid = () => {
        let request = {
            user_id: value[1]
        }
        axiosObject.post("urlstatus/condition", request).then((response) => {
            if (response.data.data.urlstatus === 0) {
                setInvalidLinkCheck(false)
                navigate('/invalidlink')
            }
            else {
                setInvalidLinkCheck(true)
            }
        })
    }
    useEffect(() => {
        checkValid();
    }, []);

    return (


        <div>
            {/* <div>{ */}
            {/* // invalidLinkCheck &&  */}

            <div className="container-fluid loginPage">
                <div className="row">
                    <div className="col loginContainer">
                        <div className='formBlock'>
                            <div className='mb-4'>
                                <span className='logo'><img src={logo} alt="MyFin Buddy" /></span>
                            </div>
                            <h1>Change password?</h1>

                            <div className='loginFromContainer' >
                                <InputText placeHolder="Please Password" labelText="Password" inputName="Password" inputType="text" inputId="uname" onChange={(e) => setOldPassword(e.target.value)} />
                                <p className="form-input-error" >{oldPasswordError}</p>

                                <InputText placeHolder="Please Enter Confirm Password" labelText="Confirm Password" inputName="Username" inputType="text" inputId="uname" onChange={(e) => setNewPassword(e.target.value)} />
                                <p className="form-input-error" >{newPasswordError}</p>
                                <p className="form-input-error">{errorMessage}</p>

                                <div className="form-group loginBtn">
                                    <button type="button" className="btn btn-primary" onClick={changePasswordSubmit}>Submit</button>
                                </div>

                                <p>Back to <Link to='/login'>Sign In</Link></p>

                            </div>
                        </div>
                    </div>


                </div>
                {isOpen &&
                    <CommonPopup
                        handleClose={togglePopup}
                        popupTitle={popupTitle}
                        popupMsg={popupMsg}
                        popupType={popupType}
                        popupActionType={popupActionType}
                        popupActionValue={popupActionValue}
                        popupActionPath={popupActionPath}
                    />}
            </div>
            {/* }</div> */}

        </div>
    )

}


export default ForgotPasswordChange;