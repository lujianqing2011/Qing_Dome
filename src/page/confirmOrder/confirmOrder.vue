<template>
<section class="confirm_order_page">
  <header-top header-title="订单结算" goBack="true" header-nav="true"></header-top>
  <section class="confirm_order">

    <section class="c_address">
      <router-link to="/confirmOrder/chooseAddress">
      <div class="address_detail_container">
        <span class="c_icon iconfont">&#xe660;</span>
        <div class="address_info">
          <header>
            <span class="name">王小源</span>
            <span>15626202195</span>
          </header>
          <div class="address_detail">广东省广州市白云区黄石西路</div>
        </div>
      </div>
      </router-link>
      <div class="iconfont icon_also">&#xe99c;</div>
    </section>

    <section class="food_list">
      <section class="commodity-list">
        <div class="c_item" v-for="goods in buyGoods">
          <div class="c_item_img"><img :src="goods.goods_pic"></div>
          <div class="c_item_info">
            <div class="item_title">{{goods.goods_name}}</div>
            <div class="item_info">
              <span class="item_price">{{goods.goods_price}}</span>
              <span class="item_number"> × {{goods.goods_count}}</span>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section class="list_box order_remark">
      <header class="header_style">
        <h2 class="header_h2">订单备注 :</h2>
        <span class="declare"><input type="text" placeholder="您对本次交易有需要说明的吗？"></span>
      </header>
    </section>

    <section class="list_box pay_way">
      <header class="header_style border_bottom" @click="clickPayment()">
        <h2 class="header_h2">支付方式</h2>
        <span class="declare">{{selectList[selectOne]}}</span>
      </header>
      <section class="pay_select border_bottom">
        <span class="s_title">红包金<i>1张可用</i></span>
        <span class="s_status">已使用</span>
      </section>
      <section class="pay_select border_bottom">
        <span class="s_title">优惠券<i>0张可用</i></span>
        <span class="s_status">已使用</span>
      </section>
    </section>

    <section class="list_box pay_way">
      <header class="header_style border_bottom">
        <h2 class="header_h2">发票</h2>
        <span class="declare d_color">{{showStateTitle}}</span>
        <div class="button_switch" :class="{ change_state : showState}">
          <div class="slide_bt" @click="changeState()" :class="{ trans_right : showState }"></div>
        </div>
      </header>
    </section>

    <section class="wait_price">
      <div class="wait_price_div">
        <span>总金额</span>
        <span class="w_span">{{totalMoney}}</span>
      </div>
      <div class="wait_price_div">
        <span>立减</span>
        <span class="w_span">-{{redGold}}</span>
      </div>
      <div class="wait_price_div">
        <span>优惠券</span>
        <span class="w_span">-{{coupon}}</span>
      </div>
      <div class="wait_price_div">
        <span>运费</span>
        <span class="w_span">+{{goods_freight}}</span>
      </div>
    </section>

    <div class="null_div"></div>
  </section>

  <section class="order_pay_button">
    <span class="total_price">共{{buyGoods.length}}件，实付金额{{actuallyPaid}}</span>
    <span class="order_button" @click="paymentGoods()">确认下单</span>
  </section>
  
  <transition name="down-slide">
    <section class="mode_select" v-show="showSlide">
      <header class="mode_title">支付方式</header>
      <ul class="select_way">
        <li class="select_way_li" 
          v-for="(name,index) in selectList" 
          :class="{ select_on:selectOne === index }" 
          @click="selectedPay(name,index)">{{name}}
        </li>
      </ul>
    </section>
  </transition>
  <transition name="show-shade">
    <section class="shade_block" v-show="showSlide" @click="clickPayment()"></section>
  </transition>
  <transition name="router-slid" mode="out-in">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</section>

</template>

<script>

import headerTop from 'src/components/header/head';

