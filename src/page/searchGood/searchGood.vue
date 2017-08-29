<template>
<section class="search-goods-page">
  <header-top header-nav="true" goBack="true" style="border: none;">
    <section slot="seek" class="header-seek">
      <router-link to="/index/searchTerms">
        <input type="text" class="seek-input" v-model="keyword" placeholder="请输入要搜索的商品" >
      </router-link>
    </section>
  </header-top>
  <section class="goods_filter">
    <div class="filter_content">
      <div class="filter_class" @click="selectCondition(0)"><span>默认</span></div>
      <div class="filter_class">
        <div class="class_div" @click="chooseType('sales')">
          <span>销量</span>
          <i class="iconfont" :class="{ sort_icon:sortIcon === 'sales' }">&#xe60e;</i>
        </div>
        <section class="class_list" v-show="sortIcon==='sales'">
          <p @click="selectCondition(1)">销售量从低到高</p>
          <p @click="selectCondition(2)">销售量从高到低</p>
        </section>
      </div>
      <div class="filter_class">
        <div class="class_div" @click="chooseType('price')">
          <span>价格</span>
          <i class="iconfont" :class="{ sort_icon:sortIcon === 'price' }">&#xe60e;</i>
        </div>
        <section class="class_list" v-show="sortIcon==='price'" >
          <p @click="selectCondition(3)">价格从低到高</p>
          <p @click="selectCondition(4)">价格从高到低</p>
        </section>
      </div>
      <div class="filter_class show_list">
        <div class="class_div" @click="chooseType('filter')">
          <span>筛选</span>
          <i class="iconfont">&#xe632;</i>
        </div>
        <transition name="showlist">
          <section class="class_list" v-show="sortIcon==='filter'">
            <section class="class_list_box">
              <div class="restriction">价格区间(元)：
                <input type="number" placeholder="最低价"> - 
                <input type="number" placeholder="最高价">
              </div>
              <div class="category">
                <h2 class="c_h2">类别</h2>
                <ul class="c_ul clearfix">
                  <li class="c_li" 
                    v-for="(item,index) in categoryList" 
                    @click="selectCategory(index)"
                    ><span :class="{active: index === categoryType}">{{item.name}}</span></li>
                </ul>
              </div>
              <div class="category">
                <h2 class="c_h2">商铺类型</h2>
                <ul class="c_ul clearfix">
                  <li class="c_li" 
                    v-for="(item,index) in categoryGoods" 
                    @click="selectFilter(index)"
                    ><span :class="{active: index === categoryFilter}">{{item.name}}</span></li>
                </ul>
              </div>
              <div class="category_button">
                <div class="bt l_button"><button @click.prevent="chooseType('filter')">取消</button></div>
                <div class="bt r_button"><button @click.prevent >确定</button></div>
              </div>
            </section>
          </section>
        </transition>
      </div>
    </div>
  </section>
  <section class="goods_content">
    <div class="goods_main clearfix">
      <div class="goods_box clearfix">
        <div class="goods_list" v-for="goods in allGoodsList">
          <a href="#" class="goods_list_a">
            <div class="goods_list_img"><img src="../../assets/111.jpg"></div>
            <div class="goods_info">
              <p class="info">{{goods.goods_name}}</p>
              <div class="goods_price">
                <i class="price">¥{{goods.goods_price}}</i>
                <i class="sales">销量:{{goods.goods_sales}}</i>
                <del>¥{{goods.goods_original}}</del>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <section class="data_hint">没有数据了哦</section>
  </section>
</section>
</template>

<script>

const DEFAULT = 0;    //默认
const SALES_LOW = 1;  //销量低
const SALES_TALL = 2; //销量高
const PRICE_LOW = 3;  //价低
const PRICE_TALL = 4; //价高


import headerTop from 'src/components/header/head';
import api from 'src/api/getApi';

