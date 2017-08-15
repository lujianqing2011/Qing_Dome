<template>
<div class="notice_div">
  <div class="notice_box">
    <div class="notice_logo">
    </div>
    <div class="notice-center">
      <swiper :options="swiperNotice" ref="mySwiperA" class="bannerSwiper">
        <swiper-slide>
          <p>精品超市逢9，满就包邮</p>
          <p>HOT我是公告去的内容</p>
        </swiper-slide>
        <swiper-slide>
          <p>HOT我是公告去的内容</p>
          <p>2017-02-09号起发货下单恢复正常</p>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <div class="notice_img">
    <img src="../../assets/index/gh.png">
  </div>
</div>
</template>

<script>

export default{
  data(){        
    return {          
      swiperNotice: {
        autoplay: 5000,
        grabCursor: true,
        autoHeight: true,
        direction: 'vertical'
      }
    }
  }
}

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换
 
.notice_div {
  
  .notice_box {
    height: 48px/$ppr;
    display: flex;
    background: #fff;
    overflow: hidden;
    border-bottom: 1px solid #F1F1F1;
    padding: 0 10px/$ppr;
    .notice_logo {
      flex: 0 0 80px/$ppr;
      background: url('../../assets/index/notice_pic1.png') no-repeat;
      background-size: 80px/$ppr;
      margin-right: 10px/$ppr;
    }
    .notice-center {
      flex: 1;
      line-height: 20px/$ppr;
      font-size: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
    }
  }
  .notice_img {
    & img {
      width: 100%;
      display: block;
    } 
  }
}
</style>