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


const WeeklyAddCustomer = () => {

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)

   let navigate = useNavigate();
   // const saveCustomer = () =>{
   //     navigate("/viewcustomer");
   // }
   const [Enablesmsedit, setEnablesmsedit] = useState("no");

   const [custID, setcustID] = useState();
   const [custName, setCustName] = useState("");
   const [AnothercustName, setAnothercustName] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");
   const [gender, setGender] = useState("");
   const [dob, setDob] = useState("");
   const [email, setEmail] = useState("");
   const [idProof, setIdProof] = useState("");
   const [interest, setInterest] = useState("");
   const [pin_code, setPin_code] = useState("");
   const [adharcardnumber, setAdharCardNumber] = useState("");
   const [street, setStreet] = useState("");
   const [village, setVillage] = useState("");
   const [area, setArea] = useState("");
   const [emailError, setEmailError] = useState("");
   const [interestError, setInterestError] = useState("");
   const [loanAmountError, setloanAmountError] = useState("");
   const [dueAmountError, setdueAmountError] = useState("");
   const [interestAmountError, setinterestAmountError] = useState("");
   const [noOfdaysError, setNoOfDaysError] = useState("");
   const [startDateError, setStartDateError] = useState("");
   const [endDateError, setEndDateError] = useState("");
   const [referencename, setReferencename] = useState("");
   const [custaccountnumber, setCustaccountnumber] = useState("");
   const [referencephoneno, setReferencephoneno] = useState("");
   const [addableLables, setAddableLables] = useState([]);
   const [deleteData, setDeleteData] = useState("");
   //save button hide
   const [saveCustomerFlag, setSaveCustomerFlag] = useState(false);




   const [loanType, setLoanType] = useState("");
   const [loanAmount, setLoanAmount] = useState("");
   const [Enablereference, setEnablereference] = useState("No");

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
   const [submitweeklyLoanClicked, setSubmitweeklyLoanClicked] = useState(false)

   const [referencenameError, setReferencenameError] = useState("");

   const [addButtonFlag, setAddButtonFlag] = useState(false);
   const [MobialNoError, setMobialNoError] = useState("");
   const [nameError, setNameError] = useState("");
   const [genderError, setGenderError] = useState("");
   const [addressError, setAddressError] = useState("");
   const [refPhone, setrefPhone] = useState("");
   // karthianna
   const [AdharCardNumberError, setAdharCardNumberError] = useState("");
   const [StreetError, setStreetError] = useState("");
   const [villageError, setvillageError] = useState("");
   const [pin_codeError, setpin_codeError] = useState("");
   const [referencephonenoError, setReferencephonenoError] = useState("");
   const [areaError, setareaError] = useState("");
   const [custaccountnumberError, setcustaccountnumberError] = useState("");
   const [submitWeeklyLoanClicked, setsubmitWeeklyLoanClicked] = useState(false)



   const [image, setImage] = useState("");
   const [type, setType] = useState("");
   //const [inputId, setInputId] = useState("");

   const [cnfrmShow, setCnfrmShow] = useState(false);
   const [row, setRow] = useState("");
   const [addloanLables, setaddloanLables] = useState([]);
   const [editEnablesms, seteditEnablesms] = useState("no");
   const [numberOfWeeks, setNumberOfWeeks] = useState("");
   console.log("editEnablesms", editEnablesms);
   const [number1, setNumber1] = useState("");

   console.log("enablesms", Enablesms);

   const handleError = () => {
      setSubmitLoanClicked(false)
   }


   const checkboxfieldclear = () => {
      setNoOfDays("");
      setStartDate("");
      setEndDate("");
      setLoanAmount("")
      setInterestAmount("")
      setInterest("")
      setReferencename("")
      setReferencephoneno("")
      setloanAmountError("")
      setStartDateError("")
      setEndDateError("")
      setReferencephonenoError("")
      setdueAmountError("")

   }

   const clear = () => {
      setLoanType("")
      setLoanAmount("")
      setInterestAmount("")
      setInterest("");
      setNoOfDays("");
      setStartDate("");
      setEndDate("");
      setReferencephoneno("");
      setReferencename("");
      setNumberOfWeeks("");
      setEnablesms("no");
   }

   const checkClear = () => {

      setReferencephoneno("");
      setReferencename("");
      setsubmitWeeklyLoanClicked(false);

   }


   const handleAdd = () => {
      setAddButtonFlag(true)
      setLoanFlag(true)
      const data = fields.length + 1
      const values = [...fields, { data }];
      console.log("value===", values);
      setFields(values);

   }
   const enablerefperson = () => {

      var RefinputId = document.getElementById(RefinputId);
      RefinputId.disabled = RefinputId.checked ? false : true;
      console.log('RefinputId', RefinputId);

   }

   const handleDelete = (item) => {
      console.log("===item===", item);
      clear();
      setPerDayAmount("");
      setloanAmountError("");
      setdueAmountError("");
      setStartDateError("");
      setEndDateError("");
      setSubmitLoanClicked(false);
      setSubmitweeklyLoanClicked(false);
      seteditEnablesms("no");
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
   const [perDayAmountError, setPerDayAmountError] = useState("");



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

   const calculation = Math.ceil((Number(loanAmount)) / Number(numberOfWeeks))
   const monthlyCalculation = Math.ceil((Number(loanAmount) + Number(interest)) / Number(noOfDays))




   let addLoanVal = addableLables.reduce((acc, curr) => `${acc}${curr.label},`, '')
   console.log("addableLables", addLoanVal);

   let addLoanValue = addloanLables.reduce((acc, curr) => `${acc}${curr.label},`, '')
   console.log("addloanLables", addLoanValue);



   const saveCustomer = () => {

      setSubmitClicked(true);
      //e.preventDefault();
      setMobialNoError("")
      setNameError("")
      setGenderError("")
      setAddressError("")
      setloanAmountError("")
      setdueAmountError("")
      setPerDayAmountError("")
      setinterestAmountError("")
      setNoOfDaysError("")
      setStartDateError("")
      setEndDateError("")
      setEmailError("")
      //setAdharCardNumberError("")
      setStreetError("")
      setvillageError("")
      setpin_codeError("")
      setReferencenameError("")
      setReferencephonenoError("")
      setareaError("")
      setcustaccountnumberError("")


      // if (!custaccountnumber) {
      //    console.log("");
      //    setcustaccountnumberError(" Account Number number  is required")
      //    return;
      // }
      // else if (custaccountnumber.length < 10) {
      //    setcustaccountnumberError("Account Number must be of 10 digits")
      //    return;
      // }
      // else if (custaccountnumber.length > 10) {
      //    setcustaccountnumberError("Account Number should not exeed 10 digits")
      //    return;
      // }
      if (!custName) {
         console.log("");
         setNameError("Name is required")
         return;
      }

      if (!phone) {
         console.log("");
         setMobialNoError(" Phone number  is required")
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
      if (!address) {
         console.log("");
         setAddressError("Address is required")


         return;
      }
      if (!street) {
         console.log("");
         setStreetError("Street is required")

         return;
      }
      if (!village) {
         console.log("");
         setvillageError("Village is required")

         return;
      }
      // if (!pin_code) {
      //    console.log("");
      //    setpin_codeError("Pincode is required")
      //    return;
      // }
      // else if (pin_code.length < 6) {
      //    setpin_codeError("Pincode must be of 6 digits")
      //    return;
      // }
      // else if (pin_code.length > 6) {
      //    setpin_codeError("Pincode should not exeed 6 digits")
      //    return;
      // }
      if (!area) {
         console.log("");
         setareaError("Area is required")

         return;
      }

      if (!gender) {
         console.log("");
         setGenderError("Gender is required")

         return;
      }
      // if (!adharcardnumber) {
      //    console.log("");
      //    setAdharCardNumberError(" adharcardnumber number  is required")
      //    return;
      // }
      // else if (adharcardnumber.length < 12) {
      //    setAdharCardNumberError("adharcardnumber must be of 12 digits")
      //    return;
      // }
      // else if (adharcardnumber.length > 12) {
      //    setAdharCardNumberError("adharcardnumber should not exeed 12 digits")
      //    return;
      // }

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
            setSubmitweeklyLoanClicked(true);
            // if (!loanType) {
            //    console.log("");
            //    return;
            // }
            if (!numberOfWeeks) {
               console.log("");
               return;
            }
         }
      }

      if (numberOfWeeks !== "") {
         setSubmitLoanClicked(true);

         if (!loanAmount) {
            console.log("");
            setloanAmountError("Loan amount is required")
            return;
         }
         if (!perDayAmount) {
            console.log("");
            setPerDayAmountError("Due amount is required")
            return;
         }
         // if (!interestAmount) {
         //    console.log("");
         //    setinterestAmountError("Interest amount is required")
         //    return;
         // }
         // if (!noOfDays) {
         //    console.log("");
         //    setNoOfDaysError("NoOf days required")
         //    return;
         // }

         if (!startDate) {
            console.log("");
            setStartDateError("Start date is required")
            return;
         }
         if (!endDate) {
            console.log("");
            setEndDateError("End date is required")
            return;
         }

      }
      if (editEnablesms === "yes") {
         setsubmitWeeklyLoanClicked(true);
         if (!referencename) {
            console.log("");
            setReferencenameError("Referencename is required")

            return;
         }
         if (!referencephoneno) {
            setReferencephonenoError("Referencephoneno is required")
            console.log("");
            //setEndDateError("End date is required")
            return;
         }
         else if (referencephoneno.length < 10) {
            setReferencephonenoError("Referencephoneno must be of 10 digits")
            return;
         }
         else if (referencephoneno.length > 10) {
            setReferencephonenoError("Referencephoneno should not exeed 10 digits")
            return;
         }
      }
      console.log(editEnablesms, referencename, referencephoneno, "editEnablesmseditEnablesmseditEnablesms")
      setSaveCustomerFlag(true);
      let request = {
         vendor_id: loginDetails[0].vendor_id,
         customer_name: custName,
         customer_another_name: AnothercustName,
         phone_no: phone,
         gender: gender,
         dob: dob,
         email: email,
         interest: 0,
         address: address,
         adhar_card_number: adharcardnumber,
         street: street,
         village: village,
         pin_code: pin_code == "" ? "" : pin_code,
         area: area,
         reference_person: editEnablesms,
         reference_person_name: referencename,
         reference_person_phoneno: referencephoneno,
         cust_account_number: custaccountnumber,
         proof_url: doc === "" ? doc : doc.length > 0 ? doc : [doc],
         comments: "",
         loan_type: numberOfWeeks !== "" ? "Weekly" : "",
         start_date: startDate,
         loan_amount: loanAmount,
         enable_sms: Enablesms,
         installment_amount: perDayAmount,
         interest_amount: 0,
         end_date: endDate,
         date: date,
         history_description: addLoanVal.slice(0, -1),
         description: addLoanValue.slice(0, -1),
         installment_number: numberOfWeeks,
         status: "",
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token


      }


      {
         axiosObject.post("weeklycustomerAdd/add", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {
                  togglePopup()
                  setPopupTitle("Add Customer");
                  setPopupMsg("Customer Added Successfully");
                  setPopupType("success");
                  setPopupActionType("redirect");


                  setPopupActionValue("ok");
                  setPopupActionPath("/weeklycustomers")
                  setSaveCustomerFlag(false);
               }
               else {
                  togglePopup()
                  setPopupTitle("");
                  setPopupMsg(response.data.error.err);
                  setPopupType("error");
                  // setPopupActionType("redirect");
                  // setPopupActionValue("close");
                  // setPopupActionPath("/weeklycustomers")
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

      // if (loanType == "Daily") {
      //    setEndDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'days').subtract(1, "days").format("YYYY-MM-DD") : date)
      // }
      // if (loanType == "Weekly") {


      setEndDate(numberOfWeeks !== "" ? moment(date, "YYYY-MM-DD").add(numberOfWeeks, 'weeks').subtract(1, "weeks").format("YYYY-MM-DD") : date)
      // }
      // if (loanType == "Monthly") {
      //    setEndDate(noOfDays !== "" ? moment(date, "YYYY-MM-DD").add(noOfDays, 'months').subtract(1, "months").format("YYYY-MM-DD") : date)
      // }
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
      if (label === "Another Name") {
         setAnothercustName(value);
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
      if (label === "AdharCardNumber") {
         setAdharCardNumber(value);
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
      if (label === "Street") {
         setStreet(value);
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
      if (label === "Village") {
         setVillage(value);
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
      if (label === "Pin_code") {
         setPin_code(value);
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
      if (label === "Area") {
         setArea(value);
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
      if (label === "ReferencePhoneno") {
         setReferencephoneno(value);
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
      if (label === "ReferenceName") {
         setReferencename(value);
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
      if (label === "CustaccountNumber") {
         setCustaccountnumber(value);
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

      if (label === "Due Amount") {
         setPerDayAmount(value);
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
      if (label === "ReferenceName") {
         setReferencename(value);
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
      if (label === "ReferencePhoneno") {
         const item = value.replace(/\D/g, "");
         // console.log("item calling", item);
         setReferencephoneno(item);
         if (item !== "") {
            // console.log("if calling");
            if (addloanLables.length > 0) {
               if (addloanLables.filter((data) => data.label === label).length === 0) {
                  setaddloanLables([...addloanLables, { label }]);
               }
            }
            else {
               // console.log("1st else calling");
               setaddloanLables([...addloanLables, { label }]);
            }
         }
         else {
            // console.log("else calling");
            setaddloanLables(addloanLables.filter((data) => data?.label !== label))
         }
      }


   }


   const handleSelectWeeklys = (e) => {
      setNumberOfWeeks(e);
      setStartDate("")
      setEndDate("")
      if (e === "6") {
         setLoanAmount("")
         setPerDayAmount("")
      }
      else {
         setLoanAmount("")
         setPerDayAmount("")

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
                     <Link to="/weeklycustomers" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Back</span></Link> <button onClick={saveCustomer} disabled={saveCustomerFlag ? true : false}  className={saveCustomerFlag == true ? "btn btn-primary1 float-end smallBtn me-2" : "btn btn-primary float-end smallBtn me-2" }><i class="fa-solid fa-floppy-disk"></i> Save</button>
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
                                 <InputText /* className={`${!custaccountnumber && (submitClicked) ? 'error' : ''}`} */ onChange={(e) => addLoanDeatils(e.target.value, "CustaccountNumber")} labelText="Bank Account Number" maxLength={10} inputValue={custaccountnumber} inputName="Custaccountnumber" inputType="text" />
                                 <p className='text-color-red'>{custaccountnumberError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!custName && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Name")} labelText="Name" inputName="Name" inputType="text" />
                                 <p className='text-color-red'>{nameError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText onChange={(e) => addLoanDeatils(e.target.value, "Another Name")} labelText="Another Name" inputName="Another Name" inputType="text" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!phone && (submitClicked) ? 'error' : ''}`} onChange={(e) => { addLoanDeatils(e.target.value, "Phone"); setPhone(e.target.value.replace(/[^0-9]/g, "")) }} maxLength={10} inputValue={phone} labelText="Phone" inputName="Phone" inputType="text" />
                                 <p className='text-color-red'>{MobialNoError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!address && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Address")} labelText="Address" inputValue={address} inputName="Address" inputType="text" />
                                 <p className='text-color-red'>{addressError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!street && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Street")} labelText="Street" inputValue={street} inputName="Street" inputType="text" />
                                 <p className='text-color-red'>{StreetError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!village && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Village")} labelText="Village" inputValue={village} inputName="Village" inputType="text" />
                                 <p className='text-color-red'>{villageError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!area && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Area")} labelText="Area" inputValue={area} inputName="Area" inputType="text" />
                                 <p className='text-color-red'>{areaError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText  onChange={(e) => { addLoanDeatils(e.target.value, "Pin_Code"); setPin_code(e.target.value.replace(/[^0-9]/g, "")) }} labelText="Pin_code" maxLength={6} inputValue={pin_code} inputName="Pin_code" inputType="text" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <SelectGender className={`${!gender && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "Gender")} labelText="Gender" />
                                 <p className='text-color-red'>{genderError}</p>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText /* className={`${!adharcardnumber && (submitClicked) ? 'error' : ''}`} */ onChange={(e) => { addLoanDeatils(e.target.value, "AdharCardNumber"); setAdharCardNumber(e.target.value.replace(/[^0-9]/g, "")) }} labelText="Adhar Card Number" maxLength={12} inputValue={adharcardnumber} inputName="AdharCardNumber" inputType="text" />
                                 {/* <p className='text-color-red'>{AdharCardNumberError}</p> */}
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 {/* <InputText  className={`${!dob && (submitClicked) ? 'error' : ''}`}  onChange={(e) => setDob(e.target.value)} labelText="Date of Birth" inputName="Date of Birth" inputType="date" /> */}
                                 <InputText onChange={(e) => addLoanDeatils(e.target.value, "Date of Birth")} labelText="Date of Birth" inputName="Date of Birth" inputType="date" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText onChange={(e) => addLoanDeatils(e.target.value, "Email")} required labelText="Email" inputName="Email" inputType="text" />
                                 <p className="form-input-error" > {/* {emailError} */} </p>
                              </div>


                              {/* <div className="col-12 loanHead">
                                 <Checkbox className="enableref" labelText="Reference Person" checked={Enablereference == "yes" ? true : false} value={Enablereference == true ? "yes" : "no"} onChange={(e) => setEnablereference(e.target.value)} inputId="Enableperson" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!referencename && (submitClicked) ? 'error' : ''}`} onChange={(e) => addLoanDeatils(e.target.value, "ReferenceName")} labelText="ReferenceName" inputValue={referencename} inputName="Referencename" inputType="text" />

                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!referencephoneno && (submitClicked) ? 'error' : ''}`} onChange={(e) => { addLoanDeatils(e.target.value, "ReferencePhoneno"); setReferencephoneno(e.target.value.replace(/[^0-9]/g, "")) }} maxLength={10} labelText="ReferencePhoneno" inputValue={referencephoneno} inputName="ReferencePhoneno" inputType="text" />

                              </div> */}


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
                                    <button type="button" className="btn btn-primary " onClick={() => setDoc("")}> <i class="fa-solid fa-trash-can"></i></button>
                                 </div>

                              </div>
                           </div>
                        </div>
                     </div>


                     <div className="card">
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
                                       <Checkbox className="smsenable" labelText="Enable SMS Notification " checkBoxChecked={Enablesms == "yes" ? true : false} inputValue={Enablesms == "no" ? "yes" : "no"} onChange={(e) => setEnablesms(e.target.value)} inputId="Enablesmsnotification" />


                                    </div>


                                    {/* <div className='col-lg-12 mb-2'>

                                       <b className='me-2'>Loan Type: </b>

                                       <Radio className={`${!loanType && (submitLoanClicked) ? 'error' : ''}`} inputId="weekly" labelText="Weekly" radioChecked={loanType == "Weekly" ? true : false} onChange={() => { setLoanType("Weekly"); aclear(); handleError() }} />

                                    </div> */}
                                    {/* {loanType !== "" &&  */}
                                    <div className='col-lg-12 mb-2'>

                                       <b className='me-2'>Number Of Weeks: </b>

                                       <Radio className={`${!numberOfWeeks && (submitweeklyLoanClicked) ? 'error' : ''}`} inputId="6_Weeks" inputName="6 Weeks" labelText="6 Weeks" radioChecked={numberOfWeeks === "6" ? true : false} onChange={() => { handleSelectWeeklys("6"); checkboxfieldclear(); handleError(); checkClear() }} />
                                       <Radio className={`${!numberOfWeeks && (submitweeklyLoanClicked) ? 'error' : ''}`} inputId="12_Weeks" inputName="6 Weeks" labelText="12 Weeks" radioChecked={numberOfWeeks === "12" ? true : false} onChange={() => { handleSelectWeeklys("12"); checkboxfieldclear(); handleError(); checkClear() }} />

                                    </div>
                                    {/* // }  */}

                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!loanAmount && (submitLoanClicked) ? 'error' : ''}`} inputValue={loanAmount} inputDisable={numberOfWeeks == ""} labelText="Loan Amount" inputName="Loan Amount" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "Loan Amount"); setLoanAmount(e.target.value.replace(/[^0-9]/g, "")) }} />
                                       <p className='text-color-red'>{loanAmountError}</p>

                                    </div>
                                    {/* <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!interestAmount && (submitLoanClicked) ? 'error' : ''}`} inputDisable={numberOfWeeks == ""} labelText="Interest Amount" inputValue={interestAmount} inputName="Interest Amount" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "Interest Amount"); setInterestAmount(e.target.value.replace(/[^0-9]/g, "")) }} />
                                       <p className='text-color-red'>{interestAmountError}</p>

                                    </div> */}
                                    {/* {loanType == "Monthly" ?
                                       <div className="col-lg-4 col-md-6">
                                          <InputText className={`${!interest && (submitLoanClicked) ? 'error' : ''}`} labelText="Interest" inputValue={interest} inputName="Interest" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "Interest"); setInterest(e.target.value.replace(/[^0-9]/g, "")) }} />
                                          <p className='text-color-red'>{interestError}</p>

                                       </div> : ""} */}
                                    {/* <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!noOfDays && (submitLoanClicked) ? 'error' : ''}`} inputValue={noOfDays} inputDisable={numberOfWeeks == ""} labelText={loanType == "Weekly" ? "No of Weeks" : loanType == "Monthly" ? "No of Months" : "No of Days"} inputName="No of Days" inputType="text" onChange={(e) => { LoanDeatils(e.target.value, "No of Days"); setNoOfDays(e.target.value.replace(/[^0-9]/g, "")) }} />
                                       <p className='text-color-red'>{noOfdaysError}</p>

                                    </div> */}
                                    {/* {loanType == "Daily" || loanType == "weekly" ? */}

                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!perDayAmount && (submitLoanClicked) ? 'error' : ''}`} inputValue={perDayAmount} labelText="Due Amount Per Week" inputName="Due Amount" inputDisable={numberOfWeeks == ""} inputType="text" onChange={(e) => { LoanDeatils(e.target.value,"Due Amount"); setPerDayAmount(e.target.value.replace(/[^0-9]/g, "")) }} />
                                       <p className='text-color-red'>{perDayAmountError}</p>
                                    </div>
                                    {/* :<div className="col-lg-4 col-md-6">
                                          <InputText inputValue={monthlyCalculation == 'NaN' ? '0' : monthlyCalculation == 'infinity' ? '0' : monthlyCalculation} labelText={loanType == "Weekly" ? "Due Amount Per Week" : loanType == "Monthly" ? "Due Amount Per Month" : "Due Amount Per Day"} inputName="Due Amount" inputDisable inputType="number" onChange={(e) => setPerDayAmount(e.target.value)} />
                                        </div>} */}
                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!startDate && (submitLoanClicked) ? 'error' : ''}`} labelText="Start Date" inputName="Start Date" inputDisable={numberOfWeeks == ""} inputValue={startDate} inputType="date" onChange={(e) => { LoanDeatils(e.target.value, "Start Date"); updateEndDate(e.target.value) }} />
                                       <p className='text-color-red'>{startDateError}</p>

                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                       <InputText className={`${!endDate && (submitLoanClicked) ? 'error' : ''}`} labelText="End Date" inputName="End Date" inputDisable={numberOfWeeks == ""} inputType="date" inputValue={endDate} onChange={(e) => { LoanDeatils(e.target.value, "End Date") }} />
                                       <p className='text-color-red'>{endDateError}</p>

                                    </div >
                                    <div className="col-lg-4 col-md-6">
                                       <InputText labelText="Date" inputName="Date" inputDisable={numberOfWeeks == ""} inputType="date" inputValue={date} onChange={(e) => { { LoanDeatils(e.target.value, "Date"); setDate(e.target.value) } }} />
                                    </div>

                                    <div className="col-12 loanHead">
                                       {/* <h3>Loan {index+1}</h3> */}

                                       <input className="smsenable" type="checkbox" label="Reference Person" checked={editEnablesms == "yes" ? true : false} value={editEnablesms == "no" ? "yes" : "no"} onChange={(e) => { seteditEnablesms(e.target.value); checkClear() }} id="reference" />
                                       <label className="form-label"> Reference Person</label>
                                    </div>
                                    {editEnablesms === "yes" &&

                                       <div className="col-lg-4 col-md-6">
                                          <InputText className={`${!referencename && (submitWeeklyLoanClicked) ? 'error' : ''}`} onChange={(e) => { LoanDeatils(e.target.value,"ReferenceName"); setReferencename(e.target.value) }} id="RefinputId" labelText="ReferenceName" inputValue={referencename} inputName="Referencename" inputType="text" inputDisable={editEnablesms == "no"} />
                                          <p className='text-color-red'>{referencenameError}</p>

                                       </div>
                                    }
                                    {editEnablesms === "yes" &&
                                       <div className="col-lg-4 col-md-6">
                                          <InputText className={`${!referencephoneno && (submitWeeklyLoanClicked) ? 'error' : ''}`} onChange={(e) => { LoanDeatils(e.target.value, "ReferencePhoneno"); setReferencephoneno(e.target.value.replace(/[^0-9]/g, "")); }} maxLength={10} labelText="ReferencePhoneno" inputValue={referencephoneno} inputName="ReferencePhoneno" inputType="text" inputDisable={editEnablesms == "no"} />
                                          <p className='text-color-red'>{referencephonenoError}</p>
                                       </div>
                                    }



                                 </>
                              )}
                           </div >

                        </div >
                     </div >



                  </div >
               </div >

               <div className="form-group col-md-12">
                  <div className="col-sm-12 mt-4 text-center">
                     <button onClick={saveCustomer} disabled={saveCustomerFlag ? true : false}  className={saveCustomerFlag == true ? "btn btn-primary1" : "btn btn-primary" }><i class="fa-solid fa-floppy-disk"></i> Save</button>
                     <Link to="/weeklycustomers" className="btn btn-primary btn-cancel btn-outline"><span className=''> Cancel</span></Link>

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


export default WeeklyAddCustomer;