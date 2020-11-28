import React from "react";
import axios from "axios";
import "../style/detailProduct.css"
export default class DetailProduct extends React.Component {
    render(){
        const list = [];
        list.push(this.props.res)
        console.log(list[0].id);
        return(
            <div >     
                    <h1>DETAIL</h1>
                    <div class="detail-image-product">
                        <img src="https://cdn.tgdd.vn/Files/2014/11/07/579143/dell-venue-11-pro-2.jpg" ></img>
                    </div>
                    <div class="form-detail-product">
                        <ul class="form-detail-product">
                            <li>{list[0].id}</li>
                            <li>{list[0].name}</li>
                            <li>{list[0].price}</li>
                            <li>{list[0].quantity}</li>
                            <li>{list[0].ram}</li>
                            <li>{list[0].memory}</li>
                            <li>{list[0].description}</li>
                        </ul>
                    </div>
            </div>
            
        )
    }
}