import store from '@/store';
import axios from 'axios'
import router from '../router'
import { tip, toLogin } from './utils'

// const host = "https://selab-ams-server.herokuapp.com"; //demo server on heroku
const host = "http://localhost:8088"; //local server

const errorHandle = (status, msg) => {
    switch (status) {
        case 400:
            tip(msg);
            break;

        case 401:
            if (router.currentRoute == 'Login') {
                console.log("未登入");
            } else {
                store.dispatch('auth/setAuth', {
                    "token": '',
                    "isLogin": false,
                    "studentId":''
                })
                
                tip('登入過期，請重新登入');
                setTimeout(() => {
                    toLogin();
                }, 1000);
            }
            break;

        case 403:
            tip('權限不足');
            break;

        case 404:
            tip(msg);
            break;

        default:
            console.error(msg);
    }
}

var instance = axios.create({
    baseUrl: '/api/'
})

instance.interceptors.request.use((config) => {
    const token = store.state.auth.token;
    token && (config.headers.Authorization = 'Bearer ' + token);
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;

    if (response) {
        errorHandle(response.status, response.data.error);
        return Promise.reject(error);
    } else {
        if (!window.navigator.onLine) {
            tip('無法連線');
        } else {
            return Promise.reject(error);
        }
    }
});

export default function (method, url, data=null) {
    url = host + url;

    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data);
    } else if (method == 'get') {
        return instance.get(url, {params: data});
    } else if (method == 'delete') {
        return instance.delete(url, {params: data});
    } else if (method == 'put') {
        return instance.put(url, data);
    } else {
        console.error('unKnow method' + method);
        return false;
    }
}