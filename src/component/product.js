import React from "react";
import axios from "axios";
import CallAPI from '../callAPI/callAPI.js';
export default class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            check: false,
            checkEdit: [],
            id: '',
            name: '',
            price: '',
            ram: '',
            quantity: '',
            status: false,
            statusAddProduct: false
        };
    }
    getAPI() {
        var iteam = [];
        axios
            .get(
                `
    https://shop-laptop-2020.herokuapp.com/v1/products`
            )
            .then((res) => {
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
    componentDidMount() {
        console.log("did mouse")
        this.getAPI();

    }
    componentDidUpdate(nextProps, prevState) {
        console.log(this.state.status)
        if (this.state.status === true) {
            this.getAPI();
            this.setState({
                status: false
            })
        }
    }
    editProduct(x) {
        const arrCheck = [];
        for (var i = 0; i < x; i++) {
            arrCheck[i] = "false";
        }
        arrCheck[x] = "true";
        return (event) => {
            this.setState({
                checkEdit: arrCheck,
                id: this.state.list[x].id,
                name: this.state.list[x].name,
                price: this.state.list[x].price,
                ram: this.state.list[x].ram,
                quantity: this.state.list[x].quantity,
            })
            console.log(this.state.list[x].id)
        }
    }
    close(key) {
        const arrCheck = [];
        for (var i = 0; i < key; i++) {
            arrCheck[i] = "false";
        }
        return (event) => {
            this.setState({
                checkEdit: arrCheck,
                statusAddProduct: false
            })
        }
    }
    changeValueEditId = (event) => {
        this.setState({
            id: event.target.value,
        })
    }
    changeValueEditName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }
    changeValueEditPrice = (event) => {
        this.setState({
            price: event.target.value,
        })
    }
    changeValueEditRam = (event) => {
        this.setState({
            ram: event.target.value,
        })
    }
    changeValueEditQuantity = (event) => {
        this.setState({
            quantity: event.target.value,
        })
    }
    update(key, id) {
        const arrCheck = [];
        for (var i = 0; i < key; i++) {
            arrCheck[i] = "false";
        }
        const iteam = {
            "id": this.state.id,
            "name": this.state.name,
            "price": this.state.price,
            "ram": this.state.ram,
            "quantity": this.state.quantity,
        }
        return (event) => {
            console.log(iteam);
            axios.put(`https://shop-laptop-2020.herokuapp.com/v1/products/${id}`, iteam, {

            })
                .then(repos => {
                    console.log(iteam);

                }).catch(err => {
                    console.log("error")
                })
            this.setState({
                checkEdit: arrCheck,
                status: true
            })
            this.getAPI()
        }
    }

    delete(id) {
        const iteam = {
            "id": this.state.id,
            "name": this.state.name,
            "price": this.state.price,
            "ram": this.state.ram,
            "quantity": this.state.quantity,
        }
        return (event) => {
            console.log(iteam);
            axios.delete(`https://shop-laptop-2020.herokuapp.com/v1/products/${id}`, {

            })
                .then(repos => {
                    console.log(iteam);

                }).catch(err => {
                    console.log("error")
                })
            this.setState({
                status: !this.state.status
            })
            this.getAPI()
        }
    }
    addProduct() {
        return event => {
            this.setState({
                statusAddProduct: true
            })
        }
    }
    addProductAccept() {
        const iteam = {
            "category_id": this.state.id,
            "name": this.state.name,
            "price": this.state.price,
            "quantity": this.state.quantity,
            "ram": this.state.ram,
            "memory": null,
            "picture": {
                "url": null
            },
            "category": {
                "id": null,
                "name": "DELL",
                "description": "strong"
            }
            // "product": {
            //     "category_id": 15,
            //     "name": "Macbook of kien",
            //     "price": 10,
            //     "quantity": 1110,
            //     "ram": null,
            //     "memory": null,
            //     "picture": {
            //         "url": null
            //     },
            //     "category": {
            //         "id": null,
            //         "name": "DELL",
            //         "description": "strong"
            //     }
            // }
        }
        return (event) => {
            axios.post(`https://shop-laptop-2020.herokuapp.com/v1/posts`, iteam
            ).then(x => console.log(iteam)).catch(err => console.log("err"));
            this.setState({
                statusAddProduct: false
            })
            this.getAPI()
            console.log(iteam)
        }
    }
    render() {
        console.log("render");
        const iteam = this.state.list[1];
        return (
            < div className="product" >
                <div class="type-name">
                    <h1>Danh Sách sản phẩm</h1>
                    <input placeholder="Bạn cần tìm gì" ></input>
                    <button class="Add-product" onClick={this.addProduct()}>Thêm mới</button>
                    {(this.state.statusAddProduct) && <div class="form-edit">
                        <ul class="add-product">
                            <div><h1>Thêm mới</h1></div>
                            <li> <label>ID</label><input type="add" onChange={event => this.changeValueEditId(event)}></input></li>
                            <li> <label>Name</label><input type="add" onChange={event => this.changeValueEditName(event)}></input></li>
                            <li> <label>Price</label><input type="add" onChange={event => this.changeValueEditPrice(event)}></input></li>
                            <li> <label>quantity</label><input type="add" onChange={event => this.changeValueEditQuantity(event)}></input></li>
                            <li> <label>RAM</label><input type="add" onChange={event => this.changeValueEditRam(event)}></input></li>
                            <button class="xac-nhan" onClick={this.addProductAccept()}>Xác nhận</button>
                            <button class="huy" onClick={this.close(1)}>Hủy</button>
                        </ul>
                    </div>}
                    <ul class="value-name">
                        <li>Mã sản phẩm</li>
                        <li>Tên sản phẩm</li>
                        <li>Giá </li>
                        <li>Số lượng</li>
                        <li>Ram (gb)</li>
                    </ul>
                </div>
                <div class="info">
                    {this.state.check && (
                        this.state.list.map((info, key) => {
                            return <div>
                                <ul>
                                    <ul class="info-product">
                                        <li>
                                            {info.id}
                                        </li>
                                        <li> {info.name}</li>
                                        <li> {info.price}</li>
                                        <li> {info.quantity}</li>
                                        <li> {info.ram}</li>
                                        <button class="edit" onClick={this.editProduct(key)}>Edit</button>
                                        <button class="delete" onClick={this.delete(info.id)}>Xóa</button>
                                    </ul>
                                </ul>
                                {
                                    (this.state.checkEdit[key] === "true") &&
                                    <div class="form-edit">
                                        <ul class="edit">
                                            <div><h1>Chỉnh sửa</h1></div>
                                            <li> <label>ID</label><input value={this.state.id} type="edit" onChange={event => this.changeValueEditId(event)}></input></li>
                                            <li> <label>Name</label><input value={this.state.name} type="edit" onChange={event => this.changeValueEditName(event)}></input></li>
                                            <li> <label>Price</label><input value={this.state.price} type="edit" onChange={event => this.changeValueEditPrice(event)}></input></li>
                                            <li> <label>quantity</label><input value={this.state.quantity} type="edit" onChange={event => this.changeValueEditQuantity(event)}></input></li>
                                            <li> <label>RAM</label><input value={this.state.ram} type="edit" onChange={event => this.changeValueEditRam(event)}></input></li>
                                            <button class="xac-nhan" onClick={this.update(key, this.state.id)}>Xác nhận</button>
                                            <button class="huy" onClick={this.close(key)}>Hủy</button>
                                        </ul>
                                    </div>
                                }
                            </div>
                        })
                    )
                    }
                </div>
            </div >
        );
    }
}
