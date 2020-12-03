import React, { Component } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail'
import callAPI from '../callAPI/callAPI';
class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            showViewAddDetail: false,
            showViewMain: true,
            name: props.res.name,
            email: props.res.email,
            phone: props.res.phone,
            address: props.res.address,
            msg: {},
            showDetailUser: [],
            textdisable: true,
            formedit: false,
            checkload: false,
            listHistoryOrder: [],
            err: true
        }
    }
    componentDidMount() {
        console.log("component ")
    }
    checkValidate = () => {
        const msg = {}
        if (isEmpty(this.state.email)) {
            msg.email = "Email isEmpty !"
        }
        if (isEmpty(this.state.name)) {
            msg.name = "Name isEmpty !"
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
    formEdit() {
        this.setState({
            textdisable: false,
            formedit: true,
        })
    }
    Accept() {

        const value = this.checkValidate();
        const list = {
            "name": this.state.name,
            "email": this.state.email,
            "phone": this.state.phone,
            "address": this.state.address
        }
        if (value === true) {
            callAPI.callAPI("users/" + `${this.props.res.id}`, 'PUT', list, localStorage.getItem('token')).then(res => window.location.reload());
            {
                this.setState({
                    checkload: true
                })

            }
        }
    }
    delete() {
        return e => {
            callAPI.callAPI("users/" + `${this.props.res.id}`, 'DELETE', null, localStorage.getItem('token')).then(res => window.location.reload())
        }
    }
    render() {

        console.log("history", this.state.listHistoryOrder)
        return (
            <div class="user-detail">
                <div class="add-user">
                    <h1>Thông tin </h1>
                    <li> <label>Full Name</label><input class={(this.state.textdisable === true) ? "disable" : "andisable"} type="add" value={this.state.name} onChange={event => this.changeValueName(event)}></input><p class="msg-err">{this.state.msg.name}</p></li>
                    <li> <label>Email</label><input class={(this.state.textdisable === true) ? "disable" : "andisable"} type="add" value={this.state.email} onChange={event => this.changeValueEmail(event)}></input><p class="msg-err">{this.state.msg.email}</p></li>
                    <li> <label>Phone</label><input class={(this.state.textdisable === true) ? "disable" : "andisable"} type="add" value={this.state.phone} onChange={event => this.changeValuePhone(event)}></input><p class="msg-err">{this.state.msg.phone}</p></li>
                    <li> <label>Address</label><input class={(this.state.textdisable === true) ? "disable" : "andisable"} type="add" value={this.state.address} onChange={event => this.changeValueAddress(event)}></input><p class="msg-err">{this.state.msg.address}</p></li>
                    {(this.state.formedit === false)
                        &&
                        <div div div class="edit-button">
                            <button class="xac-nhan" onClick={this.formEdit.bind(this)}>Edit</button>
                            <button class="huy" onClick={this.delete()}>DELETE</button>
                        </div>
                    }
                    {(this.state.formedit === true)
                        &&
                        <div div div class="edit-button">
                            <button class="xac-nhan" onClick={this.Accept.bind(this)}>Accept</button>

                        </div>
                    }
                </div>


            </div >
        );
    }
}

export default UserDetail;