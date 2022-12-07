import React, { useState, useEffect } from 'react';
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { axiosObject } from '../services/BaseService'
import ls, { set } from 'local-storage';
import Loading from "../components/Loading";
import printJS from 'print-js'
import Datetime from 'react-datetime';
import moment from 'moment';
import { InputText } from '../components/FormFields';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import CommonPopup from '../components/CommonPopup/CommonPopup';








const WeeklyCollectionReports = () => {

  const loginDetails = useSelector(state => state.LoginReducer.payload);

  console.log("loginDetails", loginDetails[0].user_id)


  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [searchRep, setSearchRep] = useState("");
  const [filterRep, setFilterRep] = useState("");
  const [selectedSalesId, setSelectedSalesId] = useState("");
  const [cusSalesId, setCusSalesId] = useState("");
  const [cusSelectedSalesId, setCusSelectedSalesId] = useState("");
  const [status, setStatus] = useState("");
  const [approvedStatus, setApprovedStatus] = useState();
  const [loanType, setLoanType] = useState("");
  const [perDayAmount, setPerDayAmount] = useState("");
  const [remainingDue, setRemainingDue] = useState("");
  const [paidDue, setPaidDue] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [interest, setinterest] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanIdd, setLoanIdd] = useState("");
  const [loanviewIdd, setLoanViewIdd] = useState("");
  const [Idshow, setIdshow] = useState("");
  const [singleLoanList, setSingleLoanList] = useState("");

  const [interestAmount, setInterestAmount] = useState("");
  const [loanId, setLoanId] = useState("");
  const [loanTypeId, setLoanTypeId] = useState();

  const [pendDate, setPendDate] = useState("");

  const [pstartDate, setPstartDate] = useState("");
  const [loanstatus, setLoanStatus] = useState("");
  const [Enablesms, setEnablesms] = useState("no");


  const [popupTitle, setPopupTitle] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupActionType, setPopupActionType] = useState("");
  const [popupActionValue, setPopupActionValue] = useState("");
  const [popupActionPath, setPopupActionPath] = useState("");

  //loadingloan
  const [loadingLoan, setloadingLoan] = useState(true);


  const redirection = (customer_id) => {
    navigate({ pathname: "/WeeklyViewCustomer" });
    ls.set("customrId", customer_id);
    console.log("customrId", customer_id);
  };

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const columns = [

    {
      name: 'S.No',
      maxWidth: "80px",
      selector: (row, index) => index + 1
    },
    {
      name: 'Cust Account Number',
      selector: row => row.cust_account_number,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: 'Customer ID',
      //selector: row => row.customer_id,
      sortable: true,
      minWidth: "160px",
      cell: (row) => {
        return (
          <div className='custIDCol'>
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
      name: 'Customer Name',
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
      name: 'Loan Amount',
      selector: row => row.loan_amount,
      sortable: true,
      minWidth: "160px",
    }, {
      name: 'Loan Type',
      selector: row => row.weeklyinstallmentnumber,
      sortable: true,
      minWidth: "140px",
    },

    {
      name: 'Collection Amount',
      selector: row => row.installment_amount,
      sortable: true,
      minWidth: "200px",
    },

    {
      name: 'Loan Status',
      selector: row => row.status == "New" ? <span className='text-color-blue'> New </span> : row.status == "Overdue" ? <span className='text-color-orange'>Overdue</span> : row.status == "Active" ? <span className='text-color-green'> Active </span> : <span className='text-color-red'>Closed</span>,
      sortable: true,
      minWidth: "140px",
    },

    {
      name: 'Agent Name',
      selector: row => row.collectionname,
      sortable: true,
      minWidth: "140px",
    },





  ];



  const [cmlist, setCmlist] = useState([]);
  const [error, setError] = useState([]);
  const [name, setName] = useState("");
  const [custName, setCustName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [custID, setCustId] = useState("");
  const [End_date, setEnd_Date] = useState("");
  const [Start_Date, setStart_Date] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false)
  const [fromDateError, setFromDateError] = useState("");

  const [loading, setLoading] = useState(true);
  const [scheduletodate, setScheduletoDate] = useState(null);
  const [scheduletoDate1, setScheduletoDate1] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleDate1, setScheduleDate1] = useState(null);
  const [loadMoreSearch, setLoadMoreSearch] = useState(8)
  const [SalesList, setSalesList] = useState("");
  const [statusss, setStatusss] = useState("")
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [date, setDate] = useState([]);

  const [show, setShow] = useState(false);








  let navigate = useNavigate();
  const createNewCustomer = () => {
    navigate("/addcustomer");
  }

  const editCustomer = (data) => {
    console.log("customer id====", data);
    // ls.set("customerId", data)					
    // navigate("/editcustomer");
    navigate("/editcustomer", { state: { customerId: data } });
  }

  const viewCustomer = (data) => {
    // ls.set("viewCustomerId", data)	
    navigate("/viewcustomer", { state: { customerId: data } });
    console.log("expense id====", data);

  }

  const CollectionReports = () => {

    let request = {
      vendor_id: loginDetails[0].vendor_id,
      token_user_id: loginDetails[0].user_id,
      token: loginDetails[0].token
    }

    axiosObject.post("collectionList/condition", request)

      .then((response) => {
        console.log(response);
        setCmlist(response.data.data);
        console.log("===userid===", response.data.data);
        setCustId(response.data.data[0]?.customer_id);
        setCustName(response.data.data[0]?.customer_name);
        setLoading(false);

      });
  }



  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setloadingLoan(true);
    singleLoan(data);
    console.log(data.loan_id, "data.loan_id");
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

  const singleLoan = (data) => {
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
        setLoanViewIdd(response.data.data[0]?.vendorloan_id);
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



  const searchCollectionDetail = () => {
    // setSubmitClicked(true);
    // e.preventDefault();
    console.log("searchCollectionDetail")
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

      start_date: FromDate,
      end_date: ToDate,
      user_id: cusSalesId ? cusSalesId : "",
      token_user_id: loginDetails[0].user_id,
      vendor_id: loginDetails[0].vendor_id,
      token: loginDetails[0].token,
      status: "",
      key: loadMoreSearch

    }
    console.log("active data", request);

    axiosObject.post("collectionreportsearch/condition", request)
      .then((response) => {
        console.log("collect_search data", response.data.data);
        setCmlist(response.data.data);

      },
        (error) => {
          console.log(error);
        }
      )
      .catch(err => { console.log(err); });
  }


  const clearChecked = () => {

    CollectionReports();
    setFromDateError("");
    setFromDate("");
    setToDate("");
    setStatusss("");
    setCusSalesId("");
    setCusSelectedSalesId("");
    setSalesList("")
    customerListDetails();
    document.getElementById('statusSearch1').value = "Loan Type";
    document.getElementById('BankAcc').value = "Filter By Agent";
    
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

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  useEffect(() => {
    CollectionReports()
    customerListDetails();
  }, [])

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
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

  const printPage = () => {
    console.log("print")
    printJS({
      printable: "pdfPrint",
      type: 'html',
      targetStyles: ['*'],
      header: 'Collection Reports'
    })
  }


  return (
    <div>

      <div id="wrapper" >

        <Header />
        <Sidebar />

        <section id="content-wrapper" className='customersPage'>
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 report">
              <h1 className='pageHead mt-2'>Collection Reports </h1>
            </div>

            <div className="col-lg-8 col-md-8 col-sm-8 col-8 tableSearchBlock">


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
                          {/* {SalesList.username} */}
                          {SalesList.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>



              <div class="col-4 form-group searchbtn">
                <button class="btn btn-primary me-2" onClick={searchCollectionDetail}><i class="fa-solid fa-magnifying-glass" id="" ></i></button>
                <button type="button" class="btn btn-secondary me-2 " onClick={() => clearChecked()}> <i class="fa-solid fa-rotate"></i></button>
              </div>

              <div className='col-4 print'>
                <button type="submit" onClick={printPage} className="btn btn-primary addBtn float-end"><i class="fa-solid fa-print"></i> <span className='label'> Print</span></button>
              </div>


            </div>
            <div class="errorMsgBox col-lg-12">
              <p className="form-input-error" >{fromDateError}</p>

            </div>
            <div class="hideContent">
              <div id="pdfPrint" onClick={document.title = "CollectionReports"} style={{ "border-collapse": "collapse" }} >
                <table>
                  <thead>
                    <tr>
                      <th class="border-top-0"> S.no</th>
                      <th class="border-top-0">Cust ID</th>
                      <th class="border-top-0">Loan ID</th>
                      <th class="border-top-0">Cust name</th>
                      <th class="border-top-0">Loan amt</th>
                      <th class="border-top-0">Loan type</th>
                      <th class="border-top-0">Collection amt</th>
                      <th class="border-top-0">Salesperson name</th>
                      <th class="border-top-0">User type</th>
                      <th class="border-top-0">status</th>

                    </tr>
                  </thead>
                  <tbody>
                    {cmlist.length > 0 ? (
                      cmlist.map((cmlist, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{cmlist?.vendor_customer_id}</td>
                          <td>{cmlist?.vendorloan_id}</td>
                          <td>{cmlist?.customer_name}</td>
                          <td>{cmlist?.loan_amount}</td>
                          <td>{cmlist?.weeklyinstallmentnumber}</td>
                          <td>{cmlist?.installment_amount}</td>
                          <td>{cmlist?.collectionname}</td>
                          <td>{cmlist?.user_type}</td>
                          <td>{cmlist.status == "New" ? <span className='text-color-blue'> New </span> : cmlist.status == "Overdue" ? <span className='text-color-orange'>Overdue</span> : cmlist.status == "Active" ? <span className='text-color-green'> Active </span> : <span className='text-color-red'>Closed</span>}</td>


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
                <DataTable className='girdTable' highlightOnHover columns={columns} data={cmlist} defaultSortFieldId={1} pagination={true} />
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
                          <p className='form-value'><span className='orangeText'> {loanviewIdd} </span></p>
                        </div>
                        <div class="col-lg-12">
                          <p className="form-label">Loan Amount</p>
                          <p className='form-value'>{loanAmount}</p>
                        </div>


                        <div class="col-lg-12">
                          <p className="form-label">Interest Amount</p>
                          <p className='form-value'>{interestAmount}</p>
                        </div>


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
                          <p className="form-label">EMI Amount Weekly</p>
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


          </div>
        </section>
      </div>
    </div>

  )

}


export default WeeklyCollectionReports;