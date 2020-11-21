import React from "react";
import axios from "axios";
import "../style/order.css"
import login from "../callAPI/callAPI.js"
import callAPI from "../callAPI/callAPI.js"
import ShowDetail from "./orderDetail.js"
export default class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            tmplist: [],
            check: [],
            showlist: true,
            selectValue: "",
            checkselectValue: false
        }
    }
    getAPI() {
        const iteam = []
        callAPI.callAPI('orders', 'GET', iteam, localStorage.getItem('token')).then(res => {

            for (var i of res.data.data) {
                iteam.push(i);
            }
            this.setState({
                list: iteam,
                tmplist: iteam
            })
        })
            .catch(error => {
                console.log(error);
            });
        return this.state.list
    }
    componentDidMount() {

        callAPI.login();
        this.getAPI();
    }

    showDetail(key, le) {
        return e => {
            const arrCheck = []
            for (let i = 0; i < le; i++) {
                arrCheck[i] = "false"
            }
            arrCheck[key] = "true";
            this.setState({
                check: arrCheck,
                showlist: false
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
                check: arrCheck,
                showlist: true
            })
        }
    }
    onchangeSelect(e) {
        return e => {
            this.setState({
                selectValue: e.target.value,
                list: e.target.value === "All" ? this.state.tmplist : this.state.tmplist.filter((res, key) => {
                    return res.status === e.target.value
                }),
            })
            console.log(this.state.list)
        }
    }
    render() {
        return (
            <div class="order">
                <div class="title">
                    <h1>ORDER</h1>
                    <select className="select-status" value={this.state.selectValue} onChange={this.onchangeSelect()}>
                        <option value="All">All</option>
                        <option value="shipping">shipping</option>
                        <option value="shipped">shipped</option>
                        <option value="cancelled">cancelled</option>
                        <option value="pending">pending</option>
                    </select>
                </div>
                <div class="list-order">
                    <ul class="list-title">

                        <li> Tên khách hàng</li>
                        <li> Số điện thoại</li>
                        <li> Địa chỉ</li>
                        <li> Ngày đặt</li>
                        <li> Thành tiền </li>
                        <li> Trạng thái</li>
                    </ul>

                    {this.state.list.map((res, key) => {
                        return (
                            <div>
                                {(this.state.showlist) && <ul class="list-info">
                                    <button class="btn-show" onClick={this.showDetail(key, this.state.list.length)}></button>
                                    <li>{res.user_name}</li>
                                    <li>{res.phone}</li>
                                    <li>{res.address}</li>
                                    <li>{res.created_at}</li>
                                    <li>{res.subtotal}</li>
                                    <li class={res.status}>{res.status}</li>
                                </ul>}
                                {(this.state.check[key] === "true") && <div class="form-detail">
                                    <ul class="form-detail">
                                        <button onClick={this.cancer(this.state.list.length)} class="btn-cancer"> x </button>
                                        <ShowDetail res={res} key={key} />
                                    </ul>
                                </div>}
                            </div>
                        )
                    }
                    )}
                </div>
            </div >
        )
    }
}
