import React, { useState, useEffect } from 'react';
import { axiosObject } from '../../services/BaseService'
import Header from "../../components/Header"
import Modal from 'react-bootstrap/Modal'
import Sidebar from "../../components/Sidebar"
import { InputText, SelectGender, Checkbox, Radio } from '../../components/FormFields';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import uploadFile from '../../assets/img/uploadfile.jpg'
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";
import EditExpense from './Editexpense';
import Loading from "../../components/Loading";
import moment from "moment";



const AddExpenses = () => {


   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)

   let navigate = useNavigate();
   // const [expId, setExpId] = useState("");
   const [expenseId, setExpenseId] = useState("");
   const [expensesId, setExpensesId] = useState("");
   const [name, setName] = useState("");
   const [remarks, setRemarks] = useState("");
   const [amount, setAmount] = useState("");
   const [dob, setDob] = useState("");
   const [submitClicked, setSubmitClicked] = useState(false)
   const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
   const [explist, setExplist] = useState("");
   const [count, setCount] = useState("");
   const [show, setShow] = useState(false);
   const [deleteData, setDeleteData] = useState("");
   const [amountError, setamountError] = useState("");
   const [dobError, setDobError] = useState("");
   const [remarksError, setRemarksError] = useState("");
   const [loading, setLoading] = useState(true);



   const [popupTitle, setPopupTitle] = useState("");
   const [popupMsg, setPopupMsg] = useState("");
   const [popupType, setPopupType] = useState("");
   const [popupActionType, setPopupActionType] = useState("");
   const [popupActionValue, setPopupActionValue] = useState("");
   const [cnfrmShow, setCnfrmShow] = useState(false);
   const [popupActionPath, setPopupActionPath] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const togglePopup = () => {
      setIsOpen(!isOpen);
   }

   const handleClose = () => setShow(false);
   const handleShow = (data) => {
      setShow(true);
      expensesListView(data);
   }
   const handleClose1 = () => setCnfrmShow(false);
   const handleShow1 = (data) => {
      setDeleteData(data)
      setCnfrmShow(true);
      console.log("handleShow1", data)
   }

   const saveCustomer = (e) => {
      setSubmitClicked(true);
      e.preventDefault();
      setamountError("")
      setDobError("")
      setRemarksError("")
      if (!dob) {
         console.log("");
         setDobError("Date is required")

         return;
      }

      if (!remarks) {
         console.log("");
         setRemarksError("Remarks is required")

         return;
      }


      if (!amount) {
         console.log("");
         setamountError("Amount is required")

         return;
      }




      let request = {
         vendor_id: loginDetails[0].vendor_id,
         date: dob,
         name: loginDetails[0].companyusername,
         amount: amount,
         remarks: remarks,
         status: "",
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token


      }



      {
         axiosObject.post("expensesAdd/add", request).then((response) => {
            console.log("resresponse.data.data", response.data.data)
            if (response.data.success == true) {
               togglePopup()

               setPopupTitle("Add Expenses");
               setPopupMsg("Expense Added Successfully");
               setPopupType("success");
               setPopupActionType("refresh");
               //setPopupActionType("close");
               setPopupActionValue("ok");
               expenseList()





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
   const expenseList = () => {

      let request = {
         vendor_id: loginDetails[0].vendor_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token
      }

      axiosObject.post("expensesList/condition", request)

         .then((response) => {
            console.log(response.data.data);
            setExplist(response.data.data);
            setCount(response.data.count[0].total_amount)
            setExpensesId(response.data.data[0]?.expenses_id.substring(3));
            console.log("??expenseList??", response.data.data[0]?.expenses_id.substring(3));
            setLoading(false);



         });

   }

   const ExpAmount = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setAmount(value);
   };
   const columns = [


      {
         name: 'S.No',
         selector: (row, index) => index + 1,
         sortable: true,
         maxWidth: "80px",

      },

      {
         name: 'Date',
         selector: row => row.date,
         sortable: true,
         minWidth: "120px",
      },
      {
         name: 'Name',
         selector: row => row.expenses_name,
         sortable: true,

      },

      {
         name: 'Remarks',
         selector: row => row.remarks,
         sortable: true,
         minWidth: "200px",

      },

      {
         name: 'Amount',
         selector: row => row.amount,
         sortable: true,
         minWidth: "120px",

      },
      {

         name: 'Action',
         className: "action",
         maxWidth: "160px",
         sortable: false,
         cell: (row) => {
            return (
               <div className='tableBtns'>
                  <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow(row.expenses_id)}>
                     <i class="fa-solid fa-pencil"></i>
                  </button>
                  <div className="float-end"> <button type="submit" className="btn btn-primary float-end m-0 smallBtn" onClick={() => handleShow1(row.expenses_id)}> <i class="fa-solid fa-trash-can"></i></button></div>



               </div>

            );
         },
      }

   ];


   useEffect(() => {

      expenseList()

   }, [])

   const DeleteExpense = (data) => {
      console.log(DeleteExpense)

      let request = {

         expenses_id: deleteData.slice(3),
         //expenses_id: data.expenses_id,
         user_id: loginDetails[0].user_id,
         vendor_id: loginDetails[0].vendor_id,
         token: loginDetails[0].token



      }
      console.log("DeleteExpense", request)


      {
         axiosObject.post("expensesDelete/update", request)
            .then((response) => {
               console.log("??resresponse.data.data??", response.data.data)
               if (response.data.success == true) {

                  togglePopup()
                  setPopupTitle("Delete Expenses");
                  setPopupMsg("Expenses Deleted Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  expenseList()
                  // handleShow1()

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

   const saveExpense = (e, data) => {

      console.log("saveExpense")
      setSubmitClicked(true);
      e.preventDefault();
      setamountError("")
      setDobError("")
      setRemarksError("")

      if (!dob) {
         console.log("");
         setDobError("Date is required")

         return;
      }

      if (!remarks) {
         console.log("");
         setRemarksError("Remarks is required")

         return;
      }


      if (!amount) {
         console.log("");
         setamountError("Amount is required")

         return;
      }

      let request = {
         vendor_id: loginDetails[0].vendor_id,
         expenses_id: JSON.parse(expenseId),
         date: dob,
         name: name,
         amount: JSON.parse(amount),
         remarks: remarks,
         status: "",
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      console.log("expensesEdit===", request)

      {

         axiosObject.post("expensesEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {


                  togglePopup()
                  setPopupTitle("Edit Expenses");
                  setPopupMsg("Expenses Edited Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");

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


   useEffect(() => {

      expenseList()

   }, [])

   const expensesListView = (data) => {

      let request = {
         expenses_id: data.slice(3),
         user_id: loginDetails[0].user_id,
         vendor_id: loginDetails[0].vendor_id,
         token: loginDetails[0].token
      }
      axiosObject.post("expensesView/condition", request)

         .then((response) => {
            //console.log("=========1=====",response.data.data[0]);                     
            setDob(response.data.data[0]?.date)
            setName(response.data.data[0]?.expenses_name)
            setRemarks(response.data.data[0]?.remarks)
            setAmount(response.data.data[0]?.amount)
            setExpenseId(response.data.data[0]?.expenses_id)

         });
   }

   return (
      <div>

         <div id="wrapper">
            <Header />
            <Sidebar />
            {loading ? <Loading /> :

               <section id="content-wrapper" className='addCustomersPage'>
                  <div className="col-6">
                     <h1 className='pageHead mt-2'>Add New Expenses</h1>
                  </div>

                  <div className="col-12 mt-0 customerDetailsBlock">
                     <div className="card">
                        <div className="card-body">
                           <h2>Expenses Info</h2>
                           <div className="row mt-2">
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!dob && (submitClicked) ? 'error' : ''}`} onChange={(e) => setDob(e.target.value)} labelText="Date" inputName="Date" inputType="date" placeholder={"DD-MM-YYYY"} />
                                 <p className='text-color-red'>{dobError}</p>

                              </div>
                              {/* <div className="col-lg-3 col-md-6">
                                 <InputText className={`${!name && (submitClicked) ? 'error' : ''}`} onChange={(e) => setName(e.target.value)} labelText="Name" inputName="name" inputType="text" />
                              </div> */}
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!remarks && (submitClicked) ? 'error' : ''}`} onChange={(e) => setRemarks(e.target.value)} labelText="Remarks" inputName="Remarks" inputType="text" />
                                 <p className='text-color-red'>{remarksError}</p>

                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!amount && (submitClicked) ? 'error' : ''}`} onChange={ExpAmount} inputValue={amount} labelText="Amount" inputName="Amount" inputType="text" id="exp" />
                                 <p className='text-color-red'>{amountError}</p>

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="form-group col-md-12">
                     <div className="col-sm-12 mt-4 text-center">
                        <button onClick={saveCustomer} className="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Submit</button>
                        <button className="btn btn-primary btn-cancel btn-outline"> Cancel</button>
                     </div>

                  </div>

                  <div className="col-12 mt-2 customerDetailsBlock">





                     <div class="card">
                        <h3 className='overallExpense'>Overall Expenses:<span className='orangeText'> <span class="rupee">₹</span>{count}</span></h3>
                        <div class="card-body">
                           <h2>Expenses Details</h2>
                           <div className="fixedLastCol">
                              <DataTable className='girdTable' pagination highlightOnHover columns={columns} data={explist} />
                           </div>
                        </div>

                     </div>

                  </div>



               </section>}


         </div>

         <Modal size="lg" show={show} onHide={handleClose}>

            <Modal.Header>
               <Modal.Title>
                  <h2>Edit Expenses Details</h2>

               </Modal.Title>

               <h2 className='float-end'>Edit <span className='orangeText'> </span></h2>



            </Modal.Header>
            <Modal.Body>
               <div className="row mt-2">
                  <div className="col-lg-4 col-md-6">
                     <InputText onChange={(e) => setDob(e.target.value)} inputDisable inputValue={moment(dob).format("DD-MM-YYYY")} labelText="CreatedAt" inputName="CreatedAt" inputType="text" />
                     <p className='text-color-red'>{dobError}</p>

                  </div>
                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!name && (submitClicked) ? 'error' : ''}`} onChange={(e) => setName(e.target.value)} inputValue={name} labelText="Name" inputName="Name" inputType="text" />
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!remarks && (submitClicked) ? 'error' : ''}`} onChange={(e) => setRemarks(e.target.value)} inputValue={remarks} labelText="remarks" inputName="remarks" inputType="text" />
                     <p className='text-color-red'>{remarksError}</p>

                  </div>
                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!amount && (submitClicked) ? 'error' : ''}`} onChange={ExpAmount} inputValue={amount} labelText="Amount" inputName="Amount" inputType="text" />
                     <p className='text-color-red'>{amountError}</p>

                  </div>


               </div>
            </Modal.Body>
            <Modal.Footer>



               <div className="col-lg-12 text-center">
                  <button onClick={saveExpense} class="btn btn-primary">Save Details</button>
                  <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                     Close
                  </button>
               </div>
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
               Are you sure do you want to delete
            </Modal.Body>
            <Modal.Footer>




               <button className="btn btn-primary btn-outline smallBtn" /* onClick={DeleteExpense} */ onClick={() => { DeleteExpense(); handleClose1() }}>
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
      </div >



   )
}


export default AddExpenses;