import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { axiosObject } from '../../services/BaseService'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from 'react-redux';
import ls from 'local-storage';




const Dashboard = () => {
    const loginDetails = useSelector(state => state.LoginReducer.payload);

    console.log("loginDetails", loginDetails[0].user_id)


    const columns = [
        {
            name: 'Group ID',
            selector: row => row.group_id,
            sortable: true,
        },

        {
            name: 'Total Amount',
            selector: row => row.total_amount,
            sortable: true,
            minWidth: "200px",
        },
        {
            name: 'Total Months',
            selector: row => row.total_months,
            sortable: true,
            minWidth: "200px",
        },


        {
            name: 'Monthly Amount',
            selector: row => row.monthly_amount,
            sortable: true,
            minWidth: "140px",
        },


        {
            name: 'Start Months',
            selector: row => row.start_months,
            sortable: true,
        },
        {
            name: 'End Months',
            selector: row => row.end_months,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: 'Action Date',
            selector: row => row.action_date,
            sortable: true,
            minWidth: "140px",
        },


        {
            name: 'Commission',
            selector: row => row.commission,
            sortable: true,
            minWidth: "200px",
        },

        {
            name: 'Commission Percentage',
            selector: row => row.commission_percentage,
            sortable: true,
            minWidth: "200px",
        },

        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
            minWidth: "200px",
        },

        {
            name: 'Remaining Months',
            selector: row => row.remaining_months,
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
    const [count, setCount] = useState([]);
    const [header, setHeader] = useState([]);
    console.log("======>", setCount);
    const [loading, setLoading] = useState(true);



    const viewCustomer = (data) => {
        // ls.set("viewCustomerId", data)
        ls.set("customrId", data)
        navigate("/viewcustomer", { state: { customerId: data } });
    }
    const redirection = (customer_id) => {
        navigate({ pathname: "/viewcustomer" });
        ls.set("customrId", customer_id);
        console.log("customrId", customer_id);
    };


    // const detailsView = () => {
    //     let request = {
    //         vendor_id: loginDetails[0].vendor_id,
    //         user_id: loginDetails[0].user_id,
    //         token: loginDetails[0].token
    //     }

    //     axiosObject.post("DashboardCalculation/condition", request)

    //         .then((response) => {
    //             // setHeader(response.data.count[0]);
    //             setCount(response.data?.data);

    //         });
    // }

    useEffect(() => {
        getCustData()
        // detailsView()

    }, [])


    const getCustData = () => {

        let request = {
            vendor_id: loginDetails[0].vendor_id,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token
        }

        axiosObject
            .post("chitDashBoard/condition", request)

            .then((response) => {
                console.log(response);
                setCmlist(response.data?.data);
                setHeader(response.data.count[0]);
                setCount(response.data[0]?.data);
                console.log("count???", response.data[0]?.data);
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
                            <h1 className='pageHead'>Dashboard Chit</h1>


                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xl-12 dashboardCounts">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                            <div class="card overflow-hidden">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h6 class="">Total Amount</h6>
                                                            <h3 class="mb-2 number-font"><span className='rupee'>₹</span>{header?.total_amount}</h3>
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
                                                            <h6 class="">Total Group</h6>
                                                            <h3 class="mb-2 number-font"><span className='rupee'>₹</span>{header?.groupcount}</h3>
                                                        </div>
                                                        <div class="col col-auto">
                                                            <div class="counter-icon orangeBg box-shadow-primary brround ms-auto"><i class="fa-solid fa-indian-rupee-sign"></i></div>
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
                                        <div class="card-header"> <h2 class="card-title m-2">Chit Details</h2> </div>
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


export default Dashboard;