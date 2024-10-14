import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import config from './config/navConfig.json'
import NavBar from './Pages/NavBar'
import Footer from './Pages/Footer'
import FormFile from "./Pages/DownloadRequest";
import Allrequests from "./Pages/Allrequests";
import RequestForm from "./Pages/UploadRequest";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/downloadrequest" element={<FormFile />} />
    <Route path="/uploadrequest" element={<RequestForm />} />
    <Route path="/allrequest" element={<Allrequests />} />
  </Routes>
);

const App = () => {
  return (
    <Router>
      <NavBar config={config} />
      <AppRoutes />
      <Footer />
    </Router>
  );
};

export default App;
