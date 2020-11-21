import React from "react";
import axios from "axios";
import '../style/order.css'
export default class ShowDetail extends React.Component {

    render() {
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
                                    <ul class="info-product-order">
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
                                </div>
                                {(res.status === "pending") && < div class="btn">
                                    <button class="xacnhan-order" >Xác nhận đơn hàng</button>
                                    <button class="huy-order">Hủy đơn hàng</button>

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