import React,{useEffect} from 'react';
import {Nav} from './components';
import {Home,Company,AddCompany,EditCompany,AddJob,SelectedJob,Login} from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './utils/auth';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Router>
      <Nav />

        <Routes>
          <Route
            path='/home/'
            element={<Home />}
            />
          <Route
            path='/'
            element={<Login />}
            />
          <Route
            path='/company/'
            element={<AddCompany />}
            />
          <Route
            path='/company/edit/:companyId'
            element={<EditCompany />}
            />
          <Route
            path='/company/add/:companyId'
            element={<AddJob />}
            />
          <Route
            path='/company/:companyId'
            element={<Company />}
            />
          <Route
            path='/jobs/:companyId/:jobId'
            element={<SelectedJob />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
