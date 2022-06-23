import React from 'react';
import {Nav,AddCompany} from './components';
import {Home,Company,AddJob,SelectedJob,Login,AllJobs} from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          {/* <Route
            path='/company/'
            element={<AddCompany />}
            /> */}
          <Route
            path='/myjobs/'
            element={<AllJobs />}
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
