import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { SelectStatus, StatusCheckbox } from '../../components/FormFields';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import DataTable from 'react-data-table-component';
import { axiosObject } from '../../services/BaseService'
import { InputText, Checkbox, Radio, inputValue } from '../../components/FormFields';
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import Loading from "../../components/Loading";
import printJS from 'print-js'
import moment from "moment";
import ls, { set } from 'local-storage';





const WeeklyFinance = () => {


    const loginDetails = useSelector(state => state.LoginReducer.payload);

    let navigate = useNavigate();
    const createNewLoan = () => {
        navigate("/customers");
    }

    const [show, setShow] = useState(false);
    const [cnfrmShow, setCnfrmShow] = useState(false);
    const [activeId, setActiveId] = useState("");
    const [deleteadminId, setDeleteadminId] = useState("");
    const [pendDate, setPendDate] = useState("");
    const [rowData, setRowData] = useState("");
    const [cash, setCash] = useState([]);
    const [header1, setHeader1] = useState("");
    const [paidAmt, setpaidAmt] = useState([]);
    const [updatedby, setUpdatedby] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingLoan, setloadingLoan] = useState(true);
    const [search, setSearch] = useState(true);
    const [paidDue, setPaidDue] = useState("");
    const [lastPopup, setLastPopup] = useState(false);
    const [editableLablespopup, setEditableLablespopup] = useState([]);

    const [loanIdd, setLoanIdd] = useState("");
    const [loanviewIdd, setLoanViewIdd] = useState("");
    const [Idshow, setIdshow] = useState("");
    const [showLoan, setShowLoan] = useState(false);
    const [comments, setComments] = useState("");

    // newwork
    const [newWeekly, setNewWeekly] = useState([])
   

    //const [loading1, setLoading1] = useState(true);


    console.log(rowData, "rowData");

    const printPage = () => {
        console.log("print")
        printJS({
            documentTitle: 'Weekly Loan',
            printable: "Print",
            type: 'html',
            targetStyles: ['*'],
            header: 'Weekly Finance',

        })
    }
    const printPage1 = () => {
        console.log("print1", printPage1)

        printJS({
            printable: "Print1",
            type: 'html',
            targetStyles: ['*'],
            header: 'Weekly Finance'
        })
    }

    const handleClose = () => {
        setShow(false)
        setLoading(false)
    };
    const handleShow = (data) => {
        detailsView(data);
        setLoadingView(true);
        setShow(true);

    }
    // const handleClose = () => setShow(false);
    // const handleShow = (data) => {
    //     detailsView(data);
    //     setLoading(false)
    //     setShow(true);
    // }
    const handleLoanClose = () => setShowLoan(false);
    const handleShowview3 = (data) => {
        setShowLoan(true);
        setloadingLoan(true);
        singleLoanview(data);
        console.log(data.loan_id, "data.loan_id");
    }



    const handleClose1 = () => {
        setCnfrmShow(false);
        setLastPopup(true)
    }

    const handleCloseFin = () => setLastPopup(false)

    const handleOpenFin = () => {

        setLastPopup(true)
    }


    const handleShow1 = (data) => {

        setCnfrmShow(true);
        setShow(false)
    }

    const handleClose2 = () => { setApproveshow(false); setNumber1(false) };
    const handleShow2 = (data) => {
        setApproveshow(true);
        singleLoan(data.slice(3));
        console.log(data, "data=============");
    }

    const reCallFunction = () => {
        getCustData()
    }
    const [number, setNumber] = useState(false);

    // weeklysetstate
    const [submitLoanClickedWeekly, setSubmitLoanClickedWeekly] = useState(false)

    //monthlysetstate
    const [submitLoanClickedMonthly, setSubmitLoanClickedMonthly] = useState(false)
    const [dailyFinList, setDailyFinList] = useState([]);
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [ispaid, setIspaid] = useState("No");
    const [Penalty, setPenalty] = useState("");
    const [singleLoanList, setSingleLoanList] = useState("");
    const [header, setHeader] = useState("");
    const [loanCollList, setLoanCollList] = useState("");
    const [loandetailid, setLoandetailid] = useState("");
    const [loanId, setLoanId] = useState();
    const [loanviewId, setLoanViewId] = useState();
    const [paidFlag, setPaidFlag] = useState(false);
    const [loadingView, setLoadingView] = useState(true);
    const [newPaidDate, setNewPaidDate] = useState("");
    const [loanType, setLoanType] = useState("");
    const [interestAmount, setInterestAmount] = useState("");
    const [status, setStatus] = useState("");
    const [perDayAmount, setPerDayAmount] = useState("");
    const [remainingDue, setRemainingDue] = useState("");
    const [loanFlag, setLoanFlag] = useState(false);


    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [name, setName] = useState("");
    const [isOpenAccept, setIsOpensAccept] = useState(false);
    const [dateEnable, setDateEnable] = useState(false);
    const [approveshow, setApproveshow] = useState(false);
    const [showview3, setshowview3] = useState("");



    const [SalesList, setSalesList] = useState("");
    const [cusSalesId, setCusSalesId] = useState("");
    const [cusSelectedSalesId, setCusSelectedSalesId] = useState("");
    const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
    const [endDate, setEndDate] = useState("");
    const [loanTypeId, setLoanTypeId] = useState();
    const [interest, setInterest] = useState("");
    const [Interest, setinterest] = useState("");
    const [pstartDate, setPstartDate] = useState("");
    const [Enablesms, setEnablesms] = useState("no");
    const [loanAmount, setLoanAmount] = useState("");
    const [approve, setApprove] = useState("no");
    const [noOfDays, setNoOfDays] = useState("");
    const [loanstatus, setLoanStatus] = useState("");
    const [paidlate, setPaidlate] = useState("");
    const [approvedStatus, setApprovedStatus] = useState();
    const [startDate, setStartDate] = useState("");
    const [custId, setCustId] = useState("");
    const [editloanLables, setEditloanLables] = useState("");
    const [number1, setNumber1] = useState("");

    //let array = []



    const [installmentpayment, setInstallmentpayment] = useState("")

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const installmentAmount = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setInstallmentpayment(value);
        getLoanDeatilspopup(e.target.value, "Amount")

    };
    const handleDelete = (item) => {
        setDeleteadminId(item.loanId);
        console.log("calling");
        setActiveId(item.active)

        togglePopupAccept()
    }

    const getStatus = () => {
        if (approve == "true") {
            setApprove("false")
            document.getElementById("Approve").checked = false
            setStatus(2)
        }
        else {
            setStatus(2)
        }
    }
    const getPending = () => {
        if (approve == "true") {
            setApprove("false")
            document.getElementById("Approve").checked = false
            setStatus(0)
        }
        else {
            setStatus(0)
        }
    }

    const Loanamtedit = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setLoanAmount(value);
    };
    const LoanIntamtedit = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setInterestAmount(value);
    };
    const Loandaysedit = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setNoOfDays(value);
    };

    const EditupdateEndDate = (date) => {

        console.log("check the loanType", loanType);
        setPstartDate(date);


        if (loanType == "daily") {
            setPendDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'days').subtract(1, "days").format("YYYY-MM-DD") : date)
        }
        if (loanType == "weekly") {

            setPendDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'week').subtract(1, "weeks").format("YYYY-MM-DD") : date)
        }
        if (loanType == "monthly") {
            setPendDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add((noOfDays), 'month').subtract(1, "months").format("YYYY-MM-DD") : date)
        }
    }


    const printCheck = (checkId, editId, inputId, amountId, penaltyId, comments, row) => {
        console.log("checkId", checkId);


        const testDate = document.getElementById(inputId).value
        const penaltyTotal = document.getElementById(penaltyId).value
        const LoanComments = document.getElementById(comments).value
        const amtLoan = document.getElementById(amountId).value

        const testOjt = [{ ...{ "fName": [{ ...{ "kavi": "123" }, ..."naveen" }] }, ...{ "lName": "yarasan" } }]
        const testPaidDate = document.getElementById(checkId).checked ? [...newPaidDate, { ...{ "loandetails_id": row.loandetails_id }, ...{ "paid_date": testDate }, ...{ "installment_payment": amtLoan }, ...{ "penalty_discount": penaltyTotal }, ...{ "comments": LoanComments }, ...{ "updatedBy": loginDetails[0].user_id }, ...{ "ispaid": "yes" } }] : newPaidDate.filter(data => data.loandetails_id !== row.loandetails_id)
        setNewPaidDate(document.getElementById(checkId).checked ? [...newPaidDate, { ...{ "loandetails_id": row.loandetails_id }, ...{ "paid_date": testDate }, ...{ "installment_payment": amtLoan }, ...{ "penalty_discount": penaltyTotal }, ...{ "comments": LoanComments }, ...{ "updatedBy": loginDetails[0].user_id }, ...{ "ispaid": "yes" } }] : newPaidDate.filter(data => data.loandetails_id !== row.loandetails_id))
        console.log("penaltyId111 date123", testDate);
        console.log("penaltyId222 date123", newPaidDate);

        console.log("penaltyId111 testPaidDate", testPaidDate);
        console.log("penaltyId111 val", penaltyTotal);
        console.log("penaltyId111", penaltyId);
        console.log("loancomments", comments);
        console.log("loanamountId", amountId);






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
    console.log("checkFlag", checkFlag);

    console.log("new outside", newId);
    const enableDate = (checkId, editId, inputId, amountId, penaltyId, comments, row) => {

        var getcheck = document.getElementById(checkId);

        console.log('getcheck row', row.loandetails_id);



        if (getcheck.checked) {

            document.getElementById(inputId).disabled = false;
            document.getElementById(checkId).disabled = false;
            //document.getElementById(checkId).checked = false;
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

            // if(testPaidDate.length > 0){
            //     if (testPaidDate.filter((data) => data?.loandetails_id !== data.loandetails_id).length > 0 ) {
            //       // console.log("1 calling");
            //       const abc = testPaidDate.filter((data) => data.loandetails_id !== data.loandetails_id)
            //       let value = abc;
            //       value[0] = testPaidDate;
            //       setnewId(...[testPaidDate], value[0]);
            //       return;
            //     }
            //   }

            //   if (newPaidDate.map((data) => data.loandetails_id !== data.loandetails_id)) {
            //     // console.log("2 calling");
            //     const abc = newPaidDate.filter((data) => data.loandetails_id !== data.loandetails_id)
            //     let value = abc;
            //     value[0] = testPaidDate;
            //     const chek = [...testPaidDate, value[0]]
            //     // console.log("check str", chek);
            //     setNewPaidDate([...testPaidDate, value[0]]);
            //     return;
            //   }
        }


    }


    const calculationn = Math.round((Number(loanAmount) + Number(interest)) / (Number(noOfDays)))

    const pclear = () => {
        setPstartDate("");
        setPendDate("");
        setNoOfDays("");
        setLoanAmount("");
        setInterest("");
        setInterestAmount("")
        setEditloanLables([]);


    }

    const singleLoan = (data) => {
        let request = {
            loan_id: data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }
        console.log(request, "data ===========req");

        axiosObject.post("loanview/condition", request)

            .then((response) => {
                console.log(response.data.data);
                setSingleLoanList(response.data.data[0]);
                setLoanTypeId(response.data.data[0]?.loan_type_id);
                setLoanId(response.data.data[0]?.loan_id);
                setLoanViewId(response.data.data[0]?.vendorloan_id);
                setLoanIdd(response.data.data[0]?.loan_id);
                setLoanViewIdd(response.data.data[0]?.vendorloan_id);
                setLoanAmount(response.data.data[0]?.loan_amount);


                console.log("check loan id", response.data.data[0]?.loan_id)
                setInterest(response.data.data[0]?.interest);
                setEnablesms(response.data.data[0]?.enable_sms);
                if (response.data.data[0]?.enable_sms === "yes") {
                    document.getElementById("Enablesmsnotificationpopup").checked = true
                }
                console.log("==check enable_sms==", response.data.data[0]?.enable_sms)
                setStatus(response.data.data[0].isactive)
                setLoanStatus(response.data.data[0].status)
                setLoanType(response.data.data[0]?.loan_type);
                setLoanAmount(response.data.data[0]?.loan_amount);
                setInterestAmount(response.data.data[0]?.interest_amount)
                setNoOfDays(response.data.data[0]?.installment_number)
                setPerDayAmount(response.data.data[0]?.installment_amount)
                setPstartDate(response.data.data[0]?.start_date)
                setPendDate(response.data.data[0]?.end_date)
                setDate(response.data.data[0]?.date)



            });
    }

    const loanFilter = (data) => {

        let request = {
            status: data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        axiosObject.post("weeklyFilter/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)

            setDailyFinList(response.data.data);
            if (response.data.success == true) {
                console.log("check tiket id's", response.data.data)

            }

        });
    }

    const dailyloanFilter = (data) => {

        let request = {
            status: data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        axiosObject.post("weeklyloanTypeFilter/condition", request).then(response => {

            console.log("weeklyFilter Details response", response.data.data)

            setDailyFinList(response.data.data);
            if (response.data.success == true) {
                console.log("check tiket id's", response.data.data)

            }

        });
    }
    const singleLoanview = (data) => {
        let request = {
            loan_id: data.slice(3),
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token

        }
        console.log("req", request);


        axiosObject.post("loanview/condition", request)

            .then((response) => {
                console.log(response.data.data);
                setSingleLoanList(response.data.data[0]);
                setStatus(response.data.data[0].isactive)
                setApprovedStatus(response.data.data[0].status)
                setLoanType(response.data.data[0]?.loan_type);
                setRemainingDue(response.data.data[0]?.remaining_dues);
                setPaidDue(response.data.data[0]?.paid_due);
                setLoanIdd(response.data.data[0]?.loan_id);
                //setLoanIdd(response.data.data[0]?.vendorloan_id);
                setLoanViewId(response.data.data[0]?.vendorloan_id);
                setLoanAmount(response.data.data[0]?.loan_amount);
                setInterestAmount(response.data.data[0]?.interest_amount)
                setinterest(response.data.data[0]?.interest);
                setNoOfDays(response.data.data[0]?.installment_number)
                setPerDayAmount(response.data.data[0]?.installment_amount)
                setStartDate(response.data.data[0]?.start_date)
                setEndDate(response.data.data[0]?.end_date)
                setDate(response.data.data[0]?.date)
                setloadingLoan(false);



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
    const agentFilter = (data) => {

        let request = {
            filter_id: data,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }
        axiosObject.post("weeklySalesFilter/condition", request).then(response => {

            console.log("usersdropdown Details response", response.data.data)
            setDailyFinList(response.data.data);
        });
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
        agentFilter(e.target.value)
    };


    const onSearch = (e) => {
        setName(e.target.value)
        setLoanId(e.target.value)
        setCustId(e.target.value)
    }

    const SearchInventory = () => {

        let request = {
            data: name,
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token

        }

        axiosObject.post("weeklyloanTypeSearch/condition", request).then(response => {

            console.log("tiketsystem Details response", response.data.data)
            setDailyFinList(response.data.data);

        });


    }



    const getCustData = () => {

        let request = {
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }

        axiosObject
            .post("weeklyFinance/condition", request)

            .then((response) => {
                console.log(response);
                setDailyFinList(response.data.data);
                setHeader1(response.data.data[0]);
                console.log("==header1==", response.data.data)
                setLoading(false);
            });
    }

    const detailsView = (data) => {
        let request = {
            loan_id: data.slice(3),
            user_id: loginDetails[0].user_id,
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token
        }
        console.log(data, "data");

        axiosObject.post("loandetailsview/condition", request)

            .then((response) => {
                //setLoadingView(false);
                setLoanId(response.data.data[0].loan_id);
                setLoanViewId(response.data.data[0].vendorloan_id);
                setLoanCollList(response.data.data);
                setHeader(response.data.count[0]);
                console.log("loandetailsview", response.data.count[0])
                setAmount(response.data.data[0]?.installment_amount);
                setPaidlate(response.data.data?.ispayment_late);
                setIspaid(response.data.data?.ispaid);
                setLoandetailid(response.data.data?.loandetails_id);
                 setLoadingView(false);

                // const paidDate = response.data.data?.filter(data => data.ispaid === "yes");
                // setNewPaidDate(paidDate.map((data) => { return { "loandetails_id": data.loandetails_id, "paid_date": data.paid_date, "penalty_discount": data.penalty_discount, "updatedBy": data.userupdatedBy } }));

                response.data.data?.map((data, index) => {
                    if (data?.ispaid == "yes") {
                        document.getElementById(`checkboxId${index}`).checked = true
                        document.getElementById(`checkboxId${index}`).disabled = true
                        document.getElementById(`inputEnableId${index}`).disabled = true
                        document.getElementById(`inputPenaltyId${index}`).disabled = true
                        document.getElementById(`comments${index}`).disabled = true
                        document.getElementById(`inputAmountId${index}`).disabled = true


                    }

                    else {
                        document.getElementById(`checkboxId${index}`).checked = false
                        document.getElementById(`inputEnableId${index}`).disabled = false
                        document.getElementById(`editEnableId${index}`).disabled = true
                        document.getElementById(`inputPenaltyId${index}`).disabled = false
                        document.getElementById(`comments${index}`).disabled = false
                        document.getElementById(`inputAmountId${index}`).disabled = false



                    }

                })


            });
    }

    const editLoanapprove = () => {
        //setSubmitLoanClicked(true);
        // if (loanFlag == true) {

        // e.preventDefault();
        if (!loanType) {
            console.log("");
            return;
        }
        if (loanType === "daily") {

            setSubmitLoanClicked(true);

            if (!loanAmount) {
                console.log("");
                return;
            }
            if (!interestAmount) {
                console.log("");
                return;
            }
            if (!noOfDays) {
                console.log("");
                return;
            }

            if (!pstartDate) {
                console.log("");
                return;
            }

            // if (!date) {
            //     console.log("");
            //     return;
            // }
        }
        // weeklyfieldvalidation
        if (loanType === "weekly") {
            setSubmitLoanClickedWeekly(true)
            if (!loanAmount) {
                console.log("");
                return;
            }
            if (!interestAmount) {
                console.log("");
                return;
            }
            if (!noOfDays) {
                console.log("");
                return;
            }

            if (!pstartDate) {
                console.log("");
                return;
            }

            // if (!date) {
            //     console.log("");
            //     return;
            // }

        }

        // weeklyfieldvalidation
        if (loanType === "monthly") {
            setSubmitLoanClickedMonthly(true)
            if (!loanAmount) {
                console.log("");
                return;
            }
            if (!interestAmount) {
                console.log("");
                return;
            }
            if (!noOfDays) {
                console.log("");
                return;
            }
            if (!interest) {
                console.log("");
                return;
            }

            if (!pstartDate) {
                console.log("");
                return;
            }

            // if (!date) {
            //     console.log("");
            //     return;
            // }

        }

        //  }

        //const editloanLables = null;
        let editLoanVal = "";
        console.log(editloanLables, "editLoanVal");
        if (editloanLables.length > 0) {
            editLoanVal = editloanLables.reduce((acc, curr) => `${acc}${curr.label},`, '')
        }
        else {
            // togglePopup()
            // setPopupTitle("");
            // setPopupMsg("nothing edited");
            // setPopupType("error");
            // setPopupActionType("close");
            // setPopupActionValue("close");
            editLoanVal = "";
        }

        //console.log(editLoanVal,"editLoanVal")



        let request = {

            isactive: approve == "yes" ? "1" : "0",
            loan_type_id: loanType == "daily" ? 3 : loanType == "weekly" ? 2 : loanType == "monthly" ? 1 : loanTypeId,
            vendor_id: loginDetails[0].vendor_id,
            loan_type: loanType,
            interest: interest,
            start_date: pstartDate,
            loan_id: loanId.slice(3),
            installment_date: "",
            installment_time: "10:00",
            end_date: pendDate,
            date: date,
            enable_sms: Enablesms,
            loan_amount: loanAmount,
            description: editLoanVal.slice(0, -1),
            status: approve == "yes" ? "approved" : "pending",
            interest_amount: interestAmount == null ? "" : interestAmount,
            installment_amount: calculationn,
            installment_number: noOfDays,
            updatedBy: loginDetails[0].user_id,
            createdBy: loginDetails[0].user_id,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token,
            reference_person : "",
            reference_person_name : "",
            reference_person_phoneno : ""

        }
        console.log("====sms===", request)
        console.log(approve, "flag approve");
        {
            axiosObject.post("custloanApprove/update", request)
                .then((response) => {
                    console.log("resresponse.data.data", response.data.data)
                    if (response.data.success == true) {
                        setApproveshow(false)
                        togglePopup()
                        setPopupTitle("Edit Loan");
                        setPopupMsg("Loan Details Updated Successfully");
                        setPopupType("success");
                        setPopupActionType("refresh");
                        setPopupActionValue("ok");
                        setPopupActionPath("/weeklyfinance")
                        handleClose()
                    }
                    else {
                        togglePopup()
                        setPopupTitle("");
                        setPopupMsg(response.data.error.err);
                        setPopupType("error");
                        setPopupActionType("close");
                        setPopupActionValue("close");
                    }

                });

        }
    }

    const getLoanDeatilspopup = (value, label) => {
        // console.log("label calling", label);

        if (label === "Paid Date") {
            setDate(value);
            if (editableLablespopup.length > 0) {
                if (editableLablespopup.filter((data) => data.label === label).length === 0) {
                    // console.log("if calling");
                    setEditableLablespopup([...editableLablespopup, { label }]);
                }
            }
            else {
                // console.log("1st else calling");
                setEditableLablespopup([...editableLablespopup, { label }]);
            }
        }
        if (label === "Penalty/Discount") {
            setPenalty(value);
            if (editableLablespopup.length > 0) {
                if (editableLablespopup.filter((data) => data.label === label).length === 0) {
                    // console.log("if calling");
                    setEditableLablespopup([...editableLablespopup, { label }]);
                }
            }
            else {
                // console.log("1st else calling");
                setEditableLablespopup([...editableLablespopup, { label }]);
            }
        }
        if (label === "Comments") {
            setPenalty(value);
            if (editableLablespopup.length > 0) {
                if (editableLablespopup.filter((data) => data.label === label).length === 0) {
                    // console.log("if calling");
                    setEditableLablespopup([...editableLablespopup, { label }]);
                }
            }
            else {
                // console.log("1st else calling");
                setEditableLablespopup([...editableLablespopup, { label }]);
            }
        }
        if (label === "Amount") {
            setAmount(value);
            if (editableLablespopup.length > 0) {
                if (editableLablespopup.filter((data) => data.label === label).length === 0) {
                    // console.log("if calling");
                    setEditableLablespopup([...editableLablespopup, { label }]);
                }
            }
            else {
                // console.log("1st else calling");
                setEditableLablespopup([...editableLablespopup, { label }]);
            }
        }




    }

    let editValpopup = editableLablespopup.reduce((acc, curr) => `${acc}${curr.label},`, '')

    const editLoan = () => {
        let request = {
            loandetails: newWeekly,
            //loandetails: newPaidDate,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token,
            history_description: editValpopup.slice(0, -1),
            updatedBy: loginDetails[0].user_id,
            createdBy: loginDetails[0].user_id,


        }


        {
            axiosObject.post("loandetailEdit/update", request)
                .then((response) => {
                    console.log("resresponse.data.data", response.data.data)
                    if (response.data.success == true) {
                        setCnfrmShow(false);
                        togglePopup()
                        setPopupTitle("Weekly Finance");
                        setPopupMsg("Weekly Finance Updated Successfully");
                        setPopupType("success");
                        setPopupActionType("refresh");
                        setPopupActionValue("ok");
                        // setPopupActionPath("/customers")


                    }
                    else {
                        setCnfrmShow(false);
                        togglePopup()
                        setPopupTitle("");
                        setPopupMsg(response.data.error.err);
                        setPopupType("error");
                        setPopupActionType("close");
                        setPopupActionValue("close");
                    }
                });

        }
    }
    const redirection = (customer_id) => {
        navigate({ pathname: "/viewcustomer" });
        ls.set("customrId", customer_id);
        console.log("customrId", customer_id);
    };

    const amountShow = Math.round(header.ballance_amount)
    const totalAmount = Math.round(header.total_amount)

    const columns = [

        {
            name: 'S.No',
            maxWidth: "80px",
            selector: (row, index) => index + 1
        },
        {
            name: 'Cust Id',
            //selector: row => row.customer_id,
            sortable: true,
            minWidth: "140px",
            cell: (row) => {
                return (
                    <div>
                        <a onClick={() => redirection(row.customer_id)}>{row.vendor_customer_id}</a>
                    </div>
                );
            }

        },

        {
            name: 'Loan Id',
            // selector: row => row.loan_id,
            sortable: true,
            minWidth: "120px",
            cell: (row) => {
                return (
                    <div>
                        <a onClick={() => handleShowview3(row.loan_id)}>{row.vendorloan_id}</a>

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
            name: 'Loan Amount',
            selector: row => row.loan_amount,
            sortable: true,
            minWidth: "160px",

        },
        {
            name: 'EMI Amount',
            selector: row => row.installment_amount,
            sortable: true,
            minWidth: "140px",

        },
        {
            name: 'Total EMI',
            selector: row => row.total_days,
            sortable: true,
            minWidth: "120px",

        },
        {
            name: 'Remaining EMI',
            selector: row => row.remaining_days,
            sortable: true,
            minWidth: "160px",

        },
        {
            name: 'Loan Status',
            selector: row => row.status == "New" ? <span className='text-color-blue'> New </span> : row.status == "Overdue" ? <span className='text-color-orange'>Overdue</span> : row.status == "Active" ? <span className='text-color-green'> Active </span> : <span className='text-color-red'>Closed</span>,
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
            width: "180px",
            className: "action",
            cell: (row) => {
                return (
                    <div className='tableBtns'>
                        {row.loanisactive === 0 ?
                            <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow2(row.loan_id)}>
                                <i class="fa-solid fa-eye"></i> <span class="view">Approve</span>
                            </button> :
                            <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow(row.loan_id)}>
                                <i class="fa-solid fa-eye"></i> <span class="view">View Loan</span>
                            </button>}
                    </div>
                );
            },
        }


    ];
    const togglePopupAccept = () => {
        setIsOpensAccept(!isOpenAccept);
    }
    const checkBoxPopup = () => {
        togglePopup()
        setPopupMsg("Are you sure u want to save");
        setPopupActionType("close");
        setPopupActionValue("ok");

    }

    const penalyDiscount = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPenalty(value);
        getLoanDeatilspopup(e.target.value, "Penalty/Discount")

    };
    console.log("newweekly calling", newWeekly);
    const handleChangeField = (e, row, flag) => {
        console.log("calling func e", e);

        if (flag == "Comments") {
            const check = newWeekly.filter(data => data.loandetails_id === row.loandetails_id)
            if (check.length > 0) {
                const newCheck = newWeekly.findIndex((data) => data.loandetails_id === row.loandetails_id)
                let value = newWeekly
                value[newCheck].comments = e
                value[newCheck].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly(value)
                // return
            }
            else {
                console.log("else calling");
                const newVal = loanCollList.filter(data => data.loandetails_id === row.loandetails_id)
                newVal[0].comments = e
                newVal[0].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly([...newWeekly, newVal[0]])
            }
        }
        if (flag == "Paid Date") {
            const check = newWeekly.filter(data => data.loandetails_id === row.loandetails_id)
            if (check.length > 0) {
                const newCheck = newWeekly.findIndex((data) => data.loandetails_id === row.loandetails_id)
                let value = newWeekly
                value[newCheck].paid_date = e
                setNewWeekly(value)
                console.log("calling newval e", e);

            }
            else {
                console.log("else calling");
                const newVal = loanCollList.filter(data => data.loandetails_id === row.loandetails_id)
                console.log("calling newval", newVal);
                newVal[0].paid_date = e
                console.log("calling val", newVal[0].paid_date = e);
                setNewWeekly([...newWeekly, newVal[0]])
            }
        }
        if (flag == "Penalty/Discount") {
            const check = newWeekly.filter(data => data.loandetails_id === row.loandetails_id)
            if (check.length > 0) {
                const newCheck = newWeekly.findIndex((data) => data.loandetails_id === row.loandetails_id)
                let value = newWeekly
                value[newCheck].penalty_discount = e
                value[newCheck].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly(value)
                console.log("if calling");
            }
            else {
                console.log("else calling");
                const newVal = loanCollList.filter(data => data.loandetails_id === row.loandetails_id)
                newVal[0].penalty_discount = e
                newVal[0].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly([...newWeekly, newVal[0]])
            }
        }
        if (flag == "Amount") {
            const check = newWeekly.filter(data => data.loandetails_id === row.loandetails_id)
            if (check.length > 0) {
                const newCheck = newWeekly.findIndex((data) => data.loandetails_id === row.loandetails_id)
                let value = newWeekly
                value[newCheck].installment_payment = e
                value[newCheck].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly(value)
                // return
            }
            else {
                console.log("else calling");
                const newVal = loanCollList.filter(data => data.loandetails_id === row.loandetails_id)
                newVal[0].installment_payment = e
                newVal[0].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly([...newWeekly, newVal[0]])
            }
        }
        if (flag == "CheckBox") {
            let checkBoxValue = document.getElementById(e)
            const check = newWeekly.filter(data => data.loandetails_id === row.loandetails_id)
            if (check.length > 0) {
                const newCheck = newWeekly.findIndex((data) => data.loandetails_id === row.loandetails_id)
                let value = newWeekly
                value[newCheck].ispaid = checkBoxValue.checked ? "yes" : "no"
                value[newCheck].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly(value)
            }
            else {
                const newVal = loanCollList.filter(data => data.loandetails_id === row.loandetails_id)
                newVal[0].ispaid = checkBoxValue.checked ? "yes" : "no"
                newVal[0].paid_date = row.paid_date == null ? row.installment_date : row.paid_date
                setNewWeekly([...newWeekly, newVal[0]])
            }

        }
    }

    const exceptThisSymbols = ["e", "E", "+", "."];

    const EmiTableColumns = [
        {
            name: 'Weekly',
            selector: row => row.day,
        },
        {
            name: 'Installment Date',
            // selector: row => row.start_date,
            cell: (row) => {
                console.log("row date", row.installment_date);

                return (

                    <div className='defaultEmiDate'>
                        <input className={row.default_latefee == "Yes" ? 'form-control text-color-red' : 'form-control'} placeholder="dd-mm-yyyy" id="Installment Date" name="Installment Date" disabled defaultValue={moment(row.installment_date).format("DD-MM-YYYY")} />
                    </div>
                );
            },
        },
        {
            name: 'Paid Date',
            // selector: row => row.start_date,
            cell: (row, index) => {
                console.log("paid date", [date]);

                return (

                    <div>
                        <input className='form-control' type="date" placeholder="dd-mm-yyyy" id={`inputEnableId${index}`} name="date" onChange={(e) => { getLoanDeatilspopup(e.target.value, "Paid Date"); setDate(e.target.value); handleChangeField(e.target.value, row, "Paid Date") }} defaultValue={row.paid_date == null ? row.installment_date : row.paid_date} />


                        {/* <input id={`inputEnableId${index}`} value={row.installment_date} type="date" onChange={(e) =>setDate(e.target.value)} /> */}
                    </div>
                );
            },
        },
        {
            name: 'Amount',
            cell: (row, index) => {
                console.log("===amount===", row.installment_payment);

                return (

                    <div className='emiAmount'>
                        {/* {amount} */}
                        <input className={row.ispaid == "yes" ? 'form-control' : 'form-control'} type="number" /* value={installmentpayment} */ placeholder="amount" id={`inputAmountId${index}`} name="installmentpayment" onChange={(e) => {  getLoanDeatilspopup(e.target.value, "Amount"); handleChangeField(e.target.value, row, "Amount"); installmentAmount() }} onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} defaultValue={row.installment_payment} />

                    </div>
                );
            },
        },
        {
            name: 'Penalty/Discount',
            // selector: row => row.start_date,
            cell: (row, index) => {
                console.log("===P/D===", row.penalty_discount);

                return (

                    <div>
                        {/* <input className='form-control' type="number" placeholder="Penalty Fees" id={`inputPenaltyId${index}`} name="Penalty" onChange={(e) => { getLoanDeatilspopup(e.target.value, "Penalty/Discount"); setPenalty(e.target.value) }} defaultValue={row.penalty_discount} /> */}
                           
                        <input className='form-control' type="number" placeholder="Penalty Fees" id={`inputPenaltyId${index}`} name="Penalty" onChange={(e) => { getLoanDeatilspopup(e.target.value, "Penalty/Discount"); handleChangeField(e.target.value, row, "Penalty/Discount"); penalyDiscount(); }} onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} defaultValue={row.penalty_discount} />

                        {/* <input id={`inputEnableId${index}`} value={row.installment_date} type="date" onChange={(e) =>setDate(e.target.value)} /> */}
                    </div>
                );
            },
        },
        {
            name: 'Comments',
            cell: (row, index) => {
                console.log("comments", row.comments);

                return (

                    <div className='commentsDiv'>
                          <textarea className='form-control' type="text" placeholder="comments" id={`comments${index}`} name="comments" onChange={(e) => { getLoanDeatilspopup(e.target.value, "Comments"); setComments(e.target.value); handleChangeField(e.target.value, row, "Comments") }} defaultValue={row.comments == "null" || row.comments == null ? "" : row.comments } />


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
                        {/* <StatusCheckbox className="smsenable" labelText="" inputId={`checkboxId${index}`} onClick={() => printCheck(`checkboxId${index}`, `editEnableId${index}`, `inputEnableId${index}`, `inputAmountId${index}`, `inputPenaltyId${index}`, `comments${index}`, row)} /> */}
                        <StatusCheckbox className="smsenable" labelText="" inputId={`checkboxId${index}`} onClick={() => {handleChangeField(`checkboxId${index}`, row, "CheckBox"); printCheck(`checkboxId${index}`, `editEnableId${index}`, `inputEnableId${index}`, `inputAmountId${index}`, `inputPenaltyId${index}`, `comments${index}`, row)}} />
                        {ispaid == "No" ?
                            <button id={`editEnableId${index}`} disabled={`editEnableId${index}`} className="btn btn-primary btn-outline smallBtn" onClick={() => enableDate(`checkboxId${index}`, `editEnableId${index}`,`inputAmountId${index}`, `inputPenaltyId${index}`, `inputEnableId${index}`, `comments${index}`)}>
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                            : <button id={`editEnableId${index}`} className="btn btn-primary btn-outline smallBtn" onClick={() => { enableDate(`checkboxId${index}`, `editEnableId${index}`, `inputPenaltyId${index}`, `inputEnableId${index}`,`inputAmountId${index}`, `comments${index}`) }}>
                                <i class="fa-solid fa-pencil"></i>
                            </button>}
                    </div>
                );
            },
        }


    ];



    const onKeydowninSearch = (event) => {
        if (event.key === "Enter") {
            console.log("Enter is pressed call search function");
            SearchInventory();
        }
    };



    useEffect(() => {
        if (name != "") {
            const timer = setTimeout(() => {
                SearchInventory();
            }, 1);
            return () => {
                clearTimeout(timer);
            };
        } else {
            getCustData();
        }
    }, [name]);

    useEffect(() => {
        customerListDetails();
    }, [])
    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    }


    useEffect(() => {
        getCustData()
    }, [])


    const getEditLoanDeatils = (value, label) => {
        // console.log("label calling", label);
        setNumber1(true)
        if (label === "Approve") {
            //const item = value.replace(/\D/g, "");
            // console.log("item calling", item);
            //setNumber(true);
            setApprove("true");
            if ("Approve" !== "") {
                // console.log("if calling");
                if (editloanLables.length > 0) {
                    if (editloanLables.filter((data) => data.label === label).length === 0) {
                        setEditloanLables([...editloanLables, { label }]);
                    }
                }
                else {
                    // console.log("1st else calling");
                    setEditloanLables([...editloanLables, { label }]);
                }
            }
            else {
                // console.log("else calling");
                setEditloanLables(editloanLables.filter((data) => data?.label !== label))
            }
        }
        // if (label === "daily") {
        //     setLoanType(" ");
        //     setLoanType("daily");
        //     pclear();
        //     if ("daily" !== "") {
        //         if (editloanLables.length > 0) {
        //             if (editloanLables.filter((data) => data.label === label).length === 0) {
        //                 setEditloanLables([...editloanLables, { label }]);
        //             }
        //         }
        //         else {
        //             // console.log("1st else calling");
        //             setEditloanLables([...editloanLables, { label }]);
        //         }
        //     }
        //     else {
        //         // console.log("else calling");
        //         setEditloanLables(editloanLables.filter((data) => data?.label !== label))
        //     }
        // }
        // if (label === "weekly") {
        //     setLoanType("");
        //     setLoanType("weekly");
        //     pclear();
        //     if ("weekly" !== "") {
        //         // console.log("if calling");
        //         if (editloanLables.length > 0) {
        //             if (editloanLables.filter((data) => data.label === label).length === 0) {
        //                 setEditloanLables([...editloanLables, { label }]);
        //             }
        //         }
        //         else {
        //             // console.log("1st else calling");
        //             setEditloanLables([...editloanLables, { label }]);
        //         }
        //     }
        //     else {
        //         // console.log("else calling");
        //         setEditloanLables(editloanLables.filter((data) => data?.label !== label))
        //     }
        // }
        // if (label === "monthly") {
        //     setLoanType("");
        //     setLoanType("monthly");
        //     pclear();
        //     if ("monthly" !== "") {
        //         // console.log("if calling");
        //         if (editloanLables.length > 0) {
        //             if (editloanLables.filter((data) => data.label === label).length === 0) {
        //                 setEditloanLables([...editloanLables, { label }]);
        //             }
        //         }
        //         else {
        //             // console.log("1st else calling");
        //             setEditloanLables([...editloanLables, { label }]);
        //         }
        //     }
        //     else {
        //         // console.log("else calling");
        //         setEditloanLables(editloanLables.filter((data) => data?.label !== label))
        //     }
        // }
        if (label === "Loan Amount") {
            const item = value.replace(/\D/g, "");
            // console.log("item calling", item);
            setLoanAmount(item);
            if (item !== "") {
                // console.log("if calling");
                if (editloanLables.length > 0) {
                    if (editloanLables.filter((data) => data.label === label).length === 0) {
                        setEditloanLables([...editloanLables, { label }]);
                    }
                }
                else {
                    // console.log("1st else calling");
                    setEditloanLables([...editloanLables, { label }]);
                }
            }
            else {
                // console.log("else calling");
                setEditloanLables(editloanLables.filter((data) => data?.label !== label))
            }
        }
        if (label === "Interest Amount") {
            if(loanType === "monthly" ? label= "Documentation Charges" : label ="Interest Amount"){
            setInterestAmount("");
            const item = value.replace(/\D/g, "");

            setInterestAmount(item);
            if (item !== "") {
                if (editloanLables.length > 0) {
                    if (editloanLables.filter((data) => data.label === label).length === 0) {
                        // console.log("if calling");
                        setEditloanLables([...editloanLables, { label }]);
                    }
                }
                else {
                    // console.log("1st else calling");
                    setEditloanLables([...editloanLables, { label }]);
                }
            }
            else {
                // console.log("else calling");
                setEditloanLables(editloanLables.filter((data) => data?.label !== label))
            }
        }
        }
        if (label === "Interest") {
            //const item = value.replace(/\D/g, "");
            setInterest(value);
            if (value !== "") {
                if (editloanLables.length > 0) {
                    if (editloanLables.filter((data) => data.label === label).length === 0) {
                        // console.log("if calling");
                        setEditloanLables([...editloanLables, { label }]);
                    }
                }
                else {
                    // console.log("1st else calling");
                    setEditloanLables([...editloanLables, { label }]);
                }
            }
            else {
                // console.log("else calling");
                setEditloanLables(editloanLables.filter((data) => data?.label !== label))
            }
        }
        if (label === "No of Days") {
            label = "Total EMI (Days)"
            const item = value.replace(/\D/g, "");
            setNoOfDays(item);
            setPstartDate("")
            setPendDate("")
            if (item !== "") {
                if (editloanLables.length > 0) {
                    if (editloanLables.filter((data) => data.label === label).length === 0) {
                        // console.log("if calling");
                        setEditloanLables([...editloanLables, { label }, { "label": "EMI Amount" }]);
                    }
                }
                else {
                    // console.log("1st else calling");
                    setEditloanLables([...editloanLables, { label }, { "label": "EMI Amount" }]);
                }
            }
            else {
                // console.log("else calling");
                setEditloanLables(editloanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
            }
        }
        if (label === "No of Weeks") {
            label = "Total EMI (Weeks)"
            const item = value.replace(/\D/g, "");
            setNoOfDays(item);
            setPstartDate("")
            setPendDate("")
            if (item !== "") {
                if (editloanLables.length > 0) {
                    if (editloanLables.filter((data) => data.label === label).length === 0) {
                        // console.log("if calling");
                        setEditloanLables([...editloanLables, { label }, { "label": "EMI Amount" }]);
                    }
                }
                else {
                    // console.log("1st else calling");
                    setEditloanLables([...editloanLables, { label }, { "label": "EMI Amount" }]);
                }
            }
            else {
                // console.log("else calling");
                setEditloanLables(editloanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
            }
        }
        if (label === "No of Months") {
            label = "Total EMI (Months)"
            const item = value.replace(/\D/g, "");
            setNoOfDays(item);
            setPstartDate("")
            setPendDate("")
            if (item !== "") {
                if (editloanLables.length > 0) {
                    if (editloanLables.filter((data) => data.label === label).length === 0) {
                        // console.log("if calling");
                        setEditloanLables([...editloanLables, { label }, { "label": "EMI Amount" }]);
                    }
                }
                else {
                    // console.log("1st else calling");
                    setEditloanLables([...editloanLables, { label }, { "label": "EMI Amount" }]);
                }
            }
            else {
                // console.log("else calling");
                setEditloanLables(editloanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
            }
        }

        if (label === "Start Date") {
            setPstartDate(value);
            if (editloanLables.length > 0) {
                if (editloanLables.filter((data) => data.label === label).length === 0) {
                    // console.log("if calling");
                    setEditloanLables([...editloanLables, { label }, { "label": "End Date" }]);
                }
            }
            else {
                // console.log("1st else calling");
                setEditloanLables([...editloanLables, { label }, { "label": "End Date" }]);
            }

        }

        if (label === "Date") {
            setDate(value);
            if (editloanLables.length > 0) {
                if (editloanLables.filter((data) => data.label === label).length === 0) {
                    // console.log("if calling");
                    setEditloanLables([...editloanLables, { label }]);
                }
            }
            else {
                // console.log("1st else calling");
                setEditloanLables([...editloanLables, { label }]);
            }
        }
    }


    return (
        <div>

            <div id="wrapper">
                <Header />
                <Sidebar />


                <section id="content-wrapper">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                            <h1 className='pageHead mt-2'>Weekly Finance </h1>
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
                            {/* <div className='col-4 selectStatus'>
                                <div className="form-group">
                                    <select className="form-select" id="statusSearch" onChange={(e) => loanTypeFilter(e.target.value)}>
                                        <option value="">Loan Status</option>
                                        <option value="Approved">Active</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div> */}

                            <div className='col-4 selectStatus'>
                                <div className="form-group">
                                    <select className="form-select" id="statusSearch" onChange={(e) => loanFilter(e.target.value)}>
                                        <option style={{ display: "none" }}>Application Status</option>
                                        <option value="">--Select All--</option>
                                        <option value="Approve">Approved</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            <div className='col-4 selectStatus'>
                                <div className="form-group">
                                    <select className="form-select" id="statusSearch" onChange={(e) => dailyloanFilter(e.target.value)}>
                                        <option style={{ display: "none" }}>Loan Status</option>
                                        <option value="">--Select All--</option>
                                        <option value="New">New</option>
                                        <option value="Active">Active</option>
                                        <option value="Overdue">Overdue</option>
                                    </select>
                                </div>
                            </div>

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

                            <div className='col-4 print'><button type="submit" onClick={printPage1} className="btn btn-primary addBtn float-end"><i class="fa-solid fa-print"></i> <span className='label'> Print</span></button></div>


                        </div>
                        {loading ? <Loading /> :
                            <div class="col-12 mt-0 fixedLastCol">
                                <DataTable fixedHeader fixedHeaderScrollHeight="70vh" highlightOnHover className='girdTable' columns={columns} data={dailyFinList} pagination />
                            </div>}

                    </div>
                </section>
            </div>




            <Modal size="xl" show={show} onHide={handleClose} className="emiTablePopup">
            {loadingView ? <>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h2>Weekly - Loan Collection</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Loading />
                </>
                    :
                    <>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Weekly - Loan Collection</h2>
                    </Modal.Title>
                    <div className='loanAmt'>
                        <div className='float-start'>Loan ID: <span className='red'>{loanviewId}</span></div>
                        <div className='float-start'>Loan Amount: <span> {amountShow}/{totalAmount} </span> </div>
                        <div className='float-start'>EMI's: <span>{header.remaing_days}/{header.total_days}</span></div>
                        <button type="submit" onClick={printPage} className="btn btn-primary addBtn float-end me-0"><i class="fa-solid fa-print"></i>  Print</button>
                    </div>


                    {/* <div className='loanAmt'><div className='float-start'>Amount: <span>{header.ballance_amount}/{header.total_amount} </span> </div>  <div className='float-end'>Days: <span>{header.remaing_days}/{header.total_days}</span></div></div> */}
                </Modal.Header>
                <Modal.Body className='pt-0'>
                        <DataTable fixedHeader fixedHeaderScrollHeight="70vh" highlightOnHover className='girdTable' columns={EmiTableColumns} data={loanCollList} />

                </Modal.Body>
                <Modal.Footer>


                    <button className="btn btn-primary btn-outline smallBtn" onClick={() => { handleShow1() }}>
                        Save
                    </button>
                    <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>

                        Close
                    </button>
                </Modal.Footer>
                </>}

            </Modal>
           
                <Modal size="m" show={showLoan} onHide={handleLoanClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h2>Loan Details</h2>

                        </Modal.Title>



                        {/* <div className='loanAmt'><div className='float-start'>Amount: <span>80000/100000 </span> </div>  <div className='float-end'>Days: <span>80/100</span></div></div> */}

                    </Modal.Header>
                    <Modal.Body>
                    {loadingLoan ? <Loading /> :<>
                        {/* <DataTable className='girdTable' columns={EmiTableColumns} data={dailyFinList}/> */}
                        <div className="card viewLoanPopContent">
                            <div className="card-body p-0">
                                {/* <h2>Loan Details</h2> */}
                                <div className="row loansBlock">

                                    <div class="col-lg-12">
                                        <p className="form-label"><b>Loan ID </b></p>
                                        <p className='form-value'><span className='orangeText'>{loanviewId}</span></p>
                                    </div>
                                    <div class="col-lg-12">
                                        <p className="form-label">Loan Amount</p>
                                        <p className='form-value'>{loanAmount}</p>
                                    </div>

                                    {loanType === "monthly" ?
                                        <>
                                            <div class="col-lg-12">
                                                <p className="form-label">Interest Amount</p>
                                                <p className='form-value'>{interest}</p>
                                            </div>
                                            <div class="col-lg-12">
                                                <p className="form-label">Document Charges</p>
                                                <p className='form-value'>{interestAmount}</p>
                                            </div>
                                        </> :
                                        <>
                                            <div class="col-lg-12">
                                                <p className="form-label">Interest Amount</p>
                                                <p className='form-value'>{interestAmount}</p>
                                            </div>
                                        </>
                                    }

                                    <div class="col-lg-12">
                                        <p className="form-label">Total No of EMI</p>
                                        <p className='form-value'>{noOfDays}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">Paid EMI </p>
                                        <p className='form-value'>{paidDue}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">Remaining EMI</p>
                                        <p className='form-value'>{remainingDue}</p>
                                    </div>


                                    <div class="col-lg-12">
                                        <p className="form-label">{loanType == "weekly" ? "EMI Amount (Weekly)" : loanType == "monthly" ? "EMI Amount (Monthly)" : "EMI Amount (Daily)"}</p>
                                        <p className='form-value'>{perDayAmount}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">Loan Date</p>
                                        <p className='form-value'>{date == "0000-00-00" ? "00-00-0000" : moment(date).format("DD-MM-YYYY")}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">Start Date</p>
                                        <p className='form-value'>{moment(startDate).format("DD-MM-YYYY")}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">End Date</p>
                                        <p className='form-value'>{moment(endDate).format("DD-MM-YYYY")}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">Loan Type</p>
                                        <p className='form-value'>{loanType}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">Loan Status:</p>
                                        <p className='form-value'>{approvedStatus}</p>
                                        {/* <p className='form-value'>{status == 1 ? "Active" : status == 2 ? "Closed" : "Pending"}</p> */}
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">Application Status</p>
                                        <p className='form-value'>{status == "1" ? "Approved" : "Pending"}</p>
                                    </div>

                                    <div class="col-lg-12">
                                        <p className="form-label">SMS Notification</p>
                                        <p className='form-value'>Disable</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                        </>}
                    </Modal.Body>
                    <Modal.Footer>



                        <button className="btn btn-primary btn-outline smallBtn" onClick={handleLoanClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            <Modal size="sm" show={cnfrmShow} onHide={handleClose1}>


                <Modal.Header>
                    <Modal.Title>
                        <h2>Confirmation</h2>

                    </Modal.Title>
                    {/* <div className='loanAmt'><div className='float-start'>Amount: <span>{header.ballance_amount}/{header.total_amount} </span> </div>  <div className='float-end'>Days: <span>{header.remaing_days}/{header.total_days}</span></div></div> */}
                </Modal.Header>

                <Modal.Body>
                    Are you sure do you want to save details
                </Modal.Body>
                <Modal.Footer>



                    <button className="btn btn-primary btn-outline smallBtn" onClick={editLoan}>
                        Save
                    </button>
                    <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose1}>
                        Close
                    </button>
                </Modal.Footer>

            </Modal>

            <Modal size="sm" show={lastPopup} onHide={handleCloseFin}>


                <Modal.Header>
                    <Modal.Title>
                        <h2>{popupTitle}</h2>

                    </Modal.Title>
                    {/* <div className='loanAmt'><div className='float-start'>Amount: <span>{header.ballance_amount}/{header.total_amount} </span> </div>  <div className='float-end'>Days: <span>{header.remaing_days}/{header.total_days}</span></div></div> */}
                </Modal.Header>

                <Modal.Body>
                    {popupMsg}
                </Modal.Body>
                <Modal.Footer>




                    {/* <button className="btn btn-primary btn-outline smallBtn" onClick={editLoan}>
                            Save
                        </button> */}
                    <button className="btn btn-primary btn-outline smallBtn" onClick={handleCloseFin}>
                        ok

                    </button>
                </Modal.Footer>


            </Modal>

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


            <div >
                {loanType == "daily" ?
                    <Modal size="lg" show={approveshow} onHide={handleClose2}>

                        <Modal.Header>
                            <Modal.Title>
                                <h2>Edit Loan</h2>
                            </Modal.Title>

                            <div className="form-group StatusCheckbox">
                                {/* <input type="checkbox" name='Approve' id='Approve' disabled={loginDetails[0].user_type === "Super Admin"  ? false : true} className="custom-checkbox smsenable" onClick={() => {  setNumber1(true) }} onChange={(e) => { getEditLoanDeatils(e.target.value, "Approve"); setApprove(e.target.value) }} /> */}
                                <input type="checkbox" checked={approve == "yes" ? true : false} value={approve == "no" ? "yes" : "no"} disabled={loginDetails[0].user_type === "Super Admin" /* && status === 1 */ ? false : true} onChange={(e) => { setApprove(e.target.value); setNumber1(true) }} />
                                <label for='Approve' className="form-label">Approve</label>
                            </div>

                            <h2 className='float-end'>Loan ID: <span className='orangeText'>{loanviewId}</span></h2>


                        </Modal.Header>

                        <Modal.Body>


                            {/* <h2>Loan Details</h2> */}
                            <div className="row loansBlock">
                                <div className="col-12 loanHead">
                                    {/* <Checkbox className="smsenable" labelText="Enable SMS Notification" checked={Enablesms == "yes" ? true : false} value={Enablesms == "on" ? "Yes" : "No"} onChange={(e) => { setEnablesms(e.target.value); }} inputId="Enablesmsnotificationpopup" /> */}
                                    <input type="checkbox" checked={Enablesms == "yes" ? true : false} value={Enablesms == "no" ? "yes" : "no"} onChange={(e) => { setEnablesms(e.target.value); }} id="Enablesmsnotificationpopup" />
                                    <label className="form-label">  Enable SMS Notification</label>
                                    <div className='form-group float-end loanStatus'>

                                        <b className='mr-2'>Loan Status: {loanstatus}</b>

                                    </div>


                                </div>



                                <div className='col-lg-12 mb-2'>
                                    <b className='me-2'>Loan Type: </b>
                                    <Radio inputId="daily" labelText="Daily" radioChecked={loanType == "daily" ? true : false} onChange={() => { setLoanType("daily"); pclear(); setNumber1(true) }} />
                                    <Radio inputId="weekly" labelText="Weekly" radioChecked={loanType == "weekly" ? true : false} onChange={() => { setLoanType("weekly"); pclear(); setNumber1(true) }} />
                                    <Radio inputId="monthly" labelText="Monthly" radioChecked={loanType == "monthly" ? true : false} onChange={() => { setLoanType("monthly"); pclear(); setNumber1(true) }} />
                                </div>
                                {/* daily fields */}
                                {loanType === "daily" ?
                                    <div class="row">
                                        <div className="col-lg-4">
                                            <InputText className={`${!loanAmount && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText="Loan Amount" inputName="Loan Amount" inputValue={loanAmount} inputDisable={loanType == ""} inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Loan Amount") }} />
                                        </div>
                                        <div className="col-lg-4">
                                            {/* <InputText labelText="Interest Amount" inputName="Interest Amount" inputValue={interestAmount} inputType="text" onChange={(e) => setInterestAmount(e.target.value)} /> */}
                                            <InputText className={`${!interestAmount && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText={loanType == "weekly" ? "Interest Amount" : loanType == "monthly" ? "Documentation Charges" : "Interest Amount"} inputDisable={loanType == ""} inputValue={interestAmount} inputName="Interest Amount" inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Interest Amount") }} />

                                        </div>
                                        <div className="col-lg-4">
                                            <InputText className={`${!noOfDays && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText={loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days"} inputName="No of Days" inputType="text" inputDisable={loanType == ""} inputValue={noOfDays} onChange={(e) => getEditLoanDeatils(e.target.value, loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days")} />
                                        </div>
                                        <div className="col-lg-4">
                                            <InputText inputValue={calculationn} labelText={loanType == "weekly" ? "Due Amount Per Week" : loanType == "monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputDisable inputName="Due Amount" inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                        </div>
                                        <div className="col-lg-4">
                                            <InputText className={`${!pstartDate && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText="Start Date" inputName="Start Date" inputType="date" placeHolder="dd-mm-yyyy" inputDisable={loanType == ""} inputValue={pstartDate} onChange={(e) => { getEditLoanDeatils(e.target.value, "Start Date"); EditupdateEndDate(e.target.value) }} />
                                        </div>
                                        <div className="col-lg-4">
                                            <InputText labelText="End Date" inputDisable={loanType == ""} inputName="End Date" inputType="date" inputValue={pendDate} />

                                        </div>
                                        <div className="col-lg-4">
                                            <InputText labelText="Date" inputName="Date" inputType="date" inputValue={date} onChange={(e) => { getEditLoanDeatils(e.target.value, "Date") }} />
                                        </div>
                                    </div> : ""}

                            </div>

                        </Modal.Body>
                        <Modal.Footer>


                            <div className="col-lg-12 text-center">
                                {number1 === true ?
                                    <button onClick={editLoanapprove} class="btn btn-primary smallBtn">Save</button> :

                                    <button disabled class="btn btn-primary smallBtn dis-btn">Save</button>
                                }
                                <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose2}>
                                    Close
                                </button>


                            </div>
                        </Modal.Footer>


                        {isOpen &&
                            <CommonPopup
                                handleClose={togglePopup}
                                popupTitle={popupTitle} headercount
                                popupMsg={popupMsg}
                                popupType={popupType}
                                popupActionType={popupActionType}
                                popupActionValue={popupActionValue}
                                popupActionPath={popupActionPath}
                            />}

                    </Modal> :


                    loanType == "weekly" ?

                        <Modal size="lg" show={approveshow} onHide={handleClose2}>

                            <Modal.Header>
                                <Modal.Title>
                                    <h2>Edit Loan</h2>
                                </Modal.Title>

                                <div className="form-group StatusCheckbox">
                                    {/* <input type="checkbox" name='Approve' id='Approve' disabled={loginDetails[0].user_type === "Super Admin"  ? false : true} className="custom-checkbox smsenable" onClick={() => {  setNumber1(true) }} onChange={(e) => { getEditLoanDeatils(e.target.value, "Approve"); setApprove(e.target.value) }} /> */}
                                    <input type="checkbox" checked={approve == "yes" ? true : false} value={approve == "no" ? "yes" : "no"} disabled={loginDetails[0].user_type === "Super Admin" /* && status === 1 */ ? false : true} onChange={(e) => { setApprove(e.target.value); setNumber1(true) }} />
                                    <label for='Approve' className="form-label">Approve</label>
                                </div>

                                <h2 className='float-end'>Loan ID: <span className='orangeText'>{loanviewId}</span></h2>


                            </Modal.Header>

                            <Modal.Body>


                                {/* <h2>Loan Details</h2> */}
                                <div className="row loansBlock">
                                    <div className="col-12 loanHead">
                                        {/* <Checkbox className="smsenable" labelText="Enable SMS Notification" checked={Enablesms == "yes" ? true : false} value={Enablesms == "on" ? "Yes" : "No"} onChange={(e) => { setEnablesms(e.target.value); }} inputId="Enablesmsnotificationpopup" /> */}
                                        <input type="checkbox" checked={Enablesms == "yes" ? true : false} value={Enablesms == "no" ? "yes" : "no"} onChange={(e) => { setEnablesms(e.target.value); }} id="Enablesmsnotificationpopup" />
                                        <label className="form-label">  Enable SMS Notification</label>
                                        <div className='form-group float-end loanStatus'>

                                            <b className='mr-2'>Loan Status: {loanstatus}</b>

                                        </div>


                                    </div>



                                    <div className='col-lg-12 mb-2'>
                                        <b className='me-2'>Loan Type: </b>
                                        <Radio inputId="daily" labelText="Daily" radioChecked={loanType == "daily" ? true : false} onChange={() => { setLoanType("daily"); pclear(); setNumber1(true) }} />
                                        <Radio inputId="weekly" labelText="Weekly" radioChecked={loanType == "weekly" ? true : false} onChange={() => { setLoanType("weekly"); pclear(); setNumber1(true) }} />
                                        <Radio inputId="monthly" labelText="Monthly" radioChecked={loanType == "monthly" ? true : false} onChange={() => { setLoanType("monthly"); pclear(); setNumber1(true) }} />
                                    </div>
                                    {/* daily fields */}
                                    {loanType === "weekly" ?
                                        <div class="row">
                                            <div className="col-lg-4">
                                                <InputText className={`${!loanAmount && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText="Loan Amount" inputName="Loan Amount" inputValue={loanAmount} inputDisable={loanType == ""} inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Loan Amount") }} />
                                            </div>
                                            <div className="col-lg-4">
                                                {/* <InputText labelText="Interest Amount" inputName="Interest Amount" inputValue={interestAmount} inputType="text" onChange={(e) => setInterestAmount(e.target.value)} /> */}
                                                <InputText className={`${!interestAmount && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText={loanType == "weekly" ? "Interest Amount" : loanType == "monthly" ? "Documentation Charges" : "Interest Amount"} inputDisable={loanType == ""} inputValue={interestAmount} inputName="Interest Amount" inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Interest Amount") }} />

                                            </div>
                                            <div className="col-lg-4">
                                                <InputText className={`${!noOfDays && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText={loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days"} inputName="No of Days" inputType="text" inputDisable={loanType == ""} inputValue={noOfDays} onChange={(e) => getEditLoanDeatils(e.target.value, loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days")} />
                                            </div>
                                            <div className="col-lg-4">
                                                <InputText inputValue={calculationn} labelText={loanType == "weekly" ? "Due Amount Per Week" : loanType == "monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputDisable inputName="Due Amount" inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                            </div>
                                            <div className="col-lg-4">
                                                <InputText className={`${!pstartDate && (submitLoanClickedWeekly) ? 'error' : ''}`} labelText="Start Date" inputName="Start Date" inputType="date" placeHolder="dd-mm-yyyy" inputDisable={loanType == ""} inputValue={pstartDate} onChange={(e) => { getEditLoanDeatils(e.target.value, "Start Date"); EditupdateEndDate(e.target.value) }} />
                                            </div>
                                            <div className="col-lg-4">
                                                <InputText labelText="End Date" inputDisable={loanType == ""} inputName="End Date" inputType="date" inputValue={pendDate} />

                                            </div>
                                            <div className="col-lg-4">
                                                <InputText labelText="Date" inputName="Date" inputType="date" inputValue={date} onChange={(e) => { getEditLoanDeatils(e.target.value, "Date") }} />
                                            </div>
                                        </div> : ""}

                                </div>

                            </Modal.Body>
                            <Modal.Footer>


                                <div className="col-lg-12 text-center">
                                    {number1 === true ?
                                        <button onClick={editLoanapprove} class="btn btn-primary smallBtn">Save</button> :

                                        <button disabled class="btn btn-primary smallBtn dis-btn">Save</button>
                                    }
                                    <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose2}>
                                        Close
                                    </button>


                                </div>
                            </Modal.Footer>


                            {isOpen &&
                                <CommonPopup
                                    handleClose={togglePopup}
                                    popupTitle={popupTitle} headercount
                                    popupMsg={popupMsg}
                                    popupType={popupType}
                                    popupActionType={popupActionType}
                                    popupActionValue={popupActionValue}
                                    popupActionPath={popupActionPath}
                                />}

                        </Modal> :
                        loanType == "monthly" ?
                            <Modal size="lg" show={approveshow} onHide={handleClose2}>

                                <Modal.Header>
                                    <Modal.Title>
                                        <h2>Edit Loan</h2>
                                    </Modal.Title>

                                    <div className="form-group StatusCheckbox">
                                        {/* <input type="checkbox" name='Approve' id='Approve' disabled={loginDetails[0].user_type === "Super Admin"  ? false : true} className="custom-checkbox smsenable" onClick={() => {  setNumber1(true) }} onChange={(e) => { getEditLoanDeatils(e.target.value, "Approve"); setApprove(e.target.value) }} /> */}
                                        <input type="checkbox" checked={approve == "yes" ? true : false} value={approve == "no" ? "yes" : "no"} disabled={loginDetails[0].user_type === "Super Admin" /* && status === 1 */ ? false : true} onChange={(e) => { setApprove(e.target.value); setNumber1(true) }} />
                                        <label for='Approve' className="form-label">Approve</label>
                                    </div>

                                    <h2 className='float-end'>Loan ID: <span className='orangeText'>{loanviewId}</span></h2>


                                </Modal.Header>

                                <Modal.Body>


                                    {/* <h2>Loan Details</h2> */}
                                    <div className="row loansBlock">
                                        <div className="col-12 loanHead">
                                            {/* <Checkbox className="smsenable" labelText="Enable SMS Notification" checked={Enablesms == "yes" ? true : false} value={Enablesms == "on" ? "Yes" : "No"} onChange={(e) => { setEnablesms(e.target.value); }} inputId="Enablesmsnotificationpopup" /> */}
                                            <input type="checkbox" checked={Enablesms == "yes" ? true : false} value={Enablesms == "no" ? "yes" : "no"} onChange={(e) => { setEnablesms(e.target.value); }} id="Enablesmsnotificationpopup" />
                                            <label className="form-label">  Enable SMS Notification</label>
                                            <div className='form-group float-end loanStatus'>

                                                <b className='mr-2'>Loan Status: {loanstatus}</b>

                                            </div>


                                        </div>



                                        <div className='col-lg-12 mb-2'>
                                            <b className='me-2'>Loan Type: </b>
                                            <Radio inputId="daily" labelText="Daily" radioChecked={loanType == "daily" ? true : false} onChange={() => { setLoanType("daily"); pclear(); setNumber1(true) }} />
                                            <Radio inputId="weekly" labelText="Weekly" radioChecked={loanType == "weekly" ? true : false} onChange={() => { setLoanType("weekly"); pclear(); setNumber1(true) }} />
                                            <Radio inputId="monthly" labelText="Monthly" radioChecked={loanType == "monthly" ? true : false} onChange={() => { setLoanType("monthly"); pclear(); setNumber1(true) }} />
                                        </div>
                                        {/* daily fields */}
                                        {loanType == "monthly" ?
                                            <div class="row">
                                                <div className="col-lg-4">
                                                    <InputText className={`${!loanAmount && (submitLoanClickedMonthly) ? 'error' : ''}`} labelText="Loan Amount" inputName="Loan Amount" inputValue={loanAmount} inputDisable={loanType == ""} inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Loan Amount") }} />
                                                </div>
                                                <div className="col-lg-4">
                                                    {/* <InputText labelText="Interest Amount" inputName="Interest Amount" inputValue={interestAmount} inputType="text" onChange={(e) => setInterestAmount(e.target.value)} /> */}
                                                    <InputText className={`${!interestAmount && (submitLoanClickedMonthly) ? 'error' : ''}`} labelText={loanType == "weekly" ? "Interest Amount" : loanType == "monthly" ? "Documentation Charges" : "Interest Amount"} inputDisable={loanType == ""} inputValue={interestAmount} inputName="Interest Amount" inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Interest Amount") }} />

                                                </div>
                                                <div className="col-lg-4">
                                                    <InputText className={`${!interest && (submitLoanClickedMonthly) ? 'error' : ''}`} labelText="Interest" inputName="Interest" inputType="text" inputDisable={loanType == ""} inputValue={interest} onChange={(e) => { getEditLoanDeatils(e.target.value, "Interest"); setInterest(e.target.value.replace(/[^0-9]/g, "")) }} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <InputText className={`${!noOfDays && (submitLoanClickedMonthly) ? 'error' : ''}`} labelText="No of Months" inputName="No of Days" inputType="text" inputDisable={loanType == ""} inputValue={noOfDays} onChange={(e) => getEditLoanDeatils(e.target.value, loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days")} />
                                                </div>
                                                
                                                <div className="col-lg-4">
                                                    <InputText inputValue={calculationn} labelText="Due Amount Per Month" inputDisable inputName="Due Amount" inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <InputText className={`${!pstartDate && (submitLoanClickedMonthly) ? 'error' : ''}`} labelText="Start Date" inputName="Start Date" inputType="date" placeHolder="dd-mm-yyyy" inputDisable={loanType == ""} inputValue={pstartDate} onChange={(e) => { getEditLoanDeatils(e.target.value, "Start Date"); EditupdateEndDate(e.target.value) }} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <InputText labelText="End Date" inputDisable={loanType == ""} inputName="End Date" inputType="date" inputValue={pendDate} />

                                                </div>
                                                <div className="col-lg-4">
                                                    <InputText labelText="Date" inputName="Date" inputType="date" inputValue={date} onChange={(e) => { getEditLoanDeatils(e.target.value, "Date") }} />
                                                </div>
                                            </div> : ""}

                                    </div>

                                </Modal.Body>
                                <Modal.Footer>


                                    <div className="col-lg-12 text-center">
                                        {number1 === true ?
                                            <button onClick={editLoanapprove} class="btn btn-primary smallBtn">Save</button> :

                                            <button disabled class="btn btn-primary smallBtn dis-btn">Save</button>
                                        }
                                        <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose2}>
                                            Close
                                        </button>


                                    </div>
                                </Modal.Footer>


                                {isOpen &&
                                    <CommonPopup
                                        handleClose={togglePopup}
                                        popupTitle={popupTitle} headercount
                                        popupMsg={popupMsg}
                                        popupType={popupType}
                                        popupActionType={popupActionType}
                                        popupActionValue={popupActionValue}
                                        popupActionPath={popupActionPath}
                                    />}

                            </Modal>
                            : ""}
            </div>



            <div class="hideContent">
                <div id="Print1" onClick={document.title = "WeeklyFinance"} style={{ "border-collapse": "collapse" }} >
                    {/* <h1>WeeklyFinance</h1> */}

                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>

                                <th class="border-top-0">CustID</th>
                                <th class="border-top-0">LoanId</th>
                                <th class="border-top-0">custName</th>
                                <th class="border-top-0">Phone</th>
                                <th class="border-top-0">LoanAmount</th>
                                <th class="border-top-0">CollectionAmount</th>
                                <th class="border-top-0">TotalDays</th>
                                <th class="border-top-0">ReminingDays</th>
                                <th class="border-top-0">LoanStatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyFinList.length > 0 ? (
                                dailyFinList.map((dailyFinList) => (
                                    <tr>
                                        <td>{dailyFinList.vendor_customer_id}</td>
                                        <td>{dailyFinList.vendorloan_id}</td>
                                        <td>{dailyFinList.customer_name}</td>
                                        <td>{dailyFinList.customer_phone}</td>
                                        <td>{dailyFinList.loan_amount}</td>
                                        <td>{parseInt(dailyFinList.installment_amount)}</td>
                                        <td>{dailyFinList.total_days}</td>
                                        <td>{dailyFinList.remaining_days}</td>
                                        <td>{dailyFinList.status == "New" ? <span className='text-color-blue'> New </span> : dailyFinList.status == "Overdue" ? <span className='text-color-orange'>Overdue</span> : dailyFinList.status == "Active" ? <span className='text-color-green'> Active </span> : <span className='text-color-red'>Closed</span>}</td>


                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colspan="9" className="text-center">
                                        <p>No Data Found</p>{" "}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hideContent">
                <div id="Print" onClick={document.title = "WeeklyFinance"} style={{ "border-collapse": "collapse" }} >
                    <div className="card-body">
                        <div className="row loansBlock">
                            <div class="col-lg-6">
                                <div class="col-lg-12">
                                    <p className="form-label"> Loan ID </p>
                                    <p className='form-value'>:&nbsp;{loanviewId}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Total Amount </p>
                                    <p className='form-value'>:&nbsp;{Math.floor(header.total_amount)}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Remaining Weeks </p>
                                    <p className='form-value'>:&nbsp;{header.remaing_days}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Amount Paid </p>
                                    <p className='form-value'>:&nbsp;{header.paidamount}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Interest </p>
                                    <p className='form-value'>:&nbsp;{header.interest_amount}</p>
                                </div>
                                {/* start_date */}
                                <div class="col-lg-12">
                                    <p className="form-label"> Start Date </p>
                                    <p className='form-value'>:&nbsp;{moment(header.start_date).format("DD-MM-YYYY")}</p>
                                </div>
                                {/* end_date */}
                                <div class="col-lg-12">
                                    <p className="form-label"> End Date </p>
                                    <p className='form-value'>:&nbsp;{moment(header.end_date).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="col-lg-12">
                                    <p className="form-label"> CustID </p>
                                    <p className='form-value'>:&nbsp;{header.vendor_customer_id}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> custName </p>
                                    <p className='form-value'>:&nbsp;{header.customer_name}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Email </p>
                                    <p className='form-value'>:&nbsp;{header.email}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> DOB </p>
                                    <p className='form-value'>:&nbsp;{moment(header.dob).format("DD-MM-YYYY")}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Phone </p>
                                    <p className='form-value'>:&nbsp;{header.phone_no}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Gender </p>
                                    <p className='form-value'>:&nbsp;{header.gender}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p className="form-label"> Address </p>
                                    <p className='form-value'>:&nbsp;{header.customer_address}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <table style={{ width: "100%" }}>

                        <thead>
                            <tr>

                                <th class="border-top-0">Weekly</th>
                                <th class="border-top-0">Date</th>
                                <th class="border-top-0">Amount</th>
                                <th class="border-top-0">Paid</th>
                                <th class="border-top-0">Penalty/Discount</th>
                                <th class="border-top-0">Signature</th>

                            </tr>
                        </thead>
                        <tbody>
                            {loanCollList.length > 0 ? (
                                loanCollList.map((loanCollList) => (
                                    <tr>
                                        <td>{loanCollList.day}</td>
                                        <td>{moment(loanCollList.installment_date).format("DD-MM-YYYY")}</td>
                                        <td>{loanCollList.installment_amount}</td>
                                        <td>{loanCollList.ispaid}</td>
                                        <td>{loanCollList.penalty_discount}</td>
                                        <td>{loanCollList.is}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colspan="9" className="text-center">
                                        <p>No Data Found</p>{" "}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div >

    )

}


export default WeeklyFinance;