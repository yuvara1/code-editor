// Desc: Main entry point for the application
import './App.css';
import Dashboard from './front/Dashboard.jsx';
import Login from './front/Login.jsx'
import Access from './front/Access.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/access' element={<Access />} />
          <Route path='/dash' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
