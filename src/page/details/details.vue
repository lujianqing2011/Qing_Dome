<template>
  <div class="details-page">
    <header-top header-title="详情页" goBack="true" header-nav="true"></header-top>
    <div id="load_img_state"></div>
    <swiper :options="swiperDetail" class="swiper_detail">
      <swiper-slide>
        <div class="details-basic d_top">
          <m-banner :banner="banner"></m-banner>
          <div class="details-box">
            <div class="d_title">{{goodsName}}</div>
            <div class="price">{{goodsPrice}}</div>
            <div class="cost">
              <span class="c_cost">原价:¥{{goodsOriginal}}</span>
              <span class="c_freight">运费: {{goods_freight}}</span>
            </div>
          </div>
          <div class="select" @click="showSelect">选择: {{radioSize}} {{radioColor}} {{radioEtalon}} {{goodsCount}}件</div>
          <div class="select_box" v-show="selectBoxShow">
            <h2 class="title-h2">尺寸</h2>
            <div class="radio_module">
              <label 
                v-for=" (name,index) in goodsStandard.size " 
                name="radio"
                :class="{on: index === selectSize}"
                @click="selectSizeRadio(index, name)">{{name}}
              </label>
            </div>

            <h2 class="title-h2">规格</h2>
            <div class="radio_module">
              <label 
                v-for=" (name,index) in goodsStandard.etalon " 
                name="radio"
                :class="{on: index === selectEtalon}"
                @click="selectEtalonRadio(index, name)">{{name}}
              </label>
            </div>

            <h2 class="title-h2">颜色</h2>  
            <div class="radio_module">
              <label 
                v-for=" (name,index) in goodsStandard.color " 
                name="radio"
                :class="{on: index === selectColor}"
                @click="selectColorRadio(index, name)">{{name.name}}
              </label>
            </div>
          </div>
          <div class="select_count">
            <h2 class="title-h2">数量</h2>
            <m-count-two :min="1" :max="20" @on-change="changeCount($event)"></m-count-two>
          </div>          
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="details-images d_top">
          <img v-for="img in goodsImg" :src="img">
          <img src="http://img01.bqstatic.com/upload/goods/201/707/2718/20170727183427_484519.jpg@500w_500h_90Q">
          <img src="http://img01.bqstatic.com/upload/goods/201/707/2718/20170727183329_105026.jpg@500w_500h_90Q">
          <img src="http://img01.bqstatic.com/upload/goods/201/707/0417/20170704171250_891905.jpg@355w_355h_90Q">
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="details-comment d_top">
          <!-- <m-evaluate :goodsComment="goodsComment"></m-evaluate> -->
          <div class="evaluate">
            <div class="evaluate-type">
              <span class="type-bt all" :class="{'on':selectTypeBt === 2}" @click="select(2,$event)" > {{desc.all}} {{goodsComment.length}}</span>
              <span class="type-bt positive" :class="{'on':selectTypeBt === 1 }" @click="select(1,$event)" > {{desc.positive}} {{positive.length}}</span>
              <span class="type-bt negative" :class="{'on':selectTypeBt === 0 }" @click="select(0,$event)" > {{desc.negative}} {{negative.length}}</span>
            </div>
            <div class="switch">
              <span class="screen-icon iconfont" @click="toggleContent()" :class="{'on':selectCentent}">&#xe674; </span>
              <span class="switch-screen">只看有图片的</span>
            </div>
            <ul class="content">
              <li class="content-li" v-for="(item,index) in goodsComment" v-show="needShow(item.type, item.pic)">
                <div class="user-message">
                  <img src="../../assets/toux.jpg">
                  <span class="user-name">{{item.userName}}</span>
                  <span class="user-time">{{item.time}}</span>
                </div>
                <div class="user-evaluate">
                  <span>[好评]</span>
                  <span>{{item.content}}</span>
                </div>
                <div class="user-img" ref="bagImgSrc">
                  <img v-for="img in item.pic" v-if="img" :src="img" @click="showBagImg(index)">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination detail_title" slot="pagination"></div> 
    </swiper>
    
    <div class="fixed-bottom">
      <div class="five-cart">
        <div class="flex-1">
          <div class="two"><i class="iconfont icon_f">&#xe606;</i>收藏</div>
          <div class="three"><i class="iconfont icon_f">&#xe6a1;</i>购物车</div>
        </div>
        <div class="flex-2">
          <div class="join" @click="addToCart()">加入购物车</div>
          <div class="buy" @click="buyGoods()">立即购买</div>
        </div>
      </div>
    </div>
    <!-- 大图浏览s -->
    <div class="bag_img" v-if="showBg">
      <swiper :options="swiperImg">
        <swiper-slide v-for="img in bagImg" key="img">
          <img :src="img">
        </swiper-slide>
        <div class="swiper-img" slot="pagination"></div>
      </swiper>
      <div class="hide_bag_img" @click="hideBagImg">×</div>
    </div>
    <!-- 大图浏览e -->
    <!-- 黑色遮罩层s -->
    <div class="bg_black" v-if="showBg" @click="hideBagImg" ></div>
    <!-- 黑色遮罩层e -->
    <div v-for="item in idHuo">{{item}}</div>
    <!-- 弹出提示框s -->
    <pop-box :show-alert="showAlert" :alert-text="alertText" @closeTip="closeTip()"></pop-box>
    <!-- 弹出提示框e -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

