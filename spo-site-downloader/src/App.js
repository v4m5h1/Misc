import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NewDownloadRequest from './components/NewDownloadRequest';
import navConfig from './config/navConfig.json';
import FormFile from './components/FormFile';
function App() {
  // const [pageTitle, setPageTitle] = useState("New Download Request");

  // const handleNavClick = (title) => {
  //   setPageTitle(title);
  // };

  return (
    <div>
      <FormFile/>
      {/* <NavBar config={navConfig} onNavClick={handleNavClick} />
      <h1 className="text-center my-4">{pageTitle}</h1>
      {pageTitle === "New Download Request" && <NewDownloadRequest />}
      <Footer /> */}
    </div>
  );
}

export default App;
