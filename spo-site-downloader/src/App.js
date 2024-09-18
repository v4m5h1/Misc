import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
// import FormPage from "./components/FormPage"; // Import your form page component
import NewDown from "./Pages/NewDownload";
import config from './config/navConfig.json'
import NavBar from './Pages/Layouts/NavBar'
import Footer from './Pages/Footer/Footer'
import FormFile from "./Pages/FormFile";
import Allrequests from "./Pages/Allrequests";

const App = () => {
  return (

    <Router>
      <NavBar config={config} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormFile />} />
        <Route path="/newdowload" element={<NewDown />} />
        <Route path="/allrequest" element={<Allrequests />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
