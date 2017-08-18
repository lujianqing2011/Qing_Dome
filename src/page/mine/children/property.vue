<template>

<div class="property-page">
  <header-top header-title="我的余额" goBack="true" class="use_color"></header-top>
  <section class="property-box">
    <section class="property-content">
      <div class="content-head clearfix">
        <span class="left">当前余额</span>
        <span class="right">余额说明</span>
      </div>
      <div class="content-usable">10000</div>
      <div class="content-button">
        <button class="left-bt" @click.prevent >提现</button>
        <button class="right-bt" @click.prevent >充值</button>
      </div>
    </section>
  </section>
  <h2 class="content-h2">金额明细</h2>
  <section class="content-detail">
    <div class="detail-title">
      <span>时间</span>
      <span>用途</span>
      <span>数量</span>
    </div>
    <div class="detail-content">
      <span>2017-8-18</span>
      <span>购买化妆品</span>
      <span>20</span>
    </div>
  </section>
</div>

</template>

<script>

import headerTop from 'src/components/header/head'

export default{
  components:{
    headerTop
  }
}

</script>

<style lang="scss" scoped>

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.property-page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f2f2f2;
  height: 100%;
  z-index: 102;
  .property-box{
    width: 100%;
    background: #FF3B84;
    box-sizing: border-box;
    padding: 0 10px/$ppr 10px/$ppr;
    .property-content{
      background: white;
      border-radius: 4px;
      padding: 10px/$ppr;
      .content-head{
        height: 30px/$ppr;
        line-height: 30px/$ppr;
        font-size: 1.2rem;
        .left{
          float: left;
          font-size: 1.2rem;
          color: #a0a0a0;
        }
        .right{
          float: right;
          background: url('../../../assets/mine/bangzu.png') no-repeat left center;
          background-size: 30%;
          padding-left: 22px/$ppr;
          color: #FF3B84;
          font-size: 1rem;
        }
      }
    }
    .content-usable{
      font-size: 4rem;
      padding: 15px/$ppr 0;
      text-align: center;
    }
    .content-button{
      margin-top: 20px/$ppr;
      display: flex;
      & button{
        width: 100%;
        flex: 1;
        font-size: 1.4rem;
        height: 50px/$ppr;
        line-height: 50px/$ppr;
        border-radius: 4px;
        color: white;
        &.left-bt{
          margin-right: .5rem;
        }
        &.right-bt{
          margin-left: .5rem;
          background: #17D625;
        }
      }
    }
  }
  .content-h2{
    padding: 15px/$ppr 10px/$ppr;
    font-size: 1.4rem;
    color: #636363;
    font-weight: 700;
  }
  .content-detail{
    .detail-title{
      background: white;
      display: flex;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
      & span{
        flex: 1;
        font-size: 1.4rem;
        line-height: 40px/$ppr;
      }
    }
    .detail-content{
      display: flex;
      align-items: center;
      text-align: center;
      line-height: 40px/$ppr;
      vertical-align: middle;
      background-color: white;
      & span{
        flex: 1;
        font-size: 1.2rem;
        padding: 0 5px/$ppr;
      }
    }
  }
}

</style>