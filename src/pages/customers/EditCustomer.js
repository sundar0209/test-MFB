import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { InputText, StatusCheckbox, Checkbox, Radio, } from '../../components/FormFields';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import { axiosObject } from '../../services/BaseService'
import ls from 'local-storage';
import DataTable from 'react-data-table-component';
import FileBase64 from 'react-file-base64';
import CommonPopup from '../../components/CommonPopup/CommonPopup.js';
import uploadFile from '../../assets/img/uploadfile.jpg'
import moment from "moment"
import DatePicker from "react-datepicker";
import Loading from "../../components/Loading";



const EditCustomer = (props) => {

   // const loginDetails = useSelector(state => state.LoginReducer.payload);
   // console.log("loginDetails", loginDetails)
   let navigate = useNavigate();
   const location = useLocation()
   const customerId = location.state.customerId;

   const handleAdd = () => {
      setAddButtonFlag(true)
      setLoanFlag(true)
      const data = fields.length + 1
      const values = [...fields, { data }];
      console.log("value===", values);
      setFields(values);


   }

   const clear = () => {
      setStartDate("");
      setEndDate("");
      setNoOfDays("");
      setLoanAmount("")
      setInterestAmount("")
      setCreatableLoanLables([]);
   }


   const dclear = () => {
      setLoanType("")
      setLoanAmount("")
      setInterestAmount("")
      setInterest("")
      setNoOfDays("");
      setStartDate("");
      setEndDate("");

   }

   const bed = () => {
      document.getElementById('myInput').value = '';
   }

   const pclear = () => {
      setPstartDate("");
      setPendDate("");
      setNoOfDays("");
      setLoanAmount("")
      setInterestAmount("")
      setInterest("")
      setEditableLoanLables([]);
      setEditloanLables([]);
   }


   // const customerId = ls.get("customerId");

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)

   const [custID, setcustID] = useState();
   const [loanId, setLoanId] = useState();
   const [loanviewId, setLoanViewId] = useState();
   console.log("loan id", loanId)
   const [loanTypeId, setLoanTypeId] = useState();
   const [loading, setLoading] = useState(true);

   const [custName, setCustName] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");
   const [gender, setGender] = useState("");
   const [dob, setDob] = useState("");
   const [proofImage, setProofImage] = useState("");
   const [email, setEmail] = useState("");
   const [idProof, setIdProof] = useState("");

   const [loanType, setLoanType] = useState("");
   const [loanAmount, setLoanAmount] = useState("");
   const [interestAmount, setInterestAmount] = useState("");
   const [noOfDays, setNoOfDays] = useState("");
   const [perDayAmount, setPerDayAmount] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [date, setDate] = useState("");
   const [pstartDate, setPstartDate] = useState("");
   const [pendDate, setPendDate] = useState("");

   const [submitClicked, setSubmitClicked] = useState()
   const [cmlist, setCmlist] = useState([]);
   const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
   const [fields, setFields] = useState([]);
   const [loanFlag, setLoanFlag] = useState();
   const [singleLoanList, setSingleLoanList] = useState("");
   const [addButtonFlag, setAddButtonFlag] = useState(false);
   const [approve, setApprove] = useState("false");
   console.log(approve, "flag approve outside");
   const [loanstatus, setLoanStatus] = useState("");







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

   const [popupTitle, setPopupTitle] = useState("");
   const [popupMsg, setPopupMsg] = useState("");
   const [popupType, setPopupType] = useState("");
   const [popupActionType, setPopupActionType] = useState("");
   const [popupActionValue, setPopupActionValue] = useState("");
   const [popupActionPath, setPopupActionPath] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const [isClose, setIsClose] = useState(false);
   const [status, setStatus] = useState("");
   const [image, setImage] = useState("");
   const [interest, setInterest] = useState("");
   const [loan_close_amount_status, setLoanCloseAmtStatus] = useState("");
   const [Enablesms, setEnablesms] = useState("no");
   const [editEnablesms, seteditEnablesms] = useState("no");
   const [Enablesmsedit, setEnablesmsedit] = useState("no");
   console.log("==check enable_sms==ghgh", Enablesms);
   const [emailError, setEmailError] = useState("");
   const newVendorId = ls.get('newVendorId');
   const vendorId = ls.get('vendorId');
   const [remainingDue, setRemainingDue] = useState("");
   const [approvedStatus, setApprovedStatus] = useState();
   const [loanIdd, setLoanIdd] = useState("");
   const [loanviewIdd, setLoanViewIdd] = useState("");
   const [editloanLables, setEditloanLables] = useState("");

   console.log("loan idd", loanId)
   const [documentAmountError, setDocumentAmountError] = useState([]);

   const [paidDue, setPaidDue] = useState("");
   const [viewshow, setviewshow] = useState("");
   const [editableLables, setEditableLables] = useState([]);
   const [MobialNoError, setMobialNoError] = useState("");
   const [editableLoanLables, setEditableLoanLables] = useState([]);
   const [creatableLoanLables, setCreatableLoanLables] = useState([]);
   const [nameError, setNameError] = useState("");
   const [addressError, setAddressError] = useState("");
   const [genderError, setGenderError] = useState("");
   const [loanAmountError, setloanAmountError] = useState("");
   const [interestAmountError, setinterestAmountError] = useState("");
   const [interestError, setInterestError] = useState("");
   const [noOfdaysError, setNoOfDaysError] = useState("");
   const [startDateError, setStartDateError] = useState("");
   const [endDateError, setEndDateError] = useState("");
   const [approveshow, setApproveshow] = useState(false);
   const [number1, setNumber1] = useState("");

   const [number, setNumber] = useState(false);
   const [custviewID, setcustViewID] = useState();

   // weeklysetstate
   const [submitLoanClickedWeekly, setSubmitLoanClickedWeekly] = useState(false)

   //monthlysetstate
   const [submitLoanClickedMonthly, setSubmitLoanClickedMonthly] = useState(false)
   //aadharcard
   const [AadharNumber, setAadharNumber] = useState("");
   const [AadharNoError, setAadharNoError] = useState("");
   //loading
   const [loadingLoanView, setLoadingLoanView] = useState(true);

   const togglePopup = () => {
      setIsOpen(!isOpen);
   }

   const loanTogglePopup = () => {
      setIsClose(!isClose);
   }

   const calculation = Math.ceil((Number(loanAmount)) / Number(noOfDays))

   const calculationWeekly = Math.ceil((Number(loanAmount)) / Number(noOfDays))




   const monthlyCalculation = Math.ceil((Number(loanAmount) + Number(interest)) / Number(noOfDays))
   console.log('month', monthlyCalculation);

   const loanDetails = [{ start_date: startDate, date: date, installment_time: "", interest_rate: 2, loan_amount: parseInt(loanAmount), interest: parseInt(interest), installment_amount: loanType == "daily" ? parseInt(calculation) : loanType == "weekly" ? parseInt(calculation) : parseInt(monthlyCalculation), interest_amount: parseInt(interestAmount), end_date: endDate, installment_number: parseInt(noOfDays), isactive: 1, status: "", updatedBy: loginDetails[0].user_id, }]

   console.log("loan===", loanDetails);


   const [show, setShow] = useState(false);



   // const handleClose = () => setShow(false);
   // const handleShow = (data) => {
   //    setShow(true);

   //    singleLoan(data.slice(3));

   //    console.log(data, "data=============");
   // }

   useEffect(() => {
      singleLoan()
      customerlist()
      getSendToDetails()
   }, [])

   const handleClose1 = () => setviewshow(false);
   const handleShow1 = (data) => {
      setviewshow(true);
      setLoadingLoanView(true);
      singleLoanview(data);
      console.log(data.loan_id, "data.loan_id");
   }


   const calculationn = Math.round((Number(loanAmount) + Number(interest)) / (Number(noOfDays)))
   const handleClose2 = () => { setApproveshow(false); setNumber1(false); handleClose2trying() }

   const handleClose2trying = () => { setApproveshow(""); setNumber1(""); setLoanAmount(""); setInterestAmount(""); setEnablesms(""); setNoOfDays(""); setStartDate(""); setDate("") }
   const handleShow2 = (data) => {
      setApproveshow(true);
      singleLoan(data.slice(3));
      console.log(data, "data=============");
   }

   console.log("loanFlag", loanFlag);


   const editLoanapprove = (e) => {
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
         //    console.log("");
         //    return;
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
         //    console.log("");
         //    return;
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
         //    console.log("");
         //    return;
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
         status: approve == "yes" ? "approved" : "pending",
         interest_amount: interestAmount == null ? "" : interestAmount,
         installment_amount: calculationn,
         installment_number: noOfDays,
         description: editLoanVal?.slice(0, -1),
         reference_person: "",
         reference_person_name: "",
         reference_person_phoneno: "",
         updatedBy: loginDetails[0].user_id,
         createdBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token
      }
      console.log("====sms===", request)
      console.log(approve, "flag approve");
      {
         axiosObject.post("custloanApprove/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {

                  // console.log("if calling")
                  togglePopup()
                  setPopupTitle("Edit Loan");
                  setPopupMsg("Loan Details Updated Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  //setPopupActionPath("/customers")
                  // clsData(response.data.data)
                  handleClose2()
                  // setNumber(false)
               }
               else {
                  togglePopup()
                  setPopupTitle("");
                  setPopupMsg(response.data.error.err);
                  setPopupType("error");
                  setPopupActionType("close");
                  setPopupActionValue("close");
                  //setNumber(false)
               }

            });

      }
   }
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
            setImage(response.data.data[0]);
            setcustID(response.data.data[0]?.customer_id);
            setcustViewID(response.data.data[0]?.vendor_customer_id);
            setCustName(response.data.data[0]?.customer_name)
            setPhone(response.data.data[0]?.phone_no)
            setAddress(response.data.data[0]?.address)
            setGender(response.data.data[0]?.gender)
            setAadharNumber(response.data.data[0]?.adhar_card_number)
            setDob(response.data.data[0]?.dob)
            setProofImage(response.data.data[0]?.proof_url == null ? "" : response.data.data[0]?.proof_url)
            getSendToDetails(response.data.data[0]?.customer_id);
            setEmail(response.data.data[0]?.email)
            setIdProof(response.data.data[0]?.proofs)


         });
   }
   const clsData = (data) => {

      getSendToDetails(data);

   }
   const handleError = () => {
      setSubmitLoanClicked(false)
   }
   const handleDelete = (item) => {
      console.log("===item===", item);
      setAddButtonFlag(false)
      setSubmitLoanClicked(false);
      dclear();
      const values = fields.filter(data => data !== item);
      console.log("===value delete===", values);
      setFields(values);

   }

   let editLoanValue = creatableLoanLables?.reduce((acc, curr) => `${acc}${curr.label},`, '');

   const addLoan = () => {
      if (loanFlag == true) {
         setSubmitLoanClicked(true);
         // e.preventDefault();
         // setloanAmountError("")
         // setinterestAmountError("")
         // setInterestError("")
         // setDocumentAmountError("")
         // setNoOfDaysError("");
         // setStartDateError("")
         if (!loanType) {
            console.log("");
            return;
         }
         if (!loanAmount) {
            //setloanAmountError("Loan amount is required")
            console.log("");
            return;
         }
         if (!interestAmount) {
            //setinterestAmountError("Interest amount is required")


            console.log("");
            return;
         }

         // if (!interestAmount && label === "Documentation Charges") {
         //    setDocumentAmountError("Documentcharge is required")


         //    console.log("");
         //    return;
         // }
         if (loanType == "Monthly") {
            if (!interest) {
               console.log("");
               return;
            }
         }

         if (!noOfDays) {
            // setNoOfDaysError("NoOfDays is required")
            console.log("");
            return;
         }

         if (!startDate) {
            //setStartDateError("StartDate is required")

            console.log("");
            return;
         }
         if (!endDate) {
            console.log("");
            return;
         }
      }






      let request = {
         vendor_id: loginDetails[0].vendor_id,
         interest: interest,
         customer_id: customrId,
         loan_type: loanType,
         enable_sms: Enablesmsedit, //== "on" ? "yes" : "no",
         loanList: loanAmount == "" && interestAmount == "" && noOfDays == "" && perDayAmount == "" && interest == "" && startDate == "" && endDate == "" ? "" : loanDetails,
         isactive: 1,
         description: editLoanValue.slice(0, -1),
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         ispaid: "no",
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token



      }
      console.log("req", request);

      {
         axiosObject.post("customeraddById/add", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {

                  loanTogglePopup()
                  setPopupTitle("Add Loan");
                  setPopupMsg("New Loan Added Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  // setPopupActionPath("/customers")
                  clsData(response.data.data)

               }
               else {
                  loanTogglePopup()
                  setPopupTitle("");
                  setPopupMsg(response.data.error.err);
                  setPopupType("error");
                  // setPopupActionType("redirect");
                  // setPopupActionValue("close");
                  // setPopupActionPath("/customers")
                  setPopupActionType("refresh");
                  setPopupActionValue("close");


               }


            });

      }
   }
   const getSendToDetails = () => {
      let request = {
         customer_id: customrId,
         user_id: loginDetails[0].user_id,
         vendor_id: loginDetails[0].vendor_id,
         token: loginDetails[0].token

      }
      axiosObject.post("customerloans/condition", request)
         .then((response) => {
            console.log(response);
            setCmlist(response.data.data);
            setApprove(response.data.data?.status);
            setLoading(false);

            response.data.data?.map((data, index) => {
               if (data?.status == "approved") {
                  const editButton = document.getElementById(`editButton${index}`)
                  if (editButton !== null) {
                     editButton.disable = true
                  }
                  const deleteButton = document.getElementById(`deleteButton${index}`)
                  if (deleteButton !== null) {
                     deleteButton.disable = true
                  }

                  console.log("button", data?.status);


               }
               else {
                  const editButton = document.getElementById(`editButton${index}`)
                  if (editButton !== null) {
                     editButton.disable = false
                  }
                  const deleteButton = document.getElementById(`deleteButton${index}`)
                  if (deleteButton !== null) {
                     deleteButton.disable = false
                  }


               }
            })
         });
   }

   const DeleteLoan = (data) => {

      let request = {

         loan_id: data.loan_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      console.log("loanDelete request", request)
      {
         axiosObject.post("loanDelete/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {

                  togglePopup()
                  setPopupTitle("LOAN DETAILS");
                  setPopupMsg("Loan Deleted Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  //expenseList()
                  // handleShow1()
                  // setPopupActionPath("/customers")
                  // clsData(response.data.data)
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

   const columns = [
      {
         name: 'Loan ID',
         selector: row => row.vendorloan_id,
         minWidth: "120px",
      },

      {
         name: 'Loan Amount',
         selector: row => row.loan_amount,
         minWidth: "150px",
      },

      {
         name: 'Due Amount',
         selector: row => row.installment_amount,
         minWidth: "150px",
      },

      {
         name: 'No of EMI',
         selector: row => row.installment_number,
         minWidth: "100px",
      },

      {
         name: 'Loan Type',
         selector: row => row.loan_type_id == 3 ? "Daily" : row.loan_type_id == 2 ? "Weekly" : "Monthly",
         minWidth: "140px",
      },

      {
         name: 'Application Status',
         selector: row => row.isactive == 0 ? <span className='text-color-orange'> Pending </span> : row.isactive == 1 ? <span className='text-color-green'>Approved</span> : <span className='text-color-red'>Rejected</span>,
         minWidth: "200px",
      },

      {
         name: 'Loan Status',
         selector: row => row.status == "New" ? <span className='text-color-blue'> New </span> : row.status == "Overdue" ? <span className='text-color-orange'>Overdue</span> : row.status == "Active" ? <span className='text-color-green'> Active </span> : row.status == "Deleted" ? <span className='text-color-red'> Deleted </span> : <span className='text-color-red'>Closed</span>,
         sortable: true,
         minWidth: "150px",

      },

      {
         name: 'Action',
         className: "action",
         cell: (row, index) => {
            console.log("buttonid", row.status);
            return (

               <div className='tableBtns'>
                  {row.isactive == "1" || row.isactive == "2" ?
                     <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow1(row.loan_id)}>
                        <i class="fa-solid fa-eye"></i> <span class="view">View Loan</span>
                     </button>
                     :
                     <>
                        <button className="btn btn-primary btn-outline smallBtn" id={`editButton${index}`} onClick={() => handleShow2(row.loan_id)} /* onClick={() => handleShow(row.loan_id)} */>
                           <i class="fa-solid fa-pencil"></i>
                        </button>

                        <button type="submit" className="btn btn-primary btn-outline smallBtn" onClick={() => DeleteLoan(row)}>
                           <i class="fa-solid fa-trash"></i>
                        </button>
                     </>}

               </div>
            );
         },
      }


   ];

   const EmiTableColumns = [
      {
         name: 'Day',
         selector: row => row.customer_id,
      },
      {
         name: 'Date',
         selector: row => row.customer_name,
      },
      {
         name: 'Amount',
         selector: row => row.phone_no,
      },

      {
         name: 'Action',
         className: "action",
         cell: () => {
            return (
               <div className='tableBtns emiTableActions'>
                  <StatusCheckbox className="smsenable" labelText="" inputId="Enablesmsnotification" />
                  <button className="btn btn-primary btn-outline smallBtn">
                     <i class="fa-solid fa-pencil"></i>
                  </button>
               </div>
            );
         },
      }


   ];


   const saveCustomer = (e) => {

      setSubmitClicked(true);
      e.preventDefault();
      setAadharNoError("")
      setMobialNoError("")
      setNameError("")
      setGenderError("")
      setAddressError("")
      setEmailError("")
     


      if (!custName) {
         console.log("");
         //setNameError("Name is required")

         return;
      }
      if (!phone) {
         console.log("");
         //setMobialNoError(" Phone number  is required")

         return;
      }
      else if (phone.length < 10) {
         setMobialNoError("Mobile number must be of 10 digits")
         return;
      }
      else if (phone.length > 10) {
         setMobialNoError("Mobile number should not exeed 10 digits")
         return;
      }
       //aadharnum
       if (!AadharNumber) {
         console.log("");
         // setAadharNoError(" Phone number  is required")
         return;
      }
      else if (AadharNumber.length < 14) {
         setAadharNoError("Aadhar number must be of 12 digits")
         return;
      }
      else if (AadharNumber.length > 14) {
         setAadharNoError("Aadhar number should not exeed 12 digits")
         return;
      }
      if (!gender) {
         console.log("");
         //setGenderError("Gender is required")
         return;
      }
      if (!address) {
         console.log("");
         //setAddressError("Address is required")

         return;
      }
      if (!gender) {
         console.log("");
         // setGenderError("Gender is required")
         return;
      }

      // if(!email){
      //    setEmailError("Email Id is required")
      //    return;
      //  }
      //  else if(email && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)){
      //      setEmailError("Email Id must match the format")
      //      return;
      //  }
      
      let editVal = editableLables.reduce((acc, curr) => `${acc}${curr.label},`, '')
      console.log(AadharNumber,"AadharNumber");
      let request = {

         vendor_id: loginDetails[0].vendor_id,
         customer_id: customrId,
         customer_name: custName,
         phone_no: phone,
         adhar_card_number: AadharNumber,
         gender: gender,
         dob: dob,
         email: email ? email : "",
         address: address,
         comments: "",
         proof_url: doc === "" ? doc : doc.length > 0 ? doc : [doc],
         isactive: 1,
         proof_description: idProof == null ? "" : idProof,
         history_description: editVal.slice(0, -1),
         customer_another_name: "",
         pin_code: "",
         cust_account_number: "",
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token



      }
      console.log("request===========", request);
      // return;

      {
         axiosObject.post("customeridEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {

                  togglePopup()
                  setPopupTitle("Edit Customer");
                  setPopupMsg("Customer Details Updated Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  // setPopupActionPath("/customers")
               }
               else {
                  togglePopup()
                  setPopupTitle("");
                  setPopupMsg(response.data.error.err);
                  setPopupType("error");
                  // setPopupActionType("redirect");
                  // setPopupActionValue("close");
                  // setPopupActionPath("/customers")
                  setPopupActionType("refresh");
                  setPopupActionValue("close");


               }


            });

      }



   }


   const singleLoanview = (data) => {

      let request = {

         loan_id: data.slice(3),
         user_id: loginDetails[0].user_id,
         vendor_id: loginDetails[0].vendor_id,
         token: loginDetails[0].token

      }
      console.log("??req??", request);


      axiosObject.post("loanview/condition", request)

         .then((response) => {
            setLoadingLoanView(false);
            console.log(response.data.data);
            setSingleLoanList(response.data.data[0]);
            setStatus(response.data.data[0].isactive)
            setApprovedStatus(response.data.data[0].status)
            setLoanType(response.data.data[0]?.loan_type);
            setRemainingDue(response.data.data[0]?.remaining_dues);
            setLoanCloseAmtStatus(response.data.data[0].isactive)
            setApprovedStatus(response.data.data[0].loan_close_amount_status)
            setPaidDue(response.data.data[0]?.paid_due);
            setLoanIdd(response.data.data[0]?.loan_id);
            setLoanViewIdd(response.data.data[0]?.vendorloan_id);
            setLoanViewId(response.data.data[0]?.vendorloan_id);
            setLoanAmount(response.data.data[0]?.loan_amount);
            setInterest(response.data.data[0]?.interest);
            setInterestAmount(response.data.data[0]?.interest_amount)
            setNoOfDays(response.data.data[0]?.installment_number)
            setPerDayAmount(response.data.data[0]?.installment_amount)
            setStartDate(response.data.data[0]?.start_date)
            setEndDate(response.data.data[0]?.end_date)
            setDate(response.data.data[0]?.date)
            setLoading(false);



         });
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
            console.log("check loan id", response.data.data[0]?.loan_id)
            setLoanIdd(response.data.data[0]?.loan_id);
            setLoanViewIdd(response.data.data[0]?.vendorloan_id);
            setInterest(response.data.data[0]?.interest);
            setEnablesms(response.data.data[0]?.enable_sms);
            if (response.data.data[0]?.enable_sms === "yes") {
               const enableNotify = document.getElementById("Enablesmsnotificationpopup")
               if (enableNotify !== null) {
                  enableNotify.checked = true
               }
            }
            console.log("==check enable_sms==", response.data.data[0]?.enable_sms)
            setStatus(response.data.data[0].isactive)
            setLoanType(response.data.data[0]?.loan_type);
            setLoanStatus(response.data.data[0].status)
            setLoanAmount(response.data.data[0]?.loan_amount);
            setInterestAmount(response.data.data[0]?.interest_amount)
            setNoOfDays(response.data.data[0]?.installment_number)
            setPerDayAmount(response.data.data[0]?.installment_amount)
            setPstartDate(response.data.data[0]?.start_date)
            setPendDate(response.data.data[0]?.end_date)
            setDate(response.data.data[0]?.date)



         });
   }



   const customrId = customerId.slice(5)
   const nextweek = () => {
      var today = new Date();
      let text = today.toISOString();

      var Weekly = new Date(text.getFullYear(), text.getMonth(), text.getDate() + 6);
      console.log(Weekly, "nextweek");

   }


   const handleDateChangeRaw = (e) => {
      e.preventDefault();
   }

   const updateEndDate = (date) => {

      console.log("check the loanType", loanType);
      setStartDate(date);


      if (loanType == "Daily") {
         setEndDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'days').subtract(1, "days").format("YYYY-MM-DD") : date)
      }
      if (loanType == "Weekly") {

         setEndDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'week').subtract(1, "weeks").format("YYYY-MM-DD") : date)
      }
      if (loanType == "Monthly") {
         setEndDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add((noOfDays), 'month').subtract(1, "months").format("YYYY-MM-DD") : date)
      }
   }

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

   const today = moment();
   const disableFutureDt = current => {
      return current.isBefore(today)
   }
   const exceptThisSymbols = ["e", "E", "+", "-", "."];

   const customerPhone = (e) => {
      const value = e.target.value.replace(/[^0-9]/g, "e");
      setPhone(value);
   };

   const Loanamt = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setLoanAmount(value);
   };
   const LoanIntamt = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setInterestAmount(value);
   };
   const Loandays = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setNoOfDays(value);
   };

   const Loanamtedit = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setLoanAmount(value);
      getEditLoanDeatils(e.target.value, "Loan Amount")
   };
   const LoanIntamtedit = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setInterestAmount(value);
      getEditLoanDeatils(e.target.value, "Interest Amount")

   };
   const Loandaysedit = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setNoOfDays(value);
      getEditLoanDeatils(e.target.value, "No Of Days")

      if (value == "") {
         setPstartDate("")
         setPendDate("")
      }

   };

   const getEditLoanDeatil = (value, label) => {
      // console.log("value calling", value);
      setNumber1(true);
      if (label === "Loan Amount") {
         const item = value.replace(/\D/g, "");
         // console.log("item calling", item);
         setLoanAmount(item);
         if (item !== "") {
            // console.log("if calling");
            if (creatableLoanLables.length > 0) {
               if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
                  setCreatableLoanLables([...creatableLoanLables, { label }]);
               }
            }
            else {
               // console.log("1st else calling");
               setCreatableLoanLables([...creatableLoanLables, { label }]);
            }
         }
         else {
            // console.log("else calling");
            setCreatableLoanLables(creatableLoanLables.filter((data) => data?.label !== label))
         }
      }
      if (label === "Interest Amount") {
         if(loanType === "Monthly" ? label= "Documentation Charges" : label ="Interest Amount"){
         const item = value.replace(/\D/g, "");
         setInterestAmount(item);
         if (item !== "") {
            if (creatableLoanLables.length > 0) {
               if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setCreatableLoanLables([...creatableLoanLables, { label }]);
               }
            }
            else {
               // console.log("1st else calling");
               setCreatableLoanLables([...creatableLoanLables, { label }]);
            }
         }
         else {
            // console.log("else calling");
            setCreatableLoanLables(creatableLoanLables.filter((data) => data?.label !== label))
         }
      }
      }
      if (label === "Interest") {
         //const item = value.replace(/\D/g, "");
         setInterest(value);
         if (value !== "") {
            if (creatableLoanLables.length > 0) {
               if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setCreatableLoanLables([...creatableLoanLables, { label }]);
               }
            }
            else {
               // console.log("1st else calling");
               setCreatableLoanLables([...creatableLoanLables, { label }]);
            }
         }
         else {
            // console.log("else calling");
            setCreatableLoanLables(creatableLoanLables.filter((data) => data?.label !== label))
         }
      }
      if (label === "No of Days") {
         if(loanType === "Monthly" ? label= "Total EMI (Months),EMI Amount" : loanType === "Weekly" ? label ="Total EMI (Weeks),EMI Amount": loanType === "Daily" ? label ="Total EMI (Days),EMI Amount" : ""){
         const item = value.replace(/\D/g, "");
         setNoOfDays(item);
         setPstartDate("")
         setPendDate("")
         if (item !== "") {
            if (creatableLoanLables.length > 0) {
               if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "EMI Amount" }]);
               }
            }
            else {
               // console.log("1st else calling");
               setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "EMI Amount" }]);
            }
         }
         else {
            // console.log("else calling");
            setCreatableLoanLables(creatableLoanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
         }
         }
      }
      if (label === "No of Weeks") {
         if(loanType === "Monthly" ? label= "Total EMI (Months),EMI Amount" : loanType === "Weekly" ? label ="Total EMI (Weeks),EMI Amount": loanType === "Daily" ? label ="Total EMI (Days),EMI Amount" : ""){
         const item = value.replace(/\D/g, "");
         setNoOfDays(item);
         setPstartDate("")
         setPendDate("")
         if (item !== "") {
            if (creatableLoanLables.length > 0) {
               if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "EMI Amount" }]);
               }
            }
            else {
               // console.log("1st else calling");
               setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "EMI Amount" }]);
            }
         }
         else {
            // console.log("else calling");
            setCreatableLoanLables(creatableLoanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
         }
      }
      }
      if (label === "No of Months") {
         if(loanType === "Monthly" ? label= "Total EMI (Months),EMI Amount" : loanType === "Weekly" ? label ="Total EMI (Weeks),EMI Amount": loanType === "Daily" ? label ="Total EMI (Days),EMI Amount" : ""){
         console.log("tester", label);
         const item = value.replace(/\D/g, "");
         setNoOfDays(item);
         setPstartDate("")
         setPendDate("")
         if (item !== "") {
            if (creatableLoanLables.length > 0) {
               if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "EMI Amount" }]);
               }
            }
            else {
               // console.log("1st else calling");
               setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "EMI Amount" }]);
            }
         }
         else {
            // console.log("else calling");
            setCreatableLoanLables(creatableLoanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
         }
      }
      }
      if (label === "Start Date") {
         setPstartDate(value);
         if (creatableLoanLables.length > 0) {
            if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "End Date" }]);
            }
         }
         else {
            // console.log("1st else calling");
            setCreatableLoanLables([...creatableLoanLables, { label }, { "label": "End Date" }]);
         }

      }
      if (label === "Date") {
         setDate(value);
         if (creatableLoanLables.length > 0) {
            if (creatableLoanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setCreatableLoanLables([...creatableLoanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLoanLables([...creatableLoanLables, { label }]);
         }
      }
   }


   console.log("creatableLoanLables calling", creatableLoanLables);

   console.log("editableLoanLables calling", editableLoanLables);

   const getEditLoans = (value, label) => {
      // console.log("value calling", value);

      if (label === "Loan Amount") {
         const item = value.replace(/\D/g, "");
         // console.log("item calling", item);
         setLoanAmount(item);
         if (item !== "") {
            // console.log("if calling");
            if (editableLoanLables.length > 0) {
               if (editableLoanLables.filter((data) => data.label === label).length === 0) {
                  setEditableLoanLables([...editableLoanLables, { label }]);
               }
            }
            else {
               // console.log("1st else calling");
               setEditableLoanLables([...editableLoanLables, { label }]);
            }
         }
         else {
            // console.log("else calling");
            setEditableLoanLables(editableLoanLables.filter((data) => data?.label !== label))
         }
      }
      if (label === "Interest Amount") {
         if(loanType === "monthly" ? label= "Documentation Charges" : label ="Interest Amount"){
         const item = value.replace(/\D/g, "");
         setInterestAmount(item);
         if (item !== "") {
            if (editableLoanLables.length > 0) {
               if (editableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setEditableLoanLables([...editableLoanLables, { label }]);
               }
            }
            else {
               // console.log("1st else calling");
               setEditableLoanLables([...editableLoanLables, { label }]);
            }
         }
         else {
            // console.log("else calling");
            setEditableLoanLables(editableLoanLables.filter((data) => data?.label !== label))
         }
      }
      }
      if (label === "Interest") {
         // const item = value.replace(/\D/g, "");
         setInterest(value);
         if (value !== "") {
            if (editableLoanLables.length > 0) {
               if (editableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setEditableLoanLables([...editableLoanLables, { label }]);
               }
            }
            else {
               // console.log("1st else calling");
               setEditableLoanLables([...editableLoanLables, { label }]);
            }
         }
         else {
            // console.log("else calling");
            setEditableLoanLables(editableLoanLables.filter((data) => data?.label !== label))
         }
      }
      if (label === "No of Days") {
         label = "Total EMI (Days)"
         const item = value.replace(/\D/g, "");
         setNoOfDays(item);
         setPstartDate("")
         setPendDate("")
         if (item !== "") {
            if (editableLoanLables.length > 0) {
               if (editableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setEditableLoanLables([...editableLoanLables, { label }, { "label": "EMI Amount" }]);
               }
            }
            else {
               // console.log("1st else calling");
               setEditableLoanLables([...editableLoanLables, { label }, { "label": "EMI Amount" }]);
            }
         }
         else {
            // console.log("else calling");
            setEditableLoanLables(editableLoanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
         }
      }
      if (label === "No of Weeks") {
         label = "Total EMI (Weeks)"
         const item = value.replace(/\D/g, "");
         setNoOfDays(item);
         setPstartDate("")
         setPendDate("")
         if (item !== "") {
            if (editableLoanLables.length > 0) {
               if (editableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setEditableLoanLables([...editableLoanLables, { label }, { "label": "EMI Amount" }]);
               }
            }
            else {
               // console.log("1st else calling");
               setEditableLoanLables([...editableLoanLables, { label }, { "label": "EMI Amount" }]);
            }
         }
         else {
            // console.log("else calling");
            setEditableLoanLables(editableLoanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
         }
      }
      if (label === "No of Months") {
         label = "Total EMI (Months)"
         const item = value.replace(/\D/g, "");
         setNoOfDays(item);
         setPstartDate("")
         setPendDate("")
         if (item !== "") {
            if (editableLoanLables.length > 0) {
               if (editableLoanLables.filter((data) => data.label === label).length === 0) {
                  // console.log("if calling");
                  setEditableLoanLables([...editableLoanLables, { label }, { "label": "EMI Amount" }]);
               }
            }
            else {
               // console.log("1st else calling");
               setEditableLoanLables([...editableLoanLables, { label }, { "label": "EMI Amount" }]);
            }
         }
         else {
            // console.log("else calling");
            setEditableLoanLables(editableLoanLables.filter((data) => data?.label !== label && data?.label !== "EMI Amount"))
         }
      }
      if (label === "Start Date") {
         setPstartDate(value);
         if (editableLoanLables.length > 0) {
            if (editableLoanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLoanLables([...editableLoanLables, { label }, { "label": "End Date" }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLoanLables([...editableLoanLables, { label }, { "label": "End Date" }]);
         }

      }
      if (label === "Date") {
         setDate(value);
         if (editableLoanLables.length > 0) {
            if (editableLoanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLoanLables([...editableLoanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLoanLables([...editableLoanLables, { label }]);
         }
      }
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
   console.log("editableLables", editableLables);

   const getLoanDeatils = (value, label) => {
      // console.log("label calling", label);

      if (label === "Name") {
         setCustName(value);
         setNumber(true);
         if (editableLables.length > 0) {
            if (editableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLables([...editableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLables([...editableLables, { label }]);
         }
      }
      if (label === "Phone") {
         setPhone(value);
         setNumber(true);
         if (editableLables.length > 0) {
            if (editableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLables([...editableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLables([...editableLables, { label }]);
         }
      }
      if (label === "AadharNumber") {
         setAadharNumber(value);
         setNumber(true);
         if (editableLables.length > 0) {
            if (editableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLables([...editableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLables([...editableLables, { label }]);
         }
      }
      if (label === "Address") {
         setAddress(value);
         setNumber(true);
         if (editableLables.length > 0) {
            if (editableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLables([...editableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLables([...editableLables, { label }]);
         }
      }
      if (label === "Gender") {
         setGender(value);
         setNumber(true);
         if (editableLables.length > 0) {
            if (editableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLables([...editableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLables([...editableLables, { label }]);
         }
      }
      if (label === "Date of Birth") {
         setDob(value);
         setNumber(true);
         if (editableLables.length > 0) {
            if (editableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLables([...editableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLables([...editableLables, { label }]);
         }
      }
      if (label === "Email") {
         setEmail(value);
         setNumber(true);
         if (editableLables.length > 0) {
            if (editableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setEditableLables([...editableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setEditableLables([...editableLables, { label }]);
         }
      }
   }

   const getEditLoanDeatils = (value, label) => {
      // console.log("label calling", label);
      setNumber1(true);
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
      if (label === "daily") {
         setLoanType(" ");
         setLoanType("daily");
         pclear();
         if ("daily" !== "") {
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
      if (label === "weekly") {
         setLoanType(" ");
         setLoanType("weekly");
         pclear();
         if ("weekly" !== "") {
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

      if (label === "monthly") {
         setLoanType("");
         setLoanType("monthly");
         pclear();
         if ("monthly" !== "") {
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
         
         setInterestAmount("");
         const item = value.replace(/\D/g, "");
         if(loanType === "monthly" ? label= "Documentation Charges" : label ="Interest Amount"){
            console.log("tester",label);
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
        // console.log("datews",label);
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


            <section id="content-wrapper" className='editCustomersPage'>
               <div className="row">
                  <div className="col-6">
                     <h1 className='pageHead mt-2'>Edit Customer </h1>
                  </div>

                  <div className="col-6">
                     <Link to="/customers" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Back</span></Link> 
                     {number === true ?

                     <button onClick={saveCustomer} className="btn btn-primary float-end smallBtn me-2"><i class="fa-solid fa-floppy-disk"></i><span class="view">Save</span></button> :
                     
                     <button onClick={saveCustomer} disabled className="btn btn-primary float-end smallBtn me-2"><i class="fa-solid fa-floppy-disk"></i><span class="view">Save</span></button> 
                    
                    }
                  </div>

                  {loading ? <Loading /> :
                     <div className="col-12 mt-0 customerDetailsBlock">
                        <div className="card">
                           <div className="card-body">
                              <h2>Customer Info</h2>
                              <div className="row mt-2">
                                 <div className="col-lg-4 col-md-6">
                                    <InputText inputDisable labelText="Customer ID" inputValue={custviewID} inputName="Customer" inputType="text" />
                                 </div>
                                 <div className="col-lg-4 col-md-6">
                                    <InputText className={`${!custName && (submitClicked) ? 'error' : ''}`} onChange={(e) => (getLoanDeatils(e.target.value, "Name"))} inputValue={custName} labelText="Name" inputName="Name" inputType="text" />
                                    <p className='text-color-red'>{nameError}</p>

                                 </div>
                                 <div className="col-lg-4 col-md-6">
                                    <InputText className={`${!phone && (submitClicked) ? 'error' : ''}`} onChange={(e) => { getLoanDeatils(e.target.value, "Phone"); setPhone(e.target.value.replace(/[^0-9]/g, "")) }} maxLength={10} inputValue={phone} labelText="Phone" inputName="Phone" inputType="text" />

                                    <p className='text-color-red'>{MobialNoError}</p>
                                 </div>
                                 <div className="col-lg-4 col-md-6">
                                    <InputText className={`${!AadharNumber && (submitClicked) ? 'error' : ''}`} onChange={(e) => { getLoanDeatils(e.target.value, "AadharNumber"); setAadharNumber(e.target.value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join(" ")) }} maxLength={14} inputValue={AadharNumber} labelText="AadharNumber" inputName="AadharNumber" inputType="text" />
                                    <p className='text-color-red'>{AadharNoError}</p>
                                 </div>
                                 {/* <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!AadharNumber && (submitClicked) ? 'error' : ''}`} onChange={(e) => { getLoanDeatils(e.target.value, "AadharNumber"); setAadharNumber(e.target.value.replace(/[^0-9]/g, "")) }} maxLength={12} inputValue={AadharNumber} labelText="AadharNumber" inputName="Aadharnumber" inputType="text" />
                                 <p className='text-color-red'>{AadharNoError}</p>
                                 </div>  */}
                                 <div className="col-lg-4 col-md-6">
                                    <InputText className={`${!address && (submitClicked) ? 'error' : ''}`} onChange={(e) => getLoanDeatils(e.target.value, "Address")} inputValue={address} labelText="Address" inputName="Address" inputType="text" />
                                    <p className='text-color-red'>{addressError}</p>

                                 </div>
                                 <div className="col-lg-4 col-md-6">
                                    {/* <SelectGender  onChange={(e) => setGender(e.target.value)} inputValue={gender} labelText="Gender" inputName="Gender" inputType="text"/>  */}
                                    <div className="form-group">
                                       <label class="form-label">Gender</label>
                                       <select className="form-select" onChange={(e) => getLoanDeatils(e.target.value, "Gender")} id="adc">
                                          <p className='text-color-red'>{genderError}</p>

                                          <option style={{ "display": "none" }}>{gender}</option>
                                          <option value="Male">Male</option>
                                          <option value="Female">Female</option>
                                          {/* <option value="Always">Always</option> */}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col-lg-4 col-md-6">
                                    <InputText onChange={(e) => getLoanDeatils(e.target.value, "Date of Birth")} inputValue={dob} labelText="Date of Birth" inputName="Data of Birth" inputType="date" />
                                 </div>
                                 <div className="col-lg-4 col-md-6">
                                    <InputText onChange={(e) => getLoanDeatils(e.target.value, "Email")} inputValue={email} labelText="Email" inputName="Email" inputType="text" />
                                    <p className="form-input-error" > {/* {emailError} */}</p>
                                 </div>


                                 <div className="col-md-4 col-lg-4">

                                    <div className="user-upload-btn-wrapper">
                                       <label className='form-label'>ID Proof</label>

                                       {doc === "" ? <img alt="" src={image?.proof_url || uploadFile} ></img> :
                                          <img alt="" src={doc.base64} ></img>
                                       }
                                       {/* <span className="proCamera"></span> */}
                                       <FileBase64 onDone={getFiles} type="hidden" />

                                       {type === "0" ? <p className="form-input-error">Upload only Image Format </p> : ""}

                                    </div>
                                 </div>
                                 <div className="col-lg-12 text-center">
                                 {number === true ?


                                    <button onClick={saveCustomer} class="btn btn-primary">Save Details</button>:

                                    <button disabled class="btn btn-primary smallBtn dis-btn">Save Details</button>
}

                                 </div>
                              </div>
                           </div>

                           <div className="card createNewloan">
                              {addButtonFlag == true ? "" :
                                 <div className="float-end">
                                    <button type="submit" className="btn btn-primary float-end smallBtn me-4" onClick={handleAdd}><i className="fa fa-plus"></i> Add New Loan</button>
                                 </div>}

                              {fields.map((item, index) =>
                                 < >
                                    <div className={`card ${loanType == "Daily" ? "dailyBG" : loanType == "Weekly" ? "weeklyBG" : loanType == "Monthly" ? "monthlyBG" : ""}`}>

                                       <div className="card-body">
                                          <h2>Create New Loan</h2>
                                          <div className="row loansBlock">

                                             <div className="float-end"> <button type="submit" className="btn btn-primary float-end m-0 smallBtn" onClick={() => handleDelete(item)}><i class="fa-solid fa-trash-can"></i> Delete</button></div>

                                             <div className="col-12 loanHead">
                                                {/* <h3>Loan {index+1}</h3> */}
                                                {/* <Checkbox className="smsenable" labelText="Enable SMS Notification" checked={Enablesmsedit == "yes" ? true : false} value={Enablesmsedit == true ? "yes" : "no"} onChange={(e) => setEnablesmsedit(e.target.value)} inputId="Enablesmsnotification" /> */}
                                                <input type="checkbox" checked={Enablesms == "yes" ? true : false} value={Enablesms == "no" ? "yes" : "no"} onChange={(e) => { setEnablesms(e.target.value); setNumber1(true) }} id="Enablesmsnotificationpopup" />
                                                <label className="form-label">  Enable SMS Notification</label>


                                             </div>

                                             <div className='col-lg-12 mb-2'>
                                                <b className='me-2'>Loan Type: </b>
                                                <Radio className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="daily" labelText="Daily" radioChecked={loanType == "Daily" ? true : false} onChange={() => { setLoanType("Daily"); clear(); handleError() }} />
                                                <Radio className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="weekly" labelText="Weekly" radioChecked={loanType == "Weekly" ? true : false} onChange={() => { setLoanType("Weekly"); clear(); handleError() }} />
                                                <Radio className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="monthly" labelText="Monthly" radioChecked={loanType == "Monthly" ? true : false} onChange={() => { setLoanType("Monthly"); clear(); handleError() }} />
                                             </div>



                                             <div className="col-lg-4 col-md-6">
                                                <InputText className={`${!loanAmount && (submitLoanClicked) ? 'error' : ''}`} labelText="Loan Amount" inputName="Loan Amount" inputType="text" inputDisable={loanType == ""} inputValue={loanAmount} onChange={(e) => getEditLoanDeatil(e.target.value, "Loan Amount")} />
                                                <p className='text-color-red'>{loanAmountError}</p>

                                             </div>
                                             <div className="col-lg-4 col-md-6">
                                                <InputText className={`${!interestAmount && (submitLoanClicked) ? 'error' : ''}`} labelText={loanType == "Weekly" ? "Interest Amount" : loanType == "Monthly" ? "Documentation Charges" : "Interest Amount"} inputDisable={loanType == ""} inputName="Interest Amount" inputType="text" inputValue={interestAmount} onChange={(e) => getEditLoanDeatil(e.target.value, "Interest Amount")} />
                                                <p className='text-color-red'>{interestAmountError}</p>
                                                <p className='text-color-red'>{documentAmountError}</p>



                                             </div>
                                             {loanType == "Monthly" ?
                                                <div className="col-lg-4 col-md-6">
                                                   <InputText className={`${!interest && (submitLoanClicked) ? 'error' : ''}`} labelText="Interest" inputName="Interest" inputType="number" inputDisable={loanType == ""} onChange={(e) => getEditLoanDeatil(e.target.value, "Interest")} />
                                                   <p className='text-color-red'>{interestError}</p>

                                                </div> : ""}

                                             <div className="col-lg-4 col-md-6">
                                                <InputText className={`${!noOfDays && (submitLoanClicked) ? 'error' : ''}`} labelText={loanType == "Weekly" ? "No of Week" : loanType == "Monthly" ? "No of Month" : "No of Days"} inputDisable={loanType == ""} inputName="No of Days" inputType="text" inputValue={noOfDays} onChange={(e) => getEditLoanDeatil(e.target.value, loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days")} />
                                                <p className='text-color-red'>{noOfdaysError}</p>

                                             </div>

                                             {loanType == "Daily" || loanType == "Weekly" ?
                                                <div className="col-lg-4 col-md-6">
                                                   <InputText inputValue={calculation} labelText={loanType == "Weekly" ? "Due Amount Per Week" : loanType == "Monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputDisable inputName="Due Amount" inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                                </div> :
                                                <div className="col-lg-4 col-md-6">
                                                   <InputText inputValue={monthlyCalculation} labelText={loanType == "Weekly" ? "Due Amount Per Week" : loanType == "Monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputDisable inputName="Due Amount" inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                                </div>}
                                             <div className="col-lg-4 col-md-6">
                                                <InputText className={`${!startDate && (submitLoanClicked) ? 'error' : ''}`} labelText="Start Date" inputName="Start Date" inputDisable={loanType == ""} inputValue={startDate} inputType="date" onChange={(e) => { getEditLoanDeatil(e.target.value, "Start Date"); updateEndDate(e.target.value); }} />
                                                <p className='text-color-red'>{startDateError}</p>

                                             </div>
                                             <div className="col-lg-4 col-md-6">
                                                <InputText className={`${!endDate && (submitLoanClicked) ? 'error' : ''}`} labelText="End Date" inputName="End Date" inputDisable={loanType == ""} inputType="date" inputValue={endDate} />

                                             </div>
                                             <div className="col-lg-4 col-md-6">
                                                <InputText labelText="Date" inputName="Date" inputType="date" inputValue={date} onChange={(e) => { getEditLoanDeatil(e.target.value, "Date") }} />
                                             </div>

                                             <div className="col-lg-12 text-center">
                                                <button onClick={addLoan} class="btn btn-primary">Save Loan</button>
                                             </div>



                                          </div>
                                       </div>
                                    </div>   </>
                              )}     </div>





                           <div class="card">
                              <div class="card-body mt-1 fixedLastCol">
                                 <h2>Loan Details</h2>
                                 <DataTable className='girdTable' pagination highlightOnHover columns={columns} data={cmlist} />



                              </div>
                           </div>



                        </div>

                     </div>}
               </div>
               {/* <div class="form-group col-md-12">
                      <div class="col-sm-12 mt-4 text-center">
                      <button onClick={saveCustomer}  class="btn btn-primary">Save</button>
                       <button onClick={customers} class="btn btn-cancel btn-outline">Cancel</button> 
                       
                      </div>
                  </div> */}
            </section>

         </div>
         <div >
            {loanType == "daily" ?
               <Modal size="lg" show={approveshow} onHide={handleClose2}>

                  <Modal.Header>
                     <Modal.Title>
                        <h2>Edit Loan</h2>
                     </Modal.Title>

                     <div className="form-group StatusCheckbox">
                        {/* <input type="checkbox" name='Approve' id='Approve' disabled={loginDetails[0].user_type === "Super Admin"  ? false : true} className="custom-checkbox smsenable" onClick={() => {  setNumber1(true) }} onChange={(e) => { getEditLoanDeatils(e.target.value, "Approve"); setApprove(e.target.value) }} /> */}
                        <input type="checkbox" checked={approve == "yes" ? true : false} value={approve == "no" ? "yes" : "no"} disabled={loginDetails[0].user_type === "Super Admin" /* && status === 1 */ ? false : true} onChange={(e) => { getEditLoanDeatils(e.target.value, "Approve"); setApprove(e.target.value); setNumber1(true) }} />
                        <label for='Approve' className="form-label">Approve</label>
                     </div>

                     <h2 className='float-end'>Loan ID: <span className='orangeText'>{loanviewIdd}</span></h2>


                  </Modal.Header>

                  <Modal.Body>


                     {/* <h2>Loan Details</h2> */}
                     <div className="row loansBlock">
                        <div className="col-12 loanHead">
                           {/* <Checkbox className="smsenable" labelText="Enable SMS Notification" checked={Enablesms == "yes" ? true : false} value={Enablesms == "on" ? "Yes" : "No"} onChange={(e) => { setEnablesms(e.target.value); }} inputId="Enablesmsnotificationpopup" /> */}
                           <input type="checkbox" checked={Enablesms == "yes" ? true : false} value={Enablesms == "no" ? "yes" : "no"} onChange={(e) => { setEnablesms(e.target.value); setNumber1(true) }} id="Enablesmsnotificationpopup" />
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
                        {loanType == "daily" ?

                           <div class="row">
                              <div className="col-lg-4">
                                 <InputText className={`${!loanAmount && (submitLoanClicked) ? 'error' : ''}`} labelText="Loan Amount" inputName="Loan Amount" inputValue={loanAmount} inputDisable={loanType == ""} inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Loan Amount") }} />
                              </div>
                              <div className="col-lg-4">
                                 {/* <InputText labelText="Interest Amount" inputName="Interest Amount" inputValue={interestAmount} inputType="text" onChange={(e) => setInterestAmount(e.target.value)} /> */}
                                 <InputText className={`${!interestAmount && (submitLoanClicked) ? 'error' : ''}`} labelText={loanType == "weekly" ? "Interest Amount" : loanType == "monthly" ? "Documentation Charges" : "Interest Amount"} inputDisable={loanType == ""} inputValue={interestAmount} inputName="Interest Amount" inputType="text" onChange={(e) => { getEditLoanDeatils(e.target.value, "Interest Amount") }} />

                              </div>
                              <div className="col-lg-4">
                                 <InputText className={`${!noOfDays && (submitLoanClicked) ? 'error' : ''}`} labelText={loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days"} inputName="No of Days" inputType="text" inputDisable={loanType == ""} inputValue={noOfDays} onChange={(e) => getEditLoanDeatils(e.target.value, loanType == "weekly" ? "No of Weeks" : loanType == "monthly" ? "No of Months" : "No of Days")} />
                              </div>
                              <div className="col-lg-4">
                                 <InputText inputValue={calculationn} labelText={loanType == "weekly" ? "Due Amount Per Week" : loanType == "monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputDisable inputName="Due Amount" inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                              </div>
                              <div className="col-lg-4">
                                 <InputText className={`${!pstartDate && (submitLoanClicked) ? 'error' : ''}`} labelText="Start Date" inputName="Start Date" inputType="date" placeHolder="dd-mm-yyyy" inputDisable={loanType == ""} inputValue={pstartDate} onChange={(e) => { getEditLoanDeatils(e.target.value, "Start Date"); EditupdateEndDate(e.target.value) }} />
                              </div>
                              <div className="col-lg-4">
                                 <InputText labelText="End Date" inputDisable={loanType == ""} inputName="End Date" inputType="date" inputValue={pendDate} />

                              </div>
                              <div className="col-lg-4">
                                 {/* <InputText labelText="Date" inputName="Date" inputType="date" inputValue={date} onChange={(e) => { getEditLoanDeatils(e.target.value, "Date") }} /> */}
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
                           <input type="checkbox" checked={approve == "yes" ? true : false} value={approve == "no" ? "yes" : "no"} disabled={loginDetails[0].user_type === "Super Admin" /* && status === 1 */ ? false : true} onChange={(e) => { getEditLoanDeatils(e.target.value, "Approve"); setApprove(e.target.value);; setNumber1(true) }} />
                           <label for='Approve' className="form-label">Approve</label>
                        </div>

                        <h2 className='float-end'>Loan ID: <span className='orangeText'>{loanviewIdd}</span></h2>


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
                              <input type="checkbox" checked={approve == "yes" ? true : false} value={approve == "no" ? "yes" : "no"} disabled={loginDetails[0].user_type === "Super Admin" /* && status === 1 */ ? false : true} onChange={(e) => { getEditLoanDeatils(e.target.value, "Approve"); setApprove(e.target.value); setNumber1(true) }} />
                              <label for='Approve' className="form-label">Approve</label>
                           </div>

                           <h2 className='float-end'>Loan ID: <span className='orangeText'>{loanviewIdd}</span></h2>


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

        
            <Modal size="m" show={viewshow} onHide={handleClose1}>
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
                              <p className="form-label"><b>Loan ID</b></p>
                              <p className='form-value'><span className='orangeText'> {singleLoanList.vendorloan_id} </span></p>
                           </div>
                           <div class="col-lg-12">
                              <p className="form-label">Loan Amount</p>
                              <p className='form-value'>{singleLoanList.loan_amount}</p>
                           </div>

                           {/* <div class="col-lg-12">
                              <p className="form-label">Interest Amount</p>
                              <p className='form-value'>{singleLoanList.interest}</p>
                           </div> */}
                           {/* <div class="col-lg-12">
                              <p className="form-label">Documentation Charges</p>
                              <p className='form-value'>{singleLoanList.interest_amount}</p>
                           </div> */}
                           {/* {loanType === "monthly" ?
                              <>
                                 <div class="col-lg-12">
                                    <p className="form-label">Interest Amount</p>
                                    <p className='form-value'>{interest}</p>
                                 </div> */}
                           {loanType === "monthly" ?
                              <>
                                 <div class="col-lg-12">
                                    <p className="form-label">Document Charges</p>
                                    <p className='form-value'>{interestAmount}</p>
                                 </div>

                                 <div class="col-lg-12">
                                    <p className="form-label">Interest Amount</p>
                                    <p className='form-value'>{interest}</p>
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
                              <p className='form-value'>{singleLoanList.total_due}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">Paid EMI </p>
                              <p className='form-value'>{singleLoanList.paid_due}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">Remaining EMI</p>
                              <p className='form-value'>{singleLoanList?.remaining_dues}</p>
                           </div>


                           <div class="col-lg-12">
                              <p className="form-label">{loanType == "weekly" ? "EMI Amount (Weekly)" : loanType == "monthly" ? "EMI Amount (Monthly)" : "EMI Amount (Daily)"}</p>
                              <p className='form-value'>{singleLoanList?.perday_amount}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">Loan Date</p>
                              <p className='form-value'>{singleLoanList?.date == "0000-00-00" ? "00-00-0000" : moment(singleLoanList.date).format("DD-MM-YYYY")}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">Start Date</p>
                              <p className='form-value'>{moment(singleLoanList?.start_date).format("DD-MM-YYYY")}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">End Date</p>
                              <p className='form-value'>{moment(singleLoanList?.end_date).format("DD-MM-YYYY")}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">Loan Type</p>
                              <p className='form-value'>{singleLoanList?.loan_type}</p>
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
                              <p className='form-value'>{singleLoanList?.status}</p>
                              {/* <p className='form-value'>{status == 1 ? "Active" : status == 2 ? "Closed" : "Pending"}</p> */}
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">Application Status</p>
                              <p className='form-value'>{singleLoanList.isactive == "1" ? "Approved" : singleLoanList.isactive == "0" ? "Pending" : singleLoanList.isactive == "2" ? "Rejected" : "Pending"}</p>
                           </div>

                           <div class="col-lg-12">
                              <p className="form-label">SMS Notification</p>
                              <p className='form-value'>{singleLoanList.enable_sms == "yes" ? "Enable" : "Disable"}</p>
                           </div>



                        </div>
                     </div>
                  </div>
               </Modal.Body>
               <Modal.Footer>



                  <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose1}>
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


export default EditCustomer;