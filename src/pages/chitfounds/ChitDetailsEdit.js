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
import Loading from "../../components/Loading";


const ChitDetailsEdit = () => {

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)

   let navigate = useNavigate();
   const [expId, setExpId] = useState("");
   const [perheadamount, setPerheadAmount] = useState("");
   const [question, setQuestion] = useState("");
   const [balance, setBalance] = useState("");
   const [groupIdd, setGroupId] = useState("");
   const [submitClicked, setSubmitClicked] = useState(false)
   const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
   const [show, setShow] = useState(false);
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
      chitDetailsView(data);
      // console.log(data.loan_id, "data.loan_id");cd
   }


   const saveChitdetails = (e) => {
      console.log("saveChitdetails")
      setSubmitClicked(true);
      e.preventDefault();

      if (!question) {
         console.log("");
         return;
      }

      if (!balance) {
         console.log("");
         return;
      }
      if (!perheadamount) {
         console.log("");
         return;
      }

      let request = {
         vendor_id: loginDetails[0].vendor_id,
         chit_id: expId,
         question: question,
         balence: balance,
         perhead_amount: perheadamount,
         group_id: groupIdd,
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      console.log("chitDetailsEdit/update", request)

      {

         axiosObject.post("expensesEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {


                  togglePopup()
                  setPopupTitle("Edit ChitDetails");
                  setPopupMsg("ChitDetails Edited Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  // setPopupActionPath("/customers")
                  // clsData(response.data.data)
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

      chitDetailsView()

   }, [])

   const chitDetailsView = () => {
      let request = {
         expenses_id: expId,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token
      }
      axiosObject.post("chitdetailsView/condition", request)

         .then((response) => {
            // console.log(response.data.data[0]);            
            setQuestion(response.data.data[0]?.date)
            setBalance(response.data.data[0]?.name)
            setPerheadAmount(response.data.data[0]?.remarks)


         });
   }

   return (
      <div>

         <div id="wrapper">
            <Header />
            <Sidebar />


            <section id="content-wrapper" className='addCustomersPage'>
               <div className="col-6">
                  <h1 className='pageHead mt-2'>Add New Expenses</h1>
               </div>

               <div className="col-12 mt-0 customerDetailsBlock">
                  <div className="card">
                     <div className="card-body">
                        <h2>Expenses Info</h2>

                     </div>
                  </div>



               </div>


            </section>


         </div>

         <Modal size="lg" show={show} onHide={handleClose}>

            <Modal.Header>
               <Modal.Title>
                  <h2>Edit Expenses Details</h2>

               </Modal.Title>

               <h2 className='float-end'>Edit <span className='orangeText'> </span></h2>


               {/* <div className='loanAmt'><div className='float-start'>Amount: <span>80000/100000 </span> </div>  <div className='float-end'>Days: <span>80/100</span></div></div> */}

            </Modal.Header>
            <Modal.Body>
               <div className="row mt-2">

                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!perheadamount && (submitClicked) ? 'error' : ''}`} onChange={(e) => setPerheadAmount(e.target.value)} inputValue={perheadamount} labelText="Name" inputName="Name" inputType="text" />
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!question && (submitClicked) ? 'error' : ''}`} onChange={(e) => setQuestion(e.target.value)} inputValue={question} labelText="remarks" inputName="remarks" inputType="text" />
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!balance && (submitClicked) ? 'error' : ''}`} onChange={(e) => setBalance(e.target.value)} inputValue={balance} labelText="Amount" inputName="Amount" inputType="text" />
                  </div>


               </div>
            </Modal.Body>
            <Modal.Footer>



               <div className="col-lg-12 text-center">
                  <button onClick={saveChitdetails} class="btn btn-primary">Save Details</button>
                  <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                     Close
                  </button>
               </div>
            </Modal.Footer>
         </Modal>


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
      </div>



   )
}


export default ChitDetailsEdit;