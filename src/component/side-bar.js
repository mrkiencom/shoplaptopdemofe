import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Product from './product.js'
import Order from './order.js'
import Account from './account.js'

class SideBar extends React.Component {
    render() {
        return (
            <Router>
                <div class="List">
                    <li class="List-iteam">
                        <h1>ADMIN</h1>
                        <Link class="link" to="/">Trang Chủ</Link>
                        <Link class="link" to="/Admin/products">Thống Kê</Link>
                        <Link class="link" to="/Admin/order">Đơn hàng</Link>
                        <Link class="link" to="/Admin/products">Sản phẩm</Link>
                        <Link class="link" to="/Admin/products">Danh mục</Link>
                        <Link class="link" to="/Admin/account">Tài khoản</Link>
                        <Link class="link" to="/Admin/products">Người dùng</Link>
                    </li>
                </div>
                <Switch>
                    <Route path="/Admin/products">
                        <Product />
                    </Route>
                    <Route path="/Admin/order">
                        <Order />
                    </Route>
                    <Route path="/Admin/account"  >
                        <Account />
                    </Route>

                </Switch>
            </Router>
        );
    }
}
export default SideBar;
