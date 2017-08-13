<template>
<section class="choose_address_page">
  <header-top header-title="选择地址" goBack="true" header-nav="true"></header-top>
  <section class="choose_address">
    <ul class="address_list">
      <li class="list_current" v-for="(list,index) in selectList"  @click="selectAddress(index)">
        <span class="icon_select" :class="{ on:selectOn === index }"></span>
        <div class="address">
          <p><span class="name">{{list.name}}</span><span>{{list.sex}}</span><span>{{list.number}}</span></p>
          <p class="address_detail">{{list.address}}</p>
        </div>
      </li>
    </ul>
    <router-link to="/confirmOrder/chooseAddress/addAddress">
      <section class="add_address">
          <span class="iconfont">＋ </span>添加地址
      </section>
     </router-link>
  </section>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>
</section>
  
</template>

<script>

import headerTop from 'src/components/header/head';

export default{
  components:{
    headerTop
  },
  methods: {
    selectAddress(index) {
      this.selectOn = index
      this.$router.go(-1);
    }
  },
  data(){
    return{
      selectOn: 0,
      selectList: [
        {
          status: true,
          name: '王小源',
          sex: '先生',
          number: '15626202361',
          address: '北京市密云县水库8号'
        },
        {
          status: false,
          name: '刘一手',
          sex: '先生',
          number: '15626889451',
          address: '哈尔滨佳木斯密云县水库8号'
        },
        {
          status: false,
          name: '球球',
          sex: '小姐',
          number: '15626289361',
          address: '沈阳基地密云县水库8号'
        }
      ]
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
  transform: translate3d(2.5rem, 0, 0);
  opacity: 0;
}

.choose_address_page{
  position: fixed;
  z-index: 20;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .choose_address{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    overflow-y: auto;
    .address_list{
      .list_current{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 12px/$ppr 10px/$ppr;
        background: white;
        .icon_select{
          width: 25px/$ppr;
          height: 25px/$ppr;
          display: inline-block;
          background: url('../../../assets/icon-meixuanze.png') no-repeat left center;
          background-size: 25px/$ppr;
          margin-right: 10px/$ppr;
          &.on{
            background: url('../../../assets/icon-xuanze.png') no-repeat left center;
            background-size: 25px/$ppr;
          }
        }
        .address{
          line-height: 24px/$ppr;
          & span{
            display: inline-block;
            font-size: 1.2rem;
            margin-right: 5px/$ppr;
            &.name{
              font-size: 1.4rem;
              font-weight: 700;
            }
          }
          .address_detail{
            font-size: 1.4rem;
          }
        }
      }
    }
    .add_address{
      width: 96%;
      height: 42px/$ppr;
      line-height: 42px/$ppr;
      text-align: center;
      font-size: 1.4rem;
      background: #35D800;
      color: white;
      border-radius: 4px;
      margin: 1rem auto 0;
    }
  }
}
  
</style>