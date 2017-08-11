<template>
<header id="header-top">
  <section class="header">
    <section class="header-left">
      <slot name="logo"></slot>
      <div class="goBack" v-if="goBack" @click="$router.go(-1)"></div>
    </section>
    <section class="header-title">
      <div class="title" v-if="headerTitle" >{{headerTitle}}</div>
      <slot name="seek"></slot>
    </section>
    <section class="header-right">
      <div class="headerNav" v-if="headerNav" :class="{ hide:showNav }" @click="showNav = !showNav"></div>
      <slot name="search"></slot>
      <slot name="edit"></slot>
    </section>
  </section>
  
  <nav class="header-nav" :class="{show_nav: showNav}" v-if="headerNav" ref="navSile">
    <router-link 
      v-for = " nav in navList " 
      :to = " { path:nav.path }"
      :key="nav"
      tag = "a"
      class="nav-div"><i class="iconfont nav_icon" v-html="nav.icon"></i> {{ nav.navName }}
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
 
#header-top{
  .header{
    display: flex;
    background: #FF3B84;
    height: 2.25rem;
    line-height: 2.25rem;
    text-align: center;
    position: relative;
    z-index: 10;
    .header-left,.header-right{
      flex: 0 0 2.25rem;
      font-size: .65rem;
      color: white;
      cursor: pointer;
    }
    .header-left{
      .goBack{
        width: 100%;
        height: 2.25rem;
        background: url('./left.png') no-repeat 0.55rem center;
        background-size: 40%;
      }
    }
    .header-right{
      .headerNav{
        height: 2.25rem;
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
            border-bottom: 8px solid #3A3A3A;
          }
        }
      }
    }
    .header-title{
      color: white;
      flex: 1;
      .title{
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8rem;
        font-family: "Microsoft Yahei";
        font-weight: 700;
      }
    }
  }
  .header-nav{
    display: flex;
    background: #3a3a3a;
    height: 0em;
    line-height: .8rem;
    font-size: .56rem;
    transition: all 0.3s;
    overflow: hidden;
    &.show_nav{
      height: 2.5rem;
    }
    .nav-div{
      flex: 1;
      text-align: center;
      color: white;
      font-family: "Myriad Set Pro","Lucida Grande","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif,'Microsoft Yahei',Simsun;
      .nav_icon{
        display: block;
        margin-top: .45rem;
        margin-bottom: .1rem;
        font-size: .9rem;
      }
      &:active{
        background: rgb(68, 68, 68);
      }
    }
  }
}


</style>