</div>

</template>

<script>

import headerTop from 'src/components/header/head';
import MEvaluate from 'src/components/evaluate/evaluate';
import { setStore, getStore, removeStore } from 'src/config/storage';
import { mapMutations } from 'vuex';
import MBanner from 'src/components/banner/banner';
import MCountTwo from 'src/components/common/countTwo';
import popBox from 'src/components/common/popbox';
import BScroll from 'better-scroll';

const TAB_TITLE = ["基本信息","商品详情","评价"]
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  components:{
    headerTop,
    MEvaluate,
    MBanner,
    MCountTwo,
    popBox,
    BScroll
  },
  computed: {
    positive() {  //计算满意的数据，将其数据返给positive
      return this.goodsComment.filter((item)=>{
        return item.type === NEGATIVE
      })
    },
    negative() {  //计算不满意的数据，将其数据返给negative
      return this.goodsComment.filter((item)=>{
        return item.type === POSITIVE
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadImg();
    })
  },
  methods: {
    ...mapMutations([
      'ADD_CART'
    ]),
    //加载页面图片的进度
    loadImg() {
      let loadState = document.getElementById('load_img_state');
      let img = document.getElementsByTagName('img');
      let imgLength = img.length;
      let count = 0;
      let index = 0;
      for(let i=0; img.length>i; i++) {
        img[i].onload = ()=> {
          this.baifenbi = Math.round((count+1) / imgLength * 100) + '%'
          count++;
          loadState.style.width = this.baifenbi
          parseInt(this.baifenbi) === 100 ? loadState.style.opacity = "0":loadState.style.opacity = "1";
          console.log(this.baifenbi)
          this.$nextTick(() => {
            //定时300毫秒后隐藏进度条
            if(parseInt(this.baifenbi) === 100) {
              let setTime = setTimeout(() => {
                loadState.style.display = "none"
                clearTimeout(setTime);
              },300)
            }else{
              return
            }
          })
        }
      }
      
    },
    //加入购物车，所需5个参数,分类id，商品id，商品名字，商品价格，商品规格
    addToCart() {
      this.showAlert = true
      if(this.radioSize === null ) {
        this.selectBoxShow = true
        this.alertText = '请选择尺寸'
        return  
      }else if(this.radioEtalon === null ){
        this.alertText = '请选择规格'
        return
      }else if(this.radioColor === null ){
        this.alertText = '请选择颜色'
        return 
      }else{
        if( !getStore('user_id') ) {
          this.alertText = '你还没登录'
          setTimeout(()=>{
            this.$router.push('/login')
          },1500)
          return
        }else{
          this.alertText = '成功加入购物车'
          let addGoods = {
            types_id:this.typesId,
            goods_checked: false,
            goods_id:this.goodsId,
            goods_pic:this.goodsPic, 
            goods_name:this.goodsName,
            goods_price:this.goodsPrice,
            goods_count:this.goodsCount,
            radio_size:this.radioSize, 
            radio_color:this.radioColor, 
            radio_etalon:this.radioEtalon,
            goods_freight: this.goods_freight
          }
          this.ADD_CART( addGoods )

          setTimeout(()=>{
            this.$router.push({path:'/cart'})
          },1500)
        }
      }
    },
    detailsChoice() {
      if(this.radioSize === null ) {
        this.selectBoxShow = true
        this.alertText = '请选择尺寸'
        return  
      }else if(this.radioEtalon === null ){
        this.alertText = '请选择规格'
        return
      }else if(this.radioColor === null ){
        this.alertText = '请选择颜色'
        return 
      }
    },
    buyGoods() {
      let clearing = []
      let addGoods = {
          types_id:this.typesId,
          goods_checked: false,
          goods_id:this.goodsId,
          goods_pic:this.goodsPic, 
          goods_name:this.goodsName,
          goods_price:this.goodsPrice,
          goods_count:this.goodsCount,
          radio_size:this.radioSize, 
          radio_color:this.radioColor, 
          radio_etalon:this.radioEtalon,
          goods_freight: this.goods_freight
        }
      clearing.push(addGoods)
      
      let clearingGoods =  JSON.stringify(clearing)
      console.log(clearingGoods)
      this.$router.push({path:'/confirmOrder',query:{clearingGoods}})
    },
    //数量
    changeCount(n) {
      this.goodsCount = n
    },
    //尺寸,颜色,规格选择
    selectSizeRadio(index, name) {
      this.selectSize === index?(this.selectSize = null) : (this.selectSize = index);
      this.radioSize == name?(this.radioSize = null) : (this.radioSize = name)
    },
    selectColorRadio(index, name) {
      this.selectColor === index?(this.selectColor = null) : (this.selectColor = index);
      this.radioColor == name.name?(this.radioColor = null) : (this.radioColor = name.name)
    },
    selectEtalonRadio(index, name) {
      this.selectEtalon === index?(this.selectEtalon = null) : (this.selectEtalon = index);
      this.radioEtalon == name?(this.radioEtalon = null) : (this.radioEtalon = name)
    },
    //显隐规格盒子
    showSelect() {
      this.selectBoxShow = !this.selectBoxShow
    },
    closeTip() {
      this.showAlert = false
    },

    //根据按钮赋值
    select(type, event) {
      this.selectTypeBt = type
    },
    //高亮只查看有图片的按钮
    toggleContent(event) {
      this.selectCentent = !this.selectCentent
    },
    //判断的键值的类型的是否跟内容的type相等，返回true就能显示相关的信息
    needShow(type, pic) {
      if (this.selectCentent && !pic.length){   //显示有图片的评论
        return false
      }
      if (this.selectTypeBt === ALL){
        return true
      }else {
        return type === this.selectTypeBt
      }
    },
    //显示评价大图浏览
    showBagImg(index) {
      let imgSrc = this.$refs.bagImgSrc;
      let getImgSrc = imgSrc[index].getElementsByTagName('img');
      this.bagImg = [];
      for(let i=0; getImgSrc.length>i; i++) {
        this.bagImg.push(getImgSrc[i].src)
      }
      this.showBg = true
    },
    hideBagImg() {
      this.showBg = false
    }

  },
  created() {
    //获取传过来的值
    this.typesId = this.$route.query.id;
    this.goodsId = this.$route.query.goods_id;
    this.goodsName = this.$route.query.goods_name;
    this.goodsPrice = this.$route.query.goods_price;
    this.goodsOriginal = this.$route.query.goods_original;
    this.goodsSales = this.$route.query.goods_sales;
    this.goods_freight = this.$route.query.goods_freight;
    this.goodsPic = this.$route.query.goods_pic;
    this.goodsImg = this.$route.query.goods_img;
    this.goodsComment = this.$route.query.goods_comment;      //评价
    this.goodsStandard = this.$route.query.goods_standard;
    if(this.$route.query.goods_standard instanceof Object )   //传过来的值第一次检查为Object时执行
    {
      let standard = JSON.stringify(this.$route.query.goods_standard);
      let comment = JSON.stringify(this.$route.query.goods_comment);
      sessionStorage.setItem("goods_standard",standard);
      sessionStorage.setItem("goods_comment",comment);
    }
    this.goodsStandard = JSON.parse(sessionStorage.getItem("goods_standard"));  //规格暂存到sessionStorage
    this.goodsComment = JSON.parse(sessionStorage.getItem("goods_comment"));    //评价暂存到sessionStorage
  },
  props: {
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc:{
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data(){
    return{
      baifenbi: 0,
      typesId: null,      //商品分类id
      goodsId: null,      //商品ID
      goodsName: null,    //商品名字
      goodsPrice: null,   //商品价格
      goodsOriginal: null,    //商品原价
      goodsSales: null,   //商品销量
      goods_freight: null, //商品运费
      goodsStandard: null,  //商品规格
      goodsPic: null,     //商品图片
      goodsImg: null,     //商品详情图片
      goodsComment: null, //商品评价
      selectSize: null,
      selectColor: null,
      selectEtalon: null,
      radioSize: null,
      radioColor: null,
      radioEtalon: null,
      selectBoxShow: false, //规格选择框显隐
      goodsCount: 1,        //数量
      showAlert: false,   //提示框显示
      alertText: null,    //提示框内容
      show: false,
      goodsList: null,
      idHuo: {},
      TAB_TITLE: [],
      swiperDetail: {
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender(swiper, index, className) {
          return `<div class="${className} swiper-pagination-bullet-custom">${TAB_TITLE[index]}</div>`;
        }
      },
      swiperImg: {
        autoHeight: true,
        effect : 'fade',
        pagination : '.swiper-img',
        paginationType : 'fraction'
      },
      banner: [
        {
          bannerimg: require('../../assets/details/banner0.jpg'),
          imgSrc: 'http:baidu.com'
        },
        {
          bannerimg: require('../../assets/details/banner1.jpg'),
          imgSrc: 'http:baidu.com'
        },
        {
          bannerimg: require('../../assets/details/banner2.jpg'),
          imgSrc: 'http:baidu.com'
        },
        {
          bannerimg: require('../../assets/details/banner3.jpg'),
          imgSrc: 'http:baidu.com'
        }
      ],
      balls: [
        { show: false, id:1 },
        { show: false, id:1 },
        { show: false, id:1 },
        { show: false, id:1},
        { show: false, id:1 }
      ],
      dropBall: [],
      selectTypeBt: this.selectType,
      selectCentent: false,
      showBg: false,
      bagImg: []
    }
  }
}

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.swiper_detail{
  position: relative;
  & .swiper-wrapper{
    
  }
}
.swiper-pagination-bullet{
  text-indent: -999px;
  overflow: hidden;
}
.swiper-pagination{
  &.detail_title{
    top:0;
    height: 48px/$ppr;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width:100%;
    .swiper-pagination-bullet{
      flex: 1;
      background: white;
      text-indent: inherit;
    }
    .swiper-pagination-bullet-custom {
      width: 100% !important;
      height: 100% !important;
      margin:0 !important;
      text-align: center;
      line-height: 48px/$ppr;
      color: #000;
      font-size: 1.4rem;
      border-radius: 0 !important;
      background: #fff !important;
      opacity: 1 !important;
    }
    .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
      color: #FF3B84;
      background: #03a9f4;
      font-size: 1.6rem;
    }
  }
}

.swiper-img{
  background: rgba(255, 255, 255, 0.5);;
  line-height: 30px/$ppr;
  position: absolute;
  text-align: center;
  transition: 300ms;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  &.swiper-pagination-fraction{
    bottom: 0;
  }
  & .swiper-pagination-bullet{
    &.swiper-pagination-bullet-active{
      background-color: #FF3B84;
    }
  }
}

.details-images{
  & img{
    width: 100%;
    display: block;
  }
}

.details-comment{
  background: white;
  .evaluate {
    .evaluate-type {
      padding: 0rem 10px/$ppr;
      font-size: 0;
      & .type-bt {
        display: inline-block;
        padding: 6px/$ppr 15px/$ppr;
        color: white;
        border-radius: 20rem;
        font-size: 1.2rem;
        margin: 10px/$ppr 8px/$ppr 0 0;
        &.all {
          background: #427CFD;
          &.on {
            background: #004EFF;
          }
        }
        &.positive {
          background: #0095FF;
          &.on {
            background: #0077CC;
          }
        }
        &.negative {
          background: #A0A0A0;
          &.on {
            background: #4A4A4A;
          }
        }
      }
    }
    .switch {
      font-size: 0;
      border-bottom: 1px solid #ececec;
      padding: 15px/$ppr 10px/$ppr;
      height: 30px/$ppr;
      line-height: 30px/$ppr;
      .screen-icon {
        display: inline-block;
        text-align: center;
        border-radius: 50%;
        font-size: 2.2rem;
        color: #c3c3c3;
        margin-right: 10px/$ppr;
        &.on {
          color: #36CA56;
        }
      }
      .switch-screen {
        display: inline-block;
        font-size: 1.4rem;
      }
    }
    .content {
      padding: 10px/$ppr;
      .content-li {
        padding: 10px/$ppr 0;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        .user-message {
          height: 40px/$ppr;
          line-height: 40px/$ppr;
          font-size: 0;
          & img {
            width: 40px/$ppr;
            height: 40px/$ppr;
            border-radius: 50%;
            display: inline-block;
          }
          & .user-name {
            display: inline-block;
            font-size: 1.4rem;
            vertical-align: top;
            margin-left: .6rem;
          }
          & .user-time {
            display: inline-block;
            float: right;
            font-size: 1.2rem;
          }
        }
        .user-evaluate {
          padding: 10px/$ppr 0;
          line-height: 24px/$ppr;
          font-size: 1.4rem;
        }
        .user-img {
          padding-left: 5px/$ppr;
          & img {
            width: 50px/$ppr;
            height: 50px/$ppr;
            border: 1px solid #eee;
            margin-right: 10px/$ppr;
          }
        }
      }
    }
  }
  .comment{
    display: flex;
    & .c-flex{
      flex: 1;
    }
  }
}


@import 'details';

</style>