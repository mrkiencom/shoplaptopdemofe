import React from "react";
import { Redirect } from "react-router-dom"
import '../style/login.css'
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            loginstatus: false,
            usename: "",
            password: ""
        }
    }
    btnLogin() {
        return event => {
            this.setState({
                loginstatus: true
            })
            console.log(this.state.loginstatus)
        }
    }
    onchangeName(e) {
        return e => this.setState({
            usename: e.target.value
        })
    }
    onchangePass(e) {
        return e => this.setState({
            password: e.target.value
        })
    }
    render() {
        if (this.state.loginstatus) return <Redirect to="/Admin" />
        return (
            <form action="action_page.php" method="post">
                <div class="title">
                    <h1>LOGIN</h1>
                </div>
                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder=" Username" value={this.state.usename} required onChange={this.onchangeName()} />
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder=" Password" value={this.state.password} required onChange={this.onchangePass()} />

                    <button type="submit" onClick={this.btnLogin()}>Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me
                            </label>
                </div>

                <div class="container" >
                    <span class="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
        )
    }
}