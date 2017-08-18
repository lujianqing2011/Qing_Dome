import api from '../api/getApi';
import { GET_USERINFO,PAY_COUNT } from './mutations-types.js';

//全局调用方法
export default {
    //用户信息
    getUserInfo({commit, state}) {
        api.getUser().then((res) => {
            console.log(res)
            commit(GET_USERINFO,res)
        })
    },
    //用户订单
    getOrder({commit,state}) {
        api.OrderAll().then((res) => {
            commit(PAY_COUNT,res)
        })
        
    },

    getGoodsDetails({commit, state}) {
        console.log('详情页信息')
    }

}