
import  React, {useEffect, useState} from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import {  Navigate, Outlet } from "react-router-dom";


import HomeStudent from './Pages/HomeStudent';


import LoginPage from './Authentication/LoginPage';
import HomePage from './Authentication/HomePage';
import SAccountPage from './Pages/SAccountPage';
import AddStudent from './Pages/Admin/AddStudent';

import AdminLogin from './Pages/Admin/Adminlogin';
import AdminHome from './Pages/Admin/AdminHome';
import AdminStudent from './Pages/Admin/AdminStudent';
import AdminInstructors from './Pages/Admin/AdminInstructors';
import AdminLectures from './Pages/Admin/AdminLectures';
import AdminLectureDetailsElec from './Pages/Admin/AdminLectureDetailsElec';
import AdminLectureDetailsCivil from './Pages/Admin/AdminLectureDetailsCivil';
import AdminLectureDetailsMechanical from './Pages/Admin/AdminLectureDetailsMechanical';
import AdminStudentDetails20 from './Pages/Admin/AdminStudentDetails20';
import AdminStudentDetails21 from './Pages/Admin/AdminStudentDetails21';
import AdminStudentDetails22 from './Pages/Admin/AdminStudentDetails22';
import AdminStudentDetails23 from './Pages/Admin/AdminStudentDetails23';
import AdminInstructorDetailsMechanical from './Pages/Admin/AdminInstructorDetailsMechanical';
import AdminInstructorDetailsCivil from './Pages/Admin/AdminInstructorDetailsCivil';
import AdminInstructorDetailsElec from './Pages/Admin/AdminInstructorDetailsElec';

import LectureAccStudentView from './Pages/LectureAccStudentView';
import InstructorAccStudentView from './Pages/InstructorAccStudentView';

import LectureAccStudentViewCivil from './Pages/LectureAccStudentViewCivil';
import InstructorAccStudentViewCivil from './Pages/InstructorAccStudentViewCivil';

import LectureAccStudentViewMech from './Pages/LectureAccStudentViewMech';
import InstructorAccStudentViewMech from './Pages/InstructorAccStudentViewMech';

import StaffDetailsElec from './Pages/StaffDetailsElec';

import StudentViewElecStaff from './Pages/StudentViewElecStaff';
import StudentViewCivilStaff from './Pages/StudentViewCivilStaff.jsx';
import StudentViewMechStaff from './Pages/StudentViewMechStaff';

import LAccountPage from './Pages/Student/LAccountPage';
import Schedular from './Pages/Student/Schedular';
import { ShedularStudent } from './Pages/Student/ShedularStudent';
import SignInPage from './Authentication/SignInPage';


export default function Test() {

  //const basename = '/grp19';

  const token = localStorage.getItem("token");

console.log(token);


    const PrivateRouter = () => {

        if (token) {
            return <Outlet />;
        } else {
            return <Navigate to="/login" />;
        }
    };


  
  return (
    
      <div>
            <Router>

          <Routes>
            <Route exact path="/" element={<HomePage/>}>
            </Route>
  
            <Route path="/login"  element={< LoginPage/>}>
            </Route>

            <Route path="/SignInPage"  element={< SignInPage/>}>
            </Route>

            <Route element={<PrivateRouter user_type={"admin"} />}>

  
            <Route path="/homestudent" element={<HomeStudent/>} >
            </Route>

 	          <Route path="/saccountpage" element={<SAccountPage/>} >
            </Route>

            <Route path="/AddStudent" element={<AddStudent/>} >
            </Route>


            <Route path="/AdminLogin" element={<AdminLogin/>} >
            </Route>

            <Route path="/AdminHome" element={<AdminHome/>} >
            </Route>

            <Route path="/AdminStudent" element={<AdminStudent/>} >
            </Route>

            <Route path="/AdminLectures" element={<AdminLectures/>} >
            </Route>

            <Route path="/AdminInstructors" element={<AdminInstructors/>} >
            </Route>

            <Route path="/AdminLectureDetailsElec" element={<AdminLectureDetailsElec/>} >
            </Route>

            <Route path="/AdminLectureDetailsCivil" element={<AdminLectureDetailsCivil/>} >
            </Route>

            <Route path="/AdminLectureDetailsMechanical" element={<AdminLectureDetailsMechanical/>} >
            </Route>

            <Route path="/AdminStudentDetails20" element={<AdminStudentDetails20/>} >
            </Route>

            <Route path="/AdminStudentDetails21" element={<AdminStudentDetails21/>} >
            </Route>

            <Route path="/AdminStudentDetails22" element={<AdminStudentDetails22/>} >
            </Route>

            <Route path="/AdminStudentDetails23" element={<AdminStudentDetails23/>} >
            </Route>

            <Route path="/AdminInstructorDetailsMechanical" element={<AdminInstructorDetailsMechanical/>} >
            </Route>

            <Route path="/AdminInstructorDetailsCivil" element={<AdminInstructorDetailsCivil/>} >
            </Route>

            <Route path="/AdminInstructorDetailsElec" element={<AdminInstructorDetailsElec/>} >
            </Route>

            <Route path="/LectureAccStudentView" element={<LectureAccStudentView/>} >
            </Route>

            <Route path="/InstructorAccStudentView" element={<InstructorAccStudentView/>} >
            </Route>

            <Route path="/InstructorAccStudentViewCivil" element={<InstructorAccStudentViewCivil/>} >
            </Route>

            <Route path="/LectureAccStudentViewCivil" element={<LectureAccStudentViewCivil/>} >
            </Route>

            <Route path="/InstructorAccStudentViewMech" element={<InstructorAccStudentViewMech/>} >
            </Route>

            <Route path="/LectureAccStudentViewMech" element={<LectureAccStudentViewMech/>} >
            </Route>

            <Route path="/StaffDetailsElec" element={<StaffDetailsElec/>} >
            </Route>

            <Route path="/StudentViewElecStaff" element={<StudentViewElecStaff/>} >
            </Route>

            <Route path="/StudentViewCivilStaff" element={<StudentViewCivilStaff/>} >
            </Route>
            
            <Route path="/StudentViewMechStaff" element={<StudentViewMechStaff/>} >
            </Route>

          

            <Route path="/LAccountPage" element={<LAccountPage/>} >
            </Route>

            <Route path="/Schedular" element={<Schedular/>} >
            </Route>

            <Route path="/ShedularStudent" element={<ShedularStudent/>} >
            </Route>
            </Route>

          </Routes>
  
      </Router>
        
      </div>
  );
}