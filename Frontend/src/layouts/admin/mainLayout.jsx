import React, { useState } from "react";
import Topbar from "../admin/Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const styles = {
    page: {
        display: "flex",
    },
    outlet: {
        flex: "1",
        backgroundColor: "white",
    }
}
export default function mainLayout(){
    const [isClicked, setIsClicked] = useState(true);

    return (
        <>
        <Topbar clicked={isClicked} handleClick={setIsClicked}/>
        <div style={styles.page}>
            {isClicked && <Sidebar/>}
            <div style={styles.outlet}>
                <Outlet/>
            </div>
        </div>
        </>
    );
}