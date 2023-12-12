import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import DashboardPage from './components/pages/DashboardPage/DashboardPage';
import HomePage from './components/pages/HomePage/HomePage';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import LoginPage from './components/pages/LoginPage/LoginPage';
import LogoutPage from './components/pages/LogoutPage/LogoutPage';
import SignupPage from './components/pages/SignupPage/SignupPage';
import ExpenseEntryPage from './components/pages/ExpenseEntryPage/ExpenseEntryPage';
import BudgetSetupPage from './components/pages/BudgetSetupPage/BudgetSetupPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
      <AuthProvider>
          <Router>
              <div className="App">
                  <Navigation />
                  <Header />
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/dashboard" element={<PrivateRoute element={DashboardPage} />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/budget-setup" element={<PrivateRoute element={BudgetSetupPage} />} />
                      <Route path="/expense-entry" element={<PrivateRoute element={ExpenseEntryPage} />} />
                      <Route path="/logout" element={<LogoutPage />} />
                      <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                  <Footer />
              </div>
          </Router>
      </AuthProvider>
  );
}

export default App;
