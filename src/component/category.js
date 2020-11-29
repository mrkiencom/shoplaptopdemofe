import React, { Component } from 'react';
import '../style/category.css'
import login from '../callAPI/callAPI'
import callAPI from '../callAPI/callAPI'
class Category extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            showViewEdit: [],
            id: '',
            name: '',
            description: '',
            showViewAdd: false,
            addname: '',
            adddescription: '',
            showViewAddProduct: [],
            listProduct: [],
            listcheckbox: []
        }
    }
    getAPI() {
        var iteam = [];
        callAPI.callAPI('categories', 'GET', iteam, localStorage.getItem('token')).then((res) => {
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
            console.log(this.state.list)
        })
            .catch((error) => console.log(error));

        var iteamProduct = []
        callAPI.callAPI('products', 'GET', iteamProduct, localStorage.getItem('token')).then(res => {
            for (var i of res.data.data) {
                iteamProduct.push(i);
            }
            console.log(res)
            iteamProduct.sort(function (a, b) {
                return a.id - b.id;
            })
            this.setState({
                listProduct: iteamProduct,
                check: true
            });
        })
    }
    componentDidMount() {
        callAPI.login()
        this.getAPI();

    }

    changeId = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    changeName = (e) => {

        this.setState({
            name: e.target.value,
            addname: e.target.addname,
        })

    }
    changedesciption = (e) => {

        this.setState({
            description: e.target.value,
            adddescription: e.target.value,
        })

    }

    editCategory(res, key) {
        const showViewEdit = []
        for (let i = 0; i < this.state.list.length; i++) {
            showViewEdit[i] = 'false'
        }
        showViewEdit[key] = 'true'
        return e => {
            this.setState({
                showViewEdit: showViewEdit,
                id: res.id,
                name: res.name,
                description: res.description
            })
            console.log(res.name)
        }
    }
    xacnhan(res) {
        const iteam = {
            "id": this.state.id,
            "name": this.state.name,
            "description": this.state.description
        }
        return e => {
            callAPI.callAPI('categories/' + `${res.id}`, 'PUT', iteam, localStorage.getItem('token')).then(res => window.location.reload()
            ).catch(err => console.log("err"))
            console.log(res)
        }
    }
    close() {
        const showViewEdit = []
        for (let i = 0; i < this.state.list.length; i++) {
            showViewEdit[i] = 'false'
        }
        return e => {
            this.setState({
                showViewEdit: showViewEdit,
                showViewAdd: false,
                showViewAddProduct: showViewEdit
            })
        }
    }
    add() {

        this.setState({ showViewAdd: true })
    }
    xacnhanAdd() {
        const iteam = {
            "id": this.state.id,
            "name": this.state.name,
            "description": this.state.description
        }
        return e => {
            callAPI.callAPI('categories', 'POST', iteam, localStorage.getItem('token')).then(res => window.location.reload()
            ).catch(err => console.log("err"))

        }
    }
    addProduct(res, key) {
        const showViewEdit = []
        for (let i = 0; i < this.state.list.length; i++) {
            showViewEdit[i] = 'false'
        }
        showViewEdit[key] = 'true'
        return e => {
            this.setState({
                showViewAddProduct: showViewEdit,
            })
            console.log(res.name)
        }
    }
    componentWillMount() {
        this.checked = new Set();
    }

    addCheckbox = (id) => {
        if (this.checked.has(id)) {
            this.checked.delete(id)
        } else
            this.checked.add(id)

        this.setState({
            listcheckbox: this.checked
        })
        console.log(this.state.listcheckbox);
    }
    AcceptAddProduct(id) {
        return e => {
            callAPI.callAPI('categories/' + `${id}` + '/add_products', 'PATCH', this.state.listcheckbox, localStorage.getItem('token')).then(res => {
                console.log("DONE");
                window.location.reload();
            }
            ).catch(() => console.log("err"))
        }
    }
    render() {
        console.log("list:", this.state.list)
        return (
            <div class="category">
                <div class="category-main">
                    <div class="category-main-header">
                        <h1>Thể loại</h1>
                        <button class="add" onClick={this.add.bind(this)}>Thêm mới Category</button>
                        {
                            (this.state.showViewAdd === true) && <div class="background">
                                <ul class="form-edit-category">
                                    <h1>ADD</h1>
                                    <li>
                                        <span>Name</span>
                                        <input value={this.state.addname} type='edit' onChange={e => this.changeName(e)}></input>
                                    </li>
                                    <li>
                                        <span>Mô tả</span>
                                        <input value={this.state.adddescription} type='edit' onChange={e => this.changedesciption(e)}></input>
                                    </li>
                                    <div>
                                        <button class='xac-nhan' onClick={this.xacnhanAdd()}>Xác nhận</button>
                                        <button class='huy' onClick={this.close()}>Hủy</button>
                                    </div>
                                </ul>
                            </div>
                        }
                    </div>
                    <div class="category-main-content">
                        <ul class="category-title">
                            <li>ID</li>
                            <li>NAME</li>
                            <li>Mô tả</li>
                            <li>Tool</li>
                        </ul>
                        {
                            this.state.list.map((res, key) => {
                                return (
                                    <div>
                                        <ul class="info-category">
                                            <li>{res.id}</li>
                                            <li>{res.name}</li>
                                            <li>{res.description}</li>
                                            <li>
                                                <button onClick={this.editCategory(res, key)}>Edit</button>
                                                <button onClick={this.addProduct(res, key)}>Add</button>
                                            </li>
                                        </ul>

                                        {(this.state.showViewAddProduct[key] === 'true') && <div class="background">
                                            <div class="form-add-product-category">
                                                <h1>ADD</h1>
                                                <ul class="form-add-product-category-title">
                                                    <li>.</li>
                                                    <li>ID</li>
                                                    <li>NAME</li>
                                                    <li>MEMORY</li>
                                                    <li>PRICE</li>
                                                    <li>QUANTITY</li>
                                                    <li>RAM</li>
                                                </ul>

                                                {this.state.listProduct.map((resP, keyP) => {
                                                    return (
                                                        <ul class="list-add-product-category">
                                                            <input type="checkbox" value={resP.id} onChange={() => this.addCheckbox(resP.id)}></input>
                                                            <li>{resP.id}</li>
                                                            <li>{resP.name}</li>
                                                            <li>{resP.memory}</li>
                                                            <li>{resP.price}</li>
                                                            <li>{resP.quantity}</li>
                                                            <li>{resP.ram}</li>
                                                        </ul>
                                                    )
                                                })}

                                                <div>
                                                    <button class="xac-nhan" onClick={this.AcceptAddProduct(res.id)}>Add</button>
                                                    <button class="huy" onClick={this.close()}>Huy</button>

                                                </div>
                                            </div>
                                        </div>


                                        }







                                        {(this.state.showViewEdit[key] === 'true') && <div class="background">
                                            <ul class="form-edit-category">
                                                <h1>EDIT</h1>
                                                <li>
                                                    <span>ID</span>
                                                    <input value={this.state.id} disabled type='edit' onChange={e => this.changeId(e)}></input>
                                                </li>
                                                <li>
                                                    <span>Name</span>
                                                    <input value={this.state.name} type='edit' onChange={e => this.changeName(e)}></input>
                                                </li>
                                                <li>
                                                    <span>Mô tả</span>
                                                    <input value={this.state.description} type='edit' onChange={e => this.changedesciption(e)}></input>
                                                </li>
                                                <div>
                                                    <button class='xac-nhan' onClick={this.xacnhan(res)}>Xác nhận</button>
                                                    <button class='huy' onClick={this.close()}>Hủy</button>
                                                </div>
                                            </ul>
                                        </div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;