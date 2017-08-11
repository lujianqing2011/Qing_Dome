<template>
  <div class="footer-nav">
	  <div class="nav">
	    <ul class="nav-list">
	      <router-link
	      v-for = " list in navLi "
	      :to = " { path:list.path }"
        :key="list.id"   
	      tag = "li" > 
        <i class="iconfont nav-icon" v-html="list.icon"></i>
        {{ list.liName }}
	      </router-link>
	    </ul>
	  </div>
	  <div class="null"></div>  
</div>
</template>

<script>

export default {
  data(){
    return{
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
.footer-nav{
  .nav{
    width: 100%;
    height: 2.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    border-top: 1px solid #EEEEEE;
    overflow-x: hidden;
    .nav-list{
      height: 100%;
      display: flex;
      & > li{
        flex: 1;
        text-align: center;
        cursor: pointer;
        font-size: .56rem;
        color: #777;
        background-color: white;
        font-family: "Myriad Set Pro","Lucida Grande","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif,'Microsoft Yahei',Simsun;
        &.router-link-exact-active, &:hover{
          color: #FF3B84;
        }
        .nav-icon{
          width: 100%;
          display: block;
          font-size: .9rem;
          padding: .42rem 0 .2rem 0;
        }
      }
    }
  }
  .null{
    width: 100%;
    height: 2.5rem;
    background-color: #fff;
  }
}

  
</style>
