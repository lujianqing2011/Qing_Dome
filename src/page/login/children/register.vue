<template>

<div class="login_page">
  <header-top header-title="注册" goBack="true" header-nav="true"></header-top>
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
            <img class="captcha_img" src="../../../assets/fordet/yzm.png">
            <div class="captcha_click">
              <p>看不清</p>
              <p class="on">换一个</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </form>
  <section class="form_button"><button @click.prevent="loginTrigger()" >注册</button></section>
  <pop-box :show-alert="showAlert" :alert-text="alertText" @closeTip="closeTip()"></pop-box>
</div>

</template>

<script>

import headerTop from 'src/components/header/head';
import popBox from 'src/components/common/popbox';
import { mapState } from 'vuex';
import api from 'src/api/getApi';

export default{
  components: {
    headerTop,
    popBox
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    changeState() {
      this.showPassword = !this.showPassword;
    },
    loginTrigger() {
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
        let user_id = Math.floor(Math.random()*1000)    //用户id
        api.Register(this.userName, this.userPassword, user_id).then((res) => {
          this.showAlert = true;
            this.alertText = '注册成功';
            let setTime = setTimeout(() => {
              this.$router.replace('/login');
              clearTimeout(setTime);
            },2000)
        })
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
      alertText: null
    }
  }
}

</script>

<style lang="scss" scoped>

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
          background: #4cd964;
        }
        & span{
          display: inline-block;
          line-height: .75rem;
          padding: 0 0.3rem;
          color: white;
          font-size: .6rem;
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
          overflow: hidden;
          &.trans_right{
            transform: translateX(.9rem);
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
            margin-right: .4rem;
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
}
  
</style>