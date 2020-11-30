import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import Product from './product.js'
import Order from './order.js'
import Account from './account.js'
import Category from './category.js'
import HomeAdmin from './homeAdmin.js'
class SideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            logout: false
        }
    }

    logout() {
        this.setState({
            logout: true
        })
    }
    render() {
        if (this.state.logout === true) {
            <Redirect to="/" />
            window.location.reload();
        }
        return (
            <div>
                <Router>
                    <div class="List">
                        <li class="List-iteam">
                            <div class="action">
                                <div class="rotor">
                                    <div class="LOGO-H1">
                                        <p >ADMIN</p>
                                    </div>
                                </div>


                            </div>
                            <button class="log-out" onClick={this.logout.bind(this)}>LOG OUT</button>
                            <Link class="link" to="/">Trang Chủ</Link >
                            <Link class="link" to="/Admin/products">Thống Kê</Link>
                            <Link class="link" to="/Admin/order">Đơn hàng</Link>
                            <Link class="link" to="/Admin/products">Sản phẩm</Link>
                            <Link class="link" to="/Admin/category">Danh mục</Link>
                            <Link class="link" to="/Admin/account">Tài khoản</Link>
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

                        <Route path="/Admin/category"  >
                            <Category />
                        </Route>
                        <Route exact path="/Admin">
                            <HomeAdmin />
                        </Route>
                    </Switch>
                </Router >

            </div>
        );


    }
}
export default SideBar;
