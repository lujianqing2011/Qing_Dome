<template>
  <div class="order-waitEvaluate">
    <div class="acart-box">
      <div class="acart-goods" v-for="list in orderList">
        <div class="goods_state">
          <span>日期：{{list.order_number}} </span>
          <span> {{list.order_status}} </span>
        </div>
        
        <div class="goods" v-for="goods in list.commodity">
          <div class="item">
            <div class="cart-box">
              <div class="left"><img :src="goods.goods_pic"></div>
              <div class="center">
                <h2>{{goods.goods_name}}</h2>
                <div class="standard">
                  <span v-for="standard in goods.goods_standard">{{standard.choose}}</span>
                </div>
              </div>
              <div class="right">
                <p class="raw-cost"> {{goods.goods_price}} </p>
                <p class="true-cost"> {{goods.goods_price}} </p>
                <p class="quantity">× {{goods.goods_count}} </p>
              </div>
            </div>
          </div>
        </div>
        <div class="total-price">
          <span>共<b> {{list.commodity.length}} </b>件商品</span>
          <span>合计<b> </b></span>
          <span>(含运费 <b>¥0.00</b> )</span>
        </div>
        <m-order-button :item="list" :orderList="orderList"></m-order-button>
      </div>
    </div>
    <!-- 没有相关订单时显示S -->
    <div class="order-null" v-show="orderList.length === 0">
      <div class="null-pic"></div>
      <p>您还没有相关的订单</p>
      <p class="sub-txt">可以去看看有哪些想买的</p>
      <p class="null-bt"><a class="bt-a" href="#">随便逛逛</a></p>
    </div>
    <!-- 没有相关订单时显示E -->
  </div>
</template>

<script>

import MOrderButton from 'src/components/orderButton/orderButton';
import api from 'src/api/getApi';

export default{
  components:{
    MOrderButton
  },
  data(){
    return{
      orderList: []
    }
  },
  created(){
    api.OrderAll().then((res) => {
      this.orderList = [...res.id_3]
    })
  },
  computed:{
  }
}
</script>
