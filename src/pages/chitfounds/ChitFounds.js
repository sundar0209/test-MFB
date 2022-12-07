import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { SelectStatus } from '../../components/FormFields';
import { useNavigate } from 'react-router-dom';
import { axiosObject } from '../../services/BaseService'
import DataTable from 'react-data-table-component';
import ls from 'local-storage';
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from 'react-redux';





const ChitFounds = () => {

    const loginDetails = useSelector(state => state.LoginReducer.payload);

    console.log("loginDetails", loginDetails[0].user_id)

    const [cflist, setCflist] = useState([])
    const [groupId, setGroupId] = useState("")
    // const [groupIid, setGroupIid] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);

    const redirection = (group_id) => {
        
        navigate({ pathname: "/ViewGroup" });
        ls.set("groupId", group_id);
        console.log("groupId", group_id);
    };

    let navigate = useNavigate();
    const creategroup = () => {
        navigate("/creategroup");
    }

    const viewLoan = (data) => {
        navigate("/viewgroup", { state: { groupId: data } });
    }

    const editloan = (data) => {
        navigate("/editgroup", { state: { groupId: data } });
        console.log("group id====", data);
    }


    const customerFilter = (data) => {

        let request = {
            status: data,
            vendor_id: loginDetails[0].vendor_id,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token
        }

        axiosObject.post("chitGroupFilter/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)

            setCflist(response.data.data);
            // setTotalRecords(response.data.data.length);
            if (response.data.success == true) {
                console.log("check tiket id's", response.data.data)

            }

        });
    }


    const onSearch = (e) => {
        setGroupId(e.target.value)

    }

    const SearchInventory = (data) => {

        let request = {

            data: search,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        axiosObject.post("chitGroupSearch/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)
            setSearch();
            setCflist(response.data.data);
            //   setTotalRecords(response.data.data.length);

        });


    }


    const getChitDetails = () => {

        let request = {
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token

        }

        axiosObject.post("/chitGroupList/condition", request)
            .then((response) => {
                console.log(response.data.data);
                setCflist(response.data.data);
                // setCflist(response.data.data);
                console.log("===setCflist===", response.data.data);

                setGroupId(response.data.data?.group_id);

                setLoading(false);

            });
    }

    const columns = [
        {
            name: 'Group ID',
            selector: row => row.group_id,
            sortable: true,
        },
        {
            name: 'Create Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Total Month',
            selector: row => row.total_months,
            sortable: true,
        },
        {
            name: 'Remaining Month',
            selector: row => row.remaining_months,
            sortable: true,
        },
        {
            name: 'Total Amount',
            selector: row => row.total_amount,
            sortable: true,
        },

        {
            name: 'Status',
            selector: row => row.isactive == 1 ? "Active" : "InActive",
            sortable: true,
        },
        {
            name: 'Action',
            tableStyle: "actionHead",
            sortable: false,
            cell: (row) => {
                return (
                    <div className='tableBtns'>
                        <button className="btn btn-primary btn-outline smallBtn" onClick={() => viewLoan(row.group_id)}>
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        <button className="btn btn-primary btn-outline smallBtn" onClick={() => editloan(row.group_id)} >
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                    </div>
                );
            },
        },
    ];


    const onKeydowninSearch = (event) => {
        if (event.key === "Enter") {
            console.log("Enter is pressed call search function");
            SearchInventory();
        }
    };

    useEffect(() => {
        if (search != "") {
            const timer = setTimeout(() => {
                SearchInventory();
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        } else {
            getChitDetails();
        }
    }, [search]);





    return (
        <div>

            <div id="wrapper">
                <Header />
                <Sidebar />


                <section id="content-wrapper">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                            <h1 className='pageHead mt-2'>Chit Funds </h1>
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
                                <div className='col-4 selectStatus'>
                                    <select className="form-select" id="statusSearch" onChange={(e) => customerFilter(e.target.value)}>
                                        <option selected>Filter</option>
                                        <option value="active">Active</option>
                                        <option value="close">In Active</option>
                                        <option value="pending">Pending</option>

                                    </select>
                                </div>
                                <div className='col-4 add-customer'>
                                    <button type="submit" onClick={creategroup} className="btn btn-primary float-end"><i className="fa fa-plus"></i>Add New Group</button>
                                </div>
                            
                        </div>
                        {loading ? <Loading /> :
                            <div class="col-12 mt-0">
                                <DataTable className='girdTable' highlightOnHover pagination columns={columns} data={cflist} />
                            </div>}
                    </div>
                </section>

            </div>
        </div>
        /*  */
    )

}


export default ChitFounds;