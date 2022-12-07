import React, { StrictMode, useState } from 'react';
import { axiosObject } from '../../services/BaseService'
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { InputText, SelectGender, Checkbox, Radio } from '../../components/FormFields';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ls from 'local-storage';
import FileBase64 from 'react-file-base64';
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import uploadFile from '../../assets/img/uploadfile.jpg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"
import Modal from 'react-bootstrap/Modal'


const AddCustomer = () => {

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)

   let navigate = useNavigate();
   // const saveCustomer = () =>{
   //     navigate("/viewcustomer");
   // }

   const [custID, setcustID] = useState();
   const [custName, setCustName] = useState("");
   const [phone, setPhone] = useState("");
   const [AadharNumber, setAadharNumber] = useState("");
   const [address, setAddress] = useState("");
   const [gender, setGender] = useState("");
   const [dob, setDob] = useState("");
   const [email, setEmail] = useState("");
   const [idProof, setIdProof] = useState("");
   const [interest, setInterest] = useState("");
   //const [interestError, setInterestError] = useState("");

   const [emailError, setEmailError] = useState("");
   const [interestError, setInterestError] = useState("");
   const [loanAmountError, setloanAmountError] = useState("");
   const [interestAmountError, setinterestAmountError] = useState("");
   const [noOfdaysError, setNoOfDaysError] = useState("");
   const [startDateError, setStartDateError] = useState("");
   const [endDateError, setEndDateError] = useState("");
   //const [nameError, setNameError] = useState("");
   //const [genderError, setGenderError] = useState("");
   //const [addressError, setAddressError] = useState("");
   const [deleteData, setDeleteData] = useState("");
   const [addableLables, setAddableLables] = useState([]);



   const [loanType, setLoanType] = useState("");
   const [loanAmount, setLoanAmount] = useState("");
   //const [loanAmountError, setloanAmountError] = useState("");
   const [interestAmount, setInterestAmount] = useState("");
   //const [interestAmountError, setinterestAmountError] = useState("");

   const [noOfDays, setNoOfDays] = useState("");
   // const [noOfdaysError, setNoOfDaysError] = useState("");

   const [perDayAmount, setPerDayAmount] = useState("");
   const [startDate, setStartDate] = useState("");
   //const [startDateError, setStartDateError] = useState("");

   const [endDate, setEndDate] = useState("");
   // const [endDateError, setEndDateError] = useState("");

   const [date, setDate] = useState("");
   const [submitClicked, setSubmitClicked] = useState(false)
   const [fields, setFields] = useState([]);
   const [loanFlag, setLoanFlag] = useState(false);
   const [Enablesms, setEnablesms] = useState("no");
   const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
   const [addButtonFlag, setAddButtonFlag] = useState(false);
   const [MobialNoError, setMobialNoError] = useState("");
   const [AadharNoError, setAadharNoError] = useState("");
   const [nameError, setNameError] = useState("");
   const [genderError, setGenderError] = useState("");
   const [addressError, setAddressError] = useState("");
   const [saveCustomerFlag, setSaveCustomerFlag] = useState(false);



   const [image, setImage] = useState("");
   const [type, setType] = useState("");
   const [cnfrmShow, setCnfrmShow] = useState(false);
   const [row, setRow] = useState("");
   const [addloanLables, setaddloanLables] = useState([]);
   const [number1, setNumber1] = useState("");



   console.log("enablesms", Enablesms);

   const handleError = () => {
      setSubmitLoanClicked(false)
   }

   const aclear = () => {
      setNoOfDays("");
      setStartDate("");
      setEndDate("");
      setLoanAmount("");
      setInterestAmount("");
      setInterest("");
      setaddloanLables([]);
    

   }





   const clear = () => {
      setLoanType("")
      setLoanAmount("")
      setInterestAmount("")
      setInterest("")
      setNoOfDays("");
      setStartDate("");
      setEndDate("");
      setInterest("")
   }


   const handleAdd = () => {
      setAddButtonFlag(true)
      setLoanFlag(true)
      const data = fields.length + 1
      const values = [...fields, { data }];
      console.log("value===", values);
      setFields(values);

   }

   const handleDelete = (item) => {
      console.log("===item===", item);
      clear();
      setSubmitLoanClicked(false);
      setAddButtonFlag(false)
      const values = fields.filter(data => data !== item);
      console.log("===value delete===", values);
      setFields(values);

   }

   function convert(str) {
      var date = new Date(str),
         mnth = ("0" + (date.getMonth() + 1)).slice(-2),
         day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");


   }
   const [doc, setDoc] = useState("");


   const [popupTitle, setPopupTitle] = useState("");
   const [popupMsg, setPopupMsg] = useState("");
   const [popupType, setPopupType] = useState("");
   const [popupActionType, setPopupActionType] = useState("");
   const [popupActionValue, setPopupActionValue] = useState("");
   const [popupActionPath, setPopupActionPath] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const togglePopup = () => {
      setIsOpen(!isOpen);
   }

   const calculation = Math.ceil((Number(loanAmount)) / Number(noOfDays))
   const monthlyCalculation = Math.ceil((Number(loanAmount) + Number(interest)) / Number(noOfDays))




   let addLoanVal = addableLables.reduce((acc, curr) => `${acc}${curr.label},`, '')
   console.log("addableLables", addLoanVal);

   let addLoanValue = addloanLables.reduce((acc, curr) => `${acc}${curr.label},`, '')
   console.log("addloanLables", addLoanValue);



   const saveCustomer = (e) => {

      setSubmitClicked(true);
      e.preventDefault();
      setMobialNoError("")
      setAadharNoError("")
      setNameError("")
      setGenderError("")
      setAddressError("")
      setloanAmountError("")
      setinterestAmountError("")
      setInterestError("")
      setNoOfDaysError("")
      setStartDateError("")
      setEndDateError("")
      setEmailError("")


      if (!custName) {
         console.log("");
         //setNameError("Name is required")
         return;
      }

      if (!phone) {
         console.log("");
         // setMobialNoError(" Phone number  is required")
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
         // setMobialNoError(" Phone number  is required")
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
      if (!address) {
         console.log("");
         //setAddressError("Address is required")


         return;
      }

      if (!gender) {
         console.log("");
         //setGenderError("Gender is required")

         return;
      }
      // if (!email) {
      //    setEmailError("Email Id is required")
      //    return;
      // }
      // else if (email && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)) {
      //    setEmailError("Email Id must match the format")
      //    return;
      // }
      if (fields.length > 0) {
         if (loanFlag == true) {
            setSubmitLoanClicked(true);
            if (!loanType) {
               console.log("");
               return;
            }

            if (!loanAmount) {
               console.log("");
               //setloanAmountError("Loan amount is required")
               return;
            }
            if (!interestAmount) {
               console.log("");
               //setinterestAmountError("Interest amount is required")
               return;
            }
            if (!noOfDays) {
               console.log("");
               //setNoOfDaysError("NoOf days required")
               return;
            }

            if (!startDate) {
               console.log("");
               //setStartDateError("Start date is required")
               return;
            }
            if (!endDate) {
               console.log("");
               //setEndDateError("End date is required")
               return;
            }
         }
      }
      setSaveCustomerFlag(true);

      let request = {
         vendor_id: loginDetails[0].vendor_id,
         customer_name: custName,
         phone_no: phone,
         gender: gender,
         adhar_card_number: AadharNumber,
         dob: dob,
         email: email,
         interest: interest,
         address: address,
         proof_url: doc === "" ? doc : doc.length > 0 ? doc : [doc],
         comments: "",
         loan_type: loanType,
         start_date: startDate,
         loan_amount: loanAmount,
         enable_sms: Enablesms == "no" ? "No" : "Yes",
         installment_amount: loanType == "Daily" ? calculation : loanType == "Weekly" ? calculation : loanType == "Monthly" ? monthlyCalculation : perDayAmount,
         interest_amount: interestAmount,
         end_date: endDate,
         date: date,
         history_description: addLoanVal.slice(0, -1),
         description: addLoanValue.slice(0, -1),
         installment_number: noOfDays,
         status: "",
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token


      }

      {
         axiosObject.post("customerAdd/add", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {
                  togglePopup()
                  setPopupTitle("Add Customer");
                  setPopupMsg("Customer Added Successfully");
                  setPopupType("success");
                  setPopupActionType("redirect");


                  setPopupActionValue("ok");
                  setPopupActionPath("/customers")
                  setSaveCustomerFlag(false);

               }
               else {
                  togglePopup()
                  setPopupTitle("");
                  setPopupMsg(response.data.error.err);
                  setPopupType("error");
                  // setPopupActionType("redirect");
                  // setPopupActionValue("close");
                  // setPopupActionPath("/customers")
                  setPopupActionType("close");
                  setPopupActionValue("close");
                  setSaveCustomerFlag(false);


               }
            });

      }

   }

   const customerPhone = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setPhone(value);
      addLoanDeatils(e.target.value, "Phone")
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

   const getFiles = (file) => {
      console.log("================>", file.type)
      setType("")
      if (file.type.includes("jpg") || file.type.includes("jpeg") || file.type.includes("png")) {
         setDoc(file);
      } else {
         setType("0");
      }
   }

   // const nextweek = () => {
   //    var today = new Date();
   //    let text = today.toISOString();

   //       var Weekly = new Date(text.getFullYear(), text.getMonth(), text.getDate()+7);
   //   console.log(Weekly,"nextweek");

   //   }

   // const handleClose1 = () => setCnfrmShow(false);
   // const handleShow1 = (data) => {
   //    setDeleteData(data)
   //    setCnfrmShow(true);
   //    console.log("handleShow1", data)
   // }


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

         setEndDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'weeks').subtract(1, "weeks").format("YYYY-MM-DD") : date)
      }
      if (loanType == "Monthly") {
         setEndDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'months').subtract(1, "months").format("YYYY-MM-DD") : date)
      }
   }


   const addLoanDeatils = (value, label) => {
      // console.log("label calling", label);

      if (label === "Name") {
         setCustName(value);
         if (addableLables.length > 0) {
            if (addableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setAddableLables([...addableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setAddableLables([...addableLables, { label }]);
         }
      }
      if (label === "Phone") {
         setPhone(value);
         if (addableLables.length > 0) {
            if (addableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setAddableLables([...addableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setAddableLables([...addableLables, { label }]);
         }
      }
      if (label === "AadharNumber") {
         setAadharNumber(value);
         if (addableLables.length > 0) {
            if (addableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setAddableLables([...addableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setAddableLables([...addableLables, { label }]);
         }
      }
      if (label === "Address") {
         setAddress(value);
         if (addableLables.length > 0) {
            if (addableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setAddableLables([...addableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setAddableLables([...addableLables, { label }]);
         }
      }
      if (label === "Gender") {
         setGender(value);
         if (addableLables.length > 0) {
            if (addableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setAddableLables([...addableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setAddableLables([...addableLables, { label }]);
         }
      }
      if (label === "Date of Birth") {
         setDob(value);
         if (addableLables.length > 0) {
            if (addableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setAddableLables([...addableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setAddableLables([...addableLables, { label }]);
         }
      }

      if (label === "Email") {
         setEmail(value);
         if (addableLables.length > 0) {
            if (addableLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setAddableLables([...addableLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setAddableLables([...addableLables, { label }]);
         }
      }
      
   }
   const LoanDeatils = (value, label) => {
      if (label === "Loan Amount") {
         setLoanAmount(value);
         if (addloanLables.length > 0) {
            if (addloanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setaddloanLables([...addloanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setaddloanLables([...addloanLables, { label }]);
         }
      }
      if (label === "Interest Amount") {
         if(loanType === "Monthly" ? label= "Documentation Charges" : label ="Interest Amount"){
         setInterestAmount(value);
         if (addloanLables.length > 0) {
            if (addloanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setaddloanLables([...addloanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setaddloanLables([...addloanLables, { label }]);
         }
      }
      }
      if (label === "Interest") {
         setInterest(value);
         if (addloanLables.length > 0) {
            if (addloanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setaddloanLables([...addloanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setaddloanLables([...addloanLables, { label }]);
         }
      }

      if (label === "No of Days") {
         //label = "Total EMI (Days/Weeks/Months), EMI Amount"   
          if(loanType === "Monthly" ? label= "Total EMI (Months),EMI Amount" : loanType === "Weekly" ? label ="Total EMI (Weeks),EMI Amount": loanType === "Daily" ? label ="Total EMI (Days),EMI Amount" : ""){
         setNoOfDays(value);
         if (addloanLables.length > 0) {
            if (addloanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setaddloanLables([...addloanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setaddloanLables([...addloanLables, { label }]);
         }
          }
      }
      if (label === "Start Date") {
         label = "Start Date, End Date"
         setStartDate(value);
         if (addloanLables.length > 0) {
            if (addloanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setaddloanLables([...addloanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setaddloanLables([...addloanLables, { label }]);
         }
      }
      // if (label === "End Date") {
      //    setEndDate(value);
      //    if (addloanLables.length > 0) {
      //       if (addloanLables.filter((data) => data.label === label).length === 0) {
      //          // console.log("if calling");
      //          setaddloanLables([...addloanLables, { label }]);
      //       }
      //    }
      //    else {
      //       // console.log("1st else calling");
      //       setaddloanLables([...addloanLables, { label }]);
      //    }
      // }
      if (label === "Date") {
         setDate(value);
         if (addloanLables.length > 0) {
            if (addloanLables.filter((data) => data.label === label).length === 0) {
               // console.log("if calling");
               setaddloanLables([...addloanLables, { label }]);
            }
         }
         else {
            // console.log("1st else calling");
            setaddloanLables([...addloanLables, { label }]);
         }
      }
   }

   return (
      <div>

         <div id="wrapper">
            <Header />
            <Sidebar />

            <section id="content-wrapper" className='addCustomersPage'>
               <div className="row">
                  {/* <div className="col-lg-12">
                     <h1 className='pageHead mt-2'>Add New Customers <Link to="/customers" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> Back</Link> <button onClick={saveCustomer} className="btn btn-primary float-end smallBtn me-2"><i class="fa-solid fa-floppy-disk"></i> Save</button> </h1>
                     </div> */}

                  <div className="col-12 col-lg-8 col-md-8 col-sm-8">
                     <h1 className='pageHead mt-2'>Add New Customer </h1>
                  </div>

                  <div className="col-12 col-lg-4 col-md-4 col-sm-4 save-back">
                     <Link to="/customers" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Back</span></Link> <button onClick={saveCustomer} disabled={saveCustomerFlag ? true : false}  className={saveCustomerFlag == true ? "btn btn-primary1 float-end smallBtn me-2" : "btn btn-primary float-end smallBtn me-2" }><i class="fa-solid fa-floppy-disk"></i> Save</button>
                  </div>

                  <div className="col-12 mt-0 customerDetailsBlock">
                     <div className="card">
                        <div className="card-body">
                           <h2>Customer Info</h2>
                           <div className="row mt-2">
                              {/* <div className="col-lg-4 col-md-6">  
                                   <InputText className={`${!custID && (submitClicked)? 'error':''}`}  onChange={(e) => setcustID(e.target.value)}   labelText="Customer ID" inputName="Customer" inputType="text"/>
                                </div> */}
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!custName && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Name")} labelText="Name" inputName="Name" inputType="text" />
                                 <p className='text-color-red'>{nameError}</p>

                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!phone && (submitClicked) ? 'error' : ''}`} onChange={(e) => { addLoanDeatils(e.target.value, "Phone"); setPhone(e.target.value.replace(/[^0-9]/g, "")) }} maxLength={10} inputValue={phone} labelText="Phone" inputName="Phone" inputType="text" />
                                 <p className='text-color-red'>{MobialNoError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!AadharNumber && (submitClicked) ? 'error' : ''}`} onChange={(e) => { addLoanDeatils(e.target.value, "AadharNumber"); setAadharNumber(e.target.value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join(" ")) }} maxLength={14} inputValue={AadharNumber} labelText="AadharNumber" inputName="AadharNumber" inputType="text" />
                                 <p className='text-color-red'>{AadharNoError}</p>
                              </div> 
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!address && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Address")} labelText="Address" inputValue={address} inputName="Address" inputType="text" />
                                 <p className='text-color-red'>{addressError}</p>


                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <SelectGender className={`${!gender && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Gender")} labelText="Gender" />
                                 <p className='text-color-red'>{genderError}</p>

                              </div>
                              <div className="col-lg-4 col-md-6">

                                 {/* <InputText  className={`${!dob && (submitClicked) ? 'error' : ''}`}  onChange={(e) => setDob(e.target.value)} labelText="Date of Birth" inputName="Date of Birth" inputType="date" /> */}

                                 <InputText onChange={(e) => addLoanDeatils(e.target.value, "Date of Birth")} labelText="Date of Birth" inputName="Date of Birth" inputType="date" />

                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText onChange={(e) => addLoanDeatils(e.target.value, "Email")} required labelText="Email" inputName="Email" inputType="text" />
                                 <p className="form-input-error" > {/* {emailError} */} </p>
                              </div>

                              {/* <div className="col-lg-4 col-md-6">
                                 <InputText onChange={(e) => setIdProof(e.target.value)} labelText="ID Proof" inputName="Proof Description" inputType="text" />
                              </div> */}
                              {/* <div className="col-lg-4 col-md-6">
                                 <InputText labelText="Proof Img(Aadhar Card or DL)" inputValue={doc?.length > 0 ? doc[0].name : doc.name} inputName="Proof" inputType="text" />
                                 <FileBase64 multiple={true} onDone={getFiles} hidden type="hidden" />
                              </div> */}
                              <div className="col-md-4 col-lg-4">

                                 <div className="user-upload-btn-wrapper">
                                    <label className='form-label'>ID Proof</label>
                                    {(doc === "" || doc == null || doc == undefined) && doc === "" ? <img alt="" src={uploadFile} /> : doc === "" ? <img alt="" src={doc} /> : <img alt="" src={doc.base64} />
                                    }

                                    <FileBase64 onDone={getFiles} type="hidden" />
                                    {type === "0" ? <p className="form-input-error">Upload only Image Format </p> : ""}
                                    <button type="button" className="btn btn-primary simpleBtn" onClick={() => setDoc("")}> <i class="fa-solid fa-trash-can"></i></button>
                                 </div>

                              </div>
                           </div>
                        </div>
                     </div>




                     <div className={`card ${loanType == "Daily" ? "dailyBG" : loanType == "Weekly" ? "weeklyBG" : loanType == "Monthly" ? "monthlyBG" : ""}`}>
                        <div className="card-body">
                           <h2>Create New Loan</h2>


                           <div className="row loansBlock">
                              {addButtonFlag == true ? "" :
                                 <div className="float-end">
                                    <button type="submit" className="btn btn-primary float-end m-0 smallBtn" onClick={handleAdd}><i className="fa fa-plus"></i> Add New Loan</button>
                                 </div>}
                              {fields.map((item, index) =>
                                 < >
                                    <div className="float-end"> <button type="submit" className="btn btn-primary float-end m-0 smallBtn" onClick={() => handleDelete(item)}> <i class="fa-solid fa-trash-can"></i> Delete</button></div>
                                    <div className="col-12 loanHead">
                                       {/* <h3>Loan {index + 1}</h3> */}
                                       {/* <Checkbox className="smsenable" labelText="Enable SMS Notification" checked={Enablesms == "yes" ? true : false} value={Enablesms == true ? "yes" : "no"} onChange={(e) => setEnablesms(e.target.value)} inputId="Enablesmsnotification" /> */}
                                       <input type="checkbox" checked={Enablesms == "yes" ? true : false} value={Enablesms == "no" ? "yes" : "no"} onChange={(e) => { setEnablesms(e.target.value); setNumber1(true) }} id="Enablesmsnotificationpopup" />
                                       <label className="form-label">  Enable SMS Notification</label>


                                    </div>

                                    <div className='col-lg-12 mb-2'>

                                       <b className='me-2'>Loan Type: </b>
                                       <Radio className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="daily" labelText="Daily" radioChecked={loanType == "Daily" ? true : false} onChange={() => { setLoanType("Daily"); aclear(); handleError() }} />
                                       <Radio className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="weekly" labelText="Weekly" radioChecked={loanType == "Weekly" ? true : false} onChange={() => { setLoanType("Weekly"); aclear(); handleError() }} />
                                       <Radio className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="monthly" labelText="Monthly" radioChecked={loanType == "Monthly" ? true : false} onChange={() => { setLoanType("Monthly"); aclear(); handleError() }} />
                                    </div>


                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!loanAmount && (submitLoanClicked) ? 'error' : ''}`} inputValue={loanAmount} inputDisable={loanType == ""} labelText="Loan Amount" inputName="Loan Amount" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "Loan Amount"); setLoanAmount(e.target.value.replace(/[^0-9]/g, "")) }} />
                                       <p className='text-color-red'>{loanAmountError}</p>

                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!interestAmount && (submitLoanClicked) ? 'error' : ''}`} inputDisable={loanType == ""} labelText={loanType == "Weekly" ? "Interest Amount" : loanType == "Monthly" ? "Documentation Charges" : "Interest Amount"} inputValue={interestAmount} inputName="Interest Amount" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "Interest Amount"); setInterestAmount(e.target.value.replace(/[^0-9]/g, "")) }} />
                                       <p className='text-color-red'>{interestAmountError}</p>

                                    </div>
                                    {loanType == "Monthly" ?
                                       <div className="col-lg-4 col-md-6">
                                          <InputText className={`${!interest && (submitLoanClicked) ? 'error' : ''}`} labelText="Interest Amount" inputValue={interest} inputName="Interest" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "Interest"); setInterest(e.target.value.replace(/[^0-9]/g, "")) }} />
                                          <p className='text-color-red'>{interestError}</p>

                                       </div> : ""}
                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!noOfDays && (submitLoanClicked) ? 'error' : ''}`} inputValue={noOfDays} inputDisable={loanType == ""} labelText={loanType == "Weekly" ? "Total EMI (Weeks)" : loanType == "Monthly" ? "Total EMI  (Months)" : "Total EMI (Days)"} inputName="No of Days" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "No of Days"); setNoOfDays(e.target.value.replace(/[^0-9]/g, "")) }} />
                                       <p className='text-color-red'>{noOfdaysError}</p>

                                    </div>
                                    {loanType == "Daily" || loanType == "weekly" ?
                                       <div className="col-lg-4 col-md-6">
                                          <InputText inputValue={calculation == 'NaN' ? '0' : calculation == 'infinity' ? '0' : calculation} labelText={loanType == "Weekly" ? "EMI Amount Per Week" : loanType == "Monthly" ? "EMI Amount Per Month" : "EMI Amount Per Day"} inputName="EMI Amount" inputDisable inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                       </div> :

                                       <div className="col-lg-4 col-md-6">
                                          <InputText inputValue={monthlyCalculation == 'NaN' ? '0' : monthlyCalculation == 'infinity' ? '0' : monthlyCalculation} labelText={loanType == "Weekly" ? "EMI Amount Per Week" : loanType == "Monthly" ? "EMI Amount Per Month" : "EMI Amount Per Day"} inputName="EMI Amount" inputDisable inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                       </div>}
                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!startDate && (submitLoanClicked) ? 'error' : ''}`} labelText="Start Date" inputName="Start Date" inputDisable={loanType == ""} inputValue={startDate} inputType="date" onChange={(e) => { LoanDeatils(e.target.value, "Start Date"); updateEndDate(e.target.value) }} />
                                       <p className='text-color-red'>{startDateError}</p>

                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!endDate && (submitLoanClicked) ? 'error' : ''}`} labelText="End Date" inputName="End Date" inputDisable={loanType == ""} inputType="date" inputValue={endDate} onChange={(e) => { LoanDeatils(e.target.value, "End Date") }} />
                                       <p className='text-color-red'>{endDateError}</p>

                                    </div >
                                    <div className="col-lg-4 col-md-6">
                                       <InputText labelText="Loan Date" inputName="Date" inputDisable={loanType == ""} inputType="date" inputValue={date} onChange={(e) => { { LoanDeatils(e.target.value, "Date"); setDate(e.target.value) } }} />
                                    </div>

                                 </>
                              )}
                           </div >

                        </div >
                     </div >



                  </div >
               </div >

               <div className="form-group col-md-12">
                  <div className="col-sm-12 mt-4 text-center">
                     <button onClick={saveCustomer} disabled={saveCustomerFlag ? true : false} className={saveCustomerFlag == true ? "btn btn-primary1" : "btn btn-primary" }><i class="fa-solid fa-floppy-disk"></i> Save</button>
                     <Link to="/customers" className="btn btn-primary btn-cancel btn-outline"><span className=''> Cancel</span></Link>

                  </div>
                  {/* <Modal size="sm" show={cnfrmShow} onHide={handleClose1}>


                     <Modal.Header>
                        <Modal.Title>
                           <h2>Confirmation</h2>

                        </Modal.Title>
                     </Modal.Header>

                     <Modal.Body>
                        Are you sure do you want to delete
                     </Modal.Body>
                     <Modal.Footer>




                        <button className="btn btn-primary btn-outline smallBtn" onClick={DeleteIDproof}>
                           Delete
                        </button>
                        <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose1}>
                           Close
                        </button>
                     </Modal.Footer>
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

                  </Modal> */}
               </div>
            </section >
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
         </div >
      </div >

   )

}


export default AddCustomer;