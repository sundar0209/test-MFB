import React, { useState, useEffect } from 'react';
import { axiosObject } from '../../services/BaseService'
import Modal from 'react-bootstrap/Modal'
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { InputText, SelectGender, Checkbox, Radio } from '../../components/FormFields';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ls from 'local-storage';
import DataTable from 'react-data-table-component';
import Select from 'react-select'
import Loading from "../../components/Loading";
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import { SelectStatus, StatusCheckbox } from '../../components/FormFields';




const EditGroup = (props) => {

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)

   let navigate = useNavigate();
   const location = useLocation()
   const groupId = location.state.groupId;
   console.log("groupId", groupId)

   const [loading, setLoading] = useState(true);
   const [showSave, setShowSave] = useState(false);

   const [totamt, setTotAmt] = useState("");
   const [totmonth, setTotMonth] = useState("");
   const [monthamt, setMonthAmt] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [auctionDate, setAuctionDate] = useState("");
   const [custInfo, setCustInfo] = useState("");
   const [groupID, setGroupID] = useState();
   const [grouplist, setGrouplist] = useState();

   const [balance, setBalance] = useState("");
   const [commission, setCommission] = useState("");
   const [Mounthid, setMonthId] = useState("");
   const [chitlist, setChitlist] = useState();
   const [startMonth, setStartMonth] = useState();
   const [grpInfo, setGrpInfo] = useState("");
   const [cuslist, setCuslist] = useState("");
   const [Custname, setCustName] = useState([]);
   const [Custname2, setCustName2] = useState("");

   const [Phoneno, setPhoneNo] = useState("");
   const [chitId, setChitId] = useState("");
   const [mapId, setMapId] = useState("");
   const [Gender, setGender] = useState("");
   const [monthId, setMonth_Id] = useState([]);
   const [Customerid, setCustomerId] = useState("");
   const [custID, setCustID] = useState("");
   const [lcustid, setLcustid] = useState("");
   const [lmapid, setLmapid] = useState("");
   const [perheadamount, setPerheadAmount] = useState("");
   const [showedit, setShowedit] = useState("");
   const [CustChitID, setCustChitID] = useState("");
   const [CustChitIDList, setCustChitIDList] = useState("");



   const [amount, setAmount] = useState([]);
   const [Question, setQuestion] = useState(0);
   const [Balance, setBalence] = useState("");
   const [submitClicked, setSubmitClicked] = useState(false)
   const [cusSalesId, setCusSalesId] = useState("");
   const [cusSelectedSalesId, setCusSelectedSalesId] = useState("");
   const [SalesList, setSalesList] = useState("");
   const [Custcount, setCustcount] = useState("");
   const [showView, setshowView] = useState("");
   const [rowData, setRowData] = useState("");
   // const [showView1, setshowView1] = useState("");
   const [header, setHeader] = useState("");

   const [CustchitList, setCustchitList] = useState(true);
   const [Ispaid, setIspaid] = useState(true);




   const [editChitId, setEditChitId] = useState("");
   const [popupTitle, setPopupTitle] = useState("");
   const [popupMsg, setPopupMsg] = useState("");
   const [popupType, setPopupType] = useState("");
   const [popupActionType, setPopupActionType] = useState("");
   const [popupActionValue, setPopupActionValue] = useState("");
   const [cnfrmShow, setCnfrmShow] = useState(false);
   const [popupActionPath, setPopupActionPath] = useState("");
   const [show, setShow] = useState(false);

   const [isOpen, setIsOpen] = useState(false);
   const togglePopup = () => {
      setIsOpen(!isOpen);
   }

   const handleClose2 = () => setShowSave(false);
   const handleShow2 = (data) => {
      console.log("data.chit_id",data);
      setEditChitId(data)
      setShowSave(true);

   }
   const handleClose1 = () => setCnfrmShow(false);
   //console.log("======1====>",value)
   const handleShow1 = () => {
      //console.log("======2====>",value)
      setCnfrmShow(true);

   }
   const handleClose3 = () => setShowedit(false);
   const handleShow3 = (data) => {
      setShowedit(true);
      chitDetailsView(data);
   }

   const handleClose = () => setShow(false);
   const handleShow = (data) => {
      setShow(true);
      customerlist(data);
      customerListDetails(data);
      console.log(data.map_id, "data.map_id");
   }

   const handleClose4 = () => setshowView(false);

   const handleShow4 = (data) => {
      detailsView(data)
      setshowView(true);
      console.log(data.chit_id, "data.chit_id");

   }

   const calculationn = Math.round((Number(totamt) - Number(Question)))
   // const calculationn1 = Math.round((Number(calculationn) + Number(commission)))
   //const totcalculation = Math.round((Number(calculationn1) / Number(Custcount)))
   const totcalculation = Math.round((Number(calculationn) + Number(commission)) / Number(Custcount))


   //console.log("calculationn1",calculationn1);
   console.log("totcalculation", totcalculation);
   console.log("totcalculation balance", calculationn);





   const customerlist = (data) => {
      let request = {
         map_id: data,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token,
         vendor_id: loginDetails[0].vendor_id,

      }
      axiosObject.post("groupcustView/condition", request)

         .then((response) => {
            console.log(response.data.data[0]);
            setLmapid(response.data.data[0].map_id)
            console.log(response.data.data[0]);
            console.log(response.data.data[0]);
            console.log(response.data.data[0]);


         });
   }


   const editCustomer = (data) => {

      let request = {

         map_id: lmapid,
         customer_id: cusSelectedSalesId.customer_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token


      }

      {
         axiosObject.post("groupCustomerEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {

                  handleClose()
                  togglePopup()
                  setPopupTitle("Edit Chitcustomer");
                  setPopupMsg("Chitcustomer Edited Successfully");
                  setPopupType("success");
                  setPopupActionType("refresh");
                  setPopupActionValue("ok");

               }
               else {
                  handleClose()
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

   const detailsView = (data) => {
      let request = {
         chit_id: data,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token,
         vendor_id: loginDetails[0].vendor_id,

      }
      console.log(data, "data");

      axiosObject.post("mapCustomerView/condition", request)

         .then((response) => {
            //setLoading1(false);
            setChitId(response.data.data[0].chit_id);
            setCustchitList(response.data.data);
            setHeader(response.data.count[0]);
            console.log("loandetailsview", response.data.count[0])

            setPerheadAmount(response.data.data[0]?.perhead_amount);
            setCustName(response.data.data?.customer_name);
            setIspaid(response.data.data?.ispaid);
            setCustChitID(response.data.data?.custchit_id)
            console.log("chit is", response.data.data);
            //editChitDetView(response.data.data[0]?.custchit_id)
            //setLoading1(false);

            const paidDate = response.data.data?.filter(data => data.ispaid === "yes");
            //setCustEditChitID(paidDate.map((data) => { return { "custchit_id":data.custchit_id}}));
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


   const customerListDetails = (data) => {
      let request = {
         group_id: data,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token
      }
      axiosObject.post("groupCustList/condition", request).then(response => {

         console.log("customerList Details response", response.data.data)
         setSalesList(response.data.data);




      });
   }

   const saveChitdetails = (data) => {

      setSubmitClicked(true);


      if (!Question) {
         console.log("");
         return;
      }

      if (!calculationn) {
         console.log("");
         return;
      }
      if (!commission) {
         console.log("");
         return;
      }
      if (!totcalculation) {
         console.log("");
         return;
      }

      let request = {

         chit_id: editChitId,
         question: Question,
         balence: calculationn,
         commission: commission,
         perhead_amount: totcalculation,
         group_id: groupId,
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
console.log("=??=??=",request);

      {

         axiosObject.post("chitDetailsEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {
                  setShowSave(false);
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

            });

      }

   }

   const chitDetailsView = (data) => {
      let request = {

         vendor_id: loginDetails.vendor_id,
         chit_id: data.chit_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      axiosObject.post("chitdetailsView/condition", request)

         .then((response) => {
            // console.log(response.data.data[0]);            
            setQuestion(response.data.data[0]?.question)
            setBalance(response.data.data[0]?.balence)
            setCommission(response.data.data[0]?.commission)
            setPerheadAmount(response.data.data[0]?.perhead_amount)


         });
   }



   const groupListView = () => {

      let request = {
         group_id: groupId,
         user_id: loginDetails[0].user_id,
         vendor_id: loginDetails[0].vendor_id,
         token: loginDetails[0].token
      }

      axiosObject.post("chitGroupView/condition", request)

         .then((response) => {
            // console.log(response.data.data[0]); 
            setGrouplist(response.data.data);
            // setCustomerId(response.data.data[0].custList[0]?.customer_id)
            setMapId(response.data.data[0].custList[0]?.map_id)
            setMonthId(response.data.data[0].listmonth[0]?.group_id)
            setChitId(response.data.data[0].listmonth[0]?.chit_id)
            console.log("ChitId", response.data.data[0].listmonth[0]?.chit_id)
            setTotAmt(response.data.data[0]?.total_amount)
            setCustcount(response.data.data[0]?.cust_count)
            console.log("cust===>", response.data.data[0]?.cust_count);
            setTotMonth(response.data.data[0]?.total_months)
            setGroupID(response.data.data[0]?.group_id)
            setMonthAmt(response.data.data[0]?.monthly_amount)
            setAuctionDate(response.data.data[0]?.action_date)
            setStartDate(response.data.data[0]?.start_months)
            setEndDate(response.data.data[0]?.end_months)
            setChitId(response.data.data[0].listmonth[0]?.chit_id)
            console.log("chit_id", chitId);
            //setLoading(false);

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


            // setCustID(response.data.data[0].custList[0].customer_id) 
            //  setCustName(response.data.data[0].custList[0].customer_name)
            console.log("name", groupName)
            // setPhoneNo(response.data.data[0].custList[0].phone_no)
            console.log("phone", groupPhone)
            //   setGender(response.data.data[0].custList[0].gender)
            console.log("gender", groupGender)
            //setCustInfo(response.data.data.custList.map((data) => { return { "label": data.customer_name + " " + data.phone_no + " " + data.gender, "value": data.customer_id.toString() } }));

            console.log("custid", groupNo)



         });
   }
   const printCheck = (checkId, row) => {
      // console.log("========check?",row,{ ...{"custchit_id":row.custchit_id}, ...{"createdBy":row.createdBy}, ...{"updatedBy":row.updatedBy}})
      setCustChitIDList(document.getElementById(checkId).checked ? [...CustChitIDList, { ...{ "custchit_id": row.custchit_id }, ...{ "createdBy": row.createdBy }, ...{ "updatedBy": row.updatedBy } }] : CustChitIDList.filter(data => data.custchit_id !== row.custchit_id))
      const testPaidDate = document.getElementById(checkId).checked ? [...CustChitIDList, { ...{ "custchit_id": row.custchit_id }, ...{ "createdBy": row.createdBy }, ...{ "updatedBy": row.updatedBy } }] : CustChitIDList.filter(data => data.custchit_id !== row.custchit_id)
      console.log("====check testPaidDate====", testPaidDate);
      setRowData(testPaidDate)
   }
   const columns1 = [

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
      {

         name: 'Action',
         className: "action",
         sortable: false,
         cell: (row) => {
            return (
               <div className='tableBtns'>
                  <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow(row.map_id)} >
                     <i class="fa-solid fa-pencil"></i>
                  </button>
               </div>

            );
         },
      }

   ];

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

                  {row?.question == null || row?.balence == null || row?.perhead_amount == null || row.commission == null ?
                     

                        <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow2(row.chit_id)}>
                           <i class="fa-solid fa-pencil"></i> Save
                        </button>:
                        <>
                     <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow4(row.chit_id)}>
                        <i class="fa-solid fa-eye"></i> View
                     </button> 

                     </>}                 

                        
               </div>
            );
         },
      }

   ];

   const columnsss = [
      {
         name: 'ChitId',
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
            console.log("index", index);
            console.log("ispaid", ispaid);

            return (
               <div className='tableBtns emiTableActions'>
                  <StatusCheckbox className="smsenable" labelText="" inputId={`checkboxId${index}`} onClick={() => printCheck(`checkboxId${index}`, row)} />

               </div>
            );
         },
      }


   ];
   const editChitDetView = () => {
      console.log("====value=====.", CustChitIDList)
      let request = {
         custchitList: rowData,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }

      console.log("chitDetailsView", request)

      {
         axiosObject.post("mapCustomerEdit/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
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

   const DeleteCustomer = (data) => {

      let request = {

         map_id: data,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token

      }
      console.log("loanDelete request", request)
      {
         axiosObject.post("chitCustDelete/update", request)
            .then((response) => {
               console.log("resresponse.data.data", response.data.data)
               if (response.data.success == true) {

                  togglePopup()
                  setPopupTitle("Delete Customer");
                  setPopupMsg("Customer Deleted Successfully");
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
                  setPopupTitle("Error");
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
         name: 'Name',
         selector: row => row.name,
         sortable: true,

      },

      {
         name: 'Phone',
         selector: row => row.phone,
         sortable: true,

      },

      {
         name: 'Address',
         selector: row => row.address,
         sortable: true,

      },


   ];


   useEffect(() => {
      groupListView()

   }, [])



   const handleOnchange = (val) => {
      var numberArray = val;
      custInfo(numberArray);
      console.log("numberArray", numberArray);
      console.log(" numberArray val", val);


   }


   const handleBuyerId = (e) => {
      setCusSalesId(e.target.value);
      console.log("=========check", e.target.value);
      setCusSelectedSalesId(
         SalesList.filter((data) => data.customer_id == e.target.value)[0]
      );
      console.log("=========check", SalesList.filter((data) => data.customer_id == e.target.value)[0]
      );
   };




   return (
      <div>

         <div id="wrapper">
            <Header />
            <Sidebar />


            <section id="content-wrapper" className='addCustomersPage'>
               <div className="row">

                  <div className="col-6">
                     <h1 className='pageHead mt-2'>Edit Group {groupId} </h1>
                  </div>
                  <div className="col-6">
                     <Link to="/chitfounds" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Back</span></Link>
                     <Link to="/reportschit" className="btn btn-primary btn-outline smallBtn float-end"><i className="fa-solid fa-arrow-left"></i> <span className='label'> Reports</span></Link>

                  </div>
                  <div className="col-12 mt-0 customerDetailsBlock">
                     <div className="card">
                        <div className="card-body">
                           <h2>Group Info</h2>
                           <div className="row mt-2">

                              <div className="col-lg-4 col-md-6">
                                 <InputText inputDisable labelText="Group ID" inputValue={groupID} inputName="Customer" inputType="text" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!totamt && (submitClicked) ? 'error' : ''}`} onChange={(e) => setTotAmt(e.target.value)} inputValue={totamt} inputDisable labelText="Total Amount" inputName="Total Amount" inputType="number" />

                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!totmonth && (submitClicked) ? 'error' : ''}`} onChange={(e) => setTotMonth(e.target.value)} inputValue={totmonth} defaultValue inputDisable labelText="Total Month" inputName="Total Month" inputType="number" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!monthamt && (submitClicked) ? 'error' : ''}`} onChange={(e) => setMonthAmt(e.target.value)} inputValue={monthamt} inputDisable labelText="Monthly Amount" inputName="Monthly Amount" inputType="number" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!startDate && (submitClicked) ? 'error' : ''}`} onChange={(e) => setStartDate(e.target.value)} inputValue={startDate} inputDisable labelText="Start Date" inputName="Start Date" inputType="date" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!endDate && (submitClicked) ? 'error' : ''}`} onChange={(e) => setEndDate(e.target.value)} inputValue={endDate} inputDisable labelText="End Date" inputName="End Date" inputType="date" />
                              </div>

                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!auctionDate && (submitClicked) ? 'error' : ''}`} onChange={(e) => setAuctionDate(e.target.value)} inputValue={auctionDate} inputDisable labelText="Auction Date" inputName="Action Date" inputType="date" />
                              </div>

                           </div>
                        </div>
                     </div>


                     <div className="card">
                        <div className="card-body">
                           <h2>Customers List</h2>
                           <div className="row loansBlock">
                              <div class="col-12 mt-0">
                                 <DataTable className='girdTable' highlightOnHover pagination columns={columns1} data={custInfo} />
                              </div>
                              {/* <div className="col-lg-9 col-md-6">
                              <div className="form-group">
                                    <label className="form-label">Add Customers</label>                           
                                  <Select
                defaultValue={[custInfo[2], custInfo[3]]}
                 isMulti
             name="colors"
           options={custInfo}
                  className="basic-multi-select"
                classNamePrefix="select"
  />
                              </div>
                              </div>
 
                              <div className="col-lg-3 col-md-6">
                              <div className="float-start mt-4">
                                 <button type="submit" className="btn btn-primary float-end m-0 smallBtn"><i className="fa fa-plus"></i> Add</button>
                              </div>
                              </div>


                               <div class="col-12 mt-0">
                                 <DataTable className='girdTable' highlightOnHover columns={columns} data={grouplist} />
                              </div>  */}

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
               </div>

               {/* <div className="form-group col-md-12">
                  <div className="col-sm-12 mt-4 text-center">
                     <button className="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save</button>
                     <button className="btn btn-primary btn-cancel btn-outline"> Cancel</button>

                  </div>
               </div> */}
            </section>
            <Modal size="sm" show={show} onHide={handleClose}>

               <Modal.Header>
                  <Modal.Title>
                     <h2>Edit Customer</h2>

                  </Modal.Title>


               </Modal.Header>
               <Modal.Body>
                  <div className="row mt-2">

                     <div class="mb-2 col-md-6 col-lg-12">

                        <select
                           class="form-select"
                           aria-label="Default select example"
                           id="BankAcc"
                           onChange={handleBuyerId}
                        >
                           <option style={{ display: "none" }}>Customer Name</option>
                           {SalesList?.length > 0 && (
                              <>
                                 {SalesList.map((SalesList) => (
                                    <option
                                       key={SalesList.customer_id}
                                       value={SalesList.customer_id}
                                    >
                                       {SalesList.customer_name}
                                    </option>
                                 ))}
                              </>
                           )}
                        </select>
                     </div>

                  </div>
               </Modal.Body>
               <Modal.Footer>



                  <div className="col-lg-12 text-center">
                     <button onClick={editCustomer} class="btn btn-primary">Save Details</button>
                     <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                        Close
                     </button>
                  </div>
               </Modal.Footer>

            </Modal>
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
                        <InputText className={`${!calculationn && (submitClicked) ? 'error' : ''}`} inputValue={calculationn ? calculationn : 0} inputDisable onChange={(e) => setBalance(e.target.value)} labelText="balance" inputName="balance" inputType="text" />
                     </div>
                     <div className="col-lg-4 col-md-6">
                        <InputText className={`${!commission && (submitClicked) ? 'error' : ''}`} onChange={(e) => setCommission(e.target.value)} labelText="commission" inputName="commission" inputType="text" />
                     </div>
                     <div className="col-lg-4 col-md-6">
                        <InputText className={`${!totcalculation && (submitClicked) ? 'error' : ''}`} inputValue={commission > 0 ? totcalculation : 0} inputDisable onChange={(e) => setPerheadAmount(e.target.value)} labelText="Perhead Amount" inputName="perheadamount" inputType="text" />
                     </div>

                  </div>
               </Modal.Body>
               <Modal.Footer>



                  <div className="col-lg-12 text-center">
                     <button onClick={() => saveChitdetails()} class="btn btn-primary">Save Details</button>
                     <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose2}>
                        Close
                     </button>
                  </div>
               </Modal.Footer>
            </Modal>
            <Modal size="lg" show={showedit} onHide={handleClose3}>

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
                     {/* <button onClick={saveChitdetails} class="btn btn-primary">Save Details</button> */}
                     <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose3}>
                        Close
                     </button>
                  </div>
               </Modal.Footer>
            </Modal>

            <Modal size="lg" show={showView} onHide={handleClose4}>
               <Modal.Header>

                  <div class="row">
                     <div class="col-lg-3"><div className='float-start loanAmt'>Month: <span> {header.months} </span> </div></div>
                     <div class="col-lg-3"><div className='float-start loanAmt'>Question: <span> {header.question} </span> </div></div>
                     <div class="col-lg-3"><div className='float-start loanAmt'>Balance: <span> {header.balence} </span> </div></div>
                     <div class="col-lg-3"><div className='float-start loanAmt'>perhead: <span> {header.perhead_amount} </span> </div></div>
                     <div class="col-lg-3"><div className='float-start loanAmt'>Paidcustomers: <span> {header.paid_customers} </span> </div></div>
                     <div class="col-lg-3"><div className='float-start loanAmt'>Total: <span> {header.total_amount} </span> </div></div>
                     <div class="col-lg-3"><div className='float-start loanAmt'>Remaining: <span> {header.reaming_amount} </span> </div></div>
                  </div>

               </Modal.Header>
               <Modal.Body>



                  <DataTable  /* fixedHeader fixedHeaderScrollHeight="70vh" */ highlightOnHover className='girdTable' columns={columnsss} data={CustchitList} />
               </Modal.Body>
               <Modal.Footer>
                  <button className="btn btn-primary btn-outline smallBtn" onClick={() => handleShow1()}>
                     Save
                  </button>

                  <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose4}>
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
      </div>

   )

}


export default EditGroup;