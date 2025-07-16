import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/auth/login/page.jsx';
import RegisterPage from './Components/auth/register/page.jsx';
import CompanyDashboard from './Components/dashboard/company/page.jsx';
import EmployeeDashboard from './Components/dashboard/employee/page.jsx';
import AdminDashboard from './Components/dashboard/admin/page.jsx';
import CertificatePage from './Components/Certificate/page.jsx';
import CorporateTrainingLanding from './Components/landing_page.jsx';


function App() {
  return (
    
      <Routes>
        <Route path="" element={<CorporateTrainingLanding />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />}/>
        <Route path="/dashboard/company" element={<CompanyDashboard />}/>
        <Route path="/dashboard/employee" element={<EmployeeDashboard />}/>
        <Route path="/dashboatd/admin" element={<AdminDashboard />}/>
        <Route path="/certificate/:id" element={<CertificatePage />}/>
   
      </Routes>
   
  );
}

export default App;