export default{
  components:{
    headerTop
  },
  created() {
    this.buyGoods = JSON.parse(this.$route.query.clearingGoods)
    console.log(this.$route.query.clearingGoods)
  },
  computed: {
    actuallyPaid: function() {
      return parseInt(this.totalMoney) + parseInt(this.goods_freight) - parseInt(this.redGold) - parseInt(this.coupon)
    }
  },
  methods: {
    clickPayment() {
      this.showSlide = !this.showSlide;
    },
    selectedPay(name,index) {
      this.showSlidePay = !this.showSlidePay;
      this.selectOne = index;
      this.showSlide = false;
    },
    changeState() {
      this.showState = !this.showState;
      this.showState?this.showStateTitle = '需要开发票':this.showStateTitle = '不需要开发票';      
    },
    paymentGoods() {
      this.$router.push({path:'/confirmOrder/payment'})
    }
  },
  mounted() {
    this.buyGoods.forEach((goods, index) => {
      console.log(goods.goods_price*goods.goods_count)
      this.totalMoney += (goods.goods_price*goods.goods_count)
      this.count += index
      this.goods_freight = goods.goods_freight  //运费----------------------------------------------还没完善
    })
  },
  data(){
    return{
      showSlide: false,
      showSlidePay: false,
      selectOne: 0,
      redGold: 20,      //红包金
      coupon: 5,        //优惠券
      showState: false,
      totalMoney: null,
      goods_freight: null,
      count: null,    //数量
      buyGoods: [],
      showStateTitle: '不需要发票',
      selectList:["在线支付","货到付款"]
    }
  }
}

</script>

<style lang="scss" scoped>

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.router-slid-enter-active, .router-slid-leave-active {
        transition: all .3s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(50px, 0, 0);
    opacity: 0;
}

.down-slide-enter-active, .down-slide-leave-active {
  transition: all .3s;
  transform: translate3d(0, 0, 0);
}
.down-slide-enter, .down-slide-leave-active {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}

.show-shade-enter-active, .show-shade-leave-active {
  transition: all .3s;
}
.show-shade-enter, .show-shade-leave-active {
  opacity: 0;
}

