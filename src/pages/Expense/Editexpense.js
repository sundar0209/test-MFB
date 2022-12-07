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


const Editexpense = (props) => {


   let navigate = useNavigate();
   const location = useLocation()   
   
   const expense = () => {
      navigate("/Addexpense");
       }

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)
   const expenseId = location.state.expenseId;
   const [name,setName] =useState("");
   const [expId,setExpId] =useState("")
   const [remarks, setRemarks] = useState("");
   const [amount, setAmount] = useState("");
   const [dob, setDob] = useState("");
   const [submitClicked, setSubmitClicked] = useState(false)
   const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
   const [explist,setExplist] =useState("");
   const [count,setCount] =useState("");  

   
   const [popupTitle, setPopupTitle] = useState("");
   const [popupMsg, setPopupMsg] = useState("");
   const [popupType, setPopupType] = useState("");
   const [popupActionType, setPopupActionType] = useState("");
   const [popupActionValue, setPopupActionValue] = useState("");
   const [popupActionPath, setPopupActionPath] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const [isClose, setIsClose] = useState(false);
   const [status, setStatus] = useState("");
      
   
  const togglePopup = () => {
      setIsOpen(!isOpen);
   }

   const loanTogglePopup = () => {
      setIsClose(!isClose);
   }
   

      // const editexpense = () => {
                                              
     const saveExpense = (e) => {
      setSubmitClicked(true);
      e.preventDefault();

      if (!name) {
         console.log("");
         return;
      }
              
        if (!remarks) {
         console.log("");
         return;
      }
      if (!Date) {
         console.log("");
         return;
      }

      if (!amount) {
         console.log("");
         return;
      }

      let request = {
         vendor_id:  loginDetails.vendor_id,
         expenses_id: expenseId.substring(3),
         date: dob,
         name: name,
         amount: amount,
         remarks: remarks,
         status: "",
         isactive: 1,
         createdBy: loginDetails.user_id,
         updatedBy: loginDetails.user_id,

      }

          {
         axiosObject.post("expensesEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {


                  loanTogglePopup()
                  setPopupTitle("Edit Expenses");
                  setPopupMsg("Expenses Edited Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  // setPopupActionPath("/customers")
                  // clsData(response.data.data)
                  //handleClose()
               }
               else {
                  loanTogglePopup()
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
            name: 'S.No',
            selector: (row, index) => index + 1
        },
        {
         name: 'Date',
          selector: row => row.date,
      },
      {
         name: 'Name',
          selector: row => row.name,
      },

      {
         name: 'Remarks',
          selector: row => row.remarks,
      },

      {
         name: 'Amount',
          selector: row => row.amount,
      },
        
         ];
     
      

      useEffect(() => {
      
     expenseList()

      }, [])
   
   const expenseList = () => {
      let request = {
         expenses_id: expenseId.substring(3)
      }
    axiosObject.post("expensesView/condition", request)

         .then((response) => {
            // console.log(response.data.data[0]);            
           setExpId(response.data.data);
            setDob(response.data.data[0]?.date)
            setName(response.data.data[0]?.name)
            setRemarks(response.data.data[0]?.remarks)
            setAmount(response.data.data[0]?.amount)         
         

         });
   }

   return (
      <div>
         <div id="wrapper">
            <Header />
            <Sidebar />
            <section id="content-wrapper" className='editExpensesPage'>
               <div className="row">                  
                  <div className="col-6">
                     <h1 className='pageHead mt-2'>Edit Expense </h1>
                  </div>

                     <div className="col-12 mt-0 customerDetailsBlock">
                     <div className="card">
                        <div className="card-body">
                           <h2>Expenses Info</h2>
                           <div className="row mt-2">
                              <div className="col-lg-4 col-md-6">
                                 <InputText onChange={(e) => setDob(e.target.value)} inputValue={dob} labelText="Date of Birth" inputName="Data of Birth" inputType="date" />
                              </div>  
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!name && (submitClicked) ? 'error' : ''}`} onChange={(e) => setName(e.target.value)} inputValue={name} labelText="Name" inputName="Name" inputType="text" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!remarks && (submitClicked) ? 'error' : ''}`} onChange={(e) => setRemarks(e.target.value)} inputValue={remarks} labelText="remarks" inputName="remarks" inputType="text" />
                                      </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!amount && (submitClicked) ? 'error' : ''}`} onChange={(e) => setAmount(e.target.value)} inputValue={amount} labelText="Amount" inputName="Amount" inputType="text" />
                              </div>                             
                                                 
                                <div className="col-lg-12 text-center">
                                 <button onClick={saveExpense} class="btn btn-primary">Save Details</button>
                              </div>
                             </div>
                        </div>

                      </div>

                  </div>
               </div>
              
            </section>
       
         </div>

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

         {isClose &&
            <CommonPopup
               handleClose={loanTogglePopup}
               popupTitle={popupTitle}
               popupMsg={popupMsg}
               popupType={popupType}
               popupActionType={popupActionType}
               popupActionValue={popupActionValue}
               popupActionPath={popupActionPath}
            />}

      </div>

   )
         }
      


export default Editexpense;