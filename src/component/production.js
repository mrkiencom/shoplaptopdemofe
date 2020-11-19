import React from 'react';
import { connect } from 'react-redux';
import "../style/productView.css";
import { dataProductAPI } from './../actions/index';
class Product extends React.Component {
    
    componentDidMount() {
        this.props.fetchAllProducts()
    }
    
    render() {
        const listProducts = this.props.products.map((product, index) => {
            const url = "https://shop-laptop-2020.herokuapp.com/" + product.picture.url
            return (
                <ul class="id-1">
                <li>{product.name}</li>
                <img src= {url} alt={product.name}/>
             </ul>
            );
        });
        return (
            <div class="main-content">
                <ul class="product">
                    {listProducts}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        products : state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProducts : () => {
            dispatch(dataProductAPI())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