.confirm_order_page{
  position: absolute;
  top: 0;
  bottom: 2.2rem;
  left: 0;
  right: 0;
  background: #f2f2f2;
  .confirm_order{
    background: #f2f2f2;
    .c_address{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0rem 10px/$ppr;
      background-size: .5rem;
      background: url('../../assets/confirmOrder/borderBg.png') repeat-x left bottom;
      background-size: 55px/$ppr 4px/$ppr;
      background-color: white;
      min-height: 100px/$ppr;
      .address_detail_container{
        display: flex;
        align-items: center;
        .c_icon{
          display: block;
          margin-right: 5px/$ppr;
          font-size: 2rem;
          color: #FF3B84;
        }
        .address_info{
          line-height: 25px/$ppr;
          margin-left: .25rem;
          & header{
            & span{
              font-size: 1.4rem;
              color: #000;
              &.name{
                font-size: 1.6rem;
                font-weight: 700;
                margin-right: .25rem;
              }
            }
          }
          .address_detail{
            font-size: 1.4rem;
          }
        }
      }
      .icon_also {
        color: #767B85;
        font-size: 1.2rem;
      }
    }
    .food_list {
      background-color: white;
      margin-top: 5px/$ppr;
      padding: 0 10px/$ppr;
      .commodity-list {
        padding: 10px/$ppr 0;
        .c_item {
          padding: 5px/$ppr 0;
          display: flex;
          border-bottom: 1px solid #f5f5f5;
          &:last-child{
            border-bottom: none;
          }
          .c_item_img {
            width: 100px/$ppr;
            height: 100px/$ppr;
            & img{
              max-width: 100%;
            }
          }
          .c_item_info {
            flex: 1;
            margin-left: 5px/$ppr;
            .item_title {
              font-size: 1.2rem;
              height: 48px/$ppr;
              line-height: 24px/$ppr;
              overflow: hidden;
            }
            .item_info {
              line-height: 24px/$ppr;
              & span{
                display: inline-block;
                &.item_price {
                  font-size: 1.4rem;
                  color: red;
                  font-weight: 700;
                }
                &.item_number {
                  font-size: 1.2rem;
                  color: #6d6d6d;
                }
              }
            }
          }
        }
      }
    }
    .list_box {
      padding: 0rem 10px/$ppr;
      .header_style {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: url('../../assets/rightarrow_new.png') no-repeat right center;
        background-size: 8px/$ppr;
        line-height: 45px/$ppr;
        .header_h2 {
          font-size: 1.2rem;
        }
        .declare {
          flex: 1;
          padding: 0 15px/$ppr;
          font-size: 1.2rem;
          text-align: right;
          & input[type="text"] {
            width: 100%;
            white-space: nowrap;
            font-size: 1.2rem;
          }
          &.d_color {
            color: #a5a5a5;
          }
        }
        .button_switch {
          display: flex;
          justify-content: center;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 20rem;
          width: 58px/$ppr;
          height: 32px/$ppr;
          line-height: 1.3rem;
          position: relative;
          top: 0;
          bottom: 0;
          margin: auto 0;
          transition: all 0.2s;
          &.change_state {
            background: #4cd964;
            border-color: #4CD964;
          }
          .slide_bt {
            width: 30px/$ppr;
            height: 30px/$ppr;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 0rem;
            bottom: 0rem;
            left: 0rem;
            margin: auto 0;
            transition: all 0.2s;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.3); //1px 1px 4px #a0a0a0;
            box-sizing: border-box;
            overflow: hidden;
            &.trans_right {
              transform: translateX(26px/$ppr);
              box-shadow: none;
            }
          }
        }
      }
    }
    .wait_price {
      padding: 0rem 10px/$ppr;
      background-color: white;
      margin-top: 8px/$ppr;
      .wait_price_div{
        display: flex;
        justify-content: space-between;
        line-height: 38px/$ppr;
        font-size: 1.2rem;
        & .w_span{
          color: red;
        }
      }
    }
    .null_div{
      width: 100%;
      height: 60px/$ppr;
    }
    .pay_way{
      background-color: white;
      margin-top: 8px/$ppr;
      .border_bottom{
        border-bottom: 1px solid #f1f1f1;
        &:last-child{
          border-bottom: none;
        }
      }
      .pay_select{
        display: flex;
        justify-content: space-between;
        color: #000;
        padding-right: 15px/$ppr;
        background: url('../../assets/rightarrow_new.png') no-repeat right center;
        background-size: 8px/$ppr;
        & span{
          line-height: 45px/$ppr;
          font-size: 1.2rem;
          &.s_title{
            & i{
              display: inline;
              background: red;
              padding: 5px/$ppr 8px/$ppr;
              color: white;
              margin-left: 5px/$ppr;
              border-radius: 2px;
              font-size: 1rem;
            }
          }
          &.s_status{
            color: #a5a5a5;
          }
        }
      }
    }
    .order_remark{
      background-color: white;
    }
  }
  .order_pay_button{
    width: 100%;
    position: fixed;
    display: flex;
    left: 0;
    bottom: 0;
    background: #3c3c3c;
    justify-content: space-between;
    align-items: center;
    line-height: 56px/$ppr;
    .total_price{
      padding: 0 10px/$ppr 0;
      color: white;
      font-size: 1.4rem;
    }
    .order_button{
      padding: 0 20px/$ppr;
      background: #0ECC3F;
      color: white;
      font-size: 1.4rem;
      & a{
        display: inline-block;
        color: white;
      }
    }
  }
  .mode_select{
    position: fixed;
    z-index: 33;
    width: 100%;
    height: 220px/$ppr;
    background: white;
    bottom: 0;
    left: 0;
    .mode_title{
      width: 100%;
      height: 48px/$ppr;
      line-height: 48px/$ppr;
      text-align: center;
      background: #ececec;
      font-size: 1.4rem;
      color: black;
    }
    .select_way{
      padding: 10px/$ppr;
      .select_way_li{
        line-height: 40px/$ppr;
        font-size: 1.2rem;
        background: url('../../assets/icon-meixuanze.png') no-repeat right center;
        background-size: 24px/$ppr;
        &.select_on{
          background: url('../../assets/icon-xuanze.png') no-repeat right center;
          background-size: 24px/$ppr;
        }
      }
    }
  }
  .shade_block{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 32;
    background: rgba(0, 0, 0, 0.5);
  }
}

</style>