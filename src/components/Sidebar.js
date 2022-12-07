import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../assets/img/logo.svg';
import { axiosObject } from '../services/BaseService';
import LoginActions from '../pages/login/LoginAction';
import { useDispatch, useSelector } from 'react-redux';
import ls from 'local-storage';
import { login } from '../helper';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const loginDetails = useSelector(state => state.LoginReducer.payload);
    const [location,setLocation] = useState("");

    const collapsedEvent = (outer, innervalue) => {
        console.log(
          "document.getElementById(innervalue)===",
          document.getElementById(innervalue).className
        );
        if (document.getElementById(innervalue).className === "collapse show") {
          document.getElementById(innervalue).setAttribute("class", "collapse");
          document
            .getElementById(outer)
            .setAttribute(
              "class",
              "sidebar-link btn btn-toggle align-items-center collapsed "
            );
        } else {
          document
            .getElementById(innervalue)
            .setAttribute("class", "collapse show");
          document
            .getElementById(outer)
            .setAttribute(
              "class",
              "sidebar-link btn btn-toggle align-items-center collsapsed-symbl"
            );
        }
      };

    return (

        

        <aside id="sidebar-wrapper">



            <ul className="sidebar-nav">

                {loginDetails[0].vendor_id !== 23 ?
                    <>
                        <li><NavLink to="/dashboard"><i className="fa-solid fa-house"></i>  Dashboard</NavLink></li>
                        <li><NavLink to="/customers"><i className="fa-solid fa-user-group"></i>  Customers </NavLink></li>
                        <li><NavLink to="/dailyfinance"><i className="fa-solid fa-calendar-day"></i>  Daily Finance </NavLink></li>
                        <li><NavLink to="/weeklyfinance"><i className="fa-solid fa-calendar-week"></i>  Weekly Finance </NavLink></li>
                        <li><NavLink to="/monthlyfinance"><i className="fa-solid fa-calendar-days"></i>  Monthly Finance </NavLink></li>
                        <li><NavLink to="/addexpense"> <i class="fa-solid fa-pie-chart"></i> Expenses </NavLink></li>


                        {loginDetails[0].user_type !== "Super Admin" ?
                            <>

                            </> :
                            <>

                                <li><NavLink to="/reports"> <i class="fa-solid fa-chart-line"></i> Reports </NavLink></li>
                                <li><NavLink to="/collectionreports"><i class="fa-solid fa-chart-column"></i>Collection Reports </NavLink></li>
                                <li><NavLink to="/auditrecord"> <i class="fa-solid fa-hand-holding-dollar"></i> Audit Record </NavLink></li>
                                <li><NavLink to="/companyprofile"> <i class="fa-solid fa-gear"></i> Company Profile </NavLink></li>
                                <li><NavLink to="/nextdayreport"> <i class="fa-solid fa-gear"></i> Next Day Report </NavLink></li>
                            </>
                        }

                        {loginDetails[0].vendor_id === 3 ?
                            <>
                                {/* <li><NavLink to="/chitfounds"> <i class="fa-solid fa-hand-holding-dollar"></i> Chit Funds </NavLink></li> */}
                        {/* <li><NavLink to="/dashboard"><i className="fa-solid fa-house"></i>  Dashboard</NavLink></li> */}
                               
                                <li class="sidebar-item">
                    <button
                      id="log_outer"
                      class="sidebar-link btn btn-toggle align-items-center  collapsed"
                      
                      onClick={() => {
                        collapsedEvent("log_outer", "logs-collapse log_inner");
                      }}
                    //   data-bs-toggle="collapse"
                    //   data-bs-target="#logs-collapse"
                    //   aria-expanded="true"
                    >
                      {/* <i class="fas fa-clipboard-list"></i>
                      <span class="hide-menu">Chit Funds</span> */}
                                <li> <i class="fa-solid fa-hand-holding-dollar"></i> Chit Funds </li>

                      {/* <i class="fas fa-chevron-right ms-auto"></i> */}
                    </button>
                    <div class="collapse" id="logs-collapse log_inner">
                      <ul class="sidebar-nav">
                 
                         <li><a href='/dashboardchit'
                         className={
                              location.pathname === "/dashboardchit" ||
                              location.pathname === "/chitfounds" 

                               
                                ? "sidebar-link selected"
                                : "sidebar-link"
                            }
                          >

                            {" "}
            
                        <i class="fas fa-circle inner-circle"></i>Dashboard Chit
                          </a> 
                        </li> 
                        {/* <li><NavLink to="/dashboardchit"><i class="fas fa-circle inner-circle"></i>  Dashboard Chit</NavLink></li> */}

                        <li><a href='/chitfounds'>
            
                          <i class="fas fa-circle inner-circle"></i>Chit
                         </a> 
                        </li>
                                {/* <li><NavLink to="/chitfounds"> <i class="fas fa-circle inner-circle"></i> Chit  </NavLink></li> */}

                     
                      
                      </ul>
                    </div>
                  </li>
                            </> :
                            <>
                            </>
                        }
                    </> :
                    <>
                        <li><NavLink to="/weeklydashboard"><i className="fa-solid fa-house"></i>  Dashboard</NavLink></li>
                        <li><NavLink to="/weeklycustomers"><i className="fa-solid fa-user-group"></i>  Customers </NavLink></li>
                        <li><NavLink to="/weeklyloanfinance"><i className="fa-solid fa-calendar-week"></i>  Weekly Finance </NavLink></li>
                        <li ><NavLink to="/addexpense"> <i class="fa-solid fa-pie-chart"></i> Expenses </NavLink></li>
                 
                    {loginDetails[0].user_type !== "Super Admin" ?
                    <>

                    </> :
                    <>
                         <li><NavLink to="/weeklyreports"><i className="fa-solid fa-chart-line"></i>  Reports</NavLink></li>
                        <li><NavLink to="/weeklycollectionreports"><i className="fa-solid fa-chart-column"></i> Collection Reports</NavLink></li>
                        <li><NavLink to="/auditrecord"> <i class="fa-solid fa-hand-holding-dollar"></i> Audit Record </NavLink></li>
                        <li><NavLink to="/companyprofile"> <i class="fa-solid fa-gear"></i> Company Profile </NavLink></li>
                        <li><NavLink to="/weeklynextdayreport"> <i class="fa-solid fa-gear"></i> Next Day Report </NavLink></li>
                       
                    </>
                }
                 </>
                }
            </ul>
            <div className="sidebar-brand">
                <img src={logo} alt="My Fin Buddy" />
            </div>
        </aside>

    )

}


export default Sidebar;


