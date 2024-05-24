import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Page404 from './page/pageCallback';
import Loggin from './page/pageLoggin';
import DashBoard from './page/view-manager/pageDashboard.jsx';
import CreateAcount from './page/createAcount';


export const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token;
};

export const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};  

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Loggin />} />
              <Route path="/create-acount" element={<CreateAcount />} />
              <Route path="/dash-manager/*" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
              <Route path="*" element={<Page404/>} />
          </Routes>
      </Router>
  );
}

export default App;
