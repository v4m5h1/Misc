import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
// import FormPage from "./components/FormPage"; // Import your form page component
import NewDown from "./components/NewDownload";
import config from './config/navConfig.json'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import FormFile from "./components/FormFile";
import Allrequests from "./components/Allrequests";

const App = () => {
  return (
    <BrowserRourter>    
    <NavBar config={config} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormFile />} />        
        <Route path="/allrequest" element={<Allrequests />} />
        {/* Add other routes here */}
      </Routes>
      <Footer/>    
  </BrowserRourter>
  );
};

export default App;
