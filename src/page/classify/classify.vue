<template>
<div class="page-classify">
  <header-top header-title="分类" goBack="true"></header-top>
  <div>
  <div class="classify">
    <div class="left" ref="menuWrapper">
      <ul class="left-li">
        <li v-for="(item,index) in scrollLi" @click="selectMenu(index,$event)" :class="{'current': currentIndex===index}">{{item.liname}}</li>
      </ul>
    </div>
    <div class="right" ref="foodsWrapper">
      <div class="right-list">
        <h2 class="h2-title">我是热卖的</h2>
        <ul>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div> 
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
          <li class="food-list-hook">
            <div class="img"><img src="../../assets/pic.jpg"></div>
            <div class="content">
              <h2>我是商品的标题我是商品的标题我是商品的标题</h2>
              <div class="describe">咸粥</div>
              <div class="price">￥300.00</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>

import BScroll from 'better-scroll';
import headerTop from 'src/components/header/head';

export default {
  components: {
    BScroll,
    headerTop
  },
  data() {
    return {
      msg: "大家好,我是购物车页面",
      listHeight:[],
      scrollY: 0,
      scrollLi:[
        {
          liname: '我是1'
        },
        {
          liname: '我是2'
        },
        {
          liname: '我是3'
        },
        {
          liname: '我是4'
        },
        {
          liname: '我是5'
        },
        {
          liname: '我是6'
        },
        {
          liname: '我是7'
        },
        {
          liname: '我是8'
        },
        {
          liname: '我是9'
        },
        {
          liname: '我是10'
        },
        {
          liname: '我是11'
        },
        {
          liname: '我是12'
        }
      ]
    }
  },
  computed:{
    currentIndex () {
      for (let i=0; i<this.listHeight.length;i++){
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i
        }
      }
      return 0
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
      this._calculateHeight()
    })
  },
  methods: {
    selectMenu(index,event) {
      if(!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el,300)
      console.log(index)
    },
    _initScroll() {         // 2 函数声明
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })            //注意此处是 this.$refs.xxx
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      })
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y))
      })  
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i=0;i<foodList.length;i++){
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang="scss">



@import './classify.scss';

</style>


