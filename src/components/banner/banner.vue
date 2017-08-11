<template>  
  <div class="banner">  
    <swiper :options="swiperOption" ref="mySwiperA" class="bannerSwiper">    
      <!-- 幻灯内容 -->    
      <swiper-slide v-for="img in banner" :key="img">
          <img :src="img.bannerimg">
      </swiper-slide>  
      <div class="swiper-pagination" slot="pagination"></div> 
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
        pagination : '.swiper-pagination',
        autoHeight: true
        // loop : true //滑动回环
      }

    }
  }
}
</script>

<!-- 所有配置均为可选（同Swiper配置）             
      notNextTick: true,            
      autoplay: 3000,            
      grabCursor : true,            
      setWrapperSize :true,            
      autoHeight: true,            
      pagination : '.swiper-pagination',            
      paginationClickable :true,            
      prevButton:'.swiper-button-prev',            
      nextButton:'.swiper-button-next',            
      scrollbar:'.swiper-scrollbar',            
      mousewheelControl : true,            
      observeParents:true,            
      onTransitionStart(swiper){             
        console.log(swiper)            
      }        
      }      
      }    
      },    
      computed: {      
        swiper() {       
        return this.$refs.mySwiperA.swiper      
      }    
      },    
      mounted() {      
        console.log("每次切换都会触发我");      
        this.swiper.slideTo(3, 1000, false)     
        }  
      }   -->            

<style lang="sass">
  .banner
    width: 100%
  .bannerSwiper
    & img
      display: block
      width: 100%

</style>
