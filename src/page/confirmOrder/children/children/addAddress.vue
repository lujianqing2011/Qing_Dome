<template>

<section class="add_address_page">
  <header-top header-title="添加地址" goBack="true" header-nav="true"></header-top>
  <section class="add_address">
    <section class="section_list">
      <label class="list_name">联&nbsp;&nbsp;系&nbsp;&nbsp;人&nbsp;:</label>
      <input type="text" placeholder="您的名字" class="list_fill">
    </section>
    <section class="section_list">
      <label class="list_name">联系电话&nbsp;:</label>
      <input type="text" placeholder="您的手机号码" class="list_fill">
    </section>
    <section class="section_list">
      <label class="list_name">邮政编码&nbsp;:</label>
      <input type="text" placeholder="收货地区的邮政编码" class="list_fill">
    </section>
    <section class="section_list">
      <label class="list_name">联系地址&nbsp;:</label>
      <input type="text" placeholder="小区/写字楼/学校等" class="list_fill">
    </section>
    <section class="section_list">
      <label class="list_name">详细地址&nbsp;:</label>
      <input type="text" placeholder="门牌号/街道等" class="list_fill">
    </section>
  </section>
  <section class="add_address_button" @click="determineAdd()">确定</section>
</section>

</template>

<script>

import headerTop from 'src/components/header/head';

export default{
  components:{
    headerTop
  },
  methods: {
    determineAdd() {
      this.$router.go(-1);
    }
  }
}


</script>

<style lang="scss">

.add_address_page{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 25;
  background: #fff;
  .add_address{
    .section_list{
      display: flex;
      justofy-content: flex-start;
      align-items: center;
      line-height: 2.4rem;
      border-bottom: 1px solid #eaeaea;
      padding: 0 .5rem;
      .list_name{
        font-size: .68rem;
      }
      .list_fill{
        flex: 1;
        padding: 0 .5rem;
        font-size: .65rem;
      }
    }
  }
  .add_address_button{
    width: 96%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: red;
    margin: 0 auto;
    font-size: .7rem;
    border-radius: 4px;
    margin-top: 1rem;
    color: white;
  }
}


</style>