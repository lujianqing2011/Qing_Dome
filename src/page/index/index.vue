<template>
  <div class="app-index">
    <header-top header-nav="true" useColor="true" class="use_color">
      <section slot="logo" class="header-logo"></section>
      <section slot="seek" class="header-seek">
        <router-link to="/index/searchTerms">
          <input type="text" class="seek-input" placeholder="请输入要搜索的商品" >
        </router-link>
      </section>
    </header-top>
    <!-- <section class="mod_container"> 暂时不用-->
      <!-- Banner-->
      <m-banner :banner="banner" ></m-banner>

      <!-- 广告图S -->
      <div class="dzdt">
        <a href="#"><img src="../../assets/index/dzdt21.gif"></a>
      </div>
      <!-- 广告图E -->

      <!-- 分类导航S -->
      <div class="layout-type">
        <ul class="mui-flex">
          <li><a href="#"><img src="../../assets/index/icon_jp.png">精品超市</a></li>
          <li><a href="#"><img src="../../assets/index/icon_by.png">九块包邮</a></li>
          <li><a href="#"><img src="../../assets/index/icon_xs.png">限时折扣</a></li>
          <li><a href="#"><img src="../../assets/index/icon_x.png">新品推荐</a></li>
        </ul>
      </div>
      <!-- 分类导航E -->

      <!-- 公告热点S -->
      <m-notice></m-notice>
      <div class="width_1"></div>
      <!-- 公告热点E -->

      <!-- 秒杀商品S -->
      <div class="title_h2">
        <span class="title">限时商品·闪购</span>
        <span class="time_countdown">
          <m-countdown></m-countdown>
        </span>
        <a class="more" href="javascript:;">更多</a>
      </div>
      <div class="module">
        <div class="width_1"></div>
        <div class="seckill_time">
          <img src="../../assets/index/and-v-03222.jpg">
        </div>
        <div class="width_1"></div>
        <div class="seckill-goods clear clearfix" ref="picScroll">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in picList" ><img :src="pic.img"></li>
          </ul>
        </div>
      </div>
      <!-- 秒杀商品E -->

      <!-- 猜你喜欢 -->
      <m-goods></m-goods>
      <!-- 底部导航 -->
      <m-footer></m-footer>
      <transition name="router-slid" mode="out-in">
        <router-view></router-view>
      </transition>
    <!-- </section> 暂时不用-->
  </div>
  
</template>

<script>
import headerTop from 'src/components/header/head';   //顶部
import MBanner from 'src/components/banner/banner';   //banner
import MFooter from 'src/components/footer/footer';   //底部导航
import MNotice from 'src/components/notice/notice';   //热点公告
import MGoods from 'src/components/guessGoods/guessGoods';    //猜你喜欢的商品
import BScroll from 'better-scroll';      //滑动插件
import MCountdown from 'src/components/common/countdown';   //倒计时


export default {
  components: {
    headerTop,
    MBanner,
    MFooter,
    MNotice,
    MCountdown,
    MGoods
  },
  mounted() {
    this.$nextTick(() => {
      this._scrollX()
    })
  },
  methods: {
    _scrollX() {    //首页的秒杀区（图片水平滑动）
      let picWidth = this.$refs.picList.getElementsByTagName('li')[0].offsetWidth   //图片的宽度
      let margin = 6;
      let picLength = this.$refs.picList.getElementsByTagName('li').length
      let elementUl = this.$refs.picList
      let width = elementUl.style.width = (picWidth + margin) * picLength - margin +'px'
      console.log(this.$refs.picList.getElementsByTagName('li')[0].offsetWidth)
      this.picScroll = new BScroll(this.$refs.picScroll,{
        click: true,
        scrollX: true,
        eventPassthrough: 'vertical',
        onTouchEnd: function(swiper){
          console.log('当到最后一个，还用力拖到时执行这个函数')
        }
      })
    }
  },
  data() {
    return {
      banner:[
        {
          bannerimg: require('../../assets/index/b_1.png'),
          imgSrc: 'http:baidu.com'
        },
        {
          bannerimg: require('../../assets/index/b_2.png'),
          imgSrc: 'http:baidu.com'
        },
        {
          bannerimg: require('../../assets/index/b_3.png'),
          imgSrc: 'http:baidu.com'
        }
      ],
      "picList": [
        {
          "img": require('../../assets/pic.jpg')
        },
        {
          "img": require('../../assets/pic.jpg')
        },
        {
          "img": require('../../assets/pic.jpg')
        },
        {
          "img": require('../../assets/pic.jpg')
        },
        {
          "img": require('../../assets/pic.jpg')
        },
        {
          "img": require('../../assets/pic.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped >

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .2s;
}
.router-slid-enter, .router-slid-leave-active {
  /*transform: translate3d(50px, 0, 0);*/
   opacity: 0;
}

@import './index.scss';

</style>
