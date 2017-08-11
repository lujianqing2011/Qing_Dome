<template>
  <div class="mine-page">
    <header-top header-title="我的" goBack="true" header-nav="true"></header-top>
    <section class="mine_box">
      <div class="user-info">
        <div class="user-basic">
          <router-link :to="userInfo&&userInfo.user_id?'/mine/info':'/login'">
          <img class="user-avatar" src="../../assets/mine/noportrait.png">
          </router-link>
        </div>
        <div class="userinfo-box">
          <router-link :to="userInfo&&userInfo.user_id?'/mine/info':'/login'">
            <p class="name">{{userName}}</p>
          </router-link>
        </div>
        <div class="user-stat">
          <router-link to="/mine/collectGoods" class="user-product"><p>0</p>收藏的商品</router-link>
          <router-link to="/order" class="user-product" href="#"><p>0</p>关注的店铺</router-link>
          <router-link to="/order" class="user-product" href="#"><p>0</p>我的足迹</router-link>
        </div>
      </div>
      <div class="order-state">
        <div class="slide-link"><img class="here-icon" src="../../assets/mine/wd-012-1.png"><router-link to="/order">我的订单<em>查看全部购买商品</em></router-link></div>
        <div class="order-nav">
          <router-link to="/order/waitPayment" class="order-bt icon-f" href="#">待付款<i v-show="stayPayment > 0">{{stayPayment}}</i></router-link>
          <router-link to="/order/waitShipments" class="order-bt icon-s" href="#">待收货<i v-show="stayReceiving > 0">{{stayReceiving}}</i></router-link>
          <router-link to="/order" class="order-bt icon-p" href="#">退换货<i>2</i></router-link>
        </div>
      </div>
      <div class="order-state">
        <router-link to="/mine/property">
          <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-zichan.png">我的资产<em></em></div>
        </router-link>
        <router-link to="/mine/gold">
          <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-jinbi.png">我的金币<em></em></div>
        </router-link>
        <router-link to="/mine/coupon">
          <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-liquan.png">我的礼卷<em></em></div>
        </router-link>
        <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-000.png">我的红包<em></em></div>
        <!-- <div class="slide-link" ><img class="here-icon" src="../../assets/mine/wd-012-1.png">收货地址<em></em></div> -->
      </div>
      <div class="order-state">
        <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-001.png">培训活动中心<em>查看全部</em></div>
        <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-002.png">活动公告<em>查看全部公告</em></div>
        <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-003.png">秒杀商品<em>查看全部商品</em></div>
        <div class="slide-link" ><img class="here-icon" src="../../assets/mine/icon-004.png">账户中心<em></em></div>
      </div>
    </section>

    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    
  </div>
</template>

<script>

import headerTop from 'src/components/header/head';
import {setStore, getStore} from 'src/config/storage';
import { mapState,mapActions } from 'vuex';

export default {
  components:{
    headerTop
  },
  mounted(){
    this.initData();
    this.getOrder();
    this.$nextTick(() => {  //dom文档加载完后执行
      this.stayPayment = this.waitPayCount
      this.stayReceiving = this.waitDueinCount
    })
  },
  computed:{
    ...mapState([
        'userInfo','waitPayCount','waitDueinCount'
    ])
  },
  watch: {    //监听vuex的state相关的数据
    userInfo: function() {
      this.initData()
    },
    waitPayCount: function(value) {
      this.stayPayment = value
    },
    waitDueinCount: function(value) {
      this.stayReceiving = value
    }
  },
  methods: {
    ...mapActions([
      'getOrder'
    ]),
    initData() {
      if(this.userInfo && this.userInfo.user_id){
        this.userName = this.userInfo.username;
      }else{
        this.userName = '登录/注册'
      }
    }
  },
  data(){
    return{
      userName: '登录/注册',    //用户名
      stayPayment: 0,
      stayReceiving: 0

    }
  }
}

</script>

<style lang="scss" scoped>

.router-slid-enter-active, .router-slid-leave-active {
    transition: all .3s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(50px, 0, 0);
    opacity: 0;
}

@import './mine';
</style>