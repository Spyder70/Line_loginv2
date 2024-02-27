import React from 'react';

const Footer = () => {
  return (
    <footer>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
          }

          footer {
            background-color: black;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            position: fixed;
            bottom: 0;
            width: 100%;
            left: 0; /* Ensure the footer starts from the left edge */
          }

          p {
            margin: 0;
            color: #fff;
          }
        `}
      </style>
      <p>&copy; 2024 Wayen Enterprises. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
