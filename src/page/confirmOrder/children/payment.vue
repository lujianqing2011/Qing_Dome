<template>
<section class="payment_page">
  <header-top header-title="选择支付" goBack="true" header-nav="true"></header-top>
  <section class="need_pay">
    <span class="title">支付：</span>
    <span class="pay">255.00</span>
  </section>
  <section class="payment_content">
    <h2 class="payment_content_h2">选择支付方式</h2>
    <section class="pay_item">
      <span class="pay_icon"></span>
      <div class="pay_info">
        <p class="pay_info_name">微信支付</p>
        <p class="pay_info_hint">仅安装微信6.20及以上版本的客户端使用</p>
      </div>
    </section>
    <section class="pay_item">
      <span class="pay_icon"></span>
      <div class="pay_info">
        <p class="pay_info_name">支付宝支付</p>
        <p class="pay_info_hint">仅安装微信6.20及以上版本的客户端使用</p>
      </div>
    </section>
  </section>
</section>
</template>

<script>

import headerTop from 'src/components/header/head';

export default{
  components:{
    headerTop
  }
}
  
</script>

<style lang="scss">

.payment_page{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 26;
  background: white;
  .need_pay {
    padding: 1rem .5rem;
    & span {
      display: inline-block;
      &.title {
        font-size: .8rem;
      }
      &.pay {
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }
  .payment_content{
    width: 100%;
    height: 100%;
    background: #fff;
    .payment_content_h2{
      line-height: 2rem;
      font-size: .65rem;
      padding: 0 .5rem;
    }
    .pay_item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 1rem 0 .5rem;
      background: url('../../../assets/rightarrow_new.png') no-repeat 97% center;
      background-size: .4rem;
      height: 2.3rem;
      margin: 0.25rem 0 .5rem 0;
      .pay_icon{
        width: 2.1rem;
        height: 100%;
        background: url('../../../assets/confirmOrder/zfb.png') no-repeat left center;
        background-size: 2.1rem;
        margin-right: .4rem;
      }
      .pay_info{
        line-height: .9rem;
        .pay_info_name{
          font-size: .6rem;
        }
        .pay_info_hint{
          color: #9e9e9e;
          font-size: .55rem;
        }
      }
    }
  }
}
  
</style>