import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import HomePage from './pages/Home';
import Week1 from './pages/Week1';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white p-4 shadow-md">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-500">Home</Link></li>
            {/* <li><Link to="/week-1" className="text-blue-500">Week1</Link></li> */}
            <li><Link to="/register" className="text-blue-500">Register</Link></li>
            <li><Link to="/login" className="text-blue-500">Login</Link></li>
            <li><Link to="/forgot-password" className="text-blue-500">Forgot Password</Link></li>
          </ul>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/week-1" element={<Week1 />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
