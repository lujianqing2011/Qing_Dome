<template>
  <div class="add-new">
    <header-top header-title="新增地址" goBack="true"></header-top>
    <section class="add-new-page">
      <form>
        <section class="padding-block">
          <section class="form-box">
            <div class="input-new">
              <label>姓名：<span v-if="nameHint">请填写你的姓名</span></label>
              <input type="text" v-model="userName" @input="inputName" :class="{warning: nameHint}" placeholder="请填写您的姓名">
            </div>
            <div class="input-new">
              <label>地址：<span v-if="siteHint">请选择您的地址</span></label>
              <router-link to="/mine/info/address/addNew/addDetail">
              <input type="text" v-model="userSite" @input="inputSite" :class="{warning: siteHint}" placeholder="请选择您的地址" disabled="disabled" >
              </router-link>
            </div>
            <div class="input-new">
              <label>详细地址：<span v-if="detailHint">请填写您的详细地址</span></label>
              <input type="text" v-model="userDetai" @input="inputDetai" :class="{warning: detailHint}" placeholder="请填写您的详细地址">
            </div>
            <div class="input-new">
              <label>手机号码：<span v-if="mobilelHint">请填写您的手机号码</span></label>
              <input type="text" v-model="userMobile" @input="inputMobile" :class="{warning: mobilelHint}" placeholder="请填写您的手机号码">
            </div>
            <div class="input-new">
              <label>备用号码：<span v-if="standbyHint">备用联系电话</span></label>
              <input type="text" v-model="userStandby" @input="inputStandby" :class="{warning: standbyHint}" placeholder="备用联系电话">
            </div>
          </section>
        </section>
        <section class="addbutton">
          <button @click.prevent="revampSite()" v-if="itemSite" >确定修改</button>
          <button @click.prevent="saveSite()" v-else >保存地址</button>
        </section>
      </form>
    </section>
    <transition name="router-slid" mode="out-in">
      <router-view @change="selectSite($event)"></router-view>
    </transition>
  </div>
</template>

<script>

import headerTop from 'src/components/header/head';

export default{
  components: {
    headerTop
  },
  mounted() {
    if(this.$route.query.item){
      this.itemSite = true
      let duixian = this.$route.query.item;
      this.userName = duixian.name;
      this.userSite = duixian.address;     //地址
      this.userDetai = duixian.detail;    //详细地址
      this.userMobile = duixian.mobile;  //手机号码
    }
  },
  methods: {
    inputName() {     //用户名
      if(this.userName){
        this.nameHint = false
      }else{
        this.nameHint = true
      }
    },
    inputSite() {     //地址
      if(this.userSite){
        this.siteHint = false
      }else{
        this.siteHint = true
      }
    },
    inputDetai() {    //详细地址
      if(this.userDetai){
        this.detailHint = false
      }else{
        this.detailHint = true
      }
    },
    inputMobile() {   //手机号码
      if(this.userMobile){
        this.mobilelHint = false
      }else{
        this.mobilelHint = true
      }
    },
    inputStandby() {  //备用手机号码
      if(this.userStandby){
        this.standbyHint = false
      }else{
        this.standbyHint = true
      }
    },
    saveSite(){
      if(this.userName && this.userSite && this.userDetai && this.userMobile){
        let message = {
          tolerant: false,
          name: this.userName,
          detail: this.userDetai,
          mobile: this.userMobile,
          address: this.userSite
        }
        this.$emit('changeOn', message);
        this.$router.go(-1);
      }else{
        this.inputName();
        this.inputSite();
        this.inputDetai();
        this.inputMobile();
        this.inputStandby();
      }
    },
    selectSite(item) {  //接受子组件返回来的地址
      let getSite = '';
      for(let i in item){
        getSite += item[i]
      }
      this.userSite = getSite
      this.inputSite();
    },
    revampSite() {
      if(this.userName && this.userSite && this.userDetai && this.userMobile){
        let message = {
          tolerant: false,
          name: this.userName,
          detail: this.userDetai,
          mobile: this.userMobile,
          address: this.userSite
        }
        alert('把message发送给服务器')
        this.$router.go(-1);
      }else{
        this.inputName();
        this.inputSite();
        this.inputDetai();
        this.inputMobile();
        this.inputStandby();
      }
    }
  },
  data(){
    return{
      userName: '',     //姓名
      userSite: '',     //地址
      userDetai: '',    //详细地址
      userMobile: '',   //手机号码
      userStandby: '',  //备用手机号码
      nameHint: false,  //姓名提示
      siteHint: false,  //地址提示
      detailHint: false, //详细地址提示
      mobilelHint: false,  //手机号码提示
      standbyHint: false,    //备用手机号码
      itemSite: false
    }
  }
}

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.router-slid-enter-active, .router-slid-leave-active {
        transition: all .3s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(50px, 0, 0);
    opacity: 0;
}

.add-new{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background: #f2f2f2;
  .add-new-page{
    .padding-block{
      .form-box{
        padding: 10px/$ppr 10px/$ppr 5px/$ppr;
        background: white;
        .input-new{
          padding-bottom: 5px/$ppr;
          & label{
            display: flex;
            align-items: center;
            line-height: 34px/$ppr;
            & span{
              flex: 1;
              color: red;
              text-align: right;
              font-size: 1.4rem;
              line-height: 0;
              display: inline-block;
            }
          }
          & input[type="text"]{
            width: 100%;
            height: 40px/$ppr;
            line-height: 40px/$ppr;
            font-size: 1.4rem;
            border: 1px solid #ddd;
            background: white;
            padding: 0 10px/$ppr;
            border-radius: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;
            background-clip: padding-box;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1);
            &:focus{
              border-color: rgb(0, 212, 163);
            }
            &.warning{
              border-color: red;
            }
          }
          & p{
            margin-top: 10px/$ppr;
            color: red;
          }
        }
      }
    }
    .addbutton{
      margin-top: 20px/$ppr;
      padding: 0 10px/$ppr;
      & button{
        width: 100%;
        height: 48px/$ppr;
        line-height: 48px/$ppr;
        background-color: #02D858;
        border: none;
        outline: none;
        font-size: 1.4rem;
        color: white;
        border-radius: 4px;
        font-family: Microsoft Yahei;
        background-clip: padding-box;
        border: 1px solid transparent;
        transition: all 0.2s ease-in-out;
        &:focus{
          // box-shadow: 0 0 0 2px rgba(81, 217, 79, 0.5);
          // background: #02D830;
        }
      }
    }
  }
}
</style>