import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from "./pages/login/Login";
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dashboard from "./pages/dashboard/Dashboard"
import Dashboardchit from "./pages/dashboardchit/Dashboardchit"
import Customers from "./pages/customers/Customers"
import DailyFinance from "./pages/dailyfinance/DailyFinance"
import WeeklyFinance from "./pages/weeklyfinance/WeeklyFinance"
import MonthlyFinance from "./pages/monthlyfinance/MonthlyFinance"
import ChitFounds from "./pages/chitfounds/ChitFounds"
import Reports from "./pages/reports/Reports"
import Reportschit from "./pages/Reportschit/Reportschit"
import CollectionReports from "./pages/CollectionReports"
import CompanyProfile from "./pages/companyprofile/CompanyProfile"
import AddCustomer from "./pages/customers/AddCustomer"
import EditCustomer from "./pages/customers/EditCustomer"
import ViewCustomer from "./pages/customers/ViewCustomer"
import CreateGroup from "./pages/chitfounds/CreateGroup"
import ViewGroup from "./pages/chitfounds/ViewGroup"
import EditGroup from "./pages/chitfounds/EditGroup"
import ChitDetailsEdit from "./pages/chitfounds/ChitDetailsEdit";
import AddExpense from "./pages/Expense/Addexpense"
import EditExpense from "./pages/Expense/Editexpense"
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ForgotPasswordChange from "./pages/ForgotPassword/ForgotPasswordChange";
import Invalidlink from './pages/ForgotPassword/Invalidlink';
import AuditRecord from "./pages/Auditrecord/Auditrecord";
import NextDayReport from "./pages/nextdayreport/nextdayreport";

import WeeklyDashboard from "./pages/dashboard/WeeklyDashboard";
import WeeklyAddCustomer from "./pages/customers/WeeklyAddCustomer";
import WeeklyEditCustomer from "./pages/customers/WeeklyEditCustomer";
import WeeklyViewCustomer from "./pages/customers/WeeklyViewCustomer";
import WeeklyLoanFinance from "./pages/weeklyfinance/WeeklyLoanFinance";
import WeeklyReports from "./pages/reports/WeeklyReports";
import WeeklyCollectionReports from "./pages/WeeklyCollectionReports";
import weeklyCustomers from "./pages/customers/WeeklyCustomer";
import Weeklynextdayreport from "./pages/nextdayreport/weeklynextdayreport";





const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<PublicRoute component={Login} />} />
        <Route path="/forgotpassword" element={<PublicRoute component={ForgotPassword} />} />
        <Route path="/forgotpasswordchange" element={<PublicRoute component={ForgotPasswordChange} />} />

        <Route path="/invalidlink" element={<PublicRoute component={Invalidlink} />} />


        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/dashboardchit" element={<PrivateRoute component={Dashboardchit} />} />
        <Route path="/customers" element={<PrivateRoute component={Customers} />} />
        <Route path="/addcustomer" element={<PrivateRoute component={AddCustomer} />} />
        <Route path="/viewcustomer" element={<PrivateRoute component={ViewCustomer} />} />
        <Route path="/editcustomer" element={<PrivateRoute component={EditCustomer} />} />
        <Route path="/dailyfinance" element={<PrivateRoute component={DailyFinance} />} />
        <Route path="/weeklyfinance" element={<PrivateRoute component={WeeklyFinance} />} />
        <Route path="/monthlyfinance" element={<PrivateRoute component={MonthlyFinance} />} />
        <Route path="/chitfounds" element={<PrivateRoute component={ChitFounds} />} />
        <Route path="/reports" element={<PrivateRoute component={Reports} />} />
        <Route path="/reportschit" element={<PrivateRoute component={Reportschit} />} />

        <Route path="/collectionreports" element={<PrivateRoute component={CollectionReports} />} />
        <Route path="/companyprofile" element={<PrivateRoute component={CompanyProfile} />} />
        <Route path="/creategroup" element={<PrivateRoute component={CreateGroup} />} />
        <Route path="/viewgroup" element={<PrivateRoute component={ViewGroup} />} />
        <Route path="/chitdetailsedit" element={<PrivateRoute component={ChitDetailsEdit} />} />
        <Route path="/editgroup" element={<PrivateRoute component={EditGroup} />} />
        <Route path="/addexpense" element={<PrivateRoute component={AddExpense} />} />
        <Route path="/auditrecord" element={<PrivateRoute component={AuditRecord} />} />
        <Route path="/editexpense" element={<PrivateRoute component={EditExpense} />} />
        <Route path="/nextdayreport" element={<PrivateRoute component={NextDayReport} />} />
        {/* karthianna */}
        <Route path="/weeklydashboard" element={<PrivateRoute component={WeeklyDashboard} />} />
        <Route path="/weeklyaddcustomer" element={<PrivateRoute component={WeeklyAddCustomer} />} />
        <Route path="/WeeklyEditCustomer" element={<PrivateRoute component={WeeklyEditCustomer} />} />
        <Route path="/WeeklyViewCustomer" element={<PrivateRoute component={WeeklyViewCustomer} />} />
        <Route path="/weeklyloanfinance" element={<PrivateRoute component={WeeklyLoanFinance} />} />
        <Route path="/weeklyreports" element={<PrivateRoute component={WeeklyReports} />} />
        <Route path="/weeklycollectionreports" element={<PrivateRoute component={WeeklyCollectionReports} />} />
        <Route path="/weeklycustomers" element={<PrivateRoute component={weeklyCustomers} />} />
        <Route path="/weeklynextdayreport" element={<PrivateRoute component={Weeklynextdayreport} />} /> 
      </Routes>
    </BrowserRouter>

  )
}

export default AppRouter;
