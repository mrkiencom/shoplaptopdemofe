import React from "react";
import axios from "axios";
import "../style/account.css"
import callAPI from "../callAPI/callAPI.js"
export default class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    getAPI() {
        const iteam = []
        callAPI.callAPI('users', 'GET', iteam, localStorage.getItem('token')).then(res => {
            for (var i of res.data.data) {
                iteam.push(i);
            }
            this.setState({
                list: iteam,
            })
        })
            .catch(error => {
                console.log(error);
            });
    }
    componentDidMount() {
        callAPI.login();
        this.getAPI();
    }
    render() {
        return (
            <div class="account">
                <h1>Account</h1>
                <ul class="list-title">

                    <li> id</li>
                    <li> Name</li>
                    <li> Phone</li>
                    <li> Email</li>
                    <li> Address </li>
                    <li> Cart</li>
                </ul>
                {this.state.list.map((res, key) => {
                    return <ul class="list-info">
                        <li>{res.id}</li>
                        <li>{res.name}</li>
                        <li>{res.phone}</li>
                        <li>{res.email}</li>
                        <li>{res.address}</li>
                        <li>{res.cart.id}</li>
                    </ul>
                })}
            </div>
        )
    }
}