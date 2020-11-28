import axios from "axios";

function login() {
    axios({
        method: 'POST',
        url: 'https://shop-laptop-2020.herokuapp.com/v1/login',
        data: {
            email: "huytran.301099@gmail.com",
            password: '123456'
        },
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        localStorage.setItem('token', JSON.stringify(res.data['token']))
    }).then(error => {
        console.log(error);
    });
}


function callAPI(endpoint, method, body, token) {
    return axios({
        method: method,
        url: 'https://shop-laptop-2020.herokuapp.com/v1/' + `${endpoint}`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).catch(error => {
        console.log(error);
    });
}
export default { login, callAPI }