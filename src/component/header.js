import { FaApple } from "react-icons/fa";
import { SiDell } from "react-icons/si";
import { SiAsus } from "react-icons/si";
import { FaCertificate } from "react-icons/fa";
import { SiLenovo } from "react-icons/si";
import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdScreenShare } from "react-icons/md"
class Header extends React.Component {
    render() {
        return (
            <div class="main-header">
                <div class="header">
                    <ul class="header-context">
                        <a class="logo" src="#"><MdScreenShare />BKLapTop</a>
                        <li><input class="search" type="text" placeholder="Search...."></input></li>
                        <li> <a href="#" class="giohang">
                            <AiOutlineShoppingCart /> Giỏ hàng
                        </a>
                        </li>
                        <li> <a href='https://www.facebook.com/ ' class="sign-up" >Đăng kí </a> </li>
                        <li> <a href="#" class=" sign-in" >Đăng Nhập </a> </li>
                    </ul >
                </div >
                <img src="./1.jpg" id="image-1"></img>
                <ul class="type-laptop">
                    <li id="lap"> <SiDell /> Dell</li>
                    <li id="lap"><SiAsus /> Asus</li>
                    <li id="lap"><FaApple /> MacBook</li>
                    <li id="lap"><FaCertificate />Acer</li>
                    <li id="lap"><SiLenovo />Lenovo</li>
                </ul>

            </div>
        )
    }
}
export default Header;