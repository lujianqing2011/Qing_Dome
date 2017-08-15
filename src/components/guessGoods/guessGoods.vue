<template>
<div class="goods-page" ref="scrollOffsetTop" type="1">
  <h2 class="title-h2">猜你喜欢</h2>
  <ul class="clearfix" v-load-more="loaderMore">
    <li class="box-li" v-for="list in allGoodsList">
      <router-link :to="{ path:'/details', query:{ goods_name:list.goods_name, goods_price: list.goods_price, goods_original:list.goods_original, goods_sales:list.goods_sales, goods_freight:list.goods_freight, goods_standard:list.goods_standard, goods_pic:list.goods_pic, goods_img:list.goods_img, goods_comment:list.goods_comment, goods_id:list.goods_id, id:list.id }}">
        <div class="img">
          <img :src="list.goods_pic">
        </div>
        <div class="box">
          <h3>{{list.goods_name}}</h3>
          <del>{{list.goods_original}}</del>
          <p class="clearfix">
            <b>{{list.goods_price}}</b>
            <span>已出售：{{list.goods_sales}}件</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>
  <div class="none_more" v-show="touchend">已经到底了，没有更多了</div>
  <aside class="comeTop iconfont" v-show="showbackTop" @click="backTop()">&#xe69f;</aside>
  <loading v-show="showLoading"></loading>
</div>
  
</template>

<script>

import api from 'src/api/getApi';
import loading from 'components/common/loading';
import { loadMore } from '../common/mixin';

export default{
  components: {
    loading
  },
  mixins: [loadMore],
  created() {
    //获取商品列表
    this.showLoading = true;
    api.getGuessLikeGoods(this.offset).then((res) => {
      this.allGoodsList = [...res]
      if(res.length < 2) {
        this.touchend = true
        console.log('没有更多了')
      }
      this.$nextTick(() => {
        this.showLoading = false;
      })
    })
  },
  methods: {
    //到达底部加载更多数据
    loaderMore() {
      if(this.touchend) {
          return
      }
      //防止重复请求
      if (this.preventRepeatReuqest) {
        return 
      }
      this.preventRepeatReuqest = true

      //实际加载20条，模拟数据加载加6条
      this.offset += 6;
      this.showLoading = true;
      api.getGuessLikeGoods(this.offset).then((res) => {
        console.log(this.offset)
        this.allGoodsList = [...this.allGoodsList,...res]
        this.$nextTick(() => {
          this.showLoading = false;
          this.preventRepeatReuqest = false;
        })
      })
    },
    //返回顶部
    backTop(){
      var timer = setInterval(function() {
          window.scrollBy(0, -50);
          if (document.body.scrollTop == 0) {
              clearInterval(timer);
          };
      }, 5);
    },
    //显示置顶按钮
    scrollFuc() {
      document.addEventListener('scroll',() => {
        showBackFun()
      },false)
      //判断滚动的距离是否大于500
      const showBackFun = () => {
        if(document.body.scrollTop > 1500) {
          this.showbackTop = true
        }else{
          this.showbackTop = false
        }
      }
      //加载更多数据
      // const moreGoods = () => {
      //   let winHeight = window.screen.height;   //屏幕分辨率的高
      //   let bodyHeight = document.body.scrollHeight; //文档的总高度
      //   //let offTop = this.$refs.scrollOffsetTop.offsetTop;    //商品列表距离顶部的距离
      //   let scrTop = document.body.scrollTop;   //滚动的高度
      //   console.log( scrTop )
      // }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollFuc();
    })
  },
  data(){
    return{
      offset: 0,            //加载数据数量
      allGoodsList: [],     //所有商品
      showbackTop: false,   //显示置顶按钮
      touchend: false,      // 没有更多数据
      preventRepeatReuqest: false,   //到达底部加载数据，防止重复加载
      showLoading: false    //显示加载动画
    }
  }
}

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.goods-page{
  width: 100%;
  margin-top: 10px/$ppr;
  .title-h2{
    line-height: 50px/$ppr;
    font-size: 1.4rem;
    font-weight: bold;
    background-color: white;
    border-bottom: 1px solid #ECECEC;
    text-align: center;
  }
  .box-li{
    float: left;
    width: 49.33%;
    margin-bottom: 4px/$ppr;
    &:nth-of-type(2n){
      float: right;
    }
    .img{
      position: relative;
      padding-bottom: 100%;
      background: url('../../assets/pic_bg1.png') no-repeat center center;
      background-size: 40%;
      & img{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .box{
      padding: 5px/$ppr;
      background: white;
      & h3{
        font-size: 1.2rem;
        line-height: 1.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      & del{
        display: block;
        font-size: 1.2rem;
        line-height: 24px/$ppr;
      }
      & p{
        line-height: 24px/$ppr;
        & b{
          color: red;
          font-size: 1.4rem;
          float: left;
          font-weight: bold;
        }
        & span{
          float: right;
          font-size: 1.2rem;
        }
      }
    }
  }
  .none_more {
    text-align: center;
    font-size: .56rem;
    height: 1.6rem;
    line-height: 1.6rem;
    background-color: white;
    color: #808080;
  }
  .comeTop {
    width: 50px/$ppr;
    height: 50px/$ppr;
    line-height: 50px/$ppr;
    color: #a5a5a5;
    text-align: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    font-size: 1.8rem;
    border: 1px solid #e2e2e2;
    position: fixed;
    z-index: 999;
    bottom: 20%;
    right: 10px/$ppr;
  }
}

</style>