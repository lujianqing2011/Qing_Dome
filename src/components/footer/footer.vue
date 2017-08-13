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

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.footer-nav{
  .nav{
    width: 100%;
    height: 54px/$ppr;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    border-top: 1px solid #EEEEEE;
    overflow-x: hidden;
    .nav-list{
      height: 100%;
      line-height: 22px/$ppr;
      display: flex;
      & > li{
        flex: 1;
        text-align: center;
        cursor: pointer;
        font-size: 1.2rem;
        color: #777;
        background-color: white;
        font-family: "Myriad Set Pro","Lucida Grande","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif,'Microsoft Yahei',Simsun;
        &.router-link-exact-active, &:hover{
          color: #FF3B84;
        }
        .nav-icon{
          width: 100%;
          display: block;
          font-size: 1.8rem;
          margin-top: 5px/$ppr;
          margin-bottom: 1px/$ppr;
        }
      }
    }
  }
  .null{
    width: 100%;
    height: 54px/$ppr;
    background-color: #fff;
  }
}

  
</style>
