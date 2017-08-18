<template>  
  <div class="banner" >  
    <swiper :options="swiperOption" ref="mySwiperA" class="bannerSwiper">    
      <!-- 幻灯内容 -->    
      <swiper-slide v-for="img in banner" :key="img">
          <img :src="img.bannerimg">
      </swiper-slide>  
      <div class="swiper-banner" slot="pagination"></div> 
    </swiper>  
  </div>  
</template>  
<script>    
export default{
  props: {
    banner: {
      type: Array,
      default:[]
    }
    
  },      
  data(){        
    return {          
      swiperOption: {
        autoplay: 4000,
        grabCursor : true,
        pagination : '.swiper-banner',
        autoHeight: true
        // loop : true //滑动回环
      }

    }
  }
}
</script>         

<style lang="scss">
  .banner{
    width: 100%;
  }
  .bannerSwiper{
    & img{
      display: block;
      width: 100%;
    }
  }
  .swiper-banner{
    position: absolute;
    text-align: center;
    -webkit-transition: 300ms;
    -moz-transition: 300ms;
    -o-transition: 300ms;
    transition: 300ms;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    z-index: 10;
    & .swiper-pagination-bullet{
      &.swiper-pagination-bullet-active{
        background-color: #FF3B84;
      }
    }
  }
  

</style>
