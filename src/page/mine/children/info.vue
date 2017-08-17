<template>
<div class="info_page">
  <header-top header-title="账户信息" goBack="true"></header-top>
  <section class="info_main">
    <section class="info_router">
      <div class="info_portrait">
        <input type="file" class="head-file" @change="uploadAvatar">
        <h2 class="head-name">头像</h2>
        <div class="head-upload">
          <img class="portrait" src="../../../assets/mine/121.jpg">
        </div>
      </div>
    </section>
    <a class="div-box">
      <router-link to="/mine/userName">
      <section class="box">
        <h2 class="box-h2">用户名</h2>
        <div class="user_name">{{this.userName}}</div>
      </section>
      </router-link>
    </a>
    <a href="#" class="div-box">
      <router-link to="/mine/info/address">
      <section class="box clearfix">
        <h2 class="box-h2">收货地址</h2>
      </section>
      </router-link>
    </a>
    <section class="box-title">账号绑定</section>
    <a href="#" class="div-box">
      <section class="box clearfix">
        <h2 class="box-h2"><img class="icon-img" src="../../../assets/shouji.png">手机</h2>
      </section>
    </a>
    <section class="box-title">安全设置</section>
    <router-link to="/fordet">
    <a href="#" class="div-box">
      <section class="box clearfix">
        <h2 class="box-h2">登录密码</h2>
      </section>
    </a>
    </router-link>
  </section>
  <section class="user-quit" @click="showBounced()">退出登录</section>
  <inquiry-alert :show-alert="showPop" :alert-text="alertText" @closeTip="closeTip()" >
    <div slot="yes" class="right"><button @click.prevent="exitLogin()">确定</button></div>
  </inquiry-alert>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>

  <loading v-show="showLoading"></loading>

</div>

</template>

<script>

import headerTop from 'src/components/header/head';
import inquiryAlert from 'src/components/common/inquiryAlert';
import { mapState } from 'vuex';
import loading from 'src/components/common/loading';
import { removeStore } from 'src/config/storage';

export default{
  components: {
    headerTop,
    loading,
    inquiryAlert
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    userInfo: function(value) {
      if(value && value.user_id){
        this.userName = value.username
      }
    }
  },
  methods: {
    showBounced() {
      this.showPop = true;
    },
    closeTip() {
      this.showPop = false;
    },
    exitLogin() {
      this.closeTip();
      removeStore('user_id');
      let setTime = setTimeout(() => {
        this.$router.replace('/mine');
        clearTimeout(setTime);
      },1000)
    },
    //头像上传
    async uploadAvatar() {
      if(this.userInfo) {
        let input = document.querySelector('.head-file')
        let data = new FormData();
        data.append('file', input.files[0]);
        console.log(input.files[0])
        try{
          this.showLoading = true;
          let response = await fetch('/api/users/', {
            method: 'POST',
            credentials: 'include',
            body: data
          })
          this.showLoading = false
          let res = await response.json();
          console.log(res)
        }catch (error) {
          this.showLoading = false
          alert('上传失败')
          throw new Error(error);
        }
      }
    }

  },
  data() {
    return{
      userName: '',
      alertText: "确定要退出？",
      showPop: false,
      showLoading: false
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

.info_page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f2f2f2;
  z-index: 66;
  overflow-x: auto;
  .head-top{
    width: 100%;
    height: 55px/$ppr;
    line-height: 55px/$ppr;
    background-color: black;
    display: flex;
    text-align: center;
    color: white;
    font-size: .7rem;
    .left,.right{
      flex: 0 0 55px/$ppr;
    }
    .title{
      flex: 1;
      font-weight: 700;
      font-size: 1rem;
    }
  }
  .info_main{
    .info_router{
      position: relative;
      .info_portrait{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 10px/$ppr;
        height: 66px/$ppr;
        line-height: 3.25rem;
        background: white;
        border-bottom: 1px solid #ddd;
        &:last-child{

        }
        .head-file{
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
        }
        .head-name{
          
          font-size: 1.2rem;
        }
        .head-upload{
          
          font-size: 1.2rem;
          .portrait{
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }
      }
    }
    .div-box{
      display: block;
      background: white;
      border-bottom: 1px solid #ddd;
      .box{
        position: relative;
        padding: 0 30px/$ppr 0 10px/$ppr;
        height: 48px/$ppr;
        line-height: 48px/$ppr;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:before{
          content: ' ';
          position: absolute;
          background: url('../../../assets/mine/rightarrow_new.png') no-repeat center;
          background-size: 8px/$ppr;
          top: 0;
          right: 0;
          z-index: 999;
          width: 30px/$ppr;
          height: 100%;
        }
        .box-h2{
          font-size: 1.2rem;
          color: black;
          display: flex;
          align-items: center;
          & .icon-img{
            margin-right: .4rem;    
          }
        }
        .user_name{
          font-size: 1.2rem;
          color: #000;
        }
      }
    }
    .box-title{
      height: 42px/$ppr;
      line-height: 42px/$ppr;
      font-size: 1.2rem;
      color: #777;
      padding: 0 10px/$ppr;
      border-bottom: 1px solid #ddd;
    }
  }
  .user-quit{
    position: fixed;
    bottom: 10px/$ppr;
    left: 0;
    right: 0;
    width: 96%;
    height: 48px/$ppr;
    line-height: 48px/$ppr;
    margin: 0 auto;
    background: #00C318;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.4rem;
    color: white;
    border-radius: 4px;
  }
}
  
</style>