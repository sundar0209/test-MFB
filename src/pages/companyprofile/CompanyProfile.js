import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Modal from 'react-bootstrap/Modal'
import Sidebar from "../../components/Sidebar";
import userIcon from "../../../src/assets/img/userIcon.jpg"
import { SelectStatus } from '../../components/FormFields';
import { InputText } from '../../components/FormFields';
import { axiosObject } from '../../services/BaseService'
import CommonPopup from '../../components/CommonPopup/CommonPopup';
import DataTable from 'react-data-table-component';
import profilePic from '../../assets/img/profilePic.png';
import mfb from '../../assets/img/buddy_Icon.png';
import Loading from "../../components/Loading";
import FileBase64 from 'react-file-base64';
//import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';



const CompanyProfile = () => {

    const loginDetails = useSelector(state => state.LoginReducer.payload);

    console.log("loginDetails", loginDetails[0].user_id)

    const [cmlist, setCmlist] = useState([]);
    const [header, setHeader] = useState("");
    const [amount, setAmount] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false)
    const [loading, setLoading] = useState(true);
    const [doc, setDoc] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    //const loginDetails = useSelector(state => state.LoginReducer.payload);




    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const loanTogglePopup = () => {
        setIsClose(!isClose);
    }

    const getFiles = (file) => {
        console.log("================>", file.type)
        setType("")
        if (file.type.includes("jpg") || file.type.includes("jpeg") || file.type.includes("png")) {
            setDoc(file);
        } else {
            setType("0");
        }
    }



    const detailsView = () => {
        let request = {
            vendor_id: loginDetails[0].vendor_id,
            token: loginDetails[0].token,
            user_id: loginDetails[0].user_id,

        }

        axiosObject.post("companyProfile/condition", request)

            .then((response) => {
                setHeader(response.data.count[0]);
                setImage(response.data.count[0]?.logo_url == null ? "" : response.data.count[0]?.logo_url);
                console.log("response.data.count[0]?.logo_url", image);
                setCmlist(response.data.data);
                setAmount(response.data.count[0]?.total_amount);
                setLoading(false);


            });
    }

    const updateImage = (e) => {


        let request = {
            vendor_id: loginDetails[0].vendor_id,
            logo_url: doc === "" ? doc : doc.length > 0 ? doc : [doc],
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token

        }


        {
            axiosObject.post("vendorImageEdit/update", request)
                .then((response) => {
                    console.log("resresponse.data.data", response.data.data)
                    if (response.data.success == true) {

                        togglePopup()
                        setPopupTitle("Update Image");
                        setPopupMsg("Image Updated Successfully");
                        setPopupType("success");
                        setPopupActionType("refresh");
                        setPopupActionValue("ok");
                        // setPopupActionPath("/customers")
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
    const updateAmount = (e) => {
        setSubmitClicked(true);
        e.preventDefault();

        if (!amount) {
            console.log("");
            return;
        }



        let request = {
            vendor_id: loginDetails[0].vendor_id,
            total_amount: amount,
            user_id: loginDetails[0].user_id,
            token: loginDetails[0].token

        }


        {
            axiosObject.post("vendorEdit/update", request)
                .then((response) => {
                    console.log("resresponse.data.data", response.data.data)
                    if (response.data.success == true) {

                        togglePopup()
                        setPopupTitle("Update Amount");
                        setPopupMsg("Investment Amount Updated Successfully");
                        setPopupType("success");
                        setPopupActionType("refresh");
                        setPopupActionValue("ok");
                        // setPopupActionPath("/customers")
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
        detailsView()
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);


    }

    return (
        <div>

            <div id="wrapper">
                <Header />
                <Sidebar />
                {loading ? <Loading /> :

                    <section id="content-wrapper" className='companyProfile'>

                        <div className="row">
                            <div className="col-lg-12 col-md-12 card">
                                <div class="row card-body">
                                    <div className="col-lg-4 col-md-4 proLeft">
                                        <div className="col-md-4 col-lg-12">
                                            <div className="users-upload-btn-wrapper">
                                                <div className='profilePic'> {doc === "" ? <img src={image === "" ? mfb : image}></img> :
                                                    <img alt="" src={doc.base64} ></img>

                                                }

                                                </div>

                                                {/* <span className="proCamera"></span> */}
                                                <FileBase64 onDone={getFiles} type="hidden" />

                                                {type === "0" ? <p className="form-input-error">Upload only Image Format </p> : ""}

                                            </div>
                                        </div>
                                        <button class="butn"><i class="fa-solid fa-floppy-disk" onClick={updateImage}></i></button>

                                        <h2>{header.title}</h2>
                                        <p>{header.address}</p>

                                        <div className='investment'>

                                            <p className='label'>Update Investment</p>
                                            <h2 className='total_amount'>{header.total_amount}</h2>

                                            <p onClick={() => handleShow()} className='label'><i class="fa-solid fa-pencil updateInvest"></i></p>

                                        </div>


                                        <div className='financeInfo'>

                                            <div class="col-lg-12">
                                                <p className="form-label">Investment</p>
                                                <p className='form-value'>{header.total_amount}</p>
                                            </div>

                                            <div class="col-lg-12">
                                                <p className="form-label">Profit</p>
                                                <p className='form-value'>{header.interest_amount}</p>
                                            </div>
                                            <div class="col-lg-12">
                                                <p className="form-label">Penalty/Discount</p>
                                                <p className='form-value'>{header.penalty_discount}</p>
                                            </div>
                                            <div class="col-lg-12">
                                                <p className="form-label">Expenses</p>
                                                <p className='form-value'>{header.total_expenses}</p>
                                            </div>
                                            <div class="col-lg-12">
                                                <p className="form-label">Available Cash</p>
                                                <p className='form-value'>{header.totalavalibleamount}</p>
                                            </div>
                                            <div class="col-lg-12">
                                                <p className="form-label">Cash in Out</p>
                                                <p className='form-value'>{header.totaloutcomeamount}</p>
                                            </div>
                                            <div class="col-lg-12">
                                                <p className="form-label">Total Customer</p>
                                                <p className='form-value'>{header.customers}</p>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-lg-8 col-md-8 proRight row">
                                        <h2>Personal Information</h2>

                                        <div class="col-lg-6 col-md-6">
                                            <p className="form-label">Name</p>
                                            <p className='form-value'>{header.name}</p>
                                        </div>

                                        <div class="col-lg-6 col-md-6">
                                            <p className="form-label">Phone</p>
                                            <p className='form-value'>{header.phone_no}</p>
                                        </div>
                                        <div class="col-lg-6 col-md-6">
                                            <p className="form-label">Email</p>
                                            <p className='form-value'>{header.email}</p>
                                        </div>
                                        <div class="col-lg-6 col-md-6">
                                            <p className="form-label">Address</p>
                                            <p className='form-value'>{header.address}</p>
                                        </div>




                                        <h2 className='mt-2'>Members</h2>
                                        <div class="table-responsive">
                                            <table className='table'>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>User Type</th>

                                                </tr>
                                                {cmlist.length > 0 ? cmlist.map((cmlist, index) =>

                                                    <tr>
                                                        {/* <td>{cmlist.user_id}</td> */}
                                                        <td>{index + 1}</td>
                                                        <td>{cmlist.name}</td>
                                                        <td>{cmlist.phone_no}</td>
                                                        <td>{cmlist.email}</td>
                                                        <td>{cmlist.user_type}</td>

                                                    </tr>)
                                                    : ""}

                                            </table>
                                        </div>




                                        <div class="col-lg-12 col-md-12 card counter mt-4">
                                            <div class="row">
                                                <div class="col-6 col-lg-3 col-md-3">
                                                    <div class="count-data text-center">
                                                        <h6 class="count h2" data-to="500" data-speed="500">{header.total_loans}</h6>
                                                        <p class="m-0px font-w-600">Total Loans</p>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-3">
                                                    <div class="count-data text-center">
                                                        <h6 class="count h2" data-to="150" data-speed="150">{header.daily_loans}</h6>
                                                        <p class="m-0px font-w-600">Daily Loans</p>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-3">
                                                    <div class="count-data text-center">
                                                        <h6 class="count h2" data-to="850" data-speed="850">{header.weekly_loans}</h6>
                                                        <p class="m-0px font-w-600">Weekly Loans</p>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-3">
                                                    <div class="count-data text-center">
                                                        <h6 class="count h2" data-to="190" data-speed="190">{header.monthly_loans}</h6>
                                                        <p class="m-0px font-w-600">Monthly Loans</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>








                                    </div>
                                </div>





                            </div>



                            <Modal size="sm" show={show} onHide={handleClose}>

                                <Modal.Header>
                                    <Modal.Title>
                                        <h2>Update Investment</h2>

                                    </Modal.Title>

                                </Modal.Header>
                                <Modal.Body>
                                    <InputText className={`${!amount && (submitClicked) ? 'error' : ''}`} onChange={(e) => setAmount(e.target.value)} inputValue={amount} labelText="Update Investment" inputName="Update Investment" inputType="number" />

                                </Modal.Body>
                                <Modal.Footer>


                                    <div className="col-lg-12 text-center">
                                        <button class="btn btn-primary smallBtn" onClick={updateAmount}>Save</button>

                                        <button className="btn btn-primary btn-outline smallBtn" onClick={handleClose}>
                                            Close
                                        </button>


                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </div>




                    </section>}
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
        </div >

    )

}


export default CompanyProfile;