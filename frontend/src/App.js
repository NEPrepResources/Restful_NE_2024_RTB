import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeList from "./pages/EmployeeList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home"

const App = () =>{
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={EmployeeList}/>
          <Route path="/home" element={Home}/>
          <Route path="/login" element={Login}/>
          <Route path="/signup" element={Signup}/>
          
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;