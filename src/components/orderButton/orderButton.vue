<template>
  <div class="tab-btn">
    <a href="#" v-if="item.order_type === 0">取消订单{{item.order_type}}</a>
    <a href="#" v-if="item.order_type === 3" @click="deleOrder(item)">删除订单</a>
    <a href="#" v-if="item.order_type === 1" :class="{'bt-red':item.order_type === 1}">退款</a>
    <a href="#" v-if="item.order_type === 0" :class="{'bt-red':item.order_type === 0}">立即支付</a>
    <a href="#" v-if="item.order_type == 2">查看物流{{item.order_type}}</a>
    <a href="#" v-if="item.order_type === 2" :class="{'bt-red':item.order_type === 2}">确认收货</a>
    <a href="#" v-if="item.order_type === 3" :class="{'bt-red':item.order_type === 3}">评价</a>
  </div>
</template>

<script>
export default{
  data(){
    return{
      
    }
  },
  props: {
    item: {
      type: Object
    },
    orderList: {
      type: Array
    }
  },
  methods: {
    deleOrder(item) {
      const index = this.orderList.indexOf(item)
      this.orderList.splice(index,1)
      console.log(index)
    }
  }
}
</script>