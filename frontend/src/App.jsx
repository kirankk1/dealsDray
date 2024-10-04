import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/update-employee" element={<UpdateEmployee />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
