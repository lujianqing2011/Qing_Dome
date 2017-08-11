<template>
  <div class="app-index">
    <header-top header-nav="true">
      <section slot="logo" class="header-logo"></section>
      <section slot="seek" class="header-seek">
        <router-link to="/index/searchTerms">
          <input type="text" class="seek-input" placeholder="请输入要搜索的商品" >
        </router-link>
      </section>
    </header-top>

    <!-- Banner-->
    <m-banner :banner="banner"></m-banner>

    <!-- 广告图S -->
    <div class="dzdt">
      <a href="#"><img src="../../assets/index/dzdt11.gif"></a>
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
      <span class="title">秒杀商品·闪购</span>
      <a class="more" href="#">更多</a>
      <span class="title_more_icon"></span>
    </div>
    <div class="module">
      <div class="width_1"></div>
      <div class="imgs_block">
        <div class="block seckill_time">
          <div class="time">
            <span class="alike hour-s">{{timeH}}</span>
            <span class="alike-b">:</span>
            <span class="alike minute">{{timeM}}</span>
            <span class="alike-b">:</span>
            <span class="alike seconds">{{timeS}}</span>
          </div>
          <img src="../../assets/index/and-v-03222.jpg">
        </div>
        <!-- <div class="height_1"></div>
        <div class="block flex_1">
          <a href="#"><img src="../../assets/index/and-v-0322.jpg"></a>
        </div> -->
      </div>
      <div class="width_1"></div>
      <div class="seckill-goods clear clearfix"  ref="picScroll">
        <ul class="pic-list" ref="picList">
          <li class="pic-item" v-for="pic in picList" ><img :src="pic.img"></li>
        </ul>
      </div>
    </div>

    <!-- 秒杀商品E -->

    <!-- 爆款商品S -->
    <!-- <div class="title_h2">
      <span class="title">爆款商品·闪购</span>
      <a class="more" href="#">更多</a>
      <span class="title_more_icon"></span>
    </div>
    <div class="seckill-goods clear clearfix"  ref="picScroll">
      <ul class="pic-list" ref="picList">
        <li class="pic-item" v-for="pic in picList" ><img :src="pic.img"></li>
      </ul>
    </div> -->
    <!-- 爆款商品E -->

    <!-- 猜你喜欢 -->
    <m-goods></m-goods>
    <!-- 底部导航 -->
    <m-footer></m-footer>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headerTop from 'src/components/header/head';   //顶部
import MBanner from 'src/components/banner/banner';   //banner
import MFooter from 'src/components/footer/footer';   //底部导航
import MNotice from 'src/components/notice/notice';   //热点公告
import MGoods from 'src/components/guessGoods/guessGoods';    //猜你喜欢的商品
import BScroll from 'better-scroll';      //滑动插件

export default {
  components: {
    headerTop,
    MBanner,
    MFooter,
    MNotice,
    MGoods
  },
  mounted() {
    this.$nextTick(() => {
      this._scrollX(),
      this.timeLimit()
    })
  },
  methods: {
    _scrollX() {    //首页的秒杀区（图片水平滑动）
      let picWidth = this.$refs.picList.getElementsByTagName('li')[0].offsetWidth   //图片的宽度
      let margin = 6
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
    },
    timeLimit(){    //秒杀商品的倒计时
      let setTime = this.setTime
      let nowtime = new Date(); // 当前时间
      let endtime = new Date(setTime); // 结束时间
      let lefttime= parseInt((endtime.getTime() - nowtime.getTime())/1000);
      let d = parseInt(lefttime / (24 * 60 * 60));  //天数
      let h = parseInt(lefttime / (60 * 60) % 24);  //小时
      let m = parseInt(lefttime / 60 % 60);  //分钟
      let s = parseInt(lefttime % 60);  //秒数
      h = this.checkTime(h)
      m = this.checkTime(m)
      s = this.checkTime(s)
      this.timeD = d
      this.timeH = h
      this.timeM = m
      this.timeS = s
      // console.log(d+'天'+h+'小时'+m+'分'+s+'秒');
      if(lefttime <= 0){
        alert('团购已经结束')
        clearTimeout(loopTime)
        return
      }else{
        let loopTime = setTimeout(this.timeLimit,1000);
      }
    },
    checkTime(i) {  //秒杀商品的时间（s,m），小于10时，为数字前面添加0
      if(i < 10) {
        i = "0" + i
      }
      return i
    }
  },
  data() {
    return {
      setTime: '2017/08/30,23:35:20',
      timeD: 0,
      timeH: 0,
      timeM: 0,
      timeS: 0,
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

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .2s;
}
.router-slid-enter, .router-slid-leave-active {
  /*transform: translate3d(50px, 0, 0);*/
   opacity: 0;
}

.header-logo {
  width: 100%;
  height: 2.25rem;
  background: url('../../components/header/d1mcw-logo.png') no-repeat center center;
  background-size: 84%;
}
.header-seek {
  width: 100%;
  height: 2.25rem;
  display: flex;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  & > a{
    width: 100%;
  }
  &:before {
    content: ' ';
    width: .9rem;
    height: .9rem;
    background: url('../../components/header/icon_seek.png') no-repeat center center;
    background-size: 100%;
    position: absolute;
    left: .4rem;
    top: .7rem;
    z-index: 99;
  }
  .seek-input {
    display: block;
    width: 100%;
    height: 1.5rem;
    border-radius: 2rem;
    padding: 0 1rem 0 1.5rem;
    flex: 1;
    font-size: .7rem;
    font-weight: 700;
    box-sizing: border-box;
    margin: auto;
    font-family: "Microsoft Yahei";
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    &::-webkit-input-placeholder{
      color: #a9a9a9;
    }
  }

}

@import './index.scss';

</style>
