import React from "react";
import axios from "axios";
import "../style/account.css"
import callAPI from "../callAPI/callAPI.js"
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail'
import UserDetail from './userDetail'
export default class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            showViewAddDetail: false,
            showViewMain: true,
            name: '',
            email: '',
            pass: '',
            phone: '',
            address: '',
            msg: "",
            showDetailUser: [],
            checkload: false,
        }
    }
    checkValidate = () => {
        const msg = {}
        if (isEmpty(this.state.email)) {
            msg.email = "Email isEmpty !"
        }
        if (isEmpty(this.state.name)) {
            msg.name = "Name isEmpty !"
        }
        if (isEmpty(this.state.pass)) {
            msg.pass = "Password isEmpty !"
        }
        if (isEmpty(this.state.phone)) {
            msg.phone = "Phone isEmpty !"
        }
        if (isEmpty(this.state.address)) {
            msg.address = "Address isEmpty !"
        }
        if (isEmail(this.state.email) === false) {
            msg.email = "Email Error"
        }
        this.setState({
            msg: msg,
        })
        if (Object.keys(msg).length > 0) return false;
        return true
    }
    getAPI() {
        const iteam = []
        callAPI.callAPI('users', 'GET', iteam, localStorage.getItem('token')).then(res => {
            for (var i of res.data.data) {
                iteam.push(i);
            }
            iteam.sort(function (a, b) {
                return a.id - b.id;
            })
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
    showViewAddDetail() {
        this.setState({
            showViewAddDetail: true,
            showViewMain: false,
            msg: ""
        })
        console.log("xx")
    }

    close() {
        return e => {
            this.setState({
                showViewMain: true,
                showViewAddDetail: false
            })
        }
    }
    changeValueName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    changeValueEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    changeValuePass = (event) => {
        this.setState({
            pass: event.target.value
        })
    }
    changeValuePhone = (event) => {
        this.setState({
            phone: event.target.value
        })
    }
    changeValueAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    addAccept() {
        return e => {
            const list = {
                "name": this.state.name,
                "email": this.state.email,
                "phone": parseInt(this.state.phone),
                "address": this.state.address,
                "password": parseInt(this.state.pass),
            }
            const value = this.checkValidate();
            if (value) {
                callAPI.callAPI('users', 'POST', list, localStorage.getItem('token')).then(res => {
                    console.log(res)
                    window.location.reload()
                }).catch(err => {
                    console.log("err")
                })
                this.setState({
                    showViewMain: true,
                    showViewAddDetail: false,

                })
                console.log(list)

            }


        }

    }
    showDetailUser(key, le) {
        return e => {
            const arrCheck = []
            for (let i = 0; i < le; i++) {
                arrCheck[i] = "false"
            }
            arrCheck[key] = "true";
            this.setState({
                showDetailUser: arrCheck,
                showViewMain: false,

            })
            console.log(this.state.check)
            console.log(key)
        }
    }
    cancer(le) {
        const arrCheck = []
        for (let i = 0; i < le; i++) {
            arrCheck[i] = "false"
        }
        return e => {
            this.setState({
                showDetailUser: arrCheck,
                showViewMain: true
            })
        }
    }
    changeSearch = (event) => {
        this.setState({
            valueSearch: event.target.value
        })
        const iteam = [];

        axios({
            method: 'GET',
            url: 'https://shop-laptop-2020.herokuapp.com/v1/users',
            data: iteam,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            params: {
                search: event.target.value
            }
        }
        ).then((res) => {
            for (var i of res.data.data) {
                iteam.push(i);
            }
            iteam.sort(function (a, b) {
                return a.id - b.id;
            })
            this.setState({
                list: iteam,
                check: true
            });
        })
            .catch((error) => console.log(error));

    }
    render() {
        return (
            <div class="account">
                <h1>Account</h1>
                <div class="chuc-nang">
                    <input value={this.state.valueSearch} onChange={event => this.changeSearch(event)} placeholder="Bạn cần tìm gì" ></input>
                    <button class="Add-product" onClick={this.showViewAddDetail.bind(this)}>Thêm mới</button>
                </div>

                {(this.state.showViewAddDetail === true) && <div class="form-edit">
                    <ul class="add-product">
                        <div class="add-user">
                            <h1>Thêm mới tài khoản</h1>
                            <li> <label>Full Name</label><input type="add" onChange={event => this.changeValueName(event)}></input><p class="msg-err">{this.state.msg.name}</p></li>
                            <li> <label>Email</label><input type="add" onChange={event => this.changeValueEmail(event)}></input><p class="msg-err">{this.state.msg.email}</p></li>
                            <li> <label>Passwords</label><input type="password" onChange={event => this.changeValuePass(event)}></input><p class="msg-err">{this.state.msg.pass}</p></li>
                            <li> <label>Phone</label><input type="add" onChange={event => this.changeValuePhone(event)}></input><p class="msg-err">{this.state.msg.phone}</p></li>
                            <li> <label>Address</label><input type="add" onChange={event => this.changeValueAddress(event)}></input><p class="msg-err">{this.state.msg.address}</p></li>
                            <button class="xac-nhan" onClick={this.addAccept()}>Xác nhận</button>
                            <button class="huy" onClick={this.close()}>Hủy</button>
                        </div>
                    </ul>

                </div >}

                <ul class="list-title">
                    <li> id</li>
                    <li> Name</li>
                    <li> Phone</li>
                    <li> Email</li>
                    <li> Address </li>
                    <li> Cart</li>
                </ul>
                {
                    this.state.list.map((res, key) => {
                        return (
                            <div>
                                <ul className="list-info">
                                    <button class={(this.state.showViewMain) ? "btn-show" : "disable"} onClick={this.showDetailUser(key, this.state.list.length)} ></button>
                                    <li>{res.id}</li>
                                    <li>{res.name}</li>
                                    <li>{res.phone}</li>
                                    <li>{res.email}</li>
                                    <li>{res.address}</li>
                                    <li>{res.cart.id}</li>
                                </ul>
                                {(this.state.showDetailUser[key] === "true") && <div class="form-detail">
                                    <ul class="form-detail-user">
                                        <button onClick={this.cancer(this.state.list.length)} class="btn-cancer"> x </button>
                                        <UserDetail res={res} key={key} />
                                    </ul>
                                </div>
                                }
                            </div>

                        )

                    })
                }
            </div >
        )
    }
}