import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CorporateTrainingLanding from './Components/landing_page.jsx';
import AuthPage from './Components/Auth/auth.jsx';

function App() {
  return (
    
      <Routes>
        <Route path="" element={<CorporateTrainingLanding />} />
        <Route path="/authentication" element={<AuthPage />} />
      </Routes>
   
  );
}

export default App;
