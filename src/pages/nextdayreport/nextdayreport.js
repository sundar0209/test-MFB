import React, { useState, useEffect, useRef } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { SelectStatus } from '../../components/FormFields';
import { axiosObject } from '../../services/BaseService'
import jsPDF from "jspdf";
import printJS from 'print-js'
import DataTable from 'react-data-table-component';
import Loading from "../../components/Loading";
import Datetime from 'react-datetime';
import Select from 'react-select'
import moment from 'moment';
import "react-datetime/css/react-datetime.css";
import { useSelector, useDispatch } from 'react-redux';
import ls, { set } from 'local-storage';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'









const NextdayReport = () => {

  const loginDetails = useSelector(state => state.LoginReducer.payload);

  console.log("loginDetails", loginDetails[0].user_id)

  let navigate = useNavigate();
  const createNewLoan = () => {
    navigate("/customers");
  }

  const [ToDate, setToDate] = useState("");
  const [searchRep, setSearchRep] = useState("");
  const [filterRep, setFilterRep] = useState("");
  const [loadMoreSearch, setLoadMoreSearch] = useState(8)
  const [End_date, setEnd_Date] = useState("");
  const [Start_Date, setStart_Date] = useState("");
  const [fromDateError, setFromDateError] = useState("");
  const [statuss, setStatuss] = useState("")
  const [statusss, setStatusss] = useState("")
  const [loanstatus, setLoanstatus] = useState("")
  const [Idshow, setIdshow] = useState("");
  const [singleLoanList, setSingleLoanList] = useState("");
  const [pendDate, setPendDate] = useState("");
  const [pstartDate, setPstartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loanIdd, setLoanIdd] = useState("");
  const [approvedStatus, setApprovedStatus] = useState();
  const [show, setShow] = useState(false);

  const [perDayAmount, setPerDayAmount] = useState("");
  //loadingloan
  const [loadingLoan, setLoadingLoan] = useState(true);



  const redirection = (customer_id) => {
    navigate({ pathname: "/viewcustomer" });
    ls.set("customrId", customer_id);
    console.log("customrId", customer_id);
  };


  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setLoadingLoan(true);
    singleLoan(data);
    console.log(data.loan_id, "data.loan_id");
  }


  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: "80px",

    },
    {
      name: 'Customer Id',
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
      name: 'Loan ID',
      //selector: row => row.loan_id,
      sortable: true,
      minWidth: "120px",
      cell: (row) => {
        return (
          <div>
            <a onClick={() => handleShow(row.loan_id)}>{row.vendorloan_id}</a>
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
            <a href={"tel:+91" + row.phone_no} >{row.phone_no}</a>
          </div>
        );
      },
    },



    
    {
      name: 'Date',
      selector: row => row.installmentdate,
      sortable: true,
      minWidth: "120px",
    },


    {
      name: 'Collection Amount',
      selector: row => row.installment_payment,
      sortable: true,
      minWidth: "160px",
    },
    {
      name: 'Current Due',
      selector: row => row.paid_days + 1,
      sortable: true,
      minWidth: "160px",
    },
    {
      name: 'Remaining Due',
      selector: row => row.remaining_days,
      sortable: true,
      minWidth: "160px",
    },
    {
      name: 'Loan Amount',
      selector: row => row.loan_amount,
      sortable: true,
      minWidth: "160px",
    },
    {
      name: 'Loan Type',
      selector: row => row.loan_type,
      sortable: true,
      minWidth: "140px",
    },
    {
      name: 'Loan Status',
      selector: row => row.status === "New" ?
        <span className='text-color-blue'> New </span> :
        row.status === "Overdue" ?
          <span className='text-color-orange'>Overdue</span> :
          row.status === "Active" ?
            <span className='text-color-green'> Active </span> :
            row.status === "Deleted" ?
              <span className='text-color-red'>  Deleted</span> :
              //row.status === "Deleted" ?
              <span className='text-color-red'>Closed</span>,
      sortable: true,
      minWidth: "140px",
    },

    {
      name: 'Agent Name',
      selector: row => row.username,
      sortable: true,
      minWidth: "200px",
    },


  ];


  const onKeydowninSearch = (event) => {
    if (event.key === "Enter") {
      console.log("Enter is pressed call search function");
      getCustData();
    }
  };


  const downloadData = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table" });
    pdf.save("Reports.pdf");
  };



  const [cmlist, setCmlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [FromDate, setFromDate] = useState("");
  const [custID, setCustId] = useState("");
  const [name, setName] = useState("");
  const [loanId, setLoanId] = useState("");
  const [scheduletodate, setScheduleToDate] = useState(null);
  const [scheduletodate1, setScheduleToDate1] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleDate1, setScheduleDate1] = useState(null);
  const [SelectedReportsId, setSelectedReportsId] = useState(null);
  const [custName, setCustName] = useState("");
  const [SalesList, setSalesList] = useState("");
  const [address, setAddress] = useState("");
  const [customer, setCustomer] = useState("");
  const [selectedSalesId, setSelectedSalesId] = useState("");
  const [cusSelectedSalesId, setCusSelectedSalesId] = useState("");
  const [cusSalesId, setCusSalesId] = useState("");
  const [dailyFinList, setDailyFinList] = useState([]);
  const [noOfDays, setNoOfDays] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanType, setLoanType] = useState("");
  const [date, setDate] = useState([]);
  const [status, setStatus] = useState("");
  const [Enablesms, setEnablesms] = useState("no");
  const [interest, setinterest] = useState("");


  const [loanTypeId, setLoanTypeId] = useState();
  const [loanStatus, setloanStatus] = useState();
  const [buyerType, setBuyerType] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [remainingDue, setRemainingDue] = useState("");
  const [paidDue, setPaidDue] = useState("");


  const customerListDetails = () => {

    let request = {
      vendor_id: loginDetails[0].vendor_id,
      user_id: loginDetails[0].user_id,
      token: loginDetails[0].token
    }


    axiosObject.post("arealistdropdown/condition", request).then(response => {

      console.log("usersdropdown Details response", response.data.data)
      setSalesList(response.data.data);


    });
  }

  const singleLoan = (data) => {

    let request = {
      loan_id: data.slice(3),
      user_id: loginDetails[0].user_id,
      vendor_id: loginDetails[0].vendor_id,
      token: loginDetails[0].token

    }
    console.log("req", data.slice(3));


    axiosObject.post("loanview/condition", request)

      .then((response) => {
        console.log(response.data.data);
        setSingleLoanList(response.data.data[0]);
        setStatus(response.data.data[0].isactive)
        setApprovedStatus(response.data.data[0].status)
        setLoanType(response.data.data[0]?.loan_type);
        setRemainingDue(response.data.data[0]?.remaining_dues);
        setPaidDue(response.data.data[0]?.paid_due);
        setLoanIdd(response.data.data[0]?.vendorloan_id);
        setLoanAmount(response.data.data[0]?.loan_amount);
        setInterestAmount(response.data.data[0]?.interest_amount)
        setinterest(response.data.data[0]?.interest);
        setNoOfDays(response.data.data[0]?.installment_number)
        setPerDayAmount(response.data.data[0]?.installment_amount)
        setStartDate(response.data.data[0]?.start_date)
        setEndDate(response.data.data[0]?.end_date)
        setDate(response.data.data[0]?.date)
        setLoadingLoan(false);



      });
  }
  const onSearch = (e) => {
    setCustName(e.target.value);
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
  };



  const getCustData = () => {

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
     else if (ToDate < FromDate) {
       setFromDateError("End date  must be after start date")

       return;
     }
    }

    let request = {
      from_date: FromDate,
      to_date: ToDate,
      user_id: loginDetails[0].user_id,
      area: cusSalesId,
      search: custName,
      loan_type_id: "",
      vendor_id: loginDetails[0].vendor_id,
      token: loginDetails[0].token
    }
    console.log(request, "req1");

    axiosObject
      .post("duePaymentsList/condition", request)

      .then((response) => {
        console.log(response);
        setCmlist(response.data.data);
        setCustId(response.data.data[0]?.customer_id);
        setLoanId(response.data.data[0]?.loan_id);
        //setCustName(response.data.data[0]?.customer_name);
        setLoading(false);

      });
  }


  const customerFilter = (data) => {

    let request = {
      status: data,
      user_id: loginDetails[0].user_id,
      token: loginDetails[0].token

    }

    axiosObject.post("customerFilter/condition", request).then(response => {

      console.log("tiketsystem Details response", response.data.data)

      setCmlist(response.data.data);
      // setTotalRecords(response.data.data.length);
      if (response.data.success == true) {
        console.log("check tiket id's", response.data.data)

      }

    });
  }
  const handleOnchange = (val) => {
    var numberArray = val;
    console.log("numberArray====", numberArray);

    setSelectedSalesId(numberArray);
    console.log("numberArray", numberArray);


  }


  // const searchCollectionDetail = (data) => {
  //   console.log("searchCollectionDetail")
  //   setFromDateError("")

  //   if (ToDate) {
  //     if (!FromDate) {
  //       setFromDateError("From Date is required")
  //       return;
  //     }
  //   }
  //   if (FromDate) {
  //     if (!ToDate) {
  //       setFromDateError("To Date is required")
  //       return;
  //     }
  //    else if (ToDate <= FromDate) {
  //      setFromDateError("End date  must be after start date")

  //      return;
  //    }
  //   }
  //   let request = {
  //     from_date: FromDate,
  //     to_date: ToDate,
  //     user_id: loginDetails[0].user_id,
  //     area:cusSalesId,
  //     data :custName,
  //     loan_type_id : statusss,
  //     vendor_id: loginDetails[0].vendor_id,
  //     token: loginDetails[0].token
  //     //customer_id:buyerId.customer_id.slice(5),

  //   }
  //   console.log("req2", request);

  //   axiosObject.post("duePaymentsList/condition", request)
  //     .then((response) => {

  //       setCmlist(response.data.data);


  //     },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  //     .catch(err => { console.log(err); });
  // }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }



  const clearChecked = () => {
    getCustData();
    setFromDate("");
    setToDate("");
    setFromDateError("");
    setStatuss("");
    setStatusss("");
    setLoanstatus("");
    setCusSalesId("");
    setSalesList("");
    setCustName("");
    document.getElementById("statusSearch1").value = "Loan Type";
    document.getElementById("loanstatus").value = "Loan Status";
    document.getElementById('statusSearch').value = "Application Status";
    document.getElementById('BankAcc').value = "Filter By Area";


  };

  useEffect(() => {
    getCustData()
    customerListDetails();
    // searchCollectionDetail();

  }, [])
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  }

  const printPage = () => {
    console.log("print")
    printJS({
      printable: "pdfPrint",
      type: 'html',
      targetStyles: ['*'],
      header: 'Reports'
    })
  }





  const inputProps = {
    placeholder: "From Date",
    value: FromDate
  };


  const inputProps1 = {
    placeholder: "To Date",
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

  // disable past dates
  const yesterday = moment().subtract(1, 'day');
  const disablePastDt = current => {
    return current.isSameOrAfter(FromDate);
  };


  // disable future dates
  const today = moment();
  const disableFutureDt = current => {
    return current.isBefore(today)
  }


  const handleCustomer = (e) => {

    setBuyerType(e.target.value)
    console.log("=========check", e.target.value)
    setBuyerId(customer.filter(data => data.customer_id == e.target.value)[0])
    console.log("=========check", customer.filter(data => data.customer_id == e.target.value)[0])
  }

  return (
    <div>

      <div id="wrapper">
        <Header />
        <Sidebar />


        <section id="content-wrapper">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 report">
              <h1 className='pageHead mt-2'>Next Day Report </h1>
            </div>

            <div className="col-lg-9 col-md-8 col-sm-8 col-8 tableSearchBlock">

              <div className='col-4 tableSearch'>
                <input
                  type="text"
                  placeholder='Search'
                  class="form-control"
                  id="billofsale"
                  onKeyDown={onKeydowninSearch}
                  onChange={onSearch}
                  value={custName}
                />
                <i class="fa-solid fa-magnifying-glass searchIcon"></i>
              </div>



              <div class="col-4 datePickerBlock">

<Datetime inputProps={inputProps} timeFormat={false} dateFormat="YYYY-MM-DD"
  name="Date" isValidDate={disableFutureDt} onChange={fromDate} closeOnSelect={true}
  // className={this.props.value ? null : 'error'}
  id="meeting_date" />
</div>


              <div class="col-4 datePickerBlock">

<Datetime inputProps={inputProps1} timeFormat={false} dateFormat="YYYY-MM-DD"
  name="Date" isValidDate={disablePastDt} onChange={toDate} closeOnSelect={true}

  id="meeting_date" />
</div>

              {/* <div className='col-4 selectStatus'>
                <div className="form-group">
                  <select className="form-select" id="statusSearch1" onChange={(e) => setStatusss(e.target.value)}>
                    <option style={{ display: "none" }}>Loan Type</option>
                    <option value="">--Select All--</option>
                    <option value="3">Daily</option>
                    <option value="2">Weekly</option>
                    <option value="1">Monthly</option>

                  </select>
                </div>
              </div> */}


              <div class="col-4">

                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="BankAcc"
                  onChange={handleBuyerId}
                >
                  <option style={{ display: "none" }}>Filter By Area</option>
                  <option value="">--Select All--</option>
                  {SalesList?.length > 0 && (
                    <>
                      {SalesList.map((SalesList) => (
                        <option
                          key={SalesList.user_id}
                          value={SalesList.user_id}
                        >

                          {SalesList.area}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>

              <div class="col-4 searchbtn">
                <button class="btn btn-primary me-2" onClick={getCustData}><i class="fa-solid fa-magnifying-glass" id="Collect" ></i></button>
                <button type="button" class="btn btn-secondary me-2" onClick={() => clearChecked()}> <i class="fa-solid fa-rotate"></i></button>
              </div>

              <div className='col-4 print'>
                <button type="submit" onClick={printPage} className="btn btn-primary addBtn float-end"><i class="fa-solid fa-print"></i> <span className='label'> Print</span></button>
              </div>

            </div>
            <div class="errorMsgBox col-lg-12">
              <p className="form-input-error" >{fromDateError}</p>
            </div>
            <div class="hideContent">
              <div id="pdfPrint" onClick={document.title = "Reports"} style={{ "border-collapse": "collapse" }} >
                <table>
                  <thead>
                    <tr>

                      <th class="border-top-0">Cust AccountNo #</th>
                      <th class="border-top-0">loan Id #</th>
                      <th class="border-top-0">Date</th>
                      <th class="border-top-0">Name</th>
                      <th class="border-top-0">Phone</th>
                      <th class="border-top-0">Area</th>
                      <th class="border-top-0">Loan Amount #</th>
                      <th class="border-top-0">Collection Amount</th>
                      <th class="border-top-0">Reference Name</th>
                      <th class="border-top-0">Reference Phone</th>
                      <th class="border-top-0">Current Due</th>
                      <th class="border-top-0">Loan Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cmlist?.length > 0 ? (
                      cmlist.map((cmlist, index) => (
                        <tr>

                          <td>{cmlist.cust_account_number}</td>
                          <td>{cmlist.vendorloan_id}</td>
                          <td>{cmlist.installmentdateformat}</td>
                          <td>{cmlist.customer_name}</td>
                          <td>{cmlist.phone_no}</td>
                          <td>{cmlist.area}</td>
                          <td>{cmlist.loan_amount}</td>
                          <td>{cmlist.installment_payment}</td>
                          <td>{cmlist.reference_person_name}</td>
                          <td>{cmlist.reference_person_phoneno}</td>
                          <td>{cmlist.paid_days + 1}</td>
                          <td>{cmlist.weeklyinstallmentnumber}</td>
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


            {loading ? <Loading /> :

              <div class="col-12 mt-0">
                <DataTable className='girdTable' highlightOnHover columns={columns} data={cmlist} pagination />
              </div>}
           
              <Modal size="m" show={show} onHide={handleClose}>

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
                          <p className='form-value'><span className='orangeText'> {loanIdd} </span></p>
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
                        </div>

                        <div class="col-lg-12">
                          <p className="form-label">Approvel Status</p>
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



                  <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>

          </div>
        </section>
      </div>
    </div>

  )

}


export default NextdayReport;