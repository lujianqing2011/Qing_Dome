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

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.payment_page{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 26;
  background: white;
  .need_pay {
    padding: 15px/$ppr 10px/$ppr;
    & span {
      display: inline-block;
      &.title {
        font-size: 1.4rem;
      }
      &.pay {
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
  }
  .payment_content{
    width: 100%;
    height: 100%;
    background: #fff;
    .payment_content_h2{
      line-height: 50px/$ppr;
      font-size: 1.4rem;
      padding: 0 10px/$ppr;
    }
    .pay_item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px/$ppr;
      background: url('../../../assets/rightarrow_new.png') no-repeat 97% center;
      background-size: 8px/$ppr;
      height: 48px/$ppr;
      .pay_icon{
        width: 48px/$ppr;
        height: 100%;
        background: url('../../../assets/confirmOrder/zfb.png') no-repeat left center;
        background-size: 48px/$ppr;
        margin-right: 10px/$ppr;
      }
      .pay_info{
        line-height: 24px/$ppr;
        .pay_info_name{
          font-size: 1.4rem;
        }
        .pay_info_hint{
          color: #9e9e9e;
          font-size: 1.2rem;
        }
      }
    }
  }
}
  
</style>