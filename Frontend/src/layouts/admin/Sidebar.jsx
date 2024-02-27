import React from "react";
import { Link } from "react-router-dom";

const styles = {
    Sidebar: {
        minHeight: "100vh",
        width: "13%",
        backgroundColor: "#0E050F",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    ItemNormal: {
        height: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0E050F",
        fontFamily: "Poppins",
    },
    LinkNormal: {
        height: "100%",
        width: "100%",
        textDecoration: "none",
        color: "white",
        fontFamily: "Poppins",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    SelectedItem: {
        height: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        color: "#0E050F"
    },
    SelectedLink: {
        textDecoration: "none",
        color: "#0E050F",
        fontFamily: "Poppins"
    }
}

export default function Sidebar(){   
    return (
        <div style={styles.Sidebar}>
            <div style={styles.ItemNormal} onMouseOver={(e)=>e.target.style.backgroundColor="white"} onMouseOut={(e)=>e.target.style.backgroundColor="#0E050F"}>
                <Link style={styles.LinkNormal} onMouseOver={(e)=>e.target.style.color="#0E050F"} onMouseOut={(e)=>e.target.style.color="white"} to="/home/new">New Club</Link>
            </div>
            <div style={styles.ItemNormal} onMouseOver={(e)=>e.target.style.backgroundColor="white"} onMouseOut={(e)=>e.target.style.backgroundColor="#0E050F"}>
                <Link style={styles.LinkNormal} onMouseOver={(e)=>e.target.style.color="#0E050F"} onMouseOut={(e)=>e.target.style.color="white"} to="/home/clubs">Clubs</Link>
            </div>
            <div style={styles.ItemNormal} onMouseOver={(e)=>e.target.style.backgroundColor="white"} onMouseOut={(e)=>e.target.style.backgroundColor="#0E050F"}>
                <Link style={styles.LinkNormal} onMouseOver={(e)=>e.target.style.color="#0E050F"} onMouseOut={(e)=>e.target.style.color="white"} to="/home/settings">Settings</Link>
            </div>
            <div style={{marginTop: "1rem"}}>
                <img height="150rem" src="https://qr-official.line.me/gs/M_751csufi_BW.png?oat_content=qr"/>
            </div>
        </div>
    );
}