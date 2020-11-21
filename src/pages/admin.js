import React from "react";
import "../style/admin.css";
import SideBar from "../component/side-bar.js";

export default class Admin extends React.Component {
    render() {
        return (
            <div className="Admin">
                <SideBar />
            </div>
        );
    }
}
