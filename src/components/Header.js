import React, { useState, useEffect } from 'react';
import avatar from '../assets/img/avatar.png'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import mfb from '../../src/assets/img/buddy_Icon.png';
import { axiosObject } from '../services/BaseService'


const Header = () => {
    const loginDetails = useSelector(state => state.LoginReducer.payload);


    let navigate = useNavigate();

    const handleLogOut = () => {
        window.localStorage.clear()
        navigate("/login");

    }

    <li className='logoutMenu' onClick={handleLogOut}></li>

    const [moreMenu, setmoreMenu] = useState(false);
    const [image, setImage] = useState(false);
    const [title, setTitle] = useState(false);
    const [Loading, setLoading] = useState("")
    const [remove, setRemove] = useState(false);

    const toggleOpen = () => {
        // const wrapper = document.querySelectorAll("#wrapper");
        // console.log("Tst", wrapper);
        // wrapper?.map(data =>{
        //     document.getElementById("wrapper").setAttribute("class", "toggled");
        // })

        const test = document.getElementById("wrapper");

        if (test.hasAttribute("class")) {
            console.log("Class");
            document.getElementById("wrapper").removeAttribute("class");
            setRemove(false);
        }
        else {
            document.getElementById("wrapper").setAttribute("class", "toggled");
            setRemove(true);
        }

    }

    const detailsView = () => {
        let request = {
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token,
            user_id: loginDetails[0].user_id,

        }

        axiosObject.post("companyProfile/condition", request)

            .then((response) => {
                setLoading(false);
                setImage(response.data.count[0]?.logo_url == null ? "" : response.data.count[0]?.logo_url);
                setTitle(response.data.count[0]?.title);


            });
    }
    const dashboard = () => {
        navigate("/dashboard");
    }

    useEffect(() => {
        detailsView()
    }, [])

    return (

        <div id="header-wrapper">
            <nav className="navbar">

                <div className='menuLeft col-7 text-start'>
                    <a href="#" onClick={() => toggleOpen()} className="burgerMenu" id="sidebar-toggle">
                        {remove === false ?
                            <i className="fa fa-bars"></i> : <i class="fa-solid fa-x"></i>}</a>
                    <h2 className='brandIcon'><img src={image === "" ? mfb : image} onClick={dashboard} /* alt="Buddy Logo" */ isloading={false} /> <span className='vendorName' onClick={dashboard} >{title}</span> </h2>
                </div>
                {/* <div className='col-3 topSearch'>
                <input type="text" name="search" id="search" className="form-control" placeholder='Search' />
                <button><i className="fa fa-search"></i></button>
            </div> */}
                <div className='col-5 menuRight'>
                    <div className='navbarRight'>
                        <ul>
                            <li>
                                <div className='topUser d-flex'>
                                    <img alt='User' src={avatar} className="usericon" />
                                    <div className='usersDetails'>
                                        <p className='uname'>{loginDetails[0].companyusername}</p>
                                        <p className='urole'>{loginDetails[0].user_type}</p>

                                    </div>

                                </div>
                            </li>

                            <li className='logoutMenu' onClick={handleLogOut}><div className='nav-link icon logout-arrow'><i className="fa fa-power-off"></i></div>

                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </div>

    )
}


export default Header;