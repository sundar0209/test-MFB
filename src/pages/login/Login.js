import React, { useState } from 'react';
import { InputText, Checkbox } from '../../components/FormFields';
import logo from '../../assets/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { axiosObject } from '../../services/BaseService'
import ls from 'local-storage';
import LoginActions from './LoginAction';
import { useDispatch, useSelector } from 'react-redux';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from '../../helper';



const Login = () => {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitClicked, setSubmitClicked] = useState(false);
    const [invalidUser, setinvalidUser] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" })
    const [showPwd, setShowPwd] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye} />;


    const successData = useSelector(state => state);
    const dispatch = useDispatch();
    console.log("successData", successData);



    const loginSubmit = (e) => {
        login();
        setSubmitClicked(true)
        console.log(username, password);
        e.preventDefault();
        if (username.length === 0) {
            console.log("Username is empty");
            setErrors({ email: "Email Id is required", password: "" });
            return;

        }
        else if (username && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(username)) {
            console.log("email format mismatch");
            setErrors({ email: "Must match the email format", password: "" });
            return;
        }


        if (password.length === 0) {
            console.log("password is empty");
            setErrors({ email: "", password: "Password is required" });
            return
        }
        else {
            console.log("everything is correct");
            setErrors({ email: "", password: "" })
        }

        let request = {
            email: username,
            password: password,

        };

        {
            axiosObject.post("login/login", request)
                .then((response) => {
                    console.log("response.data.data", response.data.data)
                    if (response.data.success == true) {
                        ls.set("loginDetails", response.data.data)
                        dispatch(LoginActions.success(response.data.data))
                        navigate("/dashboard");
                    } else {
                        setErrors({ email: "Please provide correct Email/Password", password: "" });
                    }
                }



                )
        }
    }

    function togglepwd(e) {
        e.preventDefault();
        setShowPwd(!showPwd);
    }

    const forgotPassSubmit = () => {
        navigate("/forgotpassword");
    }



    return (

        <div>
            <div className="container-fluid loginPage">
                <div className="row">
                    <div className="col loginContainer">


                        <div className='mb-4'>
                            <span className='logo'><img src={logo} alt="MyFin Buddy" /></span>
                        </div>

                        <h1 className='text-center'>Login</h1>
                        <form >

                            <p className='errormsg'>{errors.email}</p>
                            <p className='errormsg'>{errors.password}</p>

                            <InputText className={`${username.length === 0 && (submitClicked || invalidUser) ? 'error' : ''}`} onChange={(e) => setUsername(e.target.value)} labelText="Username" inputName="Password" inputType="text" />
                            {/* <InputText className={`${password.length === 0 && (submitClicked || invalidUser) ? 'error' : ''}`} onChange={(e) => setPassword(e.target.value)} labelText="Password" inputName="Password" inputType="pwd" /> */}
                            <div className="form-group passwordBlock">
                                <label className="form-label">Password</label>
                                <input className={`${username.length === 0 && (submitClicked || invalidUser) ? 'form-control error' : 'form-control'}`} type={showPwd ? "text" : "password"} id="psw" placeholder="" name="psw"
                                    onChange={(e) => setPassword(e.target.value)} />
                                <i htmlFor="psw" className="passwordeye" onClick={togglepwd}>{eye}</i>
                            </div>



                            <div className="form-group remindme">
                                <Checkbox labelText="Keep me signed in" inputId="Keepmesignedin" />
                                <p className='float-end' onClick={forgotPassSubmit}><Link to='/'>Forgot Password?</Link></p>
                            </div>

                            <div className="form-group loginBtn">
                                <button onClick={loginSubmit} type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Login;