import React from "react";
import axios from "axios";
import CallAPI from '../callAPI/callAPI.js';
import "../style/product.css"
import DetailProduct from "./detailProduct";
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiDetail } from 'react-icons/bi';
import { FcNumericalSorting12 } from 'react-icons/fc';
import { FcNumericalSorting21 } from 'react-icons/fc';


import callAPI from "../callAPI/callAPI.js";
import isEmpty from 'validator/lib/isEmpty';
export default class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            listC: [],
            check: false,
            checkEdit: [],
            id: '',
            name: '',
            price: '',
            ram: '',
            quantity: '',
            status: false,
            statusAddProduct: false,
            valueSearch: '',
            category: "",
            checkDetail: [],
            reload: false,
            imgName: '',
            mota: '',
            msg: {},
            selectCategori: '',
            listTMP: '',
            sortPrice: false,
            namePrice: <FcNumericalSorting12 />
        }
    }
    getAPI() {
        var iteam = [];
        let iteamC = []
        callAPI.callAPI('products', 'GET', iteam, null).then((res) => {
            for (var i of res.data.data) {
                iteam.push(i);
            }
            iteam.sort(function (a, b) {
                return a.id - b.id;
            })
            this.setState({
                list: iteam,
                listTMP: iteam,
                check: true
            });
        })
            .catch((error) => console.log(error));
        callAPI.callAPI('categories', 'GET', iteamC, localStorage.getItem('token')).then((res) => {
            console.log(res)
            for (var i of res.data.data) {
                iteamC.push(i);
            }

            iteamC.sort(function (a, b) {
                return a.id - b.id;
            })
            this.setState({
                listC: iteamC,
                check: true
            });
        })
            .catch((error) => console.log(error));
    }
    cancer(le) {
        const arrCheck = []
        for (let i = 0; i < le; i++) {
            arrCheck[i] = "false"
        }
        return e => {
            this.setState({
                checkDetail: arrCheck,
                showlist: true
            })
        }
    }
    componentDidMount() {
        console.log("did mouse")
        this.getAPI();

    }
    checkValidate = () => {
        const msg = {}
        if (isEmpty(this.state.category) || this.state.category === "0") {
            msg.select = "select category please ! "
        }
        if (isEmpty(this.state.name)) {
            msg.name = "Name isEmpty"
        }
        if (isEmpty(this.state.price)) {
            msg.price = "Price isEmpty"
        }
        this.setState({ msg: msg })
        if (Object.keys(msg).length > 0) return true
        return false
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
                category: this.state.list[x].category.id,
                name: this.state.list[x].name,
                price: this.state.list[x].price,
                ram: this.state.list[x].ram,
                quantity: this.state.list[x].quantity,
            })
            console.log(this.state.list[x])

        }
    }
    detailProduct(x) {
        const arrCheck = [];
        for (var i = 0; i < x; i++) {
            arrCheck[i] = "false";
        }
        arrCheck[x] = "true";
        return (event) => {
            this.setState({
                checkDetail: arrCheck,
            })

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
                statusAddProduct: false,
                msg: ''
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

        return (event) => {
            const iteam = {
                "category_id": this.state.category,
                "name": this.state.name,
                "price": this.state.price,
                "quantity": this.state.quantity,
                "ram": this.state.ram,
                "memory": null,
                "picture": {
                    "url": "hlllo"
                },
            }
            callAPI.callAPI('products/' + `${this.state.id}`, 'PUT', iteam, null).then(res => window.location.reload())
            this.setState({
                checkEdit: arrCheck,
                status: true,
                reload: true
            })
            console.log(this.state.category)
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
                    window.location.reload()

                }).catch(err => {
                    console.log("error")
                })
            this.setState({
                status: !this.state.status
            })
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
        const check = this.checkValidate();
        if (!check) {

            const iteam = {
                "category_id": this.state.category,
                "name": this.state.name,
                "price": this.state.price,
                "quantity": this.state.quantity,
                "ram": this.state.ram,
                "memory": null,
                "picture": {
                    "url": this.state.imgName
                },
                "description": this.state.mota,
            }
            callAPI.callAPI('products', 'POST', iteam, null).then(res => {
                window.location.reload()
                window.alert("thanh cong")
            }).catch(err => {
                console.log("err");
                window.alert('Thêm sản phẩm that bai !', err)
            })
            this.setState({
                statusAddProduct: false,
                reload: true
            })
        }
    }

    changeSearch = (event) => {
        this.setState({
            valueSearch: event.target.value
        })
        const iteam = [];
        axios
            .get(
                `
            https://shop-laptop-2020.herokuapp.com/v1/products`,
                {
                    params: {
                        search: event.target.value
                    }
                }
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
    changeCategory(e) {
        return e => {
            this.setState({
                category: e.target.value
            })

        }
    }
    upLoadIMG = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                imgName: URL.createObjectURL(img)
            });
        }
    }
    changeMOTA = (event) => {
        this.setState({ mota: event.target.value })

    }

    changeSelectCategori = (event) => {
        const iteam = this.state.listTMP
        this.setState({
            list: (event.target.value === "All") ? iteam : iteam.filter((res, key) => res.category.id == event.target.value),
            selectCategori: event.target.value,
        })
        console.log(this.state.listTMP)
    }
    sortPrice() {

        this.setState({
            sortPrice: !this.state.sortPrice,
            namePrice: (this.state.sortPrice) ? <FcNumericalSorting12 /> : <FcNumericalSorting21 />,
            list: this.state.list.sort((a, b) => {
                return (this.state.sortPrice === false) ? b.price - a.price : a.price - b.price
            })
        })

    }
    render() {

        return (
            < div className="product" >
                <div class="type-name">
                    <h1>Danh Sách sản phẩm</h1>
                    <div class="padding">
                        <select value={this.state.selectCategori} onChange={(event) => this.changeSelectCategori(event)}>
                            <option class="select-status" value="All">All</option>
                            {this.state.listC.map((resC, keyC) => {
                                return <option value={resC.id}>{resC.name}</option>
                            })}
                        </select>
                        <input class="search-txt" value={this.state.valueSearch} onChange={event => this.changeSearch(event)} placeholder="Bạn cần tìm gì" ></input>


                    </div>

                    {/* {form add } -------------------------------------------------------------------------*/}

                    {(this.state.statusAddProduct) && <div class="form-edit">
                        <ul class="edit">
                            <div><h1>Thêm mới</h1></div>
                            <label>
                                <p>Dòng</p>
                                <select value={this.state.category} onChange={this.changeCategory()}>
                                    <option value='0'>SELECT</option>
                                    {this.state.listC.map((res, key) => {
                                        return <option value={res.id}>{res.name}</option>
                                    })}
                                </select>

                            </label>
                            <p class="msg-err">{this.state.msg.select}</p>
                            <li>

                                <label>Name</label><input type="add" onChange={event => this.changeValueEditName(event)}></input>
                                <p class="msg-err">{this.state.msg.name}</p>
                            </li>
                            <li> <label>Price</label><input type="add" onChange={event => this.changeValueEditPrice(event)}></input>
                                <p class="msg-err">{this.state.msg.price}</p>

                            </li>
                            <li> <label>quantity</label><input type="add" onChange={event => this.changeValueEditQuantity(event)}></input></li>
                            <li> <label>RAM</label><input type="add" onChange={event => this.changeValueEditRam(event)}></input></li>
                            <li>
                                <label>Image</label>
                                <input type="file" onChange={event => this.upLoadIMG(event)}></input>
                            </li>
                            <li> <label>Mo Ta </label><input type="add" onChange={event => this.changeMOTA(event)}></input></li>
                            <button class="xac-nhan" onClick={this.addProductAccept.bind(this)}>Xác nhận</button>
                            <button class="huy" onClick={this.close(1)}>Hủy</button>
                        </ul>
                    </div>}
                    <ul class="value-name">
                        <li>Dòng sản phẩm</li>
                        <li>Tên sản phẩm</li>
                        <li onClick={this.sortPrice.bind(this)}> <a href="#"> Giá {this.state.namePrice} </a></li>
                        <li>Số lượng</li>
                        <li>Ram (gb)</li>
                        <li><button class="Add-product-bnt" onClick={this.addProduct()}>Thêm mới</button></li>
                    </ul>
                </div>
                <div class="info">
                    {this.state.check && (
                        this.state.list.map((info, key) => {
                            return <div>
                                <ul>
                                    <ul class="info-product">
                                        <li>
                                            {info.category.name}
                                        </li>
                                        <li> {info.name}</li>
                                        <li> {info.price}</li>
                                        <li> {info.quantity}</li>
                                        <li> {info.ram}</li>
                                        <button class="btn-detail-product" onClick={this.detailProduct(key)}><BiDetail /></button>
                                        <button class="edit" onClick={this.editProduct(key)}><BiEdit /></button>

                                        <button class="delete" onClick={this.delete(info.id)}><RiDeleteBin6Line /></button>
                                    </ul>
                                </ul>

                                {(this.state.checkDetail[key] === "true") && <div class="main-detail-product">
                                    <ul class="detail-product">
                                        <button onClick={this.cancer(this.state.list.length)} class="btn-cancer"> x </button>
                                        <DetailProduct res={info} />
                                    </ul>

                                </div>}

                                {
                                    (this.state.checkEdit[key] === "true") &&
                                    <div class="form-edit">
                                        <ul class="edit">
                                            <div><h1>Chỉnh sửa</h1></div>
                                            {/* <li> <label>ID</label><input value={this.state.id} type="edit" onChange={event => this.changeValueEditId(event)}></input></li> */}
                                            <li>
                                                <p>Dòng</p>
                                                <select value={this.state.category} onChange={this.changeCategory()} >
                                                    {/* <option value="3"> Macbook</option>
                                                    <option value="2">Dell</option>
                                                    <option value="1">HP</option> */}
                                                    {this.state.listC.map((resC, key) => {
                                                        return <option value={resC.id}>{resC.name}</option>
                                                    })}
                                                </select>
                                            </li>
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
