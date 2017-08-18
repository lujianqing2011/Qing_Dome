<template>
<header id="header-top">
  <section class="header">
    <section class="header-left">
      <slot name="logo"></slot>
      <div class="goBack iconfont" v-if="goBack" @click="$router.go(-1)">&#xe67c;</div>
    </section>
    <section class="header-title">
      <div class="title" v-if="headerTitle" >{{headerTitle}}</div>
      <slot name="seek"></slot>
    </section>
    <section class="header-right change_color">
      <div class="headerNav" v-if="headerNav" :class="{ hide:showNav }" @click="showNav = !showNav"></div>
      <slot name="search"></slot>
    </section>
  </section>
  
  <nav class="header-nav" :class="{show_nav: showNav}" v-if="headerNav" ref="navSile">
    <router-link 
      v-for = " nav in navList " 
      :to = " { path:nav.path }"
      :key="nav"
      tag = "a"
      class="nav-div" ><i class="iconfont nav_icon" v-html="nav.icon"></i> {{ nav.navName }}
    </router-link>
  </nav>
</header>

</template>

<script>

import { mapState, mapActions } from 'vuex';

export default{
  props:["headerTitle","goBack","headerNav"],
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['getUserInfo','getOrder'])
  },
  mounted() {
    this.getUserInfo();
  },
  data(){
    return{
      showNav: false,
      navList:[
        { icon: '&#xe737;', navName: '首页', path: '/' },
        { icon: '&#xe60d;', navName: '分类', path: '/classify' },
        { icon: '&#xe6a1;', navName: '购物车', path: '/cart' },
        { icon: '&#xe601;', navName: '我的', path: '/mine' }
      ]
    }
  }
}

</script>

<style lang="scss">
$ppr: 12px/1rem; // 样式的rem按照12px进行转换
#header-top{
  background-color: #f9fafd;
  border-bottom: 1px solid #E8E8E8;
  box-sizing: border-box;
  .header{
    display: flex;
    height: 54px/$ppr;
    line-height: 54px/$ppr;
    text-align: center;
    position: relative;
    z-index: 10;
    .header-left,.header-right{
      height: 100%;
      flex: 0 0 54px/$ppr;
      font-size: 1.4rem;
      color: #8c8c8c;
      cursor: pointer;
    }
    .header-left{
      .goBack{
        width: 100%;
        height: 100%;
        color: #9E9E9E;
        font-size: 1.8rem;
        //background: url('./left.png') no-repeat 10px/$ppr center;
        //background-size: 40%;
      }
    }
    .header-right{
      .headerNav{
        height: 100%;
        background: url('./more.png') no-repeat center center;
        background-size: 50%;
        transition: all 0.5s;
        &.hide{
          position: relative;
          background: url('./cuowu.png') no-repeat center center;
          background-size: 50%;
          transition: all 0.5s;
          &:after{
            content: ' ';
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            width: 0;
            height: 0;
            margin: 0 auto;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #f9fafd;
          }
        }
      }
    }
    .header-title{
      height: 100%;
      color: #000;
      flex: 1;
      .title{
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1.4rem;
        font-weight: 700;
      }
    }
    //首页的logo
    .header-logo {
      width: 100%;
      height: 100%;
      background: url('../../components/header/d1mcw-logo.png') no-repeat center center;
      background-size: 84%;
    }
    //搜索框
    .header-seek {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      box-sizing: border-box;
      & > a{
        width: 100%;
      }
      &:before {
        content: ' ';
        width: 22px/$ppr;
        height: 22px/$ppr;
        background: url('../../components/header/icon_seek.png') no-repeat center center;
        background-size: 100%;
        position: absolute;
        left: 8px/$ppr;
        top: 0;
        bottom: 0;
        z-index: 99;
        margin: auto 0;
      }
      .seek-input {
        display: block;
        width: 100%;
        height: 40px/$ppr;
        border-radius: 2rem;
        border: 1px solid #EAEAEA;
        padding: 0 10px/$ppr 0 36px/$ppr;
        flex: 1;
        font-size: 1.4rem;
        font-weight: 700;
        box-sizing: border-box;
        margin: auto;
        font-family: "Microsoft Yahei";
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow-x: hidden;
        &::-webkit-input-placeholder{
          color: #c3c3c3;
        }
      }
    }
    //搜索
    .search_bt{
      font-size: 1.4rem;
      & a{
        color: white;
      }
    }
  }
  //头部导航处
  .header-nav{
    display: flex;
    background-color: #f9fafd;
    height: 0em;
    line-height: 25px/$ppr;
    font-size: 1.2rem;
    transition: all 0.3s;
    overflow: hidden;
    &.show_nav{
      height: 58px/$ppr;
    }
    .nav-div{
      flex: 1;
      text-align: center;
      color: #777;
      font-family: "Myriad Set Pro","Lucida Grande","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif,'Microsoft Yahei',Simsun;
      .nav_icon{
        display: block;
        margin-top: 7px/$ppr;
        margin-bottom: 1px/$ppr;
        font-size: 2.2rem;
      }
      &:active{
        background: #c7c7c7;
      }
    }
  }
  //以下是有颜色的头部样式修改
  &.use_color{
    background-color: #FF3B84!important;
    border: none!important;
    .header-left{
      color: #000 !important;
    }
    .headerNav{
      background: url('./more1.png') no-repeat center center!important;
      background-size: 50%!important;
      &.hide{
        background: url('./cuowu.png') no-repeat center center!important;
        background-size: 50%!important;
      }
    }
    .change_border{
      border: 1px solid #EAEAEA!important;
    }
    .goBack{
      color: white!important;
    }
    .header-title{
      color: white!important;
    }
    .seek-input{
      border: none!important;
    }
  }
}


</style>