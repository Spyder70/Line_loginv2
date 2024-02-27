import React from "react";
import bat_white from "../../../public/bat_white.png";
import { useNavigate } from "react-router-dom";


const styles = {
  Header: {
    height: "10vh",
    width: "100%",
    marginBottom: "0.1rem",
    color: "white",
    backgroundColor: "#0E050F",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  Image: {
    height: "50px",
    marginRight: "600px",
    cursor: "pointer"
  },
  Logout: {
    margin: "0",
    padding: "0.35rem",
    border: "none",
    borderRadius: "5%",
    backgroundColor: "inherit",
    color: "white",
    marginLeft: "550px",
    marginRight: "50px",
    fontFamily: "Poppins",
    cursor: "pointer"
  },
};

export default function Topbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show alert
    alert('You have Successfully logged out');
  
    // Redirect to '/'
    navigate('/');
  };
  
  return (
    <div style={styles.Header}>
      <img
        style={styles.Image}
        onClick={
          props.clicked
            ? () => props.handleClick(false)
            : () => props.handleClick(true)
        }
        src={bat_white}
        alt="batman"
      />
        <button
      onMouseOver={(e) => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#0E050F';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = 'inherit';
        e.target.style.color = 'white';
      }}
      onClick={handleLogout}
      style={styles.Logout}
    >
      Logout
    </button>
    </div>
  );
}
