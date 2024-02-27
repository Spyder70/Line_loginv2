import React from 'react';

const Membership = () => {
    
  const BtnClick = () => {
    window.location.href = 'Events';
  };

  const Btnjoin = () => {
    window.location.href = 'Events';
  };
  return (
    <div>
      <style>
        {`
          * {
            padding: 0;
            margin: 0;
            text-decoration: none;
            list-style: none;
            box-sizing: border-box;
          }

          body {
            font-family: montserrat;
          }

          nav {
            background: black;
            height: 80px;
            width: 100%;
          }

          img.logo {
            height: 50px; 
            width: auto; 
            margin-right: 10px; 
            margin-top: 15px; 
          }

          nav ul {
            float: right;
            margin-right: 20px;
          }

          nav ul li {
            display: inline-block;
            line-height: 80px;
            margin: 0 5px;
          }

          nav ul li a {
            color: white;
            font-size: 17px;
            padding: 7px 13px;
            border-radius: 3px;
            text-transform: uppercase;
          }

          a.active, a:hover {
            background: red;
            transition: .5s;
          }

          .checkbtn {
            font-size: 30px;
            color: white;
            float: right;
            line-height: 80px;
            margin-right: 40px;
            cursor: pointer;
            display: none;
          }

          #check {
            display: none;
          }

          @media (max-width: 952px) {
            label.logo {
              font-size: 30px;
              padding-left: 50px;
            }
            nav ul li a {
              font-size: 16px;
            }
          }

          @media (max-width: 858px) {
            .checkbtn {
              display: block;
            }
            ul {
              position: fixed;
              width: 100%;
              height: 100vh;
              background: #333333;
              top: 80px;
              left: -100%;
              text-align: center;
              transition: all .5s;
            }
            nav ul li {
              display: block;
              margin: 50px 0;
              line-height: 30px;
            }
            nav ul li a {
              font-size: 20px;
            }
            a:hover, a.active {
              background: none;
              color: #0082e6;
            }
            #check:checked ~ ul {
              left: 0;
            }
          }

          @media (max-width: 858px) {
            label.logo {
              font-size: 30px;
              padding-left: 10px; 
              order: 2; 
            }

            img.logo {
              margin-right: 0; 
              margin-left: 10px; 
            }

            nav ul {
              float: none; 
              margin: 0; 
              text-align: center; 
            }

            nav ul li {
              display: block;
              margin: 10px 0; 
              line-height: 30px;
            }
          }

          section {
            background: url(bg7.jpg) no-repeat;
            background-size: cover;
            background-position: center;
            height: calc(100vh - 80px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            text-align: center;
            padding: 20px;
          }
          
          section h1 {
            font-size: 36px;
            margin-bottom: 20px;
          }

          section p {
            font-size: 18px;
          }
          
          @media (max-width: 412px) {
            section {
              padding: 10px;
            }
          }

          footer {
            background-color: black;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            position: fixed;
            bottom: 0;
            width: 100%;
            left: 0; 
          }

          footer p {
            margin: 0;
            color: #fff;
          }

          section h1,
          section p,
          section button {
            margin-bottom: 20px;
          }

          section h1 {
            font-size: 36px;
            margin-bottom: 40px;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid transparent;
            display: inline-block;
            max-width: 100%;
            animation: typing 5s steps(40, end) infinite;
            position: relative;
            line-height: 1.5em;
          }
          
          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }
          
          /* Apply typing effect only to screens larger than 480px */
          @media (min-width: 481px) {
            section h1 {
              font-size: 36px;
              margin-bottom: 40px;
              color: #fff;
              overflow: hidden;
              white-space: nowrap;
              border-right: 2px solid transparent;
              display: inline-block;
              max-width: 100%;
              animation: typing 5s steps(40, end) infinite;
              position: relative;
              line-height: 1.5em;
            }
          
            @keyframes typing {
              from {
                width: 0;
              }
              to {
                width: 100%;
              }
            }
          }
          
          /* Media query for small screens */
          @media (max-width: 480px) {
            section h1 {
              font-size: 22px;
            }
          }
          


          section p{
            color:blue;
          }
           
          .jbtn {
            background-color: red;
            color: black;
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            transition: background-color 0.5s;
          }

          .jbtn:hover {
            background-color: #fff;
          }

          .btn {
            background-color: #1b9bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 20px; 
            font-size: 16px;
            cursor: pointer;
            animation: blink 2s infinite; 
          }
      
          .btn:hover {
            background-color: #155fa0;
          }
      
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">
          <img className="logo" src="bat_white.png" alt="Your Logo" />
        </label>
        <ul>
          <li><a className="active" href="#">Home</a></li>
          <button className='btn' onClick={BtnClick}>Events</button>
        </ul>
      </nav>
      <section>
        <h1>Welcome to Wayne Mebership Platform.</h1>
        <button class="jbtn" onClick={Btnjoin}>Join us</button>
      </section>
      <footer>
        <p>&copy; 2024 Wayen Enterprises. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Membership;
