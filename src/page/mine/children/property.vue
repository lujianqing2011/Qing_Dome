<template>

<div class="property-page">
  <header-top header-title="我的余额" goBack="true"></header-top>
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
  <h2 class="content-h2">金币明细</h2>
  <section class="content-detail">
    <div class="detail-box"></div>
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
    padding: .4rem .8rem 1rem .8rem;
    .property-content{
      background: white;
      border-radius: 4px;
      padding: .5rem;
      .content-head{
        height: 1rem;
        line-height: 1rem;
        font-size: .64rem;
        .left{
          float: left;
          font-size: .64rem;
          color: #a0a0a0;
        }
        .right{
          float: right;
          background: url('../../../assets/mine/bangzu.png') no-repeat left center;
          background-size: 24%;
          padding-left: 1rem;
          color: #FF3B84;
          font-size: .64rem;
        }
      }
    }
    .content-usable{
      font-size: 2rem;
      padding: .5rem 0;
      text-align: center;
    }
    .content-button{
      margin-top: 1rem;
      display: flex;
      & button{
        width: 100%;
        flex: 1;
        font-size: .8rem;
        height: 2.2rem;
        line-height: 2.2rem;
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
    padding: .75rem .5rem;
    font-size: .64rem;
    color: #a0a0a0;
  }
  .content-detail{
    padding: 0 .5rem .5rem .5rem;
    .detail-box{
      height: 7.5rem;
      background: white;
    }
  }
}

</style>