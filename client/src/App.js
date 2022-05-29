import {Home,Company,AddCompany,EditCompany} from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Home />}
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
            path='/company/:companyId'
            element={<Company />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
