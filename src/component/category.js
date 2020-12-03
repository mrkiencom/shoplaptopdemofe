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
            checkbox: [],
            checkall: ''
        }
    }
    getAPI() {
        let iteam = [];
        let iteamProduct = [];
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
        callAPI.callAPI('products', 'GET', iteamProduct, localStorage.getItem('token')).then(res => {
            if (res != undefined) {
                for (let i of res.data.data) {
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
            }
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
            const listcheckbox = [];
            for (let i = 0; i < this.state.listProduct.length; i++) {
                listcheckbox[i] = false
            }
            this.setState({
                showViewAddProduct: showViewEdit,
                checkbox: listcheckbox
            })
            console.log("check", listcheckbox)
        }
    }
    componentWillMount() {
        this.checked = new Set();
    }

    addCheckbox = (id, key) => {
        const arrCheck = this.state.checkbox;
        if (this.checked.has(id)) {
            this.checked.delete(id)
            arrCheck[key] = false;
            this.setState({
                checkbox: arrCheck
            })
            console.log(key)
        } else {
            this.checked.add(id)
            arrCheck[key] = true;
            this.setState({
                checkbox: arrCheck
            })
        }

        this.setState({
            listcheckbox: this.checked,

        })
        console.log(this.state.checkbox);
    }

    addAllCheckbox = (event) => {
        const check = []
        for (let i = 0; i < this.state.listProduct.length; i++) {
            check[i] = false;
        }
        // event.target.checked === true ? this.setState({ checkall: true }) : this.setState({ checkall: false })
        if (event.target.checked === true) {
            for (let i = 0; i < this.state.listProduct.length; i++) {
                check[i] = true
                this.checked.add(this.state.listProduct[i].id)
            }
            this.setState({ checkall: true })
            console.log("check", this)
        }
        else {
            for (let i = 0; i < this.state.listProduct.length; i++) {
                check[i] = false;
                this.checked.delete(this.state.listProduct[i].id)
            }
            this.setState({ checkall: false })
        }
        this.setState({
            checkbox: check,
            listcheckbox: this.checked
        })
        console.log(this.state.listcheckbox)
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
                                                    <li><input type="checkbox" onChange={(e) => this.addAllCheckbox(e)}></input></li>
                                                    <li>ID</li>
                                                    <li>NAME</li>
                                                    <li>MEMORY</li>
                                                    <li>PRICE</li>
                                                    <li>QUANTITY</li>
                                                    <li>RAM</li>
                                                </ul>
                                                <div class="fomr-list-add-product-category">
                                                    {this.state.listProduct.map((resP, keyP) => {
                                                        return (
                                                            <ul class="list-add-product-category">
                                                                <input type="checkbox" value={resP.id} checked={this.state.checkbox[keyP]} onChange={() => this.addCheckbox(resP.id, keyP)}></input>
                                                                <li>{resP.id}</li>
                                                                <li>{resP.name}</li>
                                                                <li>{resP.memory}</li>
                                                                <li>{resP.price}</li>
                                                                <li>{resP.quantity}</li>
                                                                <li>{resP.ram}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                </div>
                                                <div class="button-tool">
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