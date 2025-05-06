// App.tsx
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProtectedRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
