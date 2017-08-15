<template>
  <div class="order-all">
    <div class="acart-box" v-for="list in orderList">
      <div class="acart-goods" v-for="goodsList in list">
      <div class="goods_state">
        <span>日期：{{goodsList.order_number}}</span>
        <span>{{goodsList.order_status}}</span>
      </div>
        <div class="goods" v-for="goods in goodsList.commodity" >
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
                <p class="raw-cost">{{goods.goods_price}}</p>
                <p class="true-cost">{{goods.goods_price}}</p>
                <p class="quantity">× {{goods.goods_count}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="total-price">
          <span>共<b>{{goodsList.commodity.length}}</b>件商品</span>
          <span>合计<b></b></span>
          <span>(含运费 <b>¥0.00</b> )</span>
        </div>
        <m-order-button :item="goodsList"></m-order-button>
      </div>
    </div>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
  
import MOrderButton from 'src/components/orderButton/orderButton';
import loading from 'components/common/loading';
import api from 'src/api/getApi';

export default{
  components:{
    MOrderButton,
    loading
  },
  data(){
    return{
      orderList: [],
      showLoading: true
    }
  },
  created(){
    api.OrderAll().then((res) => {
      console.log(res)
      this.orderList = res
      this.$nextTick(() => {
        this.showLoading = false
      })
    })
  },
  computed: {
  }
}
</script>

<style lang="scss">


</style>