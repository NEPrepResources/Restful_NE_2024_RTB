import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeList from "./pages/EmployeeList";

const App = () =>{
  return(
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" element={EmployeeList}/>
          <Route exact path="/form" element={EmployeeForm}/>
        </Switch>
      </Router>
    </AuthProvider>
  )
}