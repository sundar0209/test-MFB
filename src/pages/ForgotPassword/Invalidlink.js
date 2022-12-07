import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Loading from "../../components/Loading";


const Invalidlink = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])



    return (
        <div className="invalidlink">
            {loading ? <Loading /> :
                <div className="container loginPage">
                <div className="col-lg-6 card loginBlock">

                        <div className="myfinbuddy-login">
                            <img src={logo} alt="logo" />
                        </div>
                        <form  >
                            <h2 className="title">This Link is not active anymore</h2>
                        </form>

                        <div className="col-lg-12 topBack">
                            <div className="add-user">
                                <p>Back to <Link to='/login'>Sign In</Link></p>
                                {/* /////<a className="back-btns" href="JavaScript:void(0)" onClick={() => navigate('/login')}><i className='bx bx-left-arrow-alt'></i> back</a> */}
                            </div>
                        </div>

                    </div>
                </div>

            }
        </div>
    )
}
export default Invalidlink; 