/**
 * 配置和
 * 封装axios的文件
 */

import axios from 'axios';
import qs from 'qs';

// axios.defaults.baseURL = 'https://api.it919.cn/public/api/';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 请求时的拦截
axios.interceptors.request.use((config) => {
    // 发送请求之前做一些处理
    if (config.method === 'post') { //POST传参序列化
        config.data = qs.stringify(config.data);
    }
    return config;
 },(error) => {
    alert("错误的传参")
    return Promise.reject(error);
 });

// 响应时拦截
axios.interceptors.response.use((response) => {
    // 返回响应时做一些处理
    return response;
 },(error) => {
    // 当响应异常时做一些处理
    return Promise.reject(error);
 });

export default {
    //fetchPost  请求方式
    fetchPost: function(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    // console.log(response)
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    //GET 请求方式
    fetchGet: function(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, params)
                .then(response => {
                    // console.log(response)
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                });
        })

    }
}