<template>

<div class="gold-page">
  <header-top header-title="我的金币" goBack="true"></header-top>
  <section class="gold-box">
    <section class="gold-content">
      <div class="content-head clearfix">
        <span class="left">可用金币</span>
        <span class="right"><router-link to="gold/explain">金币说明</router-link></span>
      </div>
      <div class="content-usable">10000</div>
      <div class="content-button"><button @click.prevent >提现</button></div>
    </section>
  </section>
  <h2 class="content-h2">金币明细</h2>
  <section class="content-detail">
    <div class="detail-box"></div>
  </section>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>
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

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .3s;
}
.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(50px, 0, 0);
  opacity: 0;
}

.gold-page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f2f2f2;
  height: 100%;
  z-index: 102;
  .gold-box{
    width: 100%;
    background: #FF3B84;
    box-sizing: border-box;
    padding: 5px/$ppr 10px/$ppr 10px/$ppr;
    .gold-content{
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
          background-size: 24%;
          padding-left: 22px/$ppr;
          & a{
            color: #FF3B84;
          }
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
      & button{
        width: 100%;
        flex: 1;
        font-size: 1.4rem;
        height: 50px/$ppr;
        line-height: 50px/$ppr;
        border-radius: 4px;
        color: white;
      }
    }
  }
  .content-h2{
    padding: 15px/$ppr 10px/$ppr;
    font-size: 1.4rem;
    color: #a0a0a0;
  }
  .content-detail{
    padding: 0 10px/$ppr 10px/$ppr 10px/$ppr;
    .detail-box{
      height: 200px/$ppr;
      background: white;
    }
  }
}

</style>