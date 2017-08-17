<template>
  <div class="acart-page">
    <header-top header-title="购物车" header-nav="true" goBack="true"></header-top>
    <div class="acart-box">
      <div class="acart-goods" v-for="(goods,index) in cartGoods">
        <div class="item">
          <div class="cart-checkbox location" :class="{check: goods.goods_checked}" @click="selectGoods(goods,index)"></div>
          <div class="cart-box">
            <div class="left" date-src="goods.goods_pic">
              <img :src="goods.goods_pic">
            </div>
            <div class="right" v-show="index !== compileIndex">
              <router-link :to="{path:'/details', query:{ goods_name:goods.goods_name, goods_price:goods.goods_price }}">
                <h2>{{goods.goods_name}}</h2>
              </router-link>
              <div class="standard">
                <span v-for="select in goods.goods_standard">{{select.choose}}</span>
              </div>
              <div class="price-count">
                <span class="price">{{goods.goods_price}}</span>
                <span class="count">× {{goods.goods_count}}</span>
                <span class="edit_right iconfont" @click="goodsEdit(index)">&#xe61b;</span>
              </div>
            </div>
            <div class="edit_goods" :class="{on: index === compileIndex }">
                <div class="count_goods">
                  <div class="count">
                    <a class="count_bt" href="javascript:;" @click="dealCount('minus',goods, goods.goods_id, index)">-</a>
                    <a class="count_number" href="javascript:;">{{goods.goods_count}}</a>
                    <a class="count_bt" href="javascript:;" @click="dealCount('add',goods, goods.goods_id, index)">+</a>
                  </div>
                  <div class="call_off"><span @click="finishCompile(index)">完成</span></div>
                </div>
              <div class="delete_goods" @click="delectGoods(goods,index)">删除</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="payment" v-if="cartGoods.length">
      <div class="payment-total-bar">
        <div class="cart-checkbox location" :class="{check: goodsAll}" @click="selectAll()" :all="all"></div>
        <div class="total-price">
          <div class="left">
            <div class="amount">
              <div class="pic iconfont" :class="{ highlight:count>0 }">&#xe654;<i class="number">{{count}}</i></div>
            </div>
            <div class="price">
              <div class="price_j">{{totalMoney}}</div>
              <div class="freight">快递费¥{{goods_freight}}</div>
            </div>
          </div>
          <div class="orders_bt">
            <button v-if="goConfirmOrderShow" @click="goConfirmOrder()">结算</button>
            <button v-else class="unable">结算</button>
          </div>
        </div>
      </div>
    </div>
    
    <section class="cart_null" v-if="cartGoods.length === 0">
      <div class="cart_hint_pic"></div>
      <div class="cart_hint">您的购物车中没有商品</div>
      <div class="cart_bt">去逛逛</div>
    </section>

  </div>
</template>

<script>

import headerTop from 'src/components/header/head';
import MCount from 'src/components/common/count';
import {setStore, getStore} from 'src/config/storage';
import api from 'src/api/getApi';

export default {
  components: {
    headerTop,
    MCount
  },
  data() {
    return{
      goodsAll: false,
      totalMoney: 0,
      count: 0,
      showEdit: false,
      goodsImg: null,
      goodsName: null,
      goodsPrice: null,
      radioSize: null,
      radioColor: null,
      radioEtalon: null,
      goodsCount: null,
      goods_freight: 0,     //配送费
      clearingGoods: [],  //已选择要购买的商品
      cartGoods: [],   //购物车列表
      goConfirmOrderShow: false,
      compileIndex: null
      
    }
  },
  created() {
    /**
     * 获取数据
     */
    api.cartList().then((res) => {
      // this.cartGoods = res
      let cart_list = getStore('cart_list')
      if(cart_list) {
        let goods_list = [...res]
        let list = JSON.parse(cart_list)
        Object.keys(list).forEach((item) => {
          Object.keys(list[item]).forEach((goods) => {
            let StoreGoods = list[item][goods]
            goods_list.push({...StoreGoods})
          })
        })

        this.cartGoods = goods_list
      }else{
        this.cartGoods = res
      }
      
    })
  },
  computed: {
    all() {
      if(this.goods_count !== this.cartGoods.length){
        this.goodsAll = false;
      }else {
        this.goodsAlls = true;
      }
    }
    
  },
  methods: {
    drop(el) {
      for (let i=0;i<this.balls.length;i++) {
        let ball = this.balls[i];
        if(!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return
        }
      }
    },

    /**
     * 单选
     */
    selectGoods(goods,index) {
      goods.goods_checked = !goods.goods_checked
      this.countMoney();
      this.buyGoods(goods);
      if(!goods.goods_checked) {
        this.goodsAll = false
      }else{
        this.goodsAll = !this.cartGoods.find((goods) => {
          return !goods.goods_checked
        })
      }
    },

    /**
     * 全选
     */
    selectAll() {
      this.goodsAll = !this.goodsAll
      this.cartGoods.forEach((item) => {
        if(this.goodsAll === false ){
          item.goods_checked = false
        }
        if(item.goods_checked) {  //已选中过的商品不需要再选
          return
        }
        item.goods_checked = this.goodsAll
        this.buyGoods(item)
      })
      this.countMoney();
    },

    /**
     * 金额,数量计算
     */
    countMoney() {
      this.totalMoney = 0;
      this.count = 0;
      this.goods_freight = 0;
      this.goConfirmOrderShow = false
      this.cartGoods.forEach((item) => {
        if(item.goods_checked) {
          this.totalMoney += parseInt(item.goods_price) * parseInt(item.goods_count);
          this.count +=1;
          this.goConfirmOrderShow = true
          this.goods_freight = item.goods_freight
        }
      })
    },

    /**
     * 增减商品数量
     */
    dealCount(how, goods, goods_id, index) {
      if(how === 'add') {
        let count = (++goods.goods_count);
        this.countMoney();
        api.cartList(count, goods_id)
        return
      }else{
        if( goods.goods_count <= 1) {
          goods.goods_count = 1;
          return
        }else{
          let count = (--goods.goods_count);
          this.countMoney();
          api.cartList(count, goods_id)
        }
      }
    },

    /**
     * 选择要下单的商品
     */
    buyGoods(goods) {
      if(goods.goods_checked === true) {
        this.clearingGoods.push(goods)
      }else{
        let index = this.clearingGoods.indexOf(goods)
        this.clearingGoods.splice(index,1)
      }
    },

    /**
     * 确认下单
     */
    goConfirmOrder() {
      let clearingGoods = JSON.stringify(this.clearingGoods)
      this.$router.push({path:'/confirmOrder', query:{clearingGoods}})
      console.log([...this.clearingGoods])
    },

    /**
     * 商品编辑
     */
    goodsEdit(index) {
      this.compileIndex = index
    },

    /**
     * 完成编辑
     */
     finishCompile() {
      this.compileIndex = null
     },

    /**
     * 商品删除
     */
    delectGoods(goods,index) {
      this.cartGoods.splice(index,1);   //从购物车列表删除
      this.clearingGoods.splice(index,1);   //从已选的商品列表删除
      this.compileIndex = null;
      this.countMoney()
    }

  }

}
</script>

<style lang="scss" scoped>
 
@import './cart';


</style>