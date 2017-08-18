
import { 
    GET_USERINFO,
    PAY_COUNT,
    USER_INFO,
    RETSET_NAME,
    ADD_CART
} from './mutations-types.js';
import {setStore, getStore} from 'src/config/storage';
export default{

    //加载动画
    // UPDATE_LOADING(state, data){     
    //     state.loadingShow = data
    // },

    //记录用户信息
    [USER_INFO](state, info){                   
        state.userInfo = info;
        state.login = true;
        setStore('user_id', info.user_id);
    },

    //修改用户名
    [RETSET_NAME](state,username) {
        state.userInfo = Object.assign({}, state.userInfo,{username})
    },

    //获取用户信息储存到vuex
    [GET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        };
        if (!state.login) {
            return
        }
        if(getStore('user_id')){
            state.userInfo = {...info};
        }else {
            state.userInfo = null;
        }
    },

    //待支付订单数量
    [PAY_COUNT](state,res) {
        state.waitPayCount = res.id_0.length
        state.waitDueinCount = res.id_2.length
    },

    //加入购物车
    [ADD_CART](state, {
        types_id,
        goods_checked,
        goods_id,
        goods_pic,
        goods_name,
        goods_price,
        radio_size,
        radio_color,
        radio_etalon,
        goods_count,
        goods_freight
    }) {
        let cart = state.cartList;        
        let types = cart[types_id] = (cart[types_id] || {});  //获取到分类列表
        let goods = types[goods_id] = (types[goods_id] || {}); //获取到对应分类下商品列表
        
        if(types[goods_id]['goods_id']) {
            goods['num']++;
        }else{
            types[goods_id] = {
                "num": 1,
                "id": types_id,
                "goods_checked": false,
                "goods_id": goods_id,
                "goods_pic": goods_pic,
                "goods_name": goods_name,
                "goods_price": goods_price,
                "radio_color": radio_color,
                "radio_size": radio_size,
                "radio_etalon": radio_etalon,
                "goods_count": goods_count,
                "goods_freight": goods_freight
            }
        }
        console.log(8,JSON.stringify(state.cartList))
        console.log(4,JSON.stringify(types[goods_id]))
        state.cartList = {...cart}
        setStore("cart_list", state.cartList)
    }


}