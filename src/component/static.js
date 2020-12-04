import React, { Component } from 'react';
import '../style/static.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import callAPI from '../callAPI/callAPI';
import Axios from 'axios';
class Static extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            statusName: '',
            statusValue: '',
            revenue: '',
            data: {},
            status: false
        }

    }
    callAPI() {
        var listOrder = []
        let statusName = []
        let user = ''
        callAPI.callAPI('count_orders', 'GET', listOrder, localStorage.getItem('token')).then((res) => {
            this.setState({
                statusName: Object.keys(res.data.orders),
                statusValue: Object.values(res.data.orders),
            })
        }).then(
            callAPI.callAPI('count_users', 'GET', user, localStorage.getItem('token')).then((res) => {
                this.setState({ user: res.data.user_quantity })
                console.log(this.state.user)
            })).then(
                () => {
                    this.setState({
                        status: true
                    })
                }).then(() => {
                    this.setState({
                        data: {
                            labels: this.state.statusName,
                            datasets: [
                                {
                                    label: 'Chart',
                                    data: this.state.statusValue,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.6)',
                                        'rgba(54, 162, 235, 0.6)',
                                        'rgba(255, 206, 86, 0.6)',
                                        'rgba(75, 192, 192, 0.6)',
                                        'rgba(153, 102, 255, 0.6)',

                                    ]
                                }
                            ]
                        }
                    })
                })
    }

    componentDidMount() {
        this.callAPI();


    }
    render() {

        return (
            <div class="static">
                <div class="static-user">
                    <div class='static-user-content'>
                        <img class="img-background" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAY9x4-O-NnKHQ96ylko8mzE1JM46QT_EwA&usqp=CAU"></img>
                        <p> Hiện có <span>{this.state.user}</span>Tài khoản đã đăng kí</p>
                    </div>
                </div>
                <div class="static-order">
                    <h1>Thống kê đơn hàng</h1>
                    <Bar
                        data={this.state.data}
                        options={{
                            title: {
                                text: 'Largest Cities In ',
                                fontSize: 25
                            },
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Static;