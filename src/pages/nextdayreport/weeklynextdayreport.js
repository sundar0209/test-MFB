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









const WeeklyNextdayReport = () => {

  const loginDetails = useSelector(state => state.LoginReducer.payload);

  console.log("loginDetails", loginDetails[0].user_id)

  let navigate = useNavigate();
  const createNewLoan = () => {
    navigate("/customers");
  }

  const [endDate, setEndDate] = useState("");
  const [loanIdd, setLoanIdd] = useState("");
  const [approvedStatus, setApprovedStatus] = useState();
  const [show, setShow] = useState(false);

  const [perDayAmount, setPerDayAmount] = useState("");



  const redirection = (customer_id) => {
    navigate({ pathname: "/WeeklyViewCustomer" });
    ls.set("customrId", customer_id);
    console.log("customrId", customer_id);
  };


  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setloadingLoan(true);
    singleLoanview(data);
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
      name: 'Area',
      selector: row => row.area,
      sortable: true,
      minWidth: "200px",
    },


    {
      name: 'Date',
      selector: row => row.installmentdate,
      sortable: true,
      minWidth: "120px",
    },


    {
      name: 'Collection Amount',
      selector: row => row.installment_amount,
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
      name: 'Reference Name',
      selector: row => row.reference_person_name,
      sortable: true,
      minWidth: "160px",
    },
    {
      name: 'Reference phone',
      selector: row => row.reference_person_phoneno,
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
      selector: row => row.salesname,
      sortable: true,
      minWidth: "200px",
    },


  ];


  const downloadData = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table" });
    pdf.save("Reports.pdf");
  };



  const [cmlist, setCmlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState(FromDate);
  const [dateFlag, setDateFlag] = useState(false);

  console.log("ToDate from", FromDate);
  console.log("ToDate dateFlag", dateFlag);
  const [custID, setCustId] = useState("");
  const [name, setName] = useState("");
  const [loanId, setLoanId] = useState("");
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
  const [interest, setinterest] = useState("");

  const [buyerType, setBuyerType] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [remainingDue, setRemainingDue] = useState("");
  const [paidDue, setPaidDue] = useState("");
  //singal loan view
  const [loanviewId, setLoanViewId] = useState();
  const [Enablereference, setEnablereference] = useState("no");
  const [referencename, setReferencename] = useState("");
  const [referencephoneno, setReferencephoneno] = useState("");
  //loadingloan
  const [loadingLoan, setloadingLoan] = useState(true);
  const [fromDateError, setFromDateError] = useState("");


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

           // setNumberOfWeeks(response.data.data[0]?.installment_number)

            console.log(response.data.data);
           // setSingleLoanList(response.data.data[0]);
            setStatus(response.data.data[0].isactive)
            setApprovedStatus(response.data.data[0].status)
            setLoanType(response.data.data[0]?.loan_type);
            setRemainingDue(response.data.data[0]?.remaining_dues);
            setPaidDue(response.data.data[0]?.paid_due);
            setLoanIdd(response.data.data[0]?.loan_id);
            setLoanViewId(response.data.data[0]?.vendorloan_id);
            setLoanAmount(response.data.data[0]?.loan_amount);
            setInterestAmount(response.data.data[0]?.interest_amount)
            setinterest(response.data.data[0]?.interest);
            setNoOfDays(response.data.data[0]?.installment_number)
            setPerDayAmount(response.data.data[0]?.installment_amount)
            setStartDate(response.data.data[0]?.start_date)
            setEndDate(response.data.data[0]?.end_date)
            setDate(response.data.data[0]?.date)
            setEnablereference(response.data.data[0]?.reference_person)
            setReferencename(response.data.data[0]?.reference_person_name)
            setReferencephoneno(response.data.data[0]?.reference_person_phoneno)
            setloadingLoan(false);



        });
}


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
    getCustData(e.target.value)
  };



  const getCustData = (data, flag) => {

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

      from_date: flag == "flag" ? "" : FromDate,
      to_date: flag == "flag" ? "" : dateFlag == false ? FromDate : ToDate,
      user_id: loginDetails[0].user_id,
      area: !data ? "" : data,
      search: custName,
      loan_type_id: "",
      vendor_id: loginDetails[0].vendor_id,
      token: loginDetails[0].token
    }
    console.log(request, "req1");

    axiosObject.post("duePaymentsList/condition", request)

      .then((response) => {
        console.log(response);
        setCmlist(response.data.data);
        setCustId(response.data.data[0]?.customer_id);
        setLoanId(response.data.data[0]?.loan_id);
        setLoanIdd(response.data.data[0]?.vendorloan_id);
        setLoanAmount(response.data.data[0]?.loan_amount);
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

  useEffect(() => {
    if (custName != "") {
      const timer = setTimeout(() => {
        getCustData();
      },);
      return () => {
        clearTimeout(timer);
      };
    } else {
      getCustData();
    }
  }, [custName]);

  const onKeydowninSearch = (event) => {
    if (event.key === "Enter") {
      getCustData();
    }
  };

  const clearChecked = () => {
    getCustData("", "flag");
    setFromDate("");
    setFromDateError("");
    setToDate("");
    setCustName("");
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
    value:ToDate
  };
  const fromDate = (event) => {
    if (event._isAMomentObject == true) {
      setFromDate(event.format("YYYY-MM-DD"))
    }
  }
  const toDate = (event) => {

    if (event._isAMomentObject == true) {
      setToDate(event.format("YYYY-MM-DD"))
      setDateFlag(true)
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
                // value={custName}
                />
                <i class="fa-solid fa-magnifying-glass searchIcon"></i>
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
                  name="Date" isValidDate={disablePastDt} value={FromDate ? FromDate : ToDate} onChange={toDate} closeOnSelect={true}
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
                <button class="btn btn-primary me-2" onClick={() => getCustData()}><i class="fa-solid fa-magnifying-glass" id="Collect" ></i></button>
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
                      <th class="border-top-0">ReferenceName</th>
                      <th class="border-top-0">ReferencePhoneno</th>
                      <th class="border-top-0">Loan Amount #</th>
                      <th class="border-top-0">Collection Amount</th>
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
                          <td>{cmlist.reference_person_name}</td>
                          <td>{cmlist.reference_person_phoneno}</td>
                          <td>{cmlist.loan_amount}</td>
                          <td>{cmlist.installment_amount}</td>
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
                          <p className='form-value'><span className='orangeText'> {loanviewId} </span></p>
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
                          <p className="form-label">Approvel Status</p>
                          <p className='form-value'>{status == "1" ? "Approved" : "Pending"}</p>
                        </div>
                        <div class="col-lg-12">
                                        <p className="form-label">Reference Person</p>
                                        <p className='form-value'>{Enablereference}</p>
                                    </div>
                                    {Enablereference == "yes" ?
                                        <>
                                    <div class="col-lg-12">
                                        <p className="form-label">Referenceperson Name</p>
                                        <p className='form-value'>{referencename}</p>
                                    </div>
                                    <div class="col-lg-12">
                                        <p className="form-label">Referenceperson Phoneno</p>
                                        <p className='form-value'>{referencephoneno}</p>
                                    </div>
                                    </>
                                    :
                                    ""}

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


export default WeeklyNextdayReport;