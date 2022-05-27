import {Home,Company} from './pages';
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
            path='/company/:companyId'
            element={<Company />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
