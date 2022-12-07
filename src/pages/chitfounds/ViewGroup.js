import React, { useState, useEffect } from 'react';
import { axiosObject } from '../../services/BaseService'
import Modal from 'react-bootstrap/Modal'
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputText, SelectGender, Checkbox, Radio } from '../../components/FormFields';
import { SelectStatus, StatusCheckbox } from '../../components/FormFields';
import { useSelector } from 'react-redux';
import ls from 'local-storage';
import DataTable from 'react-data-table-component';
import Loading from "../../components/Loading";
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import moment, { months } from "moment";



const ViewGroup = () => {

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)
   let navigate = useNavigate();
   const location = useLocation()
   const groupId = location.state.groupId;

   const [show, setShow] = useState(false);
   const [showSave, setShowSave] = useState(false);

   const [loading, setLoading] = useState(true);
   const [CustchitList, setCustchitList] = useState(true);

   const [popupTitle, setPopupTitle] = useState("");
   const [popupMsg, setPopupMsg] = useState("");
   const [popupType, setPopupType] = useState("");
   const [popupActionType, setPopupActionType] = useState("");
   const [popupActionValue, setPopupActionValue] = useState("");
   const [cnfrmShow, setCnfrmShow] = useState(false);
   const [popupActionPath, setPopupActionPath] = useState("");
   const [editChitId, setEditChitId] = useState("");
   const [custchitId, setCustChitID] = useState("");
   // const [EditChitcustId,setEditChitcustId] =useState("");
   let value = [];

   const [isOpen, setIsOpen] = useState(false);
   const togglePopup = () => {
      setIsOpen(!isOpen);
   }

   const handleClose2 = () => {
      setShowSave(false);
   }
   const handleShow2 = (data) => {
      setEditChitId(data.chit_id)
      // saveChitdetails(data);
      //  chitDetailsView(data);
      setShowSave(true);
      chitDetailsView(data);





   }
   const handleClose3 = () => setShow(false);
   const handleShow3 = (data) => {
      setShow(true);
      chitDetailsView(data);

   }
   const handleClose = () => setShowView(false);

   const handleShow = (data) => {
      //detailsView(data);     
      detailsView(data)
      setShowView(true);
      //getchitView(data);

      //   singleLoan(data);
      console.log(data.chit_id, "data.chit_id");

   }


   const [groupIdd, setGroupIdd] = useState("")
   const [commissionAmount, setCommissionAmount] = useState("")
   const [commissionPercentage, setCommissionPercentage] = useState("")

   const handleClose1 = () => setCnfrmShow(false);
   //console.log("======1====>",value)
   const handleShow1 = () => {
      console.log("======2====>", value)
      setCnfrmShow(true);

   }

   //  const[groupId,setGroupId] = useState("")
   const [totamt, setTotAmt] = useState("");
   const [totmonth, setTotMonth] = useState("");
   const [monthamt, setMonthAmt] = useState("");
   const [auctionDate, setAuctionDate] = useState("");
   const [custID, setCustID] = useState("");
   const [cusID, setCusID] = useState("");
   const [Customerid, setCustomerId] = useState("");
   const [perheadamount, setPerheadAmount] = useState("");
   const [perheadSave, setPerheadSave] = useState("");
   const [loading1, setLoading1] = useState(true);


   const [endDate, setEndDate] = useState("");

   const [balance, setBalance] = useState("");
   const [Mounthid, setMonthId] = useState("");
   const [grouplist, setGrouplist] = useState();
   const [chitlist, setChitlist] = useState();
   const [startMonth, setStartMonth] = useState();
   const [custInfo, setCustInfo] = useState("");
   const [grpInfo, setGrpInfo] = useState("");
   const [cuslist, setCuslist] = useState("");
   const [Custname, setCustName] = useState([]);
   const [Custname2, setCustName2] = useState("");
   const [showView, setShowView] = useState("");
   const [showedit, setShowedit] = useState("");

   const [chitViewList, setChitViewList] = useState("");


   const [Phoneno, setPhoneNo] = useState("");
   // const [row, setRow] = useState("");
   const [chitId, setChitId] = useState("");
   const [Gender, setGender] = useState("");
   const [monthId, setMonth_Id] = useState([]);
   const [amount, setAmount] = useState([]);
   const [Question, setQuestion] = useState("");
   const [custAmount, setCustAmount] = useState("");
   const [Balance, setBalence] = useState("");
   const [submitClicked, setSubmitClicked] = useState(false)
   const [loanCollList, setLoanCollList] = useState("");
   const [newChitView, setNewChitView] = useState("");
   const [ispaid, setIspaid] = useState("No");
   const [rowData, setRowData] = useState("");
   const [paidFlag, setPaidFlag] = useState(false);
   const [date, setDate] = useState([]);
   const [newPaidDate, setNewPaidDate] = useState("");
   const [header, setHeader] = useState("");
   const [CustEditChitID, setCustEditChitID] = useState("");
   const [CustChitIDList, setCustChitIDList] = useState([]);



   useEffect(() => {
      groupListView()
   }, [])

   const groupListView = () => {
      let request = {
         group_id: groupId,
         vendor_id: loginDetails[0].vendor_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token
      }
      axiosObject.post("chitGroupView/condition", request)

         .then((response) => {
            // console.log(response.data.data[0]); 
            setGrouplist(response.data.data[0]);
            setCustomerId(response.data.data[0].custList[0]?.customer_id)
            setMonthId(response.data.data[0].listmonth[0]?.group_id)
            setChitId(response.data.data[0].listmonth[0]?.chit_id)
            console.log("ChitId", response.data.data[0].listmonth[0]?.chit_id)
            setTotAmt(response.data.data[0]?.total_amount)
            setTotMonth(response.data.data[0]?.total_months)
            setGroupIdd(response.data.data[0]?.group_id)
            setCommissionPercentage(response.data.data[0]?.commission_percentage)
            setCommissionAmount(response.data.data[0]?.commission)
            setMonthAmt(response.data.data[0]?.monthly_amount)
            setAuctionDate(response.data.data[0]?.action_date)
            setStartMonth(response.data.data[0]?.start_months)
            setEndDate(response.data.data[0]?.end_months)
            setChitId(response.data.data[0].listmonth[0]?.chit_id)
            console.log("chit_id", chitId);
            setLoading(false);

            let dataArray = response.data.data[0].custList
            let monthArray = response.data.data[0].listmonth


            // await setGrouplist(response.data?.data);
            let groupNo = [];
            let groupName = [];
            let groupPhone = [];
            let groupGender = [];

            let group_No = [];
            let Month_Id = [];
            let Question = [];
            let Balence = [];

            let feesArr = dataArray.map((item) => {
               // groupNo.push(item.customer_id);
               groupPhone.push(item.phone_no);
               groupName.push(item.customer_name);
               groupGender.push(item.gender);
            });

            setCustID(groupNo);
            setCustName(groupName);
            setPhoneNo(groupPhone);
            setGender(groupGender);
            setCustInfo(dataArray)
            console.log("feesArr", feesArr)

            let grpArr = monthArray.map((item) => {
               // groupNo.push(item.customer_id);
               monthId.push(item.month_id);
               Question.push(item.question);
               Balence.push(item.balence);
               // groupPerhead.push(item.perhead_amount)
            });

            setCustID(group_No);
            setMonth_Id(Month_Id);
            setQuestion(Question);
            setBalence(Balence);
            //setPerhead(perhead_amount);
            setGrpInfo(monthArray)
            console.log("grpArr", grpArr)



            console.log("name", groupName)

            console.log("phone", groupPhone)

            console.log("gender", groupGender)


            console.log("custid", groupNo)



         });


   }




   const printCheck = (checkId, row) => {

      setCustChitIDList(document.getElementById(checkId).checked ? [...CustChitIDList, { ...{ "custchit_id": row.custchit_id }, ...{ "createdBy": row.createdBy }, ...{ "updatedBy": row.updatedBy } }] : CustChitIDList.filter(data => data.custchit_id !== row.custchit_id))
      const testPaidDate = document.getElementById(checkId).checked ? [...CustChitIDList, { ...{ "custchit_id": row.custchit_id }, ...{ "createdBy": row.createdBy }, ...{ "updatedBy": row.updatedBy } }] : CustChitIDList.filter(data => data.custchit_id !== row.custchit_id)
      console.log("====check testPaidDate====", testPaidDate);
      setRowData(testPaidDate)

   }

   const detailsView = (data) => {

      let request = {

         chit_id: data,
         vendor_id: loginDetails[0].vendor_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token
      }
      console.log(data, "data");

      axiosObject.post("mapCustomerView/condition", request)

         .then((response) => {
            setLoading1(false);
            setChitId(response.data.data[0].chit_id);

            setCustchitList(response.data.data);
            setHeader(response.data.count[0]);
            console.log("loandetailsview", response.data.data)

            setPerheadAmount(response.data.data[0]?.perhead_amount);
            setCustName(response.data.data?.customer_name);
            setIspaid(response.data.data?.ispaid);
            setCustChitID(response.data.data?.custchit_id)
            console.log("chit is", response.data.data);
            setLoading1(false);

            const paidDate = response.data.data?.filter(data => data.ispaid === "yes");
            setCustChitIDList(paidDate.map((data) => { return { "custchit_id": data.custchit_id, "createdBy": data.createdBy, "updatedBy": data.updatedBy } }));
            response.data.data?.map((data, index) => {
               if (data?.ispaid == "yes") {
                  document.getElementById(`checkboxId${index}`).checked = true
                  document.getElementById(`checkboxId${index}`).disabled = true


               }
               else {
                  document.getElementById(`checkboxId${index}`).checked = false

               }

            })
         });
   }



   const saveGroup = (e) => {

      console.log("saveGroup")
      setSubmitClicked(true);

      e.preventDefault();


      if (!Custname) {
         console.log("");
         return;
      }
      if (!Phoneno) {
         console.log("");
         return;
      }

      if (!Gender) {
         console.log("");
         return;
      }

      let request = {
         vendor_id: loginDetails[0].vendor_id,
         group_id: groupId,
         customer_name: Custname,
         phone_no: Phoneno,
         gender: Gender,
         status: "",
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      console.log("expensesEdit", request)

      {

         axiosObject.post("expensesEdit/update", request)
            .then((response) => {
               console.log("response.data.data", response.data.data)
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

   const columns = [

      {
         name: 'S.no',
         selector: (row, index) => index + 1,
         sortable: true,

      },
      {
         name: 'Customer Name',
         selector: row => row.customer_name,
         sortable: true,
      },
      {
         name: 'Phone',
         selector: row => row.phone_no,
         sortable: true,
      },
      {
         name: 'Gender',
         selector: row => row.gender,
         sortable: true,
      },


   ];


   const columnsss = [
      {
         name: 'CustChitId',
         selector: row => row.custchit_id,
         sortable: true,
      },

      {
         name: 'Customer Name',
         selector: row => row.customer_name,
         sortable: true,
      },
      {
         name: 'PerheadAmount',
         selector: row => row.perhead_amount,
         sortable: true,
      },


      {
         name: 'Action',
         className: "action",
         cell: (row, index, ispaid) => {
            console.log("check ID==", row);
            console.log("ispaid", ispaid);

            return (
               <div className='tableBtns emiTableActions'>
                  <StatusCheckbox className="smsenable" labelText="" inputId={`checkboxId${index}`} onClick={() => printCheck(`checkboxId${index}`, row)} />

               </div>
            );
         },
      }


   ];

   const dataaa = [
      {
         Sno: 1,
         customername: 'Rahul raj',
         amount: '1000',


      },
      {
         Sno: 2,
         customername: 'Gopinath',
         amount: '1000',

      },
      {
         Sno: 3,
         customername: 'Govind',
         amount: '1000',

      },
      {
         Sno: 4,
         customername: 'Rahul',
         amount: '1000',

      },
   ]

   const columnss = [
      {
         name: 'S.no',
         selector: (row, index) => index + 1,
         sortable: true,

      },

      {
         name: 'Month',
         selector: row => row.months,
         sortable: true,
      },
      {
         name: 'Question',
         selector: row => row.question,
         sortable: true,
      },
      {
         name: 'Balance',
         selector: row => row.balence,
         sortable: true,
      },

      {
         name: 'Per Head',
         selector: row => row.perhead_amount,
         sortable: true,
      },

      {
         name: 'Action',
         className: "action",
         sortable: false,

         cell: (row) => {
            return (

               <div className='tableBtns'>


                  {/* 
                  {row?.question == null || row?.balence == null || row?.perhead_amount == null ? */}

                  {/* <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow2(row)}>
                        <i class="fa-solid fa-floppy-disk"></i> Save
                     </button> :
                     <> */}
                  <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow(row.chit_id)}>
                     <i class="fa-solid fa-eye"></i> View
                  </button>
                  {/* <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow2()}>
                        <i class="fa-solid fa-pencil"></i>
                    </button> */}
                  {/*  </>} */}
                  {/* <button className="btn btn-primary btn-outline smallBtn"  onClick={() => handleShow(row.chit_id)}>
                        <i class="fa-solid fa-eye"></i>
                    </button> */}

                  {/* <button className="btn btn-primary btn-outline smallBtn" onClick={""}>
                      <i class="fas fa-save"></i>  
                    </button> */}
               </div>
            );
         },
      }

   ];

   const dataa = [
      {
         Sno: 1,
         month: 'January',
         question: '40000',
         balance: '60000',
         perhead: '6000',

      },
      {
         Sno: 2,
         month: 'Febraury',



      },
      {
         Sno: 3,
         month: 'March',



      },
      {
         Sno: 4,
         month: 'April',



      },
      {
         Sno: 5,
         month: 'May',


      },
      {
         Sno: 6,
         month: 'June',



      },
      {
         Sno: 7,
         month: 'July',



      },
      {
         Sno: 8,
         month: 'August',



      },
      {
         Sno: 9,
         month: 'September',



      },
      {
         Sno: 10,
         month: 'October',



      },
      {
         Sno: 11,
         month: 'November',



      },
      {
         Sno: 12,
         month: 'december',



      },

   ]


   const saveChitdetails = () => {
      setSubmitClicked(true);


      if (!Question) {
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
         chit_id: editChitId,
         question: Question,
         balence: balance,
         perhead_amount: perheadamount,
         group_id: groupIdd,
         commission: commissionAmount,
         commissionPercentage: commissionPercentage,
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }


      {

         axiosObject.post("chitDetailsEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {

                  togglePopup()
                  setPopupTitle("Edit Chit Details");
                  setPopupMsg("Chit Details Edited Successfully");
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
               console.log("====res===", response.data.success == true);

            });

      }



   }


   const chitDetailsView = (data) => {
      let request = {
         chit_id: data.chit_id,
         vendor_id: loginDetails[0].vendor_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      axiosObject.post("chitdetailsView/condition", request)

         .then((response) => {
            // console.log(response.data.data[0]);            
            setQuestion(response.data.data[0]?.question)
            setBalance(response.data.data[0]?.balence)
            setPerheadAmount(response.data.data[0]?.perhead_amount)


         });
   }
   const editChitDetView = (data) => {
      // console.log("====value=====.",CustChitIDList)
      let request = {
         custchitList: rowData,
         vendor_id: loginDetails[0].vendor_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      console.log("chitDetailsView", request)

      {
         axiosObject.post("mapCustomerEdit/update", request)
            .then((response) => {
               console.log("response.data.data", response.data.data)
               //  setCustChitID(response.data.data);
               if (response.data.success == true) {
                  togglePopup()
                  setPopupTitle("Chit Details");
                  setPopupMsg("Chit Details Updated Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");
                  // setPopupActionPath("/customers")


               }
               else {
                  togglePopup()
                  setPopupTitle("");
                  setPopupMsg(response.data.error.name);
                  setPopupType("error");
                  setPopupActionType("close");
                  setPopupActionValue("close");
               }
            });

      }
   }

   const handleEdit = (data) => {
      navigate("/editgroup", { state: { groupId: data } });
      console.log("groupId in view", data);
   }

   return (
      <div>

         <div id="wrapper">
            <Header />
            <Sidebar />
            {loading ? <Loading /> :

               <section id="content-wrapper" className='addCustomersPage'>
                  <div className="row">


                     <div className="col-6">
                        <h1 className='pageHead mt-2'>View Group {groupIdd}</h1>
                     </div>

                     <div className="col-6">
                     <a className="btn btn-primary btn-outline smallBtn float-end" onClick={()=>handleEdit(grouplist.group_id)}><i className="fa-solid fa-arrow-left"></i> <span className='label'> Edit</span></a>
                        
                        {/* <Link to="/editgroup" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Edit</span></Link> */}
                        <Link to="/chitfounds" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Back</span></Link>
                        <Link to="/reportschit" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Reports</span></Link>

                     </div>

                     <div className="col-12 mt-0 customerDetailsBlock">
                        <div className="card">
                           <div className="card-body">
                              <h2>Group Info</h2>
                              <div className="row mt-2">
                                 <div class="col-xxl-4 col-md-6 ">
                                    <p className="form-label">Group ID</p>
                                    <p className='form-value'>{groupIdd}</p>
                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label" >Total Amount</p>
                                    <p className='form-value'>{totamt}</p>

                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Total Month</p>
                                    <p className='form-value'>{totmonth}</p>

                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Monthly Amt</p>
                                    <p className='form-value'>{monthamt}</p>

                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Start Date</p>
                                    <p className='form-value'>{moment(startMonth).format("DD-MM-YYYY")}</p>

                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">End Date</p>
                                    <p className='form-value'>{moment(endDate).format("DD-MM-YYYY")}</p>

                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Auction Date</p>
                                    <p className='form-value'>{moment(auctionDate).format("DD-MM-YYYY")}</p>

                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Commission</p>
                                    <p className='form-value'>{commissionAmount}</p>

                                 </div>
                                 <div class="col-xxl-4 col-md-6">
                                    <p className="form-label">Commission Percentage</p>
                                    <p className='form-value'>{commissionPercentage}</p>

                                 </div>

                              </div>
                           </div>
                        </div>


                        <div className="card">
                           <div className="card-body">
                              <h2>Customers</h2>
                              <div className="row loansBlock">
                                 <div class="col-12 mt-0">
                                    <DataTable className='girdTable' highlightOnHover pagination columns={columns} data={custInfo} />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-12 mt-0 customerDetailsBlock">
                        <div className="card">
                           <div className="card-body">
                              <h2>Chit Details</h2>
                              <div className="row loansBlock">
                                 <div class="col-12 mt-0">
                                    <DataTable className='girdTable' highlightOnHover pagination columns={columnss} data={grpInfo} />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>}

         </div>

         <Modal size="lg" show={showSave} onHide={handleClose2}>

            <Modal.Header>
               <Modal.Title>
                  <h2>Edit Chit Details</h2>

               </Modal.Title>

               <h2 className='float-end'>Edit <span className='orangeText'> </span></h2>

            </Modal.Header>
            <Modal.Body>
               <div className="row mt-2">

                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!Question && (submitClicked) ? 'error' : ''}`} onChange={(e) => setQuestion(e.target.value)} labelText="Question" inputName="Question" inputType="text" />
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!balance && (submitClicked) ? 'error' : ''}`} onChange={(e) => setBalance(e.target.value)} labelText="balance" inputName="balance" inputType="text" />
                  </div>

                  <div className="col-lg-4 col-md-6">
                     <InputText className={`${!perheadamount && (submitClicked) ? 'error' : ''}`} onChange={(e) => setPerheadAmount(e.target.value)} labelText="Perheadamount" inputName="Perheadamount" inputType="text" />
                  </div>

               </div>
            </Modal.Body>
            <Modal.Footer>



               <div className="col-lg-12 text-center">
                  <button onClick={() => { saveChitdetails(); handleClose2() }} class="btn btn-primary">Save Details</button>
                  <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose2}>
                     Close
                  </button>
               </div>
            </Modal.Footer>
         </Modal>
         {/* <Modal size="lg" show={show} onHide={handleClose3}>

            <Modal.Header>
               <Modal.Title>
                  <h2>View Chit Details</h2>

               </Modal.Title>

               <h2 className='float-end'>View <span className='orangeText'> </span></h2>               


            </Modal.Header>
            <Modal.Body>
                <div className="row mt-2">
                             
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!Question && (submitClicked) ? 'error' : ''}`} onChange={(e) => setQuestion(e.target.value)} inputValue={Question} labelText="Question" inputName="Question" inputType="text" />
                                      </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!balance && (submitClicked) ? 'error' : ''}`} onChange={(e) => setBalance(e.target.value)} inputValue={balance} labelText="balance" inputName="balance" inputType="text" />
                              </div>                             
                                     
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!perheadamount && (submitClicked) ? 'error' : ''}`} onChange={(e) => setPerheadAmount(e.target.value)} inputValue={perheadamount} labelText="perheadamount" inputName="perheadamount" inputType="text" />
                              </div>              
                                
                             </div>
            </Modal.Body>
            <Modal.Footer>



               <div className="col-lg-12 text-center">
                                
                                 <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose3}>
                   Close 
               </button>
                              </div>
            </Modal.Footer>
         </Modal> */}
         <Modal size="lg" show={showView} onHide={handleClose}>
            <Modal.Header>

               <div className='loanAmt'><div className='float-start'>Month: <span> {header.months} </span> </div>  <div className='float-start'>Question: <span>{header.question}</span></div>
                  <div className='float-start'>Balance: <span> {header.balence} </span> </div><div className='float-start'>Paidcustomers: <span> {header.paid_customers} </span> </div>
                  <div className='float-start'>perheadamount: <span> {header.perhead_amount} </span> </div>
                  <div className='float-start'>Totalamount: <span> {header.total_amount} </span> </div>
                  <div className='float-start'>remainingamount: <span> {header.reaming_amount} </span> </div></div>


            </Modal.Header>
            <Modal.Body>

               {loading1 ? <Loading /> :

                  <DataTable  /* fixedHeader fixedHeaderScrollHeight="70vh" */ highlightOnHover className='girdTable' columns={columnsss} data={CustchitList} />}
            </Modal.Body>
            <Modal.Footer>
               {/* <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow1()}>
                  Save
               </button> */}

               <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                  Close
               </button>
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
               Are you sure do you want to save details
            </Modal.Body>
            <Modal.Footer>



               <button className="btn btn-primary btn-outline smallBtn" onClick={() => editChitDetView()}>
                  Save
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


export default ViewGroup;