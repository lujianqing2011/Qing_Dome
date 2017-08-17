<template>
  <div class="footer-nav">
	  <div class="nav">
	    <ul class="nav-list">
	      <router-link
	      v-for = " (list,index) in navLi "
	      :to = " { path:list.path }"
        :key="list.id"   
	      tag = "li"
        @click.native="gg(index)">
        <i class="iconfont nav-icon animated" :class="{'bounceIn':index===fg}" v-html="list.icon"></i>
        {{ list.liName }}
	      </router-link>
	    </ul>
	  </div>
	  <div class="null"></div>  
</div>
</template>

<script>

export default {
  methods: {
    gg(index) {
      this.fg = index
    }
  },
  data(){
    return{
      fg: null,
      navLi:[
        {
          liName: '首页',
          icon: '&#xe737;',
          path: '/index'
        },
        {
          liName: '分类',
          icon: '&#xe60d;',
          path: '/classify'
        },
        {
          liName: '购物车',
          icon: '&#xe6a1;',
          path: '/cart'
        },
        {
          liName: '我的',
          icon: '&#xe601;',
          path: '/mine'
        }
      ]
    }
  }
}
</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.footer-nav{
  .nav{
    width: 100%;
    max-width: 800px;
    min-width: 320px;
    margin: 0 auto;
    height: 58px/$ppr;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    border-top: 1px solid #EEEEEE;
    overflow-x: hidden;
    .nav-list{
      height: 100%;
      line-height: 25px/$ppr;
      display: flex;
      & > li{
        flex: 1;
        text-align: center;
        cursor: pointer;
        font-size: 1.2rem;
        color: #777;
        background-color: rgba(246,246,246,.95);
        &.router-link-exact-active, &:hover{
          color: #FF3B84;
        }
        .nav-icon{
          width: 100%;
          display: block;
          font-size: 2.2rem;
          margin-top: 7px/$ppr;
          margin-bottom: 1px/$ppr;
        }
      }
    }
  }
  .null{
    width: 100%;
    height: 58px/$ppr;
    background-color: #fff;
  }
}

  
</style>
