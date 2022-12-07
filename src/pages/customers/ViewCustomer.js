import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosObject } from '../../services/BaseService'
import ls from 'local-storage';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import { InputText, SelectGender, Checkbox, Radio, } from '../../components/FormFields';
import adduser from '../../assets/img/userIcon.jpg'
import FileBase64 from 'react-file-base64';
import Loading from "../../components/Loading";
import moment from "moment";

const ViewCustomer = (props) => {
   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)
   const customerId = ls.get("customrId");

   const location = useLocation()
   //const customerId = location.state.customerId;
   const [cmlist, setCmlist] = useState([]);
   const [image, setImage] = useState("");
   const [loading, setLoading] = useState(true);

   const [loanList, setLoanList] = useState("");
   const [singleLoanList, setSingleLoanList] = useState("");

   const [custID, setcustID] = useState();
   const [custviewID, setcustViewID] = useState();
   const [approvedStatus, setApprovedStatus] = useState();

   const [custName, setCustName] = useState("");
   const [phone, setPhone] = useState("");
   const [AadharNumber, setAadharNumber] = useState("");
   const [address, setAddress] = useState("");
   const [gender, setGender] = useState("");
   const [dob, setDob] = useState("");
   const [email, setEmail] = useState("");
   const [proofs, setIdProof] = useState("");
   const [url, setUrl] = useState([]);
   const [loanId, setLoanID] = useState("");
   const [loanIdd, setLoanIdd] = useState("");
   const [loanviewIdd, setLoanViewIdd] = useState("");





   const [show, setShow] = useState(false);
   const [loanType, setLoanType] = useState("");
   const [proofImage, setProofImage] = useState("");
   const [loanAmount, setLoanAmount] = useState("");
   const [interest, setinterest] = useState("");
   const [paidDue, setPaidDue] = useState("");
   const [remainingDue, setRemainingDue] = useState("");
   const [interestAmount, setInterestAmount] = useState("");
   const [noOfDays, setNoOfDays] = useState("");
   const [perDayAmount, setPerDayAmount] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [date, setDate] = useState("");
   const [status, setStatus] = useState("");
   const [dstatus, setDstatus] = useState("");
   const [loan_close_amount_status, setLoanClosedStatus] = useState("");
   const [LoancloseAmount, setLoancloseAmount] = useState("");
   const [loadingLoanView, setLoadingLoanView] = useState(true);



   const handleClose = () => setShow(false);
   const handleShow = (data) => {
      setShow(true);
      setLoadingLoanView(true);
      singleLoan(data);
      console.log(data.loan_id, "data.loan_id");
   }
   const CustomerActions = () => {


      return <div className='tableBtns'>

         <button className="btn btn-primary btn-outline smallBtn">
            <i class="fa-solid fa-eye"></i> <span class="view">View Loan</span>
         </button>
      </div>;
   };


   const columns = [
      {
         name: 'Loan ID',
         selector: row => row.vendorloan_id,
         sortable: true,
         minWidth: "120px",
      },

      {
         name: 'Loan Amount',
         selector: row => row.loan_amount,
         sortable: true,
         minWidth: "150px",
      },

      {
         name: 'Due Amount',
         selector: row => row.installment_amount,
         sortable: true,
         minWidth: "150px",

      },

      {
         name: 'No of EMI',
         selector: row => row.installment_number,
         sortable: true,
         minWidth: "100px",
      },

      {
         name: 'Loan Type',
         selector: row => row.loan_type_id == 3 ? "Daily" : row.loan_type_id == 2 ? "Weekly" : "Monthly",
         sortable: true,
         minWidth: "140px",

      },


      {
         name: 'Application Status',
         selector: row => row.isactive == 0 ? <span className='text-color-orange'> Pending </span> : row.isactive == 1 ? <span className='text-color-green'>Approved</span> : <span className='text-color-red'>Reject</span>,
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
         name: 'Action',
         className: "action",
         cell: (row) => {
            return (
               <div className='tableBtns'>
                  <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow(row.loan_id)}>
                     <i class="fa-solid fa-eye"></i> <span class="view">View Loan</span>
                  </button>
               </div>
            );
         },
      }


   ];

   const customrId = customerId.slice(5)
   console.log("customers", customrId);


   const loanlist = () => {
      let request = {
         customer_id: customrId,
         user_id: loginDetails[0].user_id,
         vendor_id: loginDetails[0].vendor_id,
         token: loginDetails[0].token

      }

      axiosObject.post("customerloans/condition", request)
         .then((response) => {
            console.log(response);
            setLoanList(response.data?.data);
            setLoanID(response.data.data?.loan_id)
            setDstatus(response.data.data[0]?.isactive)
            setLoading(false);

         });
   }


   let navigate = useNavigate();
   const editCustomer = (data) => {
      navigate("/editcustomer", { state: { customerId: data } });


   }

   const customers = () => {
      navigate("/customers");
   }

   const [doc, setDoc] = useState("");
   const [type, setType] = useState("");
   const getFiles = (file) => {
      console.log("================>", file.type)
      setType("")
      if (file.type.includes("jpg") || file.type.includes("jpeg") || file.type.includes("png")) {
         setDoc(file);
      } else {
         setType("0");
      }
   }
   useEffect(() => {
      customerlist()
      loanlist()

   }, [])



   const customerlist = () => {
      let request = {
         customer_id: customrId,
         user_id: loginDetails[0].user_id,
         vendor_id: loginDetails[0].vendor_id,
         token: loginDetails[0].token
      }
      axiosObject.post("customer/condition", request)

         .then((response) => {
            console.log(response.data.data[0]);
            setImage(response.data.data[0]); setImage(response.data.data[0]);
            setCmlist(response.data.data[0]);
            setcustID(response.data.data[0]?.customer_id);
            setcustViewID(response.data.data[0]?.vendor_customer_id);
            setCustName(response.data.data[0]?.customer_name)
            setPhone(response.data.data[0]?.phone_no)
            setAadharNumber(response.data.data[0]?.adhar_card_number)
            setAddress(response.data.data[0]?.address)
            setGender(response.data.data[0]?.gender)
            setDob(response.data.data[0]?.dob)
            setProofImage(response.data.data[0]?.proof_url == null ? "" : response.data.data[0]?.proof_url)
            setEmail(response.data.data[0]?.email)
            setIdProof(response.data.data[0]?.proofs)
            console.log("===idproof===", response.data.data[0]?.proofs);

         });
      console.log("???proofs???", request);
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
            setLoadingLoanView(false);
            console.log(response.data.data);
            setSingleLoanList(response.data.data[0]);
            setStatus(response.data.data[0].isactive)
            setApprovedStatus(response.data.data[0].status)
            setLoanType(response.data.data[0]?.loan_type);
            setRemainingDue(response.data.data[0]?.remaining_dues);
            setPaidDue(response.data.data[0]?.paid_due);
            setLoancloseAmount(response.data.data[0].loan_close_amount)
            setLoanClosedStatus(response.data.data[0].loan_close_amount_status)
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
                  {/* <div className="col-lg-12">
                     <h1 className='pageHead mt-2'>View Customer Details <Link to="/customers" className="btn btn-primary btn-outline float-end"><i class="fa-solid fa-arrow-left"></i> Back</Link> <button onClick={() => editCustomer(custID)} type="submit" className="btn btn-primary float-end"><i className="fa fa-pencil"></i> Edit</button></h1>
                  </div> */}

                  <div className="col-12 col-lg-8 col-md-8 col-sm-8">
                     <h1 className='pageHead mt-2'>View Customer Details </h1>
                  </div>

                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 save-back">
                     <Link to="/customers" className="btn btn-primary btn-outline float-end"><i class="fa-solid fa-arrow-left"></i> <span className='label'>Back</span></Link> <button onClick={() => editCustomer(custID)} type="submit" className="btn btn-primary float-end"><i className="fa fa-pencil"></i><span className='label'> Edit</span></button>
                  </div>

                  {loading ? <Loading /> :
                     <div class="col-12 mt-0 customerDetailsBlock">
                        <div class="card viewCustomerDetails">
                           <div class="card-body">
                              <h2>Customer Info</h2>
                              <div class="row mt-3">
                                 <div class="col-xxl-4 col-md-6 ">
                                    <p className="form-label">Customer ID</p>
                                    <p className='form-value'>{custviewID}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Name</p>
                                    <p className='form-value'>{custName}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Phone</p>
                                    <p className='form-value'>{phone}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">AadharNumber</p>
                                    <p className='form-value'>{AadharNumber}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Address</p>
                                    <p className='form-value'>{address}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Gender</p>
                                    <p className='form-value'>{gender}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Date of Birth</p>
                                    <p className='form-value'>{dob == "0000-00-00" ? "00-00-0000" : moment(dob).format("DD-MM-YYYY")}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Email</p>
                                    <p className='form-value'>{email}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">ID Proof</p>
                                    {doc === "" ? <img alt="" src={image?.proof_url || adduser} height="50px" width="50px"></img> :
                                       <img alt="" src={doc.base64} ></img>
                                    }

                                    {/* <div className="col-md-4 col-lg-4">

                                        <div className="user-upload-btn-wrapper">
                                          {doc === "" ? <img alt="" src={image?.proof_url || adduser} ></img> :
                                             <img alt="" src={doc.base64} ></img>
                                          }
                                          <FileBase64 onDone={getFiles} type="hidden" />

                                          {type === "0" ? <p className="form-input-error">Upload only Image Format </p> : ""}

                                       </div> 
                                    </div> */}
                                 </div>
                              </div>
                           </div>
                        </div>


                        <div class="card">
                           <div class="card-body fixedLastCol">
                              <h2>Loan Details</h2>

                              <DataTable className='girdTable' highlightOnHover columns={columns} data={loanList} pagination />



                           </div>
                        </div>



                     </div>}
               </div>

               {/* <div class="form-group col-md-12">
                      <div class="col-sm-12 mt-4 text-center">
                      <button class="btn btn-primary">Save</button>
                       <button onClick={customers} class="btn btn-primary btn-outline">Cancel</button> 
                       
                      </div>
                  </div> */}
            </section>



         </div>
        
            <Modal size="m" show={show} onHide={handleClose}>
            {loadingLoanView ? <>
                    <Loading />
                </>
                    :
                    <>

               <Modal.Header closeButton>
                  <Modal.Title>
                     <h2>Loan Details</h2>

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
                              <p className="form-label"><b>Loan ID </b></p>
                              <p className='form-value'><span className='orangeText'> {loanviewIdd} </span></p>
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

                           {singleLoanList.loan_close_amount_status == "yes" && singleLoanList.status == "closed" ?
                           <>
                              <div class="col-lg-12">
                                 <p className="form-label">Loan Close amount:</p>
                                 <p className='form-value'>{singleLoanList?.loan_close_amount}</p>
                                 {/* <p className='form-value'>{status == 1 ? "Active" : status == 2 ? "Closed" : "Pending"}</p> */}
                              </div>
                              <div class="col-lg-12">
                              <p className="form-label">Discount Loan amount:</p>
                              <p className='form-value'>{singleLoanList?.totalbalanceamount}</p>
                              {/* <p className='form-value'>{status == 1 ? "Active" : status == 2 ? "Closed" : "Pending"}</p> */}
                             </div>
                             </>: ""}

                        <div class="col-lg-12">
                           <p className="form-label">Loan Status:</p>
                           <p className='form-value'>{approvedStatus}</p>
                           {/* <p className='form-value'>{status == 1 ? "Active" : status == 2 ? "Closed" : "Pending"}</p> */}
                        </div>
                           <div class="col-lg-12">
                              <p className="form-label">Approval Status</p>
                              <p className='form-value'>{status == "1" ? "Approved" : "Pending"}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">SMS Notification</p>
                              <p className='form-value'>Disable</p>
                           </div>

                        </div>

                     </div>
                  </div>
               </Modal.Body>
               <Modal.Footer>



                  <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                     Close
                  </button>
               </Modal.Footer>
               </>}
            </Modal> 
      </div>

   )

}


export default ViewCustomer;