<template>
<div class="username-page">
  <header-top header-title="用户名" goBack="true" header-nav="true"></header-top>
  <section class="user-name">
    <section class="setname">
      <input type="text" :placeholder="placeholderName" v-model="newUserName">
      <div class="name-hint">用户名只能修改一次(5-8个字之间)</div>
    </section>
    <section class="set-button">
      <button @click.prevent="nameAmend()">确认修改</button>
    </section>
  </section>
</div>
</template>

<script>

import headerTop from 'src/components/header/head';
import { mapState,mapMutations } from 'vuex';
import api from 'src/api/getApi';

export default{
  components: {
    headerTop
  },
  computed:{
    ...mapState([
        'userInfo'
    ])
  },
  watch: {
    userInfo: function(value) {
      if(value && value.user_id) {
        this.placeholderName = value.username 
      }
    }
  },
  methods: {
    ...mapMutations([
        'RETSET_NAME'
      ]),
    nameAmend() {
      if(!this.newUserName){
        return
      }
      this.RETSET_NAME(this.newUserName);
      api.UserNameAmend(this.newUserName, this.userInfo.password, this.userInfo.user_id);
      this.$router.go(-1);
    }
  },
  data() {
    return{
      placeholderName: '请输入用户名',
      newUserName: ''
    }
  }
}
</script>

<style lang="scss">

.username-page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  z-index: 66;
  .user-name{
    padding: .5rem;
    .setname{
      & input{
        width: 100%;
        display: block;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        line-height: 1.75rem;
        font-size: .8rem;
        padding: .15rem .5rem;
        box-sizing: border-box;
        &::-webkit-input-placeholder{
          color: #a9a9a9;
          font-family: "Microsoft Yahei";
        }
      }
      .name-hint{
        padding: .5rem .25rem 1.1rem .25rem;
        font-size: .64rem;
      }
    }
  }
  .set-button{
    & button{
      width: 100%;
      background: red;
      border: 1px solid #eee;
      color: white;
      height: 2rem;
      line-height: 2rem;
      font-size: .7rem;
      font-family: "Microsoft Yahei";
      border-radius: 4px;
      outline: none;
    }
  }
}

</style>