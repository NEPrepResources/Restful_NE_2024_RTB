import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeList from "./pages/EmployeeList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () =>{
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={EmployeeList}/>
          {/* <Route path="/" element={EmployeeForm}/> */}
          <Route path="/login" element={Login}/>
          <Route path="/signup" element={Signup}/>
          
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;