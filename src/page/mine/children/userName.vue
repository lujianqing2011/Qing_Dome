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

$ppr: 12px/1rem; // 样式的rem按照12px进行转换
$size1: 1rem;
$size2: 1.2rem;
$size3: 1.4rem;
$size4: 1.6rem;

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
    padding: 10px/$ppr;
    .setname{
      & input{
        width: 100%;
        display: block;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        line-height: 36px/$ppr;
        font-size: $size4;
        padding: 5px/$ppr 10px/$ppr;
        box-sizing: border-box;
        &::-webkit-input-placeholder{
          color: #a9a9a9;
          font-family: "Microsoft Yahei";
        }
      }
      .name-hint{
        padding: 6px/$ppr 0 25px/$ppr 5px/$ppr;
        font-size: $size2;
      }
    }
  }
  .set-button{
    & button{
      width: 100%;
      background: red;
      border: 1px solid #eee;
      color: white;
      height: 48px/$ppr;
      line-height: 48px/$ppr;
      font-size: $size4;
      font-family: "Microsoft Yahei";
      border-radius: 4px;
      outline: none;
    }
  }
}

</style>