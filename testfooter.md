// src/components/footer.js
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      2024 MST. All Rights Reserved.
    </div>
  );
};

export default Footer;


/* src/styles/footer.css */
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #f0f0f0;
  padding: 10px 0;
  font-size: 12px;
  color: #666;
}
