<template>
  <div class="details-page">
    <header-top header-title="详情页" goBack="true" header-nav="true"></header-top>
    <swiper :options="swiperDetail" class="swiper_detail">
      <swiper-slide>
        <div class="details-basic d_top">
          <m-banner :banner="banner"></m-banner>
          <div class="details-box">
            <div class="details-title">{{goodsName}}</div>
            <div class="product-subname">人气热荐夏装款,出街凹造型,立即抢购</div>
            <div class="price">{{goodsPrice}}</div>
            <div class="cost">原价:¥{{goodsOriginal}}</div>
          </div>
          <div class="flex-box">
            <div class="flex-1">正品保障</div>
            <div class="flex-1">货到付款</div>
            <div class="flex-1">七天退货</div>
          </div>
          <div class="select">运费: {{goods_freight}}</div>
          <div class="select" @click="showSelect">选择：{{radioSize}} {{radioColor}} {{radioEtalon}} {{goodsCount}}件</div>
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
          <div class="shop-head">
            <ul class="head-with">
              <li class="shop-a"><img src="../../assets/pic.jpg"></li>
              <li class="shop-b">D1美财网亲朋的店</li>
            </ul>
            <ul class="head-with shop-state">
              <li>描述相符：4.8</li>
              <li>描述相符：4.8</li>
              <li>描述相符：4.8</li>
            </ul>
            <ul class="head-with">
              <li class="shop-bt b-left">全部商品</li>
              <li class="shop-bt b-right">进入店铺</li>
            </ul>
          </div>
          
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="details-images d_top">
          <img v-for="img in goodsImg" :src="img">
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="details-comment d_top">
          <m-evaluate :goodsComment="goodsComment"></m-evaluate>
        </div>
      </swiper-slide>
      <div class="swiper-pagination detail_title" slot="pagination"></div> 
    </swiper>
    
    <div class="fixed-bottom">
      <div class="five-cart">
        <div class="flex-1">
          <div class="two"><i class="iconfont icon_f">&#xe8be;</i>收藏</div>
          <div class="three"><i class="iconfont icon_f">&#xe625;</i>购物车</div>
        </div>
        <div class="flex-2">
          <div class="join" @click="addToCart()">加入购物车</div>
          <div class="buy" @click="buyGoods()">立即购买</div>
        </div>
      </div>
    </div>

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
  },
  mounted() {
  },
  methods: {
    ...mapMutations([
      'ADD_CART'
    ]),
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
  data(){
    return{
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
      banner: [
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
      ]
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
      font-size: 1.2rem;
      border-radius: 0 !important;
      background: #fff !important;
      opacity: 1 !important;
    }
    .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
      color: #FF3B84;
      background: #03a9f4;
      font-size: 1.4rem;
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
  .comment{
    display: flex;
    & .c-flex{
      flex: 1;
    }
  }
}

.radio_module{
  font-size: 0;
  & label[name="radio"]{
    display: inline-block;
    background: #eaeaea;
    padding: 6px/$ppr 10px/$ppr;
    font-size: 1.2rem;
    margin: .25rem .5rem .25rem 0;
    color: white;
    border-radius: 4px;
    color: #696969;
    &.on{
      background: red;
      color: #fff;
    }
  }
}

@import 'details';

</style>