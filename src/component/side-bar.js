import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Product from './product.js'
class SideBar extends React.Component {
    render() {
        return (
            <Router>
                <div class="List">
                    <li class="List-iteam">
                        <Link to="/Admin/products">admin</Link>
                        <Link to="/Admin/products">Trang Chủ</Link>
                        <Link to="/Admin/products">Thống Kê</Link>
                        <Link to="/Admin/products">Quan lý</Link>
                        <Link to="/Admin/products">Đơn hàng</Link>
                        <Link to="/Admin/products">Sản phẩm</Link>
                        <Link to="/Admin/products">Danh mục</Link>
                        <Link to="/Admin/products">Tài khoản</Link>
                        <Link to="/Admin/products">Người dùng</Link>
                    </li>
                </div>
                <Switch>
                    <Route path="/Admin/products">
                        <Product />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default SideBar;
