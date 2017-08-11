import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex)

const state = {
    loadingShow: false,     //加载动画
    waitPayCount: 0,        //待付款数量
    waitDueinCount: 0,      //待收货数量
    cartGoods: {},          //购物车商品
    userInfo: null,         //用户信息
    login: true,            //是否登录
    cartList: {}            //购物车列表
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})