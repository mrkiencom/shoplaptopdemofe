import axios from "axios";
export default function CallAPI(method, url, data) {
    return axios({
        method: method,
        url: 'https://shop-laptop-2020.herokuapp.com/v1' + `${url}`,
        data: data,
    });
}