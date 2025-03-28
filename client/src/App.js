import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './components/Signup';
import LoginPage from './components/Loginpage';
import Indexpage from './components/userDashboard/Indexpage';
import Adminpage from './components/Adminpage';
import AdminSignupPage from './components/AdminSignup';
import LandingPage from './components/LandingPage';

import './App.css';
import Layout from './components/layout/Layout';
import AiTutor from './components/userDashboard/AiTutor';
import Mycourses from './components/userDashboard/Mycourses';
import Schedule from './components/userDashboard/Schedule';
import Settings from './components/userDashboard/Settings';
import Profile from './components/userDashboard/Profile';
const App = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/adminSignup" element={<AdminSignupPage />} />
                <Route path="/" element={<LandingPage />} />  
                <Route path="/dashboard" element={ <Layout /> } >
                    <Route path="home" index element={<Indexpage />} />
                    <Route path="aitutor" element={<AiTutor />} />
                    <Route path="mycourses" element={<Mycourses />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                <Route path="/admin" element={isLoggedIn && isAdmin ? <Adminpage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
