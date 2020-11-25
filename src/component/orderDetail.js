import React from "react";
import axios from "axios";
import '../style/order.css'
import login from "../callAPI/callAPI"
import callAPI from "../callAPI/callAPI"
import { Redirect } from "react-router-dom"
export default class ShowDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            check: false,
            message: "",
            checkload: false
        }
    }
    accept() {
        return e => {
            this.setState({
                check: true,
                message: "accept"

            })
        }
    }
    done() {
        return e => {
            this.setState({
                check: true,
                message: "done"

            })
        }
    }
    cancel() {
        return e => {
            this.setState({
                check: true,
                message: "deny"
            })
        }
    }
    xacnhan(res) {
        callAPI.login();
        if (this.state.message === "accept") callAPI.callAPI('orders/' + `${res}` + '/approve', 'PATCH', res, localStorage.getItem('token'))
        if (this.state.message === "deny") callAPI.callAPI('orders/' + `${res}` + '/deny', 'PATCH', res, localStorage.getItem('token'))
        if (this.state.message === "done") callAPI.callAPI('orders/' + `${res}` + '/done', 'PATCH', res, localStorage.getItem('token'))
        return e => {
            this.setState({
                checkload: true
            })
        }
    }
    render() {
        if (this.state.checkload === true) return window.location.reload();
        const res = [];
        res.push(this.props.res);
        return (
            <div>
                {
                    res.map((res, key) => {
                        return (
                            <div class="form-main">
                                <div class="info-customer">
                                    <h2>Thông tin người nhận</h2>
                                    <ul class="info-customer">
                                        <li>
                                            <span>Mã khách hàng:</span>
                                            {res.user.id}
                                        </li>
                                        <li>
                                            <span>Tên khách hàng:</span>
                                            {res.user_name}
                                        </li>
                                        <li>
                                            <span>Tên người nhận:</span>
                                            {res.user.name}
                                        </li>
                                        <li>
                                            <span>Email:</span>
                                            {res.user.email}
                                        </li>
                                        <li>
                                            <span>Địa chỉ:</span>
                                            {res.user.address}
                                        </li>
                                        <li>
                                            <span>SĐT:</span>
                                            {res.user.phone}
                                        </li>

                                    </ul>
                                </div>
                                <div class="info-product-order">
                                    <h2>Thông tin sản phẩm</h2>
                                    {(res.order_items[0] !== '') && <ul class="info-product-order">
                                        <li>
                                            <span>Mã sản phẩm:</span>
                                            {res.order_items[0].id}
                                        </li>
                                        <li>
                                            <span>Tên sản phẩm:</span>
                                            {res.order_items[0].product_name}
                                        </li>
                                        <li>
                                            <span>Số lượng:</span>
                                            {res.order_items[0].quantity}
                                        </li>
                                        <li>
                                            <span>Ngày đặt hàng:</span>
                                            {res.created_at}
                                        </li>
                                        <li>
                                            <span>Tổng tiền:</span>
                                            {res.order_items[0].unit_price}
                                        </li>
                                        <li >
                                            <span>Trạng thái:</span>
                                            <span class={res.status}>{res.status}</span>
                                        </li>
                                    </ul>
                                    }
                                </div>
                                {(res.status === "pending") && < div class="btn">
                                    {(this.state.check === false) && <div class="btn">
                                        <button class="xacnhan-order" onClick={this.accept(res.order_items[0].id)}>Xác nhận đơn hàng ! </button>
                                        <button class="huy-order" onClick={this.cancel(res.order_items[0].id)}>Hủy đơn hàng !</button>
                                    </div>
                                    }
                                </div>
                                }
                                {(res.status === "shipping") && <div class="btn">
                                    {(this.state.check === false) && <div class="btn">
                                        <button class="xacnhan-order" onClick={this.done()}> done !</button>
                                    </div>
                                    }
                                </div>
                                }


                                {(this.state.check === true) && <div class="btn">
                                    <button class="hoan-thanh-xac-nhan" onClick={this.xacnhan(res.order_items[0].id)}>Hoàn thành xác nhận!</button>
                                    <button class="huy-xac-nhan" onClick={e => this.setState({ check: !this.state.check })}>Hủy xác nhận !</button>
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