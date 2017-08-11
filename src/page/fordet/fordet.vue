<template>
<div class="fordet-page">
  <header-top header-title="密码设置" goBack="true" header-nav="true"></header-top>
  <form class="rest-form">
    <section class="box_div input-in">
      <input type="text" placeholder="账号" v-model="number" maxlength="11">
      <i class="delete_content" v-if="number" @click="number = null">&times;</i>
      <button 
        :class="{get_code:rightPhoneNumber}" 
        @click.prevent="getPhoneNumber()" 
        v-show="!computedTime">获取验证码</button>
      <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
    </section>

    <section class="box_div">
      <input type="text" v-model="oldPassword" placeholder="旧密码" maxlength="8">
      <i class="delete_content" v-if="oldPassword" @click="oldPassword = null">&times;</i>
    </section>

    <section class="box_div">
      <input type="text" placeholder="请输入新密码" v-model="newPassword" maxlength="8">
      <i class="delete_content" v-if="newPassword" @click="newPassword = null">&times;</i>
    </section>

    <section class="box_div">
      <input type="text" placeholder="请重新输入新密码" v-model="affirmPassword" maxlength="8">
      <i class="delete_content" v-if="affirmPassword" @click="affirmPassword = null">&times;</i>
    </section>
    
    <section class="box_div">
      <input type="text" placeholder="验证码" v-model="authCode" maxlength="4">
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

    <section class="form_button">
      <button @click.prevent="confirmAlter()" >确定修改</button>
    </section>
  </form>
  <pop-box :show-alert="showAlert" :alert-text="alertText" @closeTip="closeTip()"></pop-box>
</div>
</template>

<script>

import headerTop from 'src/components/header/head';
import popBox from 'src/components/common/popbox';

export default{
  computed: {
    rightPhoneNumber: function(){   //输入计算手机验证格式
      return /^1[34578]\d{9}$/.test(this.number);
    }
  },
  methods: {
    getPhoneNumber() {  //点击高亮的获取验证码按钮,进行获取验证码的倒计时
      if(this.rightPhoneNumber){
        this.computedTime = true;
        this.computedTime = 50;
        let setTime = setInterval(() => {
          this.computedTime--;
          if(this.computedTime === 0){
            this.computedTime = false;
            clearInterval(setTime);
            return
          }
        },1000)
      }
    },
    confirmAlter() {
      if(!this.number || !this.rightPhoneNumber){
        this.showAlert = true;
        this.alertText = '请输入正确的账号';
        return
      }else if(!this.oldPassword) {
        this.showAlert = true;
        this.alertText = '请输入旧密码';
        return
      }else if(!this.newPassword) {
        this.showAlert = true;
        this.alertText = '请输入新的密码';
        return
      }else if( this.newPassword != this.affirmPassword) {
        this.showAlert = true;
        this.alertText = '两次密码不一致';
        return
      }else if(!this.authCode) {
        this.showAlert = true;
        this.alertText = '请输入验证码';
        return
      }else{
        this.showAlert = true;
        this.alertText = '修改成功';
      }
    },
    closeTip() {  //子组件传回,触发该事件
      this.showAlert = false;
    }
  },
  components: {
    headerTop,
    popBox
  },
  data(){
    return{
      userName: null,
      computedTime: 0,       //显示获取验证码按钮显示为高亮/倒计时
      showAlert: false,      //控制弹出框组件的显示
      number: null,          //账号号码
      oldPassword: null,     //旧密码
      newPassword: null,     //新密码
      affirmPassword: null,  //确认密码
      authCode: null,        //验证码
      alertText:'弹出框内容'
    }
  }
}
</script>

<style lang="scss">

.fordet-page{
  background: #f2f2f2;
  .rest-form{
    .box_div{
      width: 100%;
      display: flex;
      background: white;
      border-bottom: 1px solid #ececec;
      padding: 1.4rem 1.8rem;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      .get_code{
        background-color: #4cd964;
      }
      &.input-in{
        padding: 0.7rem 1.8rem;
      }
      & input{
        font-size: 1.8rem;
        font-family: Helvetica Neue,Tahoma,Arial;
        flex: 1;
      }
      .delete_content{
        width: 1.8rem;
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        background: #ccc;
        font-size: 2rem;
        border-radius: 50%;
        color: white;
        margin: 0 .5rem;
      }
      & button{
        padding: .7rem 1rem;
        border: none;
        color: white;
        font-size: 1.6rem;
        border-radius: 4px;
        outline: none;
        font-family: Helvetica Neue,Tahoma,Arial;
      }
      .box_captcha{
        position: relative;
        width: 150px;
        .captcha_content{
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          margin: auto 0;
          align-items: center;
          flex-wrap: wrap;
          .captcha_img{
            margin-right: .4rem;
            width: 7rem;
            height: 2.8rem;
          }
          .captcha_click{
            display: flex;
            width: 4rem;
            flex-wrap: wrap;
            justify-content: center;
            & p{
              line-height: 1.8rem;
              font-size: 1.2rem;
              &.on{
                color: blue;
              }
            }
          }
        }
      }
    }
    .form_button{
      padding: 0 1.8rem;
      & button{
        background: #4cd964;
        color: white;
        width: 100%;
        height: 4.2rem;
        border-radius: 4px;
        font-size: 2rem;
        margin: 2rem 0;
      }
    }
  }
}

</style>