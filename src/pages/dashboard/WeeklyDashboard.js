import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { axiosObject } from '../../services/BaseService'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from 'react-redux';
import ls from 'local-storage';




const WeeklyDashboard = () => {
    const loginDetails = useSelector(state => state.LoginReducer.payload);

    console.log("loginDetails", loginDetails[0].user_id)


    const columns = [
        {
            name: 'Customer ID',
            //selector: row => <a href={"/viewcustomer"}>{row.customer_phone}</a>,
            sortable: true,
            minWidth: "140px",
            cell: (row) => {
                return (
                    <div className='custIDCol'>
                        <a onClick={() => redirection(row.customer_id)}>{row.vendor_customer_id}</a>
                    </div>
                );
            }
        },


        {
            name: 'Name',
            selector: row => row.customer_name,
            sortable: true,
            minWidth: "200px",
        },
        {
            name: 'Area',
            selector: row => row.area,
            sortable: true,
            minWidth: "200px",
        },
        {
            name: 'Phone',
            sortable: true,
            minWidth: "120px",
            cell: (row) => {
                return (
                    <div className='phoneNo'>
                        <a href={"tel:+91" + row.customer_phone} >{row.customer_phone}</a>
                    </div>
                );
            },
        },

        {
            name: 'Loan Date',
            selector: row => row.date,
            sortable: true,
            minWidth: "120px",
        },


        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'DOB',
            selector: row => row.dob,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: 'Total Loans',
            selector: row => row.numberofloans,
            sortable: true,
            minWidth: "140px",
        },


        {
            name: 'Agent Name',
            selector: row => row.name,
            sortable: true,
            minWidth: "200px",
        },


        {
            name: 'Action',
            tableStyle: "actionHead",
            sortable: false,
            cell: (row) => {
                return (
                    <div className='tableBtns'>
                        <button className="btn btn-primary btn-outline smallBtn" onClick={() => viewCustomer(row.customer_id)}>
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                );
            },
        },
    ];

    let navigate = useNavigate();



    const [cmlist, setCmlist] = useState([]);
    const [count, setCount] = useState('');
    const [loading, setLoading] = useState(true);



    const viewCustomer = (data) => {
        // ls.set("viewCustomerId", data)
        ls.set("customrId", data)
        navigate("/WeeklyViewCustomer", { state: { customerId: data } });
    }
    const redirection = (customer_id) => {
        navigate({ pathname: "/WeeklyViewCustomer" });
        ls.set("customrId", customer_id);
        console.log("customrId", customer_id);
    };


    const detailsView = () => {
        let request = {
            vendor_id: loginDetails[0].vendor_id,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token
        }

        axiosObject.post("DashboardCalculation/condition", request)

            .then((response) => {
                // setHeader(response.data.count[0]);
                setCount(response.data?.data);

            });
    }

    useEffect(() => {
        getCustData()
        detailsView()

    }, [])


    const getCustData = () => {

        let request = {
            vendor_id: loginDetails[0].vendor_id,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token
        }

        axiosObject
            .post("dashboardList/condition", request)

            .then((response) => {
                console.log(response);
                setCmlist(response.data?.data);
                console.log("");
                setLoading(false);

            });
    }


    return (
        <div>

            <div id="wrapper">
                <Header />
                <Sidebar />


                <section id="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className='pageHead'>Dashboard </h1>


                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xl-12 dashboardCounts">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                            <div class="card overflow-hidden">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h6 class="">Total Investment</h6>
                                                            <h3 class="mb-2 number-font"><span className='rupee'>₹</span>{count?.totalamount}</h3>
                                                        </div>
                                                        <div class="col col-auto">
                                                            <div class="counter-icon greenBg box-shadow-primary brround ms-auto"><i class="fa-solid fa-indian-rupee-sign"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                            <div class="card overflow-hidden">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h6 class="">Available Cash</h6>
                                                            <h3 class="mb-2 number-font"><span className='rupee'>₹</span>{count?.totalavalibleamount}</h3>
                                                        </div>
                                                        <div class="col col-auto">
                                                            <div class="counter-icon orangeBg box-shadow-primary brround ms-auto"><i class="fa-solid fa-indian-rupee-sign"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                            <div class="card overflow-hidden">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h6 class="">Inflow Cash</h6>
                                                            <h3 class="mb-2 number-font"><span className='rupee'>₹</span>{count?.totaloutcomeamnt}</h3>
                                                        </div>
                                                        <div class="col col-auto">
                                                            <div class="counter-icon blueBg box-shadow-primary brround ms-auto"> <i class="fa-solid fa-indian-rupee-sign"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                            <div class="card overflow-hidden">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h6 class="">Total Customer</h6>
                                                            <h3 class="number-font user"><span className='rupee'><i class="fa-solid fa-user"></i></span>{count?.customers}</h3>
                                                        </div>
                                                        <div class="col col-auto">
                                                            <div class="counter-icon pinkBg box-shadow-primary brround ms-auto"> <i class="fa-solid fa-users"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {loading ? <Loading /> :
                                <div class="col-12 mt-4">
                                    <div class="card">
                                        <div class="card-header"> <h2 class="card-title m-2">Recent Customers</h2> </div>
                                        <div class="card-body fixedLastCol">
                                            <DataTable className='girdTable' highlightOnHover columns={columns} data={cmlist} defaultSortFieldId={1} pagination />
                                        </div>

                                    </div>
                                </div>}

                        </div>
                    </div>
                </section>
            </div>
        </div>

    )

}


export default WeeklyDashboard;