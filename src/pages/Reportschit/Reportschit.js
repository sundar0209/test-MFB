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







const Reportschit = () => {

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
  const [loanviewIdd, setLoanViewIdd] = useState("");
  const [approvedStatus, setApprovedStatus] = useState();
  const [show, setShow] = useState(false);

  const [perDayAmount, setPerDayAmount] = useState("");



  const redirection = (customer_id) => {
    navigate({ pathname: "/viewcustomer" });
    ls.set("customrId", customer_id);
    console.log("customrId", customer_id);
  };


  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: "80px",

    },
    {
      name: 'GroupId',
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
      minWidth: "200px",
    },


    {
      name: 'Start Months',
      selector: row => row.start_months,
      sortable: true,
      minWidth: "120px",
    },


    {
      name: 'End Months',
      selector: row => row.end_months,
      sortable: true,
      minWidth: "120px",
    },

    {
      name: 'months',
      selector: row => row.months,
      sortable: true,
      minWidth: "140px",
    },
 

    {
      name: 'Question',
      selector: row => row.question,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: 'Balance',
      selector: row => row.balence,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: 'Perhead Amount',
      selector: row => row.perhead_amount,
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
  //loadingloan
  const [loadingLoan, setLoadingLoan] = useState(true);


 


  const getCustData = () => {

    let request = {
      user_id: loginDetails[0].user_id,
      vendor_id: loginDetails[0].vendor_id,
      token: loginDetails[0].token
    }

    axiosObject
      .post("reportGroupChit/condition", request)

      .then((response) => {
        console.log(response);
        setCmlist(response.data.data);
        setCustId(response.data.data[0]?.customer_id);
        setLoanId(response.data.data[0]?.loan_id);
        setCustName(response.data.data[0]?.customer_name);
        setLoading(false);

      });
  }


  useEffect(() => {
    getCustData()
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
      header: 'Reportschit'
    })
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
              <h1 className='pageHead mt-2'>Reports Chit</h1>
            </div>

            <div className="col-lg-9 col-md-8 col-sm-8 col-8 tableSearchBlock">
       
              <div className='col-4 print'>
                <button type="submit" onClick={printPage} className="btn btn-primary addBtn float-end"><i class="fa-solid fa-print"></i> <span className='label'> Print</span></button>
              </div>

            </div>
            <div class="errorMsgBox col-lg-12">
              <p className="form-input-error" >{fromDateError}</p>
            </div>
            <div class="hideContent">
              <div id="pdfPrint" onClick={document.title = "Reportschit"} style={{ "border-collapse": "collapse" }} >
                <table>
                  <thead>
                    <tr>
                      <th class="border-top-0"> S.no</th>
                      <th class="border-top-0">Group ID </th>
                      <th class="border-top-0">Total Amount </th>
                      <th class="border-top-0">Total Months</th>
                      <th class="border-top-0">MonthlyAmount</th>
                      <th class="border-top-0">Start Month</th>
                      <th class="border-top-0">End Month</th>
                      <th class="border-top-0">Months</th>
                      <th class="border-top-0">Question</th>
                      <th class="border-top-0">Balance</th>
                      <th class="border-top-0">PerheadAmount</th>

                    </tr>
                  </thead>
                  <tbody>
                    {cmlist.length > 0 ? (
                      cmlist.map((cmlist, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{cmlist.group_id}</td>
                          <td>{cmlist.total_amount}</td>
                          <td>{cmlist.total_months}</td>
                          <td>{cmlist.monthly_amount}</td>
                          <td>{cmlist.start_months}</td>
                          <td>{cmlist.end_months}</td>
                          <td>{cmlist.months}</td>
                          <td>{cmlist.question}</td>
                          <td>{cmlist.balence}</td>
                          <td>{cmlist.perhead_amount}</td>
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
           
            

          </div>
        </section>
      </div>
    </div>

  )

}


export default Reportschit;