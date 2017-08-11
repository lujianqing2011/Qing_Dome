import api from '../api/getApi';
import { GET_USERINFO,PAY_COUNT } from './mutations-types.js';

export default {

    getUserInfo({commit, state}) {
        console.log('用户信息存放在header组件调用');

        api.getUser().then((res) => {
            console.log(res)
            commit(GET_USERINFO,res)
        })
    },

    getOrder({commit,state}) {
        api.OrderAll().then((res) => {
            commit(PAY_COUNT,res)
        })
        
    },

    getGoodsDetails({commit, state}) {
        console.log('详情页信息')
    }

}