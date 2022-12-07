import React, { useState } from 'react';
import { InputText } from '../../components/FormFields';
import logo from '../../assets/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";
import { axiosObject } from '../../services/BaseService'
import CommonPopup from '../../components/CommonPopup/CommonPopup';




const Forgotpassword = () => {

    // let navigate = useNavigate();


    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const [email, setEmail] = useState("");

    const [emailError, setEmailError] = useState('');


    const forgotpasswordSubmit = () => {
        setEmailError("")

        if (!email) {
            setEmailError("Email ID is required")
            return;
        }
        else if (email && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)) {
            setEmailError("Must match the email format")
            return;
        }


        let request = {
            email: email,
        }
        axiosObject.post("forgotpassword/condition", request)
            .then((response) => {
                console.log("response.data.data", response.data.data)
                if (response.data.success == true) {
                    togglePopup()
                    setPopupTitle("FORGOT PASSWORD");
                    setPopupMsg("Password Link has been sent to given Email Id");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/login")
                }
                else {
                    togglePopup()
                    setPopupTitle("FORGOT PASSWORD");
                    setPopupMsg(response.data.error.err);
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }
            )

    }
    return (

        <div>
            <div className="container-fluid loginPage">
                <div className="row">
                    <div className="col loginContainer">
                        <div className='formBlock'>
                            <div className='mb-4'>
                                <span className='logo'><img src={logo} alt="MyFin Buddy" /></span>
                            </div>
                            <h1>Forgot your password?</h1>
                            <p>Enter your email registered on you account.</p>

                            <div className='loginFromContainer' >
                                <InputText placeHolder="Please Enter Email ID" labelText="Email" inputName="Username" inputType="text" inputId="uname" onChange={(e) => setEmail(e.target.value)} />
                                <p className="form-input-error" >{emailError}</p>

                                <div className="form-group loginBtn">
                                    <button type="button" className="btn btn-primary" onClick={forgotpasswordSubmit}>Submit</button>
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
        </div>
    )

}


export default Forgotpassword;