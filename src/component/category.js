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
            adddescription: ''
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
                showViewAdd: false
            })

        }
    }
    add() {

        this.setState({ showViewAdd: true })
        console.log(this.state.sho)
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
    render() {
        return (
            <div class="category">
                <div class="category-main">
                    <div class="category-main-header">
                        <h1>Thể loại</h1>
                        <button class="add" onClick={this.add.bind(this)}>Thêm mới</button>
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
                            <li>Edit</li>
                        </ul>
                        {
                            this.state.list.map((res, key) => {
                                return (
                                    <div>
                                        <ul class="info-category">
                                            <li>{res.id}</li>
                                            <li>{res.name}</li>
                                            <li>{res.description}</li>
                                            <li><button onClick={this.editCategory(res, key)}>Edit</button></li>
                                        </ul>
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