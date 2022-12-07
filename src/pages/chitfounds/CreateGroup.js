import React, { useState, useEffect } from 'react';
import { axiosObject } from '../../services/BaseService'
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { InputText, SelectGender, Checkbox, Radio } from '../../components/FormFields';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import DataTable from 'react-data-table-component';
import Select from 'react-select'
import MultiSelect from 'react-multiple-select-dropdown-lite';
import moment from "moment"


const CreateGroup = () => {

   const loginDetails = useSelector(state => state.LoginReducer.payload);
   console.log("loginDetails", loginDetails)

   let navigate = useNavigate();
   const [expId, setExpId] = useState("");
   const [cmsnamt, setCmsnamt] = useState("");
   const [cmsnprcnt, setCmsnprct] = useState("");
   const [totamt, setTotAmt] = useState("");
   const [totmonth, setTotMonth] = useState("");
   const [monthamt, setMonthAmt] = useState("");
   const [startDate, setStartDate] = useState("");
   console.log(startDate.substring(5, 7), "startDate")
   const [endDate, setEndDate] = useState("");
   const [auctionDate, setAuctionDate] = useState("");
   const [grplist, setGrplist] = useState("");
   const [custinfo, setCustInfo] = useState("");
   const [loading, setLoading] = useState("");
   const [custId, setCustId] = useState("");
   const [monthId, setMonthId] = useState("");
   const [groupvalue, setGroupvalue] = useState("");
   const [submitClicked, setSubmitClicked] = useState(false)
   const [submitLoanClicked, setSubmitLoanClicked] = useState(false)
   const [explist, setExplist] = useState("");
   const [count, setCount] = useState("");
   const [show, setShow] = useState(false);



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


   const saveGroup = (e) => {
      console.log("saveGroup")
      setSubmitClicked(true);
      e.preventDefault();

      if (!totamt) {
         console.log("");
         return;
      }

      if (!totmonth) {
         console.log("");
         return;
      }



      if (!startDate) {
         console.log("");
         return;
      }
      if (!endDate) {
         console.log("");
         return;
      }
      if (!auctionDate) {
         console.log("");
         return;
      }


      let request = {
         vendor_id: loginDetails[0].vendor_id,
         total_amount: parseInt(totamt),
         total_months: parseInt(totmonth),
         monthly_amount: calculation,
         start_months: startDate,
         end_months: endDate,
         commission: percentage,
         commission_percentage: parseInt(cmsnprcnt),
         action_date: auctionDate,
         month_id: startDate.substring(5, 7),
         customerdetails: newVal,
         isactive: 1,
         createdBy: loginDetails[0].user_id,
         updatedBy: loginDetails[0].user_id,
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token


      }

      console.log("monthId req", request)

      {
         axiosObject.post("chitFundAdd/add", request).then((response) => {
            console.log("resresponse.data.data", response.data.data)
            if (response.data.success == true) {
               togglePopup()

               setPopupTitle("Add ChitFund");
               setPopupMsg("ChitFund Added Successfully");
               setPopupType("success");

               setPopupActionType("redirect");
               setPopupActionValue("ok");
               setPopupActionPath("/chitfounds")

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
         selector: (row, index) => index + 1
      },
      {
         name: 'Customer Name',
         selector: row => row.name1,
         sortable: true,
      },
      {
         name: 'Phone',
         selector: row => row.phone1,
         sortable: true,
      },
      {
         name: 'Gender',
         selector: row => row.gender,
         sortable: true,
      },

   ];

   const GroupList = () => {

      let request = {
         user_id: loginDetails[0].user_id,
         token: loginDetails[0].token,
         vendor_id: loginDetails[0].vendor_id,

      }

      axiosObject.post("customerList/condition", request).then(response => {

         setCustInfo(response.data.data.map((data) => { return { "label": data.customer_name + " " + data.phone_no + " " + data.address, "name1": data.customer_name, "phone1": data.phone_no, "gender": data.gender, "value": data.customer_id.toString() } }));
         setLoading(false);
         console.log("customerList", response.data.data.map((data) => { return { "label": data.customer_name, "value": data.customer_id.toString() } }));


      });
   }


   useEffect(() => {

      GroupList()

   }, [])

   const [newVal, setNewVal] = useState("")
   const [list, setList] = useState("")


   const handleOnchange = (val) => {
      var numberArray = val.map((data) => JSON.parse(data.value.substring(5)))
      setList(val)
      setNewVal(numberArray);
      console.log("numberArray", numberArray);
      console.log(" numberArray val", val);

   }

   console.log("newVal", newVal);

   const percentage = (cmsnprcnt / 100) * Number(totamt);

   const calculation = Math.round((Number(totamt)) / Number(totmonth))


   const updateDate = (date) => {

      setStartDate(date);
      setEndDate(totmonth !== "" ? moment(date, "YYYY-MM-DD").add(totmonth, 'month').subtract(1, "days").format("YYYY-MM-DD") : date)

   }



   return (
      <div>

         <div id="wrapper">
            <Header />
            <Sidebar />

            <section id="content-wrapper" className='addCustomersPage'>
               <div className="row">

                  <div className="col-6">
                     <h1 className='pageHead mt-2'>Create New Group </h1>
                  </div>

                  <div className="col-12 mt-0 customerDetailsBlock">
                     <div className="card">

                        <div className="card-body">
                           <h2>Group Info</h2>
                           <div className="row mt-2">

                              {/* <div className="col-lg-4 col-md-6">
                                 <InputText labelText="Group ID" inputName="Group ID" inputType="number" />
                              </div>  */}
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!totamt && (submitClicked) ? 'error' : ''}`} onChange={(e) => setTotAmt(e.target.value)} labelText="Total Amount" inputName="Total Amount" inputType="number" />

                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!totmonth && (submitClicked) ? 'error' : ''}`} onChange={(e) => setTotMonth(e.target.value)} labelText="Total Month" inputName="Total Month" inputType="number" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText inputDisable inputValue={calculation} onChange={(e) => setMonthAmt(e.target.value)} labelText="Monthly Amount" inputName="Monthly Amount" inputType="number" />
                              </div>
                              <div class="col-lg-4 col-md-6">
                                 <label for="CommissionPercentage" class="form-label">
                                    Commission Percentage
                                 </label>
                                 <div class="input-group">
                                    <span class="input-group-text">%</span>
                                    <input
                                       type="text"
                                       class="form-control"
                                       id="Commi
                                       ssionPercentage"

                                       onChange={(e) => setCmsnprct(e.target.value)}

                                    />
                                 </div>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText onChange={(e) => setCmsnamt(e.target.value)} inputValue={percentage} inputDisable labelText="Commission Amount" inputName="Commission Amount" inputType="number" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!startDate && (submitClicked) ? 'error' : ''}`} onChange={(e) => updateDate(e.target.value)} labelText="Start Date" inputName="Start Date" inputType="date" />
                              </div>
                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!endDate && (submitClicked) ? 'error' : ''}`} inputValue={endDate} labelText="End Date" inputName="End Date" inputType="date" />
                              </div>

                              <div className="col-lg-4 col-md-6">
                                 <InputText className={`${!auctionDate && (submitClicked) ? 'error' : ''}`} onChange={(e) => setAuctionDate(e.target.value)} labelText="Auction Date" inputName="Action Date" inputType="date" />
                              </div>
                              <div className="col-lg-9 col-md-6">
                                 <div className="form-group">
                                    <label className="form-label">Add Customers</label>
                                    <Select
                                       defaultValue={[custinfo[2], custinfo
                                       [3]]}
                                       isMulti
                                       options={custinfo} onChange={handleOnchange}

                                       className="basic-multi-select"
                                       classNamePrefix="select"
                                    />

                                 </div>
                              </div>
                              <div className="card">
                                 <div className="card-body">
                                    <h2>Group Customers</h2>
                                    <div className="row loansBlock">
                                       <div class="col-12 mt-0">
                                          <DataTable className='girdTable' highlightOnHover pagination columns={columns} data={list} />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>



                  </div>
               </div>

               <div className="form-group col-md-12">
                  <div className="col-sm-12 mt-4 text-center">
                     <button onClick={saveGroup} className="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save</button>
                     <Link to="/chitfounds" className="btn btn-primary btn-cancel btn-outline"><span className='label'> Cancel</span></Link>

                  </div>
               </div>
            </section>
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


export default CreateGroup;