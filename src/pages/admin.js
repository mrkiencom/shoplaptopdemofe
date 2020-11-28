import React from "react";
import "../style/admin.css";
import SideBar from "../component/side-bar.js";
import Product from '../component/production.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
export default class Admin extends React.Component {
    render() {
        return (
            <Router>
                <div className="Admin">
                    <SideBar />

                </div>
            </Router>
        );
    }
}