export default{
  components: {
    headerTop
  },
  created() {
    //获取商品列表
    api.getGoodsList().then((res) => {
      let all_goods = [];
      res.forEach((item, index) => {
        this.typesId = item.id
        item.goods.forEach((goods, i) => {
          all_goods.push(goods)
        })
      })
      this.allGoodsList = all_goods
    })
  },
  mounted(){
    this.keyword = this.$route.query.key;   //获取传过来的关键字
  },
  methods: {
    //销量、价格选择框
    chooseType(type) {      //点击顶部选项
      if(this.sortIcon !== type){     //第一次展开  
        this.sortIcon = type
      }else{                      //第二次收缩
        this.sortIcon = ''
        this.filtrateShow = false
      }
    },
    selectCategory(index) {
      this.categoryType = index;
    },
    selectFilter(index) {
      this.categoryFilter = index;
    },
    //默认、销量、价格选择
    selectCondition(i) {
      this.chooseType('default');  //关闭选择框
      let selectSort = []
      let goodsList = this.allGoodsList;
      switch(i)
      {
        case SALES_LOW:
          this.goodsTissue(goodsList,0,selectSort,0)
          break;
        case SALES_TALL:
          this.goodsTissue(goodsList,0,selectSort,1)
          break;
        case PRICE_LOW:
          this.goodsTissue(goodsList,1,selectSort,0)
          break;
        case PRICE_TALL:
          this.goodsTissue(goodsList,1,selectSort,1)
          break;
        default:
        console.log(goodsList)
          alert(DEFAULT)
      }
    },
    //传来商品列表、选择类型、存放数据的数组、(0：低、1：高)
    goodsTissue(goodsList,classType,selectSort,t) {
      selectSort = []
      this.allGoodsList = []
      let gList;
      //取出要选择的信息
      goodsList.forEach((goods) => {
        if(classType === 0){
          gList = 'goods_sales'
        }else{
          gList = 'goods_price'
        }
        selectSort.push(parseInt(goods[gList]));
      })
      //大小进行排序
      selectSort.sort((a,b) => {
        let heightLow
        t === 0? heightLow = a-b : heightLow = b-a; 
        return heightLow
      });
      console.log(selectSort)
      for(let g=0; selectSort.length > g; g++) {
        for(let i=0; goodsList.length > i; i++) {
          console.log(selectSort[g],parseInt(goodsList[i][gList]),"第"+g+"次结束")
          if(parseInt(goodsList[i][gList]) === selectSort[g]){
            selectSort[g] = ""
             console.log("录取",goodsList[i][gList])
            this.allGoodsList.push(goodsList[i])
            //console.log(goodsList[i])
          }
        }
        console.log('完成',selectSort)
      }
    }

  },
  data(){
    return{
      sortIcon: '',
      filtrateShow: false,
      keyword: null,
      categoryType: null,
      categoryFilter: null,
      allGoodsList: [],
      categoryList: [{name: '男鞋'},{name: '女鞋'},{name: '运动鞋'},{name: '帆布鞋'},{name: '女子运动'},{name: '童装'},{name: '女装'},{name: '内衣'},{name: '玩具'},{name: '家具'},{name: '日常用品'},{name: 'T恤'},{name: '图书'},{name: '北京布鞋'},{name: '饰品'},{name: '箱包'},
      ],
      categoryGoods: [
        {name: '包邮'},{name: '秒杀饰品'},{name: '折扣'}
      ],
      selectGoods: []
    }
  }
}
  
</script>

<style lang="scss" scoped>

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.showlist-enter-active, .showlist-leave-active {
  transition: all .3s;
  transform: translateY(0);
}
.showlist-enter, .showlist-leave-active {
  transform: translateX(100%);
}

