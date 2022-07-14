import React from 'react';
import {Nav} from './components';
import {Home,Company,AddJob,SelectedJob,Login,AllJobs,Profile,Privacy} from './pages';
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
          <Route
            path='/profile'
            element={<Profile />}
            />
          <Route
            path='/privacy'
            element={<Privacy />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
