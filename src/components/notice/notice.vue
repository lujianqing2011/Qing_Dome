<template>
<div class="notice_div">
  <div class="notice_box">
    <div class="notice_logo">
    </div>
    <div class="notice-center">
      <swiper :options="swiperNotice" ref="mySwiperA" class="bannerSwiper">
        <swiper-slide>
          <span class="label-new">NEW</span>精品超市逢9，满就包邮
        </swiper-slide>
        <swiper-slide>
          <span class="label-new">HOT</span>我是公告去的内容
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
 
.notice_div {
  
  .notice_box {
    height: 2rem;
    width: 100%;
    padding: .25rem 0;
    display: flex;
    background: #fff;
    overflow: hidden;
    border-bottom: 1px solid #F1F1F1;
    .notice_logo {
      flex: 0 0 3.8rem;
      background: url('../../assets/index/notice_pic1.png') no-repeat;
      background-size: 3.5rem;
      margin-left: .25rem;
    }
    .notice-center {
      flex: 1;
      line-height: 2rem;
      font-size: .64rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 .5rem 0 .1rem;
      position: relative;
      & .label-new {
        border: 1px solid red;
        padding: 0 .1rem;
        margin-right: .2rem;
        font-size: .6rem;
        color: red;
        border-radius: 2px;
      }
    }
  }
  .notice_img {
    & img {
      width: 100%;
    } 
  }
}
</style>