.search-goods-page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .goods_filter{
    position: relative;
    z-index: 150;
    border-bottom: 1px solid #ECECEC;
    .filter_content{
      display: flex;
      align-items: center;
      background-color: #f9fafd;
      // border-bottom: 1px solid #FFD4E4;
      // box-shadow: 0px 0px 5px #FF72A6;
      .filter_class{
        flex: 1;
        line-height: 48px/$ppr;
        text-align: center;
        font-size: 1.4rem;
        color: #000;
        cursor: pointer;
        .class_list {
          position: absolute;
          top: 48px/$ppr;
          left: 0;
          width: 100%;
          line-height: 30px/$ppr;
          padding: 10px/$ppr 0;
          background-color: #F0F2F7;
          border-bottom: 1px solid #efefef;
        }
        & i{
          display: inline-block;
          vertical-align: middle;
          transition: all 0.2s;
          font-size: 1.4rem;
          &.sort_icon{
            transform: rotate(180deg);
            transition: all 0.2s;
          }
        }
      }
      .show_list{
        .class_div{
        }
        .class_list{
          position: absolute;
          top: 48px/$ppr;
          left: 0;
          z-index: 1;
          width: 100%;
          height: auto;
          background: rgba(0, 0, 0, 0.9);
          text-align: left;
          .class_list_box{
            padding: 1rem;
            .restriction{
              padding-bottom: 1rem;
              border-bottom: 1px solid white;
              color: white;
              & input[type="number"]{
                width: 70px/$ppr;
                height: 35px/$ppr;
                line-height: 35px/$ppr;
                border-radius: 2px;
                padding: 0 5px/$ppr;
                text-align: center;
                font-size: 1.4rem;
              }
            }
            .category{
              .c_h2{
                height: 50px/$ppr;
                line-height: 50px/$ppr;
                font-size: 1.4rem;
              }
              .c_ul{
                .c_li{
                  float: left;
                  width: 33.33%;
                  height: 55px/$ppr;
                  line-height: 40px/$ppr;
                  padding: 0 10px/$ppr 15px/$ppr;
                  box-sizing: border-box;
                  & span{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    color: white;
                    text-align: center;
                    border: 1px solid white;
                    border-radius: 2px;
                    box-sizing: border-box;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    &.active{
                      background: red;
                    }
                  }
                }
              }
            }
            .category_button{
              display: flex;
              margin-top: 20px/$ppr;
              & .bt{
                flex: 1;
                & button{
                  width: 100%;
                  height: 45px/$ppr;
                  line-height: 45px/$ppr;
                  border-radius: 2px;
                  font-size: 1.4rem;
                }
              }
              .l_button{
                padding-right: 5px/$ppr;
                & button{
                  background: #f5f5f5;
                  color: #666;
                }
              }
              .r_button{
                padding-left: 5px/$ppr;
                & button{
                  background: #2CDC00;
                  color: white;
                }
              }
            }
          }
        }
      }
    }
  }
  .goods_content{
    background: #f2f2f2;
    position: absolute;
    top: 105px/$ppr;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow-y: auto;
    .goods_main{
      .goods_box{
        .goods_list{
          width: 49.85%;
          float: left;
          background: white;
          margin-bottom: 1px/$ppr;
          &:nth-of-type(2n){
            float: right;
          }
          .goods_list_a{
            .goods_list_img{
              position: relative;
              padding-top: 100%;
              background: #ccc;
              & img{
                width: 100%;
                height: 100%;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
              }
            }
            .goods_info{
              padding: 10px/$ppr;
              background: white;
              .info{
                height: 24px/$ppr;
                line-height: 24px/$ppr;
                font-size: 1.2rem;
                display: box;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
              }
              .goods_price{
                .price{
                  font-size: 1.4rem;
                  display: inline-block;
                  color: red;
                }
                .sales{
                  float: right;
                  font-size: 1.2rem;
                }
                & del{
                  display: block;
                  height: 24px/$ppr;
                  line-height: 24px/$ppr;
                  font-size: 1.2rem;
                }
              }
            }
          }
        }
      }
    }
    .data_hint{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: white;
      margin-top: 2px/$ppr;
    }
  }
}
  
</style>