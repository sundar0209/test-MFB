import React, { useState, useEffect } from 'react';
import { axiosObject } from '../../services/BaseService'
import Header from "../../components/Header"
import Modal from 'react-bootstrap/Modal'
import Sidebar from "../../components/Sidebar"
import { InputText, SelectGender, Checkbox, Radio } from '../../components/FormFields';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import uploadFile from '../../assets/img/uploadfile.jpg'
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../../components/Loading";
import { StatusCheckbox } from '../../components/FormFields';
import moment from "moment";
import Datetime from 'react-datetime';
import ls from 'local-storage';




const Auditrecord = () => {


    const loginDetails = useSelector(state => state.LoginReducer.payload);
    console.log("loginDetails", loginDetails)

    let navigate = useNavigate();
    const [cusSelectedSalesId, setCusSelectedSalesId] = useState("");
    const [cusSalesId, setCusSalesId] = useState("");

    const [SalesList, setSalesList] = useState("");
    const [loadingView, setLoadingView] = useState(true);
    const [loadingLoanView, setLoadingLoanView] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false)
    const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
    const [auditlist, setAuditlist] = useState("");
    const [loadMoreSearch, setLoadMoreSearch] = useState(8)
    const [FromDate, setFromDate] = useState("");
    const [ToDate, setToDate] = useState("");
    const [comments, setComments] = useState("");
    const [fromDateError, setFromDateError] = useState("");
    const [count, setCount] = useState("");
    const [show, setShow] = useState(false);
    const [loanviewshow, setLoanviewshow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Custshow, setCustShow] = useState(false);
    const [loanDetails, setLoanDetails] = useState("");
    const [collectionDetails, setCollectionDetails] = useState("");
    const [logindetails, setLogindetails] = useState("");
    const [loadingCust, setLoadingCust] = useState(true);
    const [loadingLoan, setLoadingLoan] = useState(true);
    const [customers, setCustomers] = useState("");
    const [auditrecord, setAuditrecord] = useState("");
    const [logindetailsFlag, setLogindetailsFlag] = useState(false);
    const [loanDetailsFlag, setLoanDetailsFlag] = useState(false);
    const [CollectionsFlag, setCollectionsFlag] = useState(false);
    const [customersFlag, setCustomersFlag] = useState(false);
    const [logindata, setLoginData] = useState(false);
    const [loandata, setLoanData] = useState(false);
    const [collectiondata, setCollectionData] = useState(false);
    const [customerdata, setCustomerData] = useState(false);

    // loanview
    const [isClose, setIsClose] = useState(false);
    const [date, setDate] = useState("");
    const [pendDate, setPendDate] = useState("");
    const [loanType, setLoanType] = useState("");
    const [pstartDate, setPstartDate] = useState("");
    const [noOfDays, setNoOfDays] = useState("");
    const [interest, setInterest] = useState("");
    const [interestAmount, setInterestAmount] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanstatus, setLoanStatus] = useState("");
    const [editEnablesms, seteditEnablesms] = useState("no");
    const [loanId, setLoanId] = useState();
    const [HisDetId, setHisDetId] = useState();
    const [approve, setApprove] = useState("false");
    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [Customername, setCustomername] = useState("");
    const [Loancustomername, setLoancustomername] = useState("");
    const [perDayAmount, setPerDayAmount] = useState("");
    const [loanIdd, setLoanIdd] = useState("");
    const [loanIddd, setLoanIddd] = useState("");
    const [loanDetId, setLoanDetId] = useState("");
    const [paidDue, setPaidDue] = useState("");
    const [amount, setAmount] = useState("");
    const [paidlate, setPaidlate] = useState("");
    const [ispaid, setIspaid] = useState("No");
    const [loandetailid, setLoandetailid] = useState("");
    const [Penalty, setPenalty] = useState("");

    const [remainingDue, setRemainingDue] = useState("");
    const [approvedStatus, setApprovedStatus] = useState();
    const [status, setStatus] = useState("");
    const [singleLoanList, setSingleLoanList] = useState("");
    const [Enablesms, setEnablesms] = useState("no");
    const [loanTypeId, setLoanTypeId] = useState();
    const [Approvestatus, setApprovestatus] = useState("false");
    const [header, setHeader] = useState("");
    const [loanviewId, setLoanViewId] = useState("");
    const [installmentpayment, setInstallmentpayment] = useState("")
    const [paidFlag, setPaidFlag] = useState(false);
    const [rowData, setRowData] = useState("");

    // customer

    const [SingleCustlist, setSingleCustList] = useState();
    const [loanCollList, setLoanCollList] = useState("");
    const [setDay, day] = useState("");


    //const [historyInfo, setHistoryInfo] = useState("");


    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");

    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [cnfrmShow, setCnfrmShow] = useState(false);
    const [popupActionPath, setPopupActionPath] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleCloseLoan = () => {
        setLoanviewshow(false)

    };

    const handleShow1 = (data) => {
        console.log("handleShow1 checking")
        setLoanviewshow(true);
        setLoadingView(true)
        detailsView(data);
    }

    const onKeydowninSearch = (event) => {
        if (event.key === "Enter") {
            console.log("Enter is pressed call search function");
            searchAuditDetails();
        }
    };


    const onSearch = (e) => {
        setCustomername(e.target.value);
        setLoancustomername(e.target.value);
        setLoanId(e.target.value);
    }


    const handleBuyerId = (e) => {

        setCusSalesId(e.target.value);
        console.log("=========check===", e.target.value);
        setCusSelectedSalesId(
            SalesList.filter((data) => data.user_id == e.target.value)[0]
        );
        console.log("=========check",
            SalesList.filter((data) => data.user_id == e.target.value)[0]
        );

        custLoginFilter(e.target.value)

    };


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

    const amountShow = Math.round(header.ballance_amount)
    const totalAmount = Math.round(header.total_amount)

    const customerFilter = (data) => {

        let request = {
            status: data,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token

        }

        console.log("active req??", request);

        axiosObject.post("customerFilter/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)

            setAuditlist(response.data.data);
            // setLoanId(response.data.data4.loan_id)
            // setLoanId(response.data.data[0]?.vendor_loan_id);

            //  setCustomername(response.data.data2);

            // setTotalRecords(response.data.data.length);
            if (response.data.success == true) {
                console.log("check tiket id's", response.data.data)

            }

        });
    }
    const custLoginFilter = (data) => {

        let request = {

            user_id: data ? data : "",
            // his_loan_id: data,
            token_user_id: loginDetails[0].user_id,
            token: loginDetails[0].token,
            vendor_id: loginDetails[0].vendor_id

        }

        console.log("audit filter", request);

        axiosObject.post("auditDetailFilter/condition", request).then(response => {

            console.log("tiketsystem", response.data.data3);
            setLogindetails(response.data.data1);
            setCustomers(response.data.data2);
            setLoanDetails(response.data.data3);
            setCollectionDetails(response.data.data4);
            console.log("collection det2", response.data.data3);
            // setLoanId(response.data.data4)
            console.log("collection det", response.data.data4);
            // setLoancustomername(response.data.data2);
            // setLoancustomername(response.data.data3);


        });
    }


    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(FromDate);
    };

    const today = moment();
    const disableFutureDt = current => {
        return current.isBefore(today)
    }

    const inputProps = {
        placeholder: "DD-MM-YYYY",
        value: FromDate,

    };
    const [newPaidDate, setNewPaidDate] = useState("");

    const calculation = Math.ceil((Number(loanAmount)) / Number(noOfDays))
    const monthlyCalculation = Math.ceil((Number(loanAmount) + Number(interest)) / Number(noOfDays))
    const calculationWeekly = Math.ceil((Number(loanAmount)) / Number(noOfDays))

    const inputProps1 = {
        placeholder: "DD-MM-YYYY",
        value: ToDate

    };
    const fromDate = (event) => {
        if (event._isAMomentObject == true) {
            setFromDate(event.format("YYYY-MM-DD"))
        }
    }
    const toDate = (event) => {
        if (event._isAMomentObject == true) {
            setToDate(event.format("YYYY-MM-DD"))
        }
    }

    const loanTogglePopup = () => {
        setIsClose(!isClose);
    }

    const printCheck = (checkId, editId, inputId, amountId, penaltyId, comments, row) => {
        console.log("checkId", checkId);


        const testDate = document.getElementById(inputId).value
        const penaltyTotal = document.getElementById(penaltyId).value
        const LoanComments = document.getElementById(comments).value
        const amtLoan = document.getElementById(amountId).value

        const testPaidDate = document.getElementById(checkId).checked ? [...newPaidDate, { ...{ "loandetails_id": row.loandetails_id }, ...{ "paid_date": testDate }, ...{ "installment_payment": amtLoan }, ...{ "penalty_discount": penaltyTotal }, ...{ "comments": LoanComments }, ...{ "updatedBy": loginDetails[0].user_id }, ...{ "ispaid": "yes" } }] : newPaidDate.filter(data => data.loandetails_id !== row.loandetails_id)
        setNewPaidDate(document.getElementById(checkId).checked ? [...newPaidDate, { ...{ "loandetails_id": row.loandetails_id }, ...{ "paid_date": testDate }, ...{ "installment_payment": amtLoan }, ...{ "penalty_discount": penaltyTotal }, ...{ "comments": LoanComments }, ...{ "updatedBy": loginDetails[0].user_id }, ...{ "ispaid": "yes" } }] : newPaidDate.filter(data => data.loandetails_id !== row.loandetails_id))
        console.log("penaltyId111 date123", testDate);
        console.log("penaltyId111 testPaidDate", testPaidDate);
        console.log("penaltyId111 val", penaltyTotal);
        console.log("penaltyId111", penaltyId);
        console.log("loancomments", comments);





        setRowData(row)
        var getcheck = document.getElementById(checkId);

        setIspaid(getcheck);

        if (getcheck.checked) {

            document.getElementById(editId).disabled = false;
            document.getElementById(inputId).disabled = true;
            document.getElementById(penaltyId).disabled = true;
            document.getElementById(comments).disabled = true;
            document.getElementById(amountId).disabled = true;


            setPaidFlag(true)

        }
        else {

            document.getElementById(editId).disabled = true;
            document.getElementById(inputId).disabled = false;
            document.getElementById(penaltyId).disabled = false;
            document.getElementById(comments).disabled = false;
            document.getElementById(amountId).disabled = false;


            setPaidFlag(false)

        }

    }


    const [newId, setNewId] = useState([])
    const [checkFlag, setCheckFlag] = useState(false)
    const enableDate = (checkId, editId, inputId, amountId, penaltyId, comments, row) => {

        var getcheck = document.getElementById(checkId);

        console.log('getcheck', getcheck);

        if (getcheck.checked) {

            document.getElementById(inputId).disabled = false;
            document.getElementById(checkId).disabled = false;
            // document.getElementById(checkId).checked = false;
            document.getElementById(penaltyId).disabled = false;
            document.getElementById(comments).disabled = false;
            document.getElementById(amountId).disabled = false;

            const testDate = document.getElementById(inputId).value
            const penaltyTotal = document.getElementById(penaltyId).value
            const LoanComments = document.getElementById(comments).value
            const amtLoan = document.getElementById(amountId).value

            const testPaidDate = [...newId, { ...{ "loandetails_id": row.loandetails_id }, ...{ "paid_date": testDate }, ...{ "installment_payment": amtLoan }, ...{ "penalty_discount": penaltyTotal }, ...{ "comments": LoanComments }, ...{ "updatedBy": loginDetails[0].user_id }, ...{ "ispaid": "yes" } }]
            setNewId([...newId, { ...{ "loandetails_id": row.loandetails_id }, ...{ "paid_date": testDate }, ...{ "installment_payment": amtLoan }, ...{ "penalty_discount": penaltyTotal }, ...{ "comments": LoanComments }, ...{ "updatedBy": loginDetails[0].user_id }, ...{ "ispaid": "yes" } }])

            console.log("getcheck testPaidDate", testPaidDate);

        }


    }
    // console.log(" newWeekly calling", newWeekly);


    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true);
        setLoadingLoanView(true);
        singleLoan(data);

        console.log(data, "data=============");
    }

    const handleClosecust = () => setCustShow(false);
    const handleShowcust = (data) => {
        setCustShow(true);
        setLoadingView(true);

        CustomerView(data);

        console.log(data, "data2=============");
    }
    // document.getElementById("Installment Date").disabled = true

    const EmiTableColumns = [
        {
            // name: loanType === 'Daily' || 'Weekly' || 'Monthly' ,
            name: loanType,
            selector: row => row.day,
            maxWidth: '80px',
        },

        {
            name: 'EMI Date',
            cell: (row) => {
                console.log("row date", row.installment_date);

                return (

                    <div className='defaultEmiDate'>
                        <input className={row.default_latefee == "Yes" ? 'form-control text-color-red' : 'form-control'} placeholder="dd-mm-yyyy" disabled id="Installment Date" name="Installment Date" defaultValue={moment(row.installment_date).format("DD-MM-YYYY")} />


                    </div>
                );
            },
        },
        {
            name: 'Paid Date',
            cell: (row, index) => {
                console.log("paid date", row.paid_date);

                return (

                    <div>
                        <input className='form-control' type="date" placeholder="dd-mm-yyyy" id={`inputEnableId${index}`} name="date" disabled onChange={(e) => setDate(e.target.value)} defaultValue={row.paid_date == null ? row.installment_date : row.paid_date} />

                    </div>
                );
            },

        },
        {
            name: 'Amount',
            minWidth: "100px",
            cell: (row, index) => {
                console.log("===amount===", row.installment_payment);

                return (

                    <div className='emiAmount'>
                        {/* {amount} */}
                        <input className={row.ispaid == "yes" ? 'form-control' : 'form-control'} type="number" /* value={installmentpayment} */ placeholder="amount" id={`inputAmountId${index}`} name="installmentpayment" disabled onChange={(e) => setInstallmentpayment(e.target.value)} defaultValue={row.installment_payment} />


                    </div>
                );
            },
        },
        {
            name: 'Penalty/Discount',


            cell: (row, index) => {
                console.log("===P/D===", row.penalty_discount);

                return (

                    <div className='penaltyAmount'>

                        <input className='form-control' type="number" placeholder="Penalty Fees" id={`inputPenaltyId${index}`} name="Penalty" disabled onChange={(e) => setPenalty(e.target.value)} defaultValue={row.penalty_discount} />

                    </div >
                );
            },
        },
        {
            name: 'Comments',
            cell: (row, index) => {
                console.log("comments", row.comments);

                return (

                    <div className='commentsDiv'>
                        <textarea className='form-control' type="text" placeholder="comments" id={`comments${index}`} name="comments" disabled onChange={(e) => setComments(e.target.value)} defaultValue={row.comments == "null" || row.comments == null ? "" : row.comments} />

                    </div>
                );
            },

        },
        {
            name: 'Action',
            className: "action",
            cell: (row, index, ispaid) => {
                console.log("index", index);
                console.log("ispaid", ispaid);

                return (

                    <div className='tableBtns emiTableActions'>

                        {/* <StatusCheckbox className="smsenable" labelText="" inputId={`checkboxId${index}`}  type="checkbox"  checked/>
                         */}
                        <input type="checkbox" name="smsenable" value="{`checkboxId${index}`}" checked></input>
                    </div>


                );
            },
        }



    ];

    const detailsView = (data) => {

        console.log("detailsView service");


        let request = {
            // loandetails_id: data.loandetails_id,
            his_detail_id: data.his_detail_id,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        console.log(request, "dataloandet");

        axiosObject.post("loanCollectReport/condition", request)

            .then((response) => {
                setLoanDetId(response.data.data[0]?.loandetails_id);
                setLoanCollList(response.data?.data);
                //setHeader(response.data?.count[0]);
                setHisDetId(response.data.data[0]?.his_detail_id);

                setAmount(response.data.data[0]?.installment_amount);
                setLoanViewId(response.data.data[0].vendorloan_id);
                // setLoanId(response.data.data[0]?.vendorloan_id);
                setInstallmentpayment(response.data?.data[0]?.installment_payment)
                setPaidlate(response.data.data?.ispayment_late);
                setLoanIddd(response.data.data?.loan_id);
                console.log("===setloanid===", response.data.data4?.loan_id);
                setIspaid(response.data.data?.ispaid);
                setLoanType(response.data.data[0]?.loan_type);
                setLoandetailid(response.data.data?.loandetails_id);
                setLoadingView(false);
                setPenalty(response.data?.data.map((data) => data?.penalty_discount))
                console.log("Penalty res", response.data.data.map((data) => data?.penalty_discount));


            });
    }


    const redirection = (customer_id) => {
        //console.log("insidefunction");
        navigate({ pathname: "/viewcustomer" });
        ls.set("customrId", customer_id);
        console.log("customrId", customer_id);
    };

    const singleLoan = (data) => {


        let request = {
            his_loan_id: data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }
        console.log(request, "data ===========req");

        axiosObject.post("historyLoanView/condition", request)

            .then((response) => {
                setLoadingLoanView(false);
                console.log(response.data.data[0], "datatocheck");
                setSingleLoanList(response.data.data[0]);
                // setHeader(response.data?.count[0]);
                setLoanTypeId(response.data.data[0]?.loan_type_id);
                // setLoanId(response.data.data[0]?.vendor_loan_id);
                console.log("check loan id", response.data.data[0]?.loan_id)
                setLoanIdd(response.data.data4?.loan_id);
                setInterest(response.data.data[0]?.interest);
                setLoanIddd(response.data.data4?.loan_id)
                setApprovestatus(response.data.data[0]?.Approve_status);
                setEnablesms(response.data.data[0]?.enable_sms);
                if (response.data.data[0]?.enable_sms === "yes") {
                    document.getElementById("Enablesmsnotificationpopup").checked = true
                }
                console.log("==check enable_sms==", response.data.data[0]?.enable_sms)
                setStatus(response.data.data[0].isactive)
                setLoanType(response.data.data[0]?.loan_type);
                console.log("loantype", response.data.data[0]?.loan_type);
                setLoanStatus(response.data.data[0].status)
                setLoanAmount(response.data.data[0]?.loan_amount);
                setInterestAmount(response.data.data[0]?.interest_amount)
                setNoOfDays(response.data.data[0]?.installment_number)
                setPerDayAmount(response.data.data[0]?.installment_amount)
                setPstartDate(response.data.data[0]?.start_date)
                setPendDate(response.data.data[0]?.end_date)
                setDate(response.data.data[0]?.loan_date)



            });
    }

    const CustomerView = (data) => {


        let request = {
            history_cust_id: data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }
        console.log(request, "data ===========req");

        axiosObject.post("historyCustView/condition", request)

            .then((response) => {
                setLoadingView(false);

                setSingleCustList(response.data.data[0]);
                console.log("custview", response.data.data[0]);

            });
    }


    const searchAuditDetails = (data) => {
        // setSubmitClicked(true);
        // e.preventDefault();
        console.log("searchAuditDetails")
        setFromDateError("")

        if (ToDate) {
            if (!FromDate) {
                setFromDateError("From Date is required")
                return;
            }
        }
        if (FromDate) {
            if (!ToDate) {
                setFromDateError("To Date is required")
                return;
            }
            else if (ToDate <= FromDate) {
                setFromDateError("End date  must be after start date")

                return;
            }
        }

        let request = {

            user_id: cusSalesId ? cusSalesId : "",
            from_date: FromDate,
            to_date: ToDate,
            vendor_loan_id: !loanId ? "" : loanId,
            customername: customersFlag == true ? Customername : "",
            loancustomername: loanDetailsFlag == true ? Loancustomername : "",
            token_user_id: loginDetails[0].user_id,
            collectvendor_id: loginDetails[0].vendor_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token,
            key: loadMoreSearch

        }
        console.log("active data", request);

        axiosObject.post("auditSearch/condition", request)
            .then((response) => {

                console.log("collect_search data", response.data.data);
                setAuditlist(response.data.data);
                setCustomers(response.data.data2);
                setLoanDetails(response.data.data3);
                setCollectionDetails(response.data.data4);
            },
                (error) => {
                    console.log(error);
                }
            )
            .catch(err => { console.log(err); });
    }


    const clearChecked = () => {
        handleAuditList();
        setLogindetails();
        setFromDateError("");
        setFromDate("");
        setToDate("");
        custLoginFilter("");
        searchAuditDetails("");
        document.getElementById('BankAcc').value = "Filter By Agent"

    };

    const clearcheckedCust = () => {
        document.getElementById('custDet').value = ""


    };


    const handleAuditList = () => {

        let request = {
            vendor_id: loginDetails[0].vendor_id,
            user_id: "",
            token_user_id: loginDetails[0].user_id,
            token: loginDetails[0].token
        }


        axiosObject.post("auditList/condition", request)

            .then((response) => {
                console.log("AuditList", response.data.data);
                setAuditlist(response.data.data);
                console.log("??AuditList??", response.data.data);
                setLoading(false);



            });

    }



    const loanColumns = [

        {
            name: 'Customer ID',
            //selector: row => row.customer_id,s
            sortable: true,
            minWidth: "140px",
            cell: (row) => {
                return (
                    <div className='custIDCol'>
                        <a onClick={() => redirection(row.customer_id)}>{row.vendorcustomer_id}</a>
                    </div>
                );
            }
        },

        {

            name: 'Loan ID',
            selector: row => row.vendorloan_id,
            sortable: true,

        },

        {
            name: 'Date & Time',
            selector: row => row.DateandTime,
            sortable: true,
            minWidth: "120px",
        },

        {
            name: 'Salesname',
            selector: row => row.user_name,
            sortable: true,

        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,

        },
        {
            name: 'Loan Status',
            selector: row => row.status,
            sortable: true,
            minWidth: "200px",

        },

        {
            name: 'Status',
            selector: row => row.history_status,
            sortable: true,
            minWidth: "200px",

        },
        {
            name: 'Action',
            className: "action",
            cell: (row, index) => {
                console.log("buttonid", row.status);
                return (

                    <div className='tableBtns'>

                        <button className="btn btn-primary btn-outline smallBtn" id={`editButton${index}`} onClick={() => handleShow(row.his_loan_id)}>
                            <i class="fa-solid fa-eye"></i>
                        </button>

                    </div>
                );
            },
        }




    ];


    const loginColumns = [


        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: true,
            maxWidth: "80px",

        },

        {
            name: 'Date & Time',
            selector: row => row.DateandTime,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: 'Salesname',
            selector: row => row.user_name,
            sortable: true,

        },

        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            minWidth: "200px",

        },




    ];


    const custColumns = [



        {
            name: 'Customer ID',
            //selector: row => row.customer_id,
            sortable: true,
            minWidth: "140px",
            cell: (row) => {
                return (
                    <div className='custIDCol'>
                        <a onClick={() => redirection(row.customer_id)}>{row.vendorcustomer_id}</a>
                    </div>
                );
            }
        },

        {
            name: 'Customer name',
            selector: row => row.customer_name,
            sortable: true,

        },
        {
            name: 'Date & Time',
            selector: row => row.DateandTime,
            sortable: true,
            minWidth: "120px",
        },

        {
            name: 'Salesname',
            selector: row => row.user_name,
            sortable: true,

        },
        {
            name: 'Description',
            selector: row => row.history_description,
            sortable: true,

        },


        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            minWidth: "200px",

        },
        {
            name: 'Action',
            className: "action",
            cell: (row, index) => {
                console.log("buttonid", row.status);
                return (

                    <div className='tableBtns'>

                        <button className="btn btn-primary btn-outline smallBtn" id={`editButton${index}`} onClick={() => handleShowcust(row.history_cust_id)}>

                            <i class="fa-solid fa-eye"></i>
                        </button>

                    </div>
                );
            },
        }




    ];

    const collectionColumns = [

        {
            name: 'Customer ID',
            //selector: row => row.customer_id,s
            sortable: true,
            minWidth: "140px",
            cell: (row) => {
                return (
                    <div className='custIDCol'>
                        <a onClick={() => redirection(row.customer_id)}>{row.vendorcustomer_id}</a>
                    </div>
                );
            }
        },

        {
            name: 'Loan ID',
            selector: row => row.vendorloan_id,
            sortable: true,

        },

        {
            name: 'Customername',
            selector: row => row.customer_name,
            sortable: true,

        },

        {
            name: 'Date & Time',
            selector: row => row.DateandTime,
            sortable: true,
            minWidth: "120px",
        },

        {
            name: 'Salesname',
            selector: row => row.name,
            sortable: true,

        },
        {
            name: 'LoanType',
            selector: row => row.loan_type,
            sortable: true,

        },

        {
            name: 'Description',
            selector: row => row.history_description,
            sortable: true,

        },

        {
            name: 'Action',
            className: "action",
            cell: (row, index) => {
                console.log("buttonid", row.status);
                return (

                    <div className='tableBtns'>

                        <button className="btn btn-primary btn-outline smallBtn" id={`editButton${index}`} onClick={() => { handleShow1(row) }}>
                            <i class="fa-solid fa-eye"></i>
                        </button>

                    </div>
                );
            },
        }




    ];


    useEffect(() => {

        handleAuditList()
        customerListDetails();
        custLoginFilter()
        searchAuditDetails();



    }, [])



    return (
        <div>

            <div id="wrapper">
                <Header />
                <Sidebar />


                <section id="content-wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12 report">
                            <h1 className='pageHead mt-2'>Auditrecord </h1>
                        </div>

                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 tableSearchBlock">
                            {customersFlag == true || loanDetailsFlag == true || CollectionsFlag == true ?
                                <div className="col-lg-8 col-md-8 col-sm-8 col-8 tableSearchBlock">
                                    <div className='col-4 tableSearch'>

                                        <input
                                            type="text"
                                            placeholder='Search'
                                            class="form-control"
                                            id="custDet"
                                            onKeyDown={onKeydowninSearch}
                                            onChange={onSearch}
                                        />
                                        <i class="fa-solid fa-magnifying-glass searchIcon"></i>
                                    </div>
                                </div> : ""}
                            <div class="col-4">
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

                            <div class="col-4 datePickerBlock">

                                {/* <label className="control-label" for="date">From Date</label>  */}

                                <Datetime inputProps={inputProps} timeFormat={false} dateFormat="YYYY-MM-DD"
                                    name="Date" onChange={fromDate} closeOnSelect={true}
                                    id="meeting_date" />
                            </div>

                            <div class="col-4 datePickerBlock">

                                {/* <label className="control-label" for="date">From Date</label>  */}


                                <Datetime inputProps={inputProps1} timeFormat={false} dateFormat="YYYY-MM-DD"
                                    name="Date" isValidDate={disablePastDt} onChange={toDate}

                                    id="meeting_date" />
                            </div>



                            <div class="col-4 searchbtn">
                                <button class="btn btn-primary me-2" onClick={searchAuditDetails} ><i class="fa-solid fa-magnifying-glass" id="Collect" ></i></button>
                                <button type="button" class="btn btn-secondary me-2" onClick={() => clearChecked()}> <i class="fa-solid fa-rotate"></i></button>
                            </div>

                        </div>

                        {loading ? <Loading /> : <>
                            <div className="row">
                                <div class="col-4 col-lg-2 col-md-2">
                                    <div class="count-data text-center">
                                        <button type="button" class={setLogindetailsFlag == false ? "btn btn-success" : "btn btn-success count-data text-center"} onClick={(e) => { setLogindetailsFlag(true); setLoanDetailsFlag(false); setCustomersFlag(false); setCollectionsFlag(false); setLoginData(e.target.value) }}>LoginDetail</button>

                                    </div>
                                </div>

                                <div class="col-4 col-lg-2 col-md-2">
                                    <div class="count-data text-center">
                                        <button type="button" class={setLoanDetailsFlag == false ? "btn btn-success" : "btn btn-success count-data text-center"} onClick={(e) => { setLogindetailsFlag(false); setLoanDetailsFlag(false); setCustomersFlag(true); setCollectionsFlag(false); setCustomerData(e.target.value); clearcheckedCust() }}>CustomerDetail</button>

                                    </div>
                                </div>
                                <div class="col-4 col-lg-2 col-md-2">
                                    <div class="count-data text-center">
                                        <button type="button" class={setCustomersFlag == false ? "btn btn-success" : "btn btn-success count-data text-center"} onClick={(e) => { setLogindetailsFlag(false); setLoanDetailsFlag(true); setCustomersFlag(false); setCollectionsFlag(false); setLoanData(e.target.value); clearcheckedCust() }}>LoanDetail</button>

                                    </div>
                                </div>
                                <div class="col-4 col-lg-2 col-md-2">
                                    <div class="count-data text-center">
                                        <button type="button" class={setCollectionsFlag == false ? "btn btn-success" : "btn btn-success count-data text-center"} onClick={(e) => { setLogindetailsFlag(false); setLoanDetailsFlag(false); setCustomersFlag(false); setCollectionsFlag(true); setCollectionData(e.target.value); clearcheckedCust() }}>CollectionDetail</button>

                                    </div>
                                </div>
                            </div>
                        </>}
                        {loanDetailsFlag == true || logindetailsFlag == true || customersFlag == true || CollectionsFlag == true ? "" :

                            <div class="col-12 mt-0">
                                <DataTable className='girdTable' pagination highlightOnHover columns={loginColumns} data={logindetails} />
                            </div>
                        }

                        {loanDetailsFlag == true ?
                            <div class="col-12 mt-0">
                                <DataTable className='girdTable' pagination highlightOnHover columns={loanColumns} data={loanDetails} />
                            </div> : ""}
                        {logindetailsFlag == true ?
                            <div class="col-12 mt-0">
                                <DataTable className='girdTable' pagination highlightOnHover columns={loginColumns} data={logindetails} />
                            </div> : ""}
                        {customersFlag == true ?
                            <div class="col-12 mt-0">
                                <DataTable className='girdTable' pagination highlightOnHover columns={custColumns} data={customers} />
                            </div> : ""}
                        {CollectionsFlag == true ?
                            <div class="col-12 mt-0">
                                <DataTable className='girdTable' pagination highlightOnHover columns={collectionColumns} data={collectionDetails} />
                            </div> : ""}
                    </div>
                </section>
            </div >
            <Modal size="lg" show={show} onHide={handleClose}>
                {loadingLoanView ? <>
                    <Loading />
                </>
                    :
                    <>
                        <Modal.Header>
                            <Modal.Title>
                                <h2>Loan Details</h2>
                            </Modal.Title>

                            <div className="form-group StatusCheckbox">
                                <input type="checkbox" name='Approve' id='Approve' disabled={loginDetails[0].user_type === "Super Admin" && loginDetails[0].user_type === "Admin" ? false : true} className="custom-checkbox smsenable" checked={Approvestatus == "yes" ? true : false} onClick={() => setApprove("true")} />

                                <label for='Approve' className="form-label">Approve</label>
                            </div>

                            <h2 className='float-end'>Loan ID: <span className='orangeText'>{loanId}</span></h2>


                        </Modal.Header>

                        <Modal.Body>


                            {/* <h2>Loan Details</h2> */}
                            <div className="row loansBlock">
                                <div className="col-12 loanHead">
                                    <Checkbox className="smsenable" labelText="Enable SMS Notification" checked={editEnablesms == "yes" ? true : false} value={editEnablesms == true ? "yes" : "no"} inputId="Enablesmsnotificationpopup" />

                                    <div className='form-group float-end loanStatus'>
                                        <b className='mr-2'>Loan Status: {loanstatus}</b>
                                        {/* <p className='form-value'>{loanstatus}</p> */}
                                        {/* <Radio inputId="active" labelText="Active" radioChecked={status == 1 ? true : false} onChange={() => setStatus(1)} />
                        <Radio inputId="closed" labelText="Closed" radioChecked={status == 2 ? true : false} onChange={() => getStatus()} />
                        <Radio inputId="pending" labelText="Pending" radioChecked={status == 0 ? true : false} onChange={() => getPending()} /> */}
                                    </div>


                                </div>



                                <div className='col-lg-12 mb-2'>
                                    <b className='me-2'>Loan Type: </b>
                                    <Radio inputDisable className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="daily" labelText="Daily" radioChecked={loanType == "daily" ? true : false} />
                                    <Radio inputDisable className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="weekly" labelText="Weekly" radioChecked={loanType == "weekly" ? true : false} />
                                    <Radio inputDisable className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="monthly" labelText="Monthly" radioChecked={loanType == "monthly" ? true : false} />
                                </div>

                                <div className="col-lg-4">
                                    <InputText inputDisable className={`${!loanAmount && (submitLoanClicked) ? 'error' : ''}`} labelText="Loan Amount" inputName="Loan Amount" inputValue={loanAmount} inputType="text" />
                                </div>
                                <div className="col-lg-4">
                                    {/* <InputText labelText="Interest Amount" inputName="Interest Amount" inputValue={interestAmount} inputType="text" onChange={(e) => setInterestAmount(e.target.value)} /> */}
                                    <InputText inputDisable className={`${!interestAmount && (submitLoanClicked) ? 'error' : ''}`} labelText={loanType == "weekly" ? "Interest Amount" : loanType == "monthly" ? "Documentation Charges" : "Interest Amount"} inputValue={interestAmount} inputName="Interest Amount" inputType="text" />

                                </div>
                                {loanType == "monthly" ?
                                    <div className="col-lg-4">

                                        <InputText inputDisable className={`${!interest && (submitLoanClicked) ? 'error' : ''}`} labelText="Interest" inputName="Interest" inputType="number" inputValue={interest} />

                                    </div> : ""}
                                <div className="col-lg-4">
                                    <InputText inputDisable className={`${!noOfDays && (submitLoanClicked) ? 'error' : ''}`} labelText={loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days"} inputName="No of Days" inputType="text" inputValue={noOfDays} />
                                </div>
                                <div className="col-lg-4">

                                    {/* <InputText inputValue={loanType == "weekly" ? calculationWeekly : loanType == "monthly" ? monthlyCalculation : calculation} labelText={loanType == "weekly" ? "Due Amount Per Week" : loanType == "monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputDisable={loanType == ""} inputName="Due Amount" inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} /> */}
                                    <InputText inputValue={loanType == "weekly" ? calculationWeekly : loanType == "monthly" ? monthlyCalculation : calculation} labelText={loanType == "weekly" ? "Due Amount Per Week" : loanType == "monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputDisable inputName="Due Amount" inputType="number" />

                                </div >
                                <div className="col-lg-4">
                                    <InputText /* className={`${!startDate && (submitLoanClicked) ? 'error' : ''}`} */ labelText="Start Date" inputName="Start Date" inputType="date" placeHolder="dd-mm-yyyy" inputDisable inputValue={pstartDate} />
                                </div>
                                <div className="col-lg-4">
                                    <InputText /* className={`${!endDate && (submitLoanClicked) ? 'error' : ''}`} */ labelText="End Date" inputDisable inputName="End Date" inputType="date" inputValue={pendDate} />

                                </div>
                                <div className="col-lg-4">
                                    <InputText inputDisable className={`${!date && (submitLoanClicked) ? 'error' : ''}`} labelText="Date" inputName="Date" inputType="date" inputValue={date} />
                                </div>
                            </div >

                        </Modal.Body >
                        <Modal.Footer>


                            <div className="col-lg-12 text-center">

                                <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                                    Close
                                </button>


                            </div>
                        </Modal.Footer>
                    </>}
            </Modal >
            <Modal size="lg" show={Custshow} onHide={handleClosecust}>
                {loadingView ? <>
                    <Loading />
                </>
                    :
                    <>
                        <Modal.Header closeButton>

                            <Modal.Title>
                                <h2>Customer Details</h2>

                            </Modal.Title>



                            {/* <div className='loanAmt'><div className='float-start'>Amount: <span>80000/100000 </span> </div>  <div className='float-end'>Days: <span>80/100</span></div></div> */}

                        </Modal.Header>

                        <Modal.Body>
                            {/* <DataTable className='girdTable' columns={EmiTableColumns} data={dailyFinList}/> */}
                            <div className="card viewLoanPopContent">
                                <div className="card-body p-0">
                                    {/* <h2>Loan Details</h2> */}
                                    <div className="row loansBlock">

                                        <div class="col-lg-12">
                                            <p className="form-label"><b>Customer ID </b></p>
                                            <p className='form-value'><span className='orangeText'> {SingleCustlist?.vendor_customer_no} </span></p>
                                        </div>
                                        <div class="col-lg-12">
                                            <p className="form-label">Customer Name</p>
                                            <p className='form-value'>{SingleCustlist?.customer_name}</p>
                                        </div>


                                        <div class="col-lg-12">
                                            <p className="form-label">Gender</p>
                                            <p className='form-value'>{SingleCustlist?.gender}</p>
                                        </div>

                                        <div class="col-lg-12">
                                            <p className="form-label">Phone Number</p>
                                            <p className='form-value'>{SingleCustlist?.phone_no}</p>
                                        </div>

                                        <div class="col-lg-12">
                                            <p className="form-label">Address</p>
                                            <p className='form-value'>{SingleCustlist?.address}</p>
                                        </div>
                                        <div class="col-lg-12">
                                            <p className="form-label">AdharCardNumber</p>
                                            <p className='form-value'>{SingleCustlist?.adhar_card_number}</p>
                                        </div>
                                        <div class="col-lg-12">
                                            <p className="form-label">Email</p>
                                            <p className='form-value'>{SingleCustlist?.email}</p>
                                        </div>
                                        <div class="col-lg-12">
                                            <p className="form-label">DateOfBirth</p>
                                            <p className='form-value'>{SingleCustlist?.dob}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>



                            <button className="btn btn-primary btn-outline smallBtn" onClick={handleClosecust}>
                                Close
                            </button>
                        </Modal.Footer>
                    </>}
            </Modal>
            <Modal size="xl" show={loanviewshow} onHide={handleCloseLoan} className="emiTablePopup">


                {loadingView ? <>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h2>Loan Collection - Reports</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Loading />
                </>
                    :
                    <>
                        <Modal.Header closeButton>

                            <Modal.Title>
                                <h2>Loan Collection - Reports</h2>
                            </Modal.Title>

                            {/* <div className='loanAmt'>
                                <div className='float-start'>Loan ID:<span className='orangeText'>{loanviewId}</span></div>
                                <div className='float-start'>Loan Amount: <span> {amountShow}/{totalAmount} </span> </div>
                                <div className='float-start'>EMI's: <span>{header.remaing_days}/{header.total_days}</span></div>
                            </div> */}


                            {/* <div className='loanAmt'><div className='float-start'>Amount: <span>{header.ballance_amount}/{header.total_amount} </span> </div>  <div className='float-end'>Days: <span>{header.remaing_days}/{header.total_days}</span></div></div> */}
                        </Modal.Header>
                        <Modal.Body className='pt-0'>
                            <DataTable fixedHeader fixedHeaderScrollHeight="70vh" highlightOnHover className='girdTable' columns={EmiTableColumns} data={loanCollList} />
                        </Modal.Body>
                        <Modal.Footer>

                            <button className="btn btn-primary btn-outline smallBtn" onClick={handleCloseLoan}>
                                Close
                            </button>
                        </Modal.Footer>
                    </>}

            </Modal>

            {
                isOpen &&
                <CommonPopup
                    handleClose={togglePopup}
                    popupTitle={popupTitle}
                    popupMsg={popupMsg}
                    popupType={popupType}
                    popupActionType={popupActionType}
                    popupActionValue={popupActionValue}
                    popupActionPath={popupActionPath}
                />
            }

            {
                isClose &&
                <CommonPopup
                    handleClose={loanTogglePopup}
                    popupTitle={popupTitle}
                    popupMsg={popupMsg}
                    popupType={popupType}
                    popupActionType={popupActionType}
                    popupActionValue={popupActionValue}
                    popupActionPath={popupActionPath}
                />
            }
        </div >

    )

}




export default Auditrecord;