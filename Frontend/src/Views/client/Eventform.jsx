import React, { useEffect, useState } from "react";
import axios from "axios";
const styles = {
  Form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Poppins",
    fontSize: "0.85rem",
  },
  InputWrapper: {
    marginTop: "1.3%",
    marginBottom: "1%",
    width: "100%",
    maxWidth: "500px", 
  },
  Input: {
    width: "100%", 
    height: "3.1vh",
  },
  SelectWrapper: {
    marginTop: "1%",
    marginBottom: "1%",
    width: "100%", 
  },
  Select: {
    width: "100%", 
    height: "3.5vh",
  },
  Box: {
    border: "1px solid #0E050F",
    padding: "2%",
    marginTop: "2%",
    marginBottom: "2%",
    width: "100%", 
  },
  Buttons: {
    margin: "0",
    padding: "0.35rem",
    border: "none",
    color: "white",
    backgroundColor: "#0E050F",
    borderRadius: "0.2em",
    fontFamily: "Poppins",
    fontSize: "0.8rem",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%", 
  },
  RangeInput: {
    width: "98%", 
    margin: "0.35rem 0.5rem 0.35rem 0.5rem",
  },
};

const Eventform = () => {
  const id = window.location.pathname;
  const [form, setForm] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const getClub = async () => {
      await axios
        .get(`http://localhost:8080/club${id}`)
        .then(({ data }) => setForm(JSON.parse(data[0].form_data)))
        .catch((err) => console.log(err));
    };
    getClub();
  }, []);

  useEffect(() => {
    if (form.length !== 0) {
      const arr = form.map((item) => {
        if (item.type !== "checkbox" && item.type !== "date range") {
          return "";
        } else if (item.type === "checkbox") {
          return item.options.map((options) => "");
        } else if (item.type === "date range") {
          return item.required
            ? { Start: "*", End: "*" }
            : { Start: "", End: "" };
        }
      });
      setFormData(arr);
    }
  }, [form]);

  const handleChange = (index, value) => {
    const arr = formData;
    arr[index] = value;
    setFormData(arr);
  };

  const handleDateRange = (index, type, value) => {
    const arr = formData;
    arr[index] = { ...arr[index], [type]: value };
    setFormData(arr);
  };

  const handleCheckBox = (index, value, i) => {
    const arr1 = formData;
    const arr2 = formData[index];
    arr2[i] === "" ? (arr2[i] = value) : (arr2[i] = "");
    arr1[index] = arr2;
    setFormData(arr1);
  };

  const handleSubmit = async () => {
    let canSubmit = true;
    let reqArray = true;
    formData.map((item, index) => {
      if (
        typeof item === "string" &&
        form[index].required === true &&
        item === ""
      ) {
        canSubmit = false;
      } else if (typeof item === "object" && item.Start) {
        if (item.Start === "*" || item.End === "*") {
          canSubmit = false;
        }
      } else if (Array.isArray(item) && form[index].required === true) {
        reqArray = false;
        item.forEach((entry) => {
          if (entry === "") {
          } else {
            reqArray = true;
          }
        });
      }
    });
    if (canSubmit && reqArray) {
      console.log(formData);
      try {
        const response1 = await axios.post(
          `http://localhost:8080/create${id}`,
          { formData: formData, form: form }, // 'form' is my data
          { headers: { "Content-Type": "application/json" } } 
        );
        console.log(response1);
      } catch (error) {
        console.error(error);
      }
      try {
        const response2 = await axios.post(
          `http://localhost:8080/insert${id}`,
          { formData: formData, form: form }, // 'form' is my data
          { headers: { "Content-Type": "application/json" } } 
        );
        console.log(response2);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("* marked fields cannot be empty!");
    }
  };
  const BtnClick = () => {
    window.location.href = "Events";
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
            background-color:#fff;
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
            bottom: -3px;
          }

          footer p {
            margin: 0;
            color: #fff;
          }

          .btn {
            background-color: #1b9bff;
            color: #fff;
            padding: 10px 15px; 
            border: none;
            border-radius: 5px; 
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease; 
            margin-top: 20px; 
          }

          .btn:hover {
            background-color: #155fa0; 
          }

          h2 {
            text-align: center;
            margin-top: 50px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          /* Float four columns side by side */
          .column {
            float: left;
            width: 25%;
            padding: 0 10px;
            box-sizing: border-box;
          }

        
          .row {
            margin: 0 -5px;
            padding-left: 4.5px;
            overflow-x: hidden;
          }

      
          .row:after {
            content: "";
            display: table;
            clear: both;
          }

          /*  to make responsive columns */
          @media screen and (max-width: 600px) {
            .column {
              width: 100%;
              display: block;
              margin-bottom: 20px;
            }
          }

       
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        padding: 16px;
        text-align: center;
        width: 90%;
        margin: 0 auto;
        margin-bottom: 20px;
      }
  
      .link:hover {
        background: none;
        color: inherit;
      }
          
        `}
      </style>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">
          <img className="logo" src="bat_white.png" alt="Your Logo" />
        </label>
        <ul>
          <button className="btn" onClick={BtnClick}>
            Back
          </button>
        </ul>
      </nav>

      <section style={styles.Form}>
        <h2>Fill to be a part of the club</h2>
        <div>
          {form.map((item, index) =>
            item.type === "form name" ? (
              <div key={item.name}>
                <h2>{item.name}</h2>
              </div>
            ) : item.type === "select" ? (
              <div key={item.name} style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                <div style={styles.SelectWrapper}>
                  <select
                    onChange={(e) => handleChange(index, e.target.value)}
                    style={styles.Select}
                  >
                    <option key="0"></option>
                    {item.options.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : item.type === "checkbox" ? (
              <div key={item.name} style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                {item.options.map((option, i) => (
                  <div key={option} style={styles.SelectWrapper}>
                    <input
                      onChange={(e) => handleCheckBox(index, e.target.name, i)}
                      type="checkbox"
                      name={option}
                      id={option}
                    />
                    <label> {option}</label>
                  </div>
                ))}
              </div>
            ) : item.type === "date range" ? (
              <div style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                <div>
                  Start:
                  <input
                    onChange={(e) =>
                      handleDateRange(index, "Start", e.target.value)
                    }
                    style={styles.RangeInput}
                    type="date"
                  />
                  End:
                  <input
                    onChange={(e) =>
                      handleDateRange(index, "End", e.target.value)
                    }
                    style={styles.RangeInput}
                    type="date"
                  />
                </div>
              </div>
            ) : item.type === "Radio" ? (
              <div key={item.name} style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                <div style={styles.InputWrapper}>
                  {item.options.map((option) => (
                    <>
                      <input
                        onChange={(e) => handleChange(index, e.target.value)}
                        type="radio"
                        name={item.name}
                        value={option}
                      />
                      {option}
                    </>
                  ))}
                </div>
              </div>
            ) : (
              <div key={item.name} style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                <div style={styles.InputWrapper}>
                  <input
                    onChange={(e) => handleChange(index, e.target.value)}
                    style={styles.Input}
                    type={item.type}
                  />
                </div>
              </div>
            )
          )}
          <button style={styles.Buttons} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <footer>
        <p>&copy; 2024 Wayen Enterprises. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
export default Eventform;
