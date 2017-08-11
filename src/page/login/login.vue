<template>

<div class="login_page">
  <header-top header-title="登录" goBack="true" header-nav="true"></header-top>
  <form>
    <section class="login_content">
      <section class="box_div">
        <input type="text" v-model="userName" placeholder="账户">
        <i class="delete_content" v-if="userName" @click="userName = null">&times;</i>
      </section>
      <section class="box_div">
        <input 
          type="password" 
          v-if="!showPassword" 
          v-model="userPassword" 
          placeholder="密码">
        <input v-else type="text" v-model="userPassword" placeholder="密码">
        <i class="delete_content" v-if="userPassword" @click="userPassword = null">&times;</i>
        <div class="button_switch" :class="{ change_state : showPassword}">
          <div class="slide_bt" @click="changeState()" :class="{ trans_right : showPassword }"></div>
          <span>abc</span>
          <span>c...</span>
        </div>
      </section>
      <section class="box_div">
        <input type="text" v-model="userCaptcha" placeholder="验证码">
        <div class="box_captcha">
          <div class="captcha_content">
            <img class="captcha_img" src="../../assets/fordet/yzm.png">
            <div class="captcha_click">
              <p>看不清</p>
              <p class="on">换一个</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </form>
  <section class="form_button"><button @click.prevent="loginTrigger()" >登录</button></section>
  <section class="state_box">
    <section class="forget_password">忘记密码？</section>
    <router-link to="/login/register">
      <section class="password_state no_record" >注册</section>
    </router-link>
  </section>
  <pop-box :show-alert="showAlert" :alert-text="alertText" @closeTip="closeTip()"></pop-box>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>
</div>

</template>

<script>

import headerTop from 'src/components/header/head';
import popBox from 'src/components/common/popbox';
import { mapState, mapMutations } from 'vuex';
import api from 'src/api/getApi';

export default{
  components: {
    headerTop,
    popBox
  },
  methods: {
    ...mapMutations(['USER_INFO']),
    changeState() {
      this.showPassword = !this.showPassword;
    },
    async loginTrigger() {
      if(!this.userName){
        this.showAlert = true;
        this.alertText = '您的账户不正确';
        return
      }else if(!this.userPassword) {
        this.showAlert = true;
        this.alertText = '您的密码不正确';
        return
      }else if(!this.userCaptcha){
        this.showAlert = true;
        this.alertText = '您的验证码不正确';
        return
      }
      else{
        await api.accountLogin(this.userName, this.userPassword).then((res) => {
          if(this.userName !== res.username) {
            this.showAlert = true;
            this.alertText = '您的账户还没注册';
            return
          }
          else if(this.userPassword !== res.password) {
            this.showAlert = true;
            this.alertText = '您的密码有误';
            return
          }
          else{
            this.showAlert = true;
            this.alertText = '登录成功';
            this.userInfo = res
            this.USER_INFO(res)
            let setTime = setTimeout(() => {
              this.$router.go(-1);
              clearTimeout(setTime);
            },1200)
          }
        });
      }
      if( !this.userInfo.user_id ){
        this.showAlert = true;
        this.alertText = '获取不到用户的ID';
      }else{
        this.USER_INFO(this.userInfo);
      }
    },
    closeTip() {
      this.showAlert = false
    }
  },
  data(){
    return{
      userName: null,
      userPassword: null,
      userCaptcha: null,
      showPassword: false,
      showAlert: null,
      alertText: null,
      userInfo: null
    }
  }
}

</script>

<style lang="scss" scoped>

.router-slid-enter-active, .router-slid-leave-active {
        transition: all .3s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(50px, 0, 0);
    opacity: 0;
}

.login_page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  .login_content{
    .box_div{
      width: 100%;
      display: flex;
      background: white;
      border-bottom: 1px solid #ececec;
      padding: .7rem .9rem;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      & input{
        font-size: .9rem;
        font-family: Helvetica Neue,Tahoma,Arial;
        flex: 1;
      }
      .delete_content{
        width: .9rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        background: #ccc;
        font-size: 1rem;
        border-radius: 50%;
        color: white;
        margin: 0 .25rem;
      }
      .button_switch{
        display: flex;
        justify-content: center;
        background: #ccc;
        border-radius: 10px;
        width: 2.3rem;
        height: .75rem;
        position: relative;
        top: 0;
        bottom: 0;
        margin: auto 0;
        &.change_state{
          background: rgba(76, 217, 100, 0.45);
        }
        & span{
          display: inline-block;
          line-height: .75rem;
          padding: 0 0.3rem;
          font-size: .6rem;
          color: white;
        }
        .slide_bt{
          width: 1.4rem;
          height: 1.4rem;
          background: #e2e2e2;
          border-radius: 50%;
          position: absolute;
          top: 0rem;
          bottom: 0rem;
          left: 0rem;
          margin: auto 0;
          transition: all 0.2s ease-in;
          box-shadow: 0 2px 5px 0 #d0d0d0;
          overflow: hidden;
          &.trans_right{
            transform: translateX(.9rem);
            background: #59EF72;
          }
        }
      }
      .box_captcha{
        position: relative;
        width: 7.5rem;
        .captcha_content{
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          margin: auto 0;
          align-items: center;
          flex-wrap: wrap;
          flex-wrap: nowrap;
          .captcha_img{
            margin-right: .2rem;
            width: 3.5rem;
            height: 1.4rem;
          }
          .captcha_click{
            display: flex;
            width: 2rem;
            flex-wrap: wrap;
            justify-content: center;
            & p{
              line-height: .9rem;
              font-size: .6rem;
              &.on{
                color: blue;
              }
            }
          }
        }
      }
    }
  }
  .form_button{
    padding: 0 .9rem;
    & button{
      background: #4cd964;
      color: white;
      width: 100%;
      height: 2.1rem;
      border-radius: 4px;
      font-size: 1rem;
      margin-top: 1.5rem;
    }
  }
  .state_box{
    display: flex;
    height: .9rem;
    line-height: .9rem;
    justify-content: space-between;
    font-size: .6rem;
    color: #333;
    padding: .5rem .9rem;
    .password_state{
      display: inline-block;
      padding: 0 .25rem;
    }
    .forget_password{
      text-decoration: underline;
    }
  }
}
  
</style>