import React from 'react';
import { connect } from 'react-redux';
import "../style/productView.css";
import { dataProductAPI } from './../actions/index';
class Product extends React.Component {
    
    componentDidMount() {
        this.props.fetchAllProducts()
    }
    
    render() {
        console.log('ok');
        const listProducts = this.props.products.map((product, index) => {
            const url = "https://shop-laptop-2020.herokuapp.com/" + product.picture.url
            return (
                <div className="col-lg-4 col-md-6 mb-r">
                <div className="card text-center card-cascade narrower">
                    <div className="view overlay hm-white-slight z-depth-1">
                        <img src={ url }
                            className="img-fluid" alt={product.name} />
                        <a>
                            <div className="mask waves-light waves-effect waves-light"></div>
                        </a>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">
                            <strong>
                                <a>{ product.name }</a>
                            </strong>
                        </h4>
                        <ul className="rating">
                            <li>
                                { this.showRatings(5) }
                            </li>
                        </ul>
                        <p className="card-text">
                            { product.description }
                        </p>
                        <div className="card-footer">
                            <span className="left">{product.price}$</span>
                            <span className="right">
                                <a 
                                    className="btn-floating blue-gradient" 
                                    data-toggle="tooltip" data-placement="top" 
                                    title="" 
                                    data-original-title="Add to Cart"
                                    onClick={ () => this.onAddToCart(product) }
                                >
                                    <i className="fa fa-shopping-cart"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            );
        });
        return (
            <React.Fragment>
                {listProducts}
            </React.Fragment>
        )
    }

    showRatings(rating){
        var result = [];
        for(var i = 1;i <= rating;i++){
            result.push(<i key={i} className="fa fa-star"></i>);
        }
        for(var j = 1; j <= ( 5-rating);j++){
            result.push(<i key={i + j} className="fa fa-star-o"></i>);
        }
        return result;
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
