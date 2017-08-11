<template>
	<div class="order-page">
		<header-top header-title="全部订单" goBack="true" header-nav="true"></header-top>
    <div class="pages-title">
      <ul class="title">
        <router-link v-for="pages in pagesTitle" :to="{ path: pages.path }" replace :key="pages" tag='li'>
          {{pages.title}}
        </router-link>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
	</div>
</template>

<script>

import headerTop from 'src/components/header/head';

export default{
  components:{
    headerTop
  },
  data(){
    return{
      pagesTitle: [
        {
          title: '全部',
          path: '/order/all'
        },
        {
          title: '待付款',
          path: '/order/waitPayment'
        },
        {
          title: '待发货',
          path: '/order/waitShipments'
        },
        {
          title: '待收货',
          path: '/order/waitReceiving'
        },
        {
          title: '待评价',
          path: '/order/waitEvaluate'
        }
      ]
    }
  }
}

</script>

<style lang="scss">

@import './order';

</style>