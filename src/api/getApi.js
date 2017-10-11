/**
 * Api的接口文件
 */
import { setStore, getStore } from 'src/config/storage';
import fetch from './config';
export default {

    /**
     * 账户密码登录
     */
    accountLogin(username, password) {
        return fetch.fetchGet('/api/login', {username, password})
    },

    /**
     * 用户注册
     */
    Register(username, password, user_id) {
        return fetch.fetchPost('/api/login', {username, password, user_id})
    },

    /**
     * 获取用户信息
     */
    getUser() {
        return fetch.fetchGet('/api/login', { user_id: getStore('user_id')});
    },

    /**
     * 用户名修改
     */
    UserNameAmend(newUserName, password, user_id) {
        return fetch.fetchPost('/api/login',{ 
            username: newUserName,
            password,
            user_id
        })
    },

    /**
     * 全部订单
     */
    OrderAll() {
        return fetch.fetchGet('/api/allOrder')
    },

    /**
     * 购物车
     */
    cartList(goods_number, goods_id) {
        return fetch.fetchGet('/api/cartList',{
            number: goods_number,
            id: goods_id
        })
    },

    /**
     * 通讯地址
     */
    postAddAddress(userId, name, address, address_detail, phone, phone_bk) {
        return fetch.fetchPost('/api/user',{
            userId, 
            name, 
            address, 
            address_detail, 
            phone, 
            phone_bk
        })
    },

    /**
     * 获取地址列表
     */
    getAddress(id, sig) {
        return fetch.fetchGet('/api/carts/' + id + '/addresses', {
            sig
        })
    },

    /**
     * 获取商品列表
     */
     getGoodsList() {
        return fetch.fetchGet('/api/goodsList')
     },

     /**
     * 获取猜你喜欢商品列表
     */
     getGuessLikeGoods(offset) {
        return fetch.fetchGet('/api/guessLikeGoods',{
            offset
        })
     }

}