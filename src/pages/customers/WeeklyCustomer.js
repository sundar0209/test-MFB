import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { axiosObject } from '../../services/BaseService'
import ls from 'local-storage';
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from 'react-redux';





const WeeklyCustomers = () => {

    const loginDetails = useSelector(state => state.LoginReducer.payload);

    console.log("loginDetails", loginDetails[0].user_id)


    const redirection = (customer_id) => {
        navigate({ pathname: "/WeeklyViewCustomer" });
        ls.set("customrId", customer_id);
        console.log("customrId", customer_id);
    };
    const columns = [

        {
            name: 'S.No',
            maxWidth: "60px",
            selector: (row, index) => index + 1
        },
        {
            name: 'Customer ID',
            // sortable: true,
            //selector: row => row.customer_id,
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
            name: 'Cust Account Number',
            selector: row => row.cust_account_number,
            sortable: true,
            minWidth: "200px",
        },
        {
            name: 'Name',
            selector: row => row.customer_name,
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
                        <a href={"tel:+91" + row.customer_phone} id="phone">{row.customer_phone}</a>
                    </div>
                );
            },
        },
        {
            name: 'Area',
            selector: row => row.area,
            sortable: true,
            minWidth: "200px",
        },
        // {


        //     name: 'Address',
        //     selector: row => row.customeraddress,
        //     sortable: true,
        //     minWidth: "200px",
        // },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Agent Name',
            selector: row => row.name,
            sortable: true,
            minWidth: "200px",
        },
        {
            name: 'No of Loans',
            selector: row => row.numberofloans,
            sortable: true,
            minWidth: "160px",
        },

        // {
        //     name: 'Loan Status',
        //     selector: row => row.isactive == 0 ? <span className='text-color-orange'>Overdue </span> : row.isactive == 1 ? <span className='text-color-green'>Active</span> : <span className='text-color-red'>Closed</span>,
        //     sortable: true,
        //     minWidth: "140px",
        // },


        {
            name: 'Action',
            className: "action",
            sortable: false,
            cell: (row) => {
                return (
                    <div className='tableBtns'>
                        <button className="btn btn-primary btn-outline smallBtn" onClick={() => editCustomer(row.customer_id)}>
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button className="btn btn-primary btn-outline smallBtn" onClick={() => viewCustomer(row.customer_id)}>
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                );
            },
        }

    ];



    const [cmlist, setCmlist] = useState([]);
    const [name, setName] = useState("");
    const [custName, setCustName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [custID, setCustId] = useState("");
    const [loading, setLoading] = useState(true);

    const [SalesList, setSalesList] = useState("");
    const [areaList, setAreaList] = useState("");
    const [areaId, setAreaId] = useState("");
    const [cusSelectedAreaId, setCusSelectedAreaId] = useState("");

    const [cusSalesId, setCusSalesId] = useState("");
    const [cusSelectedSalesId, setCusSelectedSalesId] = useState("");
    const [dailyFinList, setDailyFinList] = useState([]);


    let navigate = useNavigate();
    const createNewCustomer = () => {
        navigate("/weeklyaddcustomer");
    }

    const editCustomer = (data) => {
        console.log("customer id====", data);
        // ls.set("customerId", data)					
        // navigate("/editcustomer");
        navigate("/WeeklyEditCustomer", { state: { customerId: data } });
    }

    const viewCustomer = (data) => {
        console.log("expense id====", data);
        ls.set("customrId", data)
        navigate("/WeeklyViewCustomer", { state: { customerId: data } });


    }
    const AreaClear = () => {
        setAreaList("");

    }

    const customerFilter = (data) => {
        let request = {
            filter_id: data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        axiosObject.post("customerSalesFilter/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)

            setCmlist(response.data.data);
            // setTotalRecords(response.data.data.length);
            if (response.data.success == true) {
                console.log("check tiket id's", response.data.data)

            }

        });
    }

    const customerListDetails = () => {
        let request = {
            vendor_id: loginDetails[0].vendor_id,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token
        }
        axiosObject.post("usersdropdown/condition", request).then(response => {

            console.log("usersdropdown Details response", response.data.data)
            setSalesList(response.data.data);




        });
    }
    const areaFilter = (data) => {

        let request = {
            // status: data,
            area: !data ? "" : data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }
        console.log("req??", request);
        axiosObject.post("areaFilter/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)
            setCmlist(response.data.data);

        });
    }

    const agentFilter1 = () => {

        let request = {
            vendor_id: loginDetails[0].vendor_id,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token
        }


        axiosObject.post("arealistdropdown/condition", request).then(response => {

            console.log("usersdropdown Details response", response.data.data)
            setAreaList(response.data.data);


        });
    }

    // const agentFilter = (data) => {
    //     let request = {
    //         filter_id: data,
    //         user_id: loginDetails[0].user_id,
    //         vendor_id: loginDetails[0].vendor_id,
    //         token: loginDetails[0].token
    //     }
    //     axiosObject.post("customerSalesFilter/condition", request).then(response => {

    //         console.log("customerSalesFilter Details response", response.data.data)
    //         setCmlist(response.data.data);
    //     });
    // }

    const handleBuyerId = (e) => {
        setCusSalesId(e.target.value);
        console.log("=========check===", e.target.value);
        setCusSelectedSalesId(
            SalesList.filter((data) => data.user_id == e.target.value)[0]
        );
        console.log("=========check",
            SalesList.filter((data) => data.user_id == e.target.value)[0]
        );
        customerFilter(e.target.value)


    };

    const handleBuyerId1 = (e) => {
        setAreaId(e.target.value);
        console.log("=========check===", e.target.value);
        setCusSelectedAreaId(
            areaList.filter((data) => data.user_id == e.target.value)[0]
        );
        console.log("=========check",
            areaList.filter((data) => data.user_id == e.target.value)[0]
        );
        areaFilter(e.target.value)
    };



    const onSearch = (e) => {
        setName(e.target.value)
        setCustId(e.target.value)
        setPhone(e.target.value)
        setAddress(e.target.value)
    }

    const SearchInventory = () => {

        let request = {

            data: custID,
            data: name,
            data: phone,
            data: address,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        axiosObject.post("customerSearch/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)

            setCmlist(response.data.data);
            //   setTotalRecords(response.data.data.length);

        });


    }





    const getCustData = () => {

        let request = {
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        axiosObject
            .post("/customerList/condition", request)

            .then((response) => {
                console.log(response);
                setCmlist(response.data.data);
                setCustId(response.data.data[0]?.customer_id);
                setCustName(response.data.data[0]?.customer_name);
                setLoading(false);

            });
    }

    const onKeydowninSearch = (event) => {
        if (event.key === "Enter") {
            console.log("Enter is pressed call search function");
            SearchInventory();
        }
    };

    useEffect(() => {
        customerListDetails();
        // areaFilter();
        agentFilter1()
    }, [])
    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    }



    useEffect(() => {
        if (custID != "") {
            const timer = setTimeout(() => {
                SearchInventory();
            }, 1);
            return () => {
                clearTimeout(timer);
            };
        } else {
            getCustData();
        }
    }, [custID]);




    return (
        <div>

            <div id="wrapper" >

                <Header />
                <Sidebar />

                <section id="content-wrapper" className='customersPage'>
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-4">
                            <h1 className='pageHead mt-2'>Customers </h1>
                        </div>

                        <div className="col-lg-8 col-md-8 col-sm-8 col-8 tableSearchBlock">

                        <div className='col-4 tableSearch'>
                                <input
                                    type="text"
                                    placeholder='Search'
                                    class="form-control"
                                    id="billofsale"
                                    onKeyDown={onKeydowninSearch}
                                    onChange={onSearch}
                                />
                                <i class="fa-solid fa-magnifying-glass searchIcon"></i>
                            </div>
                            <div class="col-4">

                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    id="BankAcc"
                                    onChange={handleBuyerId1}
                                >
                                    <option style={{ display: "none" }}>Filter By Area</option>
                                    <option value="">--Select All--</option>
                                    {areaList?.length > 0 && (
                                        <>
                                            {areaList.map((areaList) => (
                                                <option
                                                    key={areaList.user_id}
                                                    value={areaList.user_id}
                                                >

                                                    {areaList.area}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>




                            <div class="col-4 selectStatus">

                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    id="BankAcc"
                                    onChange={handleBuyerId}
                                >
                                    <option style={{ display: "none" }}>Filter By Agent</option>
                                    <option value="">--Select All--</option>
                                    {SalesList?.length > 0 && (
                                        <>
                                            {SalesList.map((SalesList) => (
                                                <option
                                                    key={SalesList.user_id}
                                                    value={SalesList.user_id}
                                                >

                                                    {SalesList.name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className='col-4 add-customer'>
                                <button type="submit" onClick={createNewCustomer} className="btn btn-primary float-end addBtn"><i className="fa fa-plus"></i> <span className='label'>Add New Customer</span></button>
                            </div>


                        </div>
                        {loading ? <Loading /> :

                            <div class="col-12 mt-0 fixedLastCol">
                                <DataTable className='girdTable' highlightOnHover columns={columns} data={cmlist} defaultSortFieldId={1} pagination={true} />
                            </div>}


                    </div>
                </section>
            </div>
        </div>

    )

}


export default WeeklyCustomers;