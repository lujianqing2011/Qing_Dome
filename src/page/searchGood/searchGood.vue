<template>
<section class="search-goods-page">
  <header-top header-nav="true" goBack="true">
    <section slot="seek" class="header-seek">
      <router-link to="/index/searchTerms">
        <input type="text" class="seek-input" v-model="keyword" placeholder="请输入要搜索的商品" >
      </router-link>
    </section>
  </header-top>
  <section class="goods_filter">
    <div class="filter_content">
      <div class="filter_class" @click="chooseType('default')"><span>默认</span></div>
      <div class="filter_class">
        <div class="class_div" @click="chooseType('sales')">
          <span>销量</span>
          <i class="iconfont" :class="{ sort_icon:sortIcon === 'sales' }">&#xe60e;</i>
        </div>
        <section class="class_list" v-show="sortIcon==='sales'">
          12313
        </section>
      </div>
      <div class="filter_class">
        <div class="class_div" @click="chooseType('price')">
          <span>价格</span>
          <i class="iconfont" :class="{ sort_icon:sortIcon === 'price' }">&#xe60e;</i>
        </div>
        <section class="class_list" v-show="sortIcon==='price'">
          79797912313
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
  <section class="border_bottom"></section>
  <section class="goods_content">
    <div class="goods_main clearfix">
      <div class="goods_box clearfix">
        <div class="goods_list" v-for="goods in allGoodsList">
          <a href="#" class="goods_list_a">
            <div class="goods_list_img"><img src="../../assets/111.jpg"></div>
            <div class="goods_info">
              <p class="info">UOVO2017童鞋新款夏季包头儿童凉鞋男童女童搭扣镂空沙滩鞋中小童 虹</p>
              <div class="goods_price">
                <i class="price">¥800.00</i>
                <del>¥900.00</del>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</section>
</template>

<script>

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
      ]
    }
  }
}
  
</script>

<style lang="scss" scoped>

.showlist-enter-active, .showlist-leave-active {
  transition: all .3s;
  transform: translateY(0);
}
.showlist-enter, .showlist-leave-active {
  transform: translateX(100%);
}

// 顶部插入的样式S
.header-logo{
  width: 100%;
  height: 2.2rem;
  background: url('../../components/header/d1mcw-logo.png') no-repeat center center;
  background-size: 75%;
}
.header-seek{
  width: 100%;
  height: 2.2rem;
  display: flex;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  & > a{
    width: 100%;
  }
  &:before{
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
  .seek-input{
    width: 100%;
    height: 1.5rem;
    display: block;
    flex: 1;
    border-radius: 2rem;
    padding: 0 1rem 0 1.5rem;
    margin: auto;
    font-size: .7rem;
    font-weight: 700;
    font-family: "Microsoft Yahei";
    color: #a9a9a9;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    &::-webkit-input-placeholder{
      color: #a9a9a9;
    }
  }
}
// 顶部插入的样式E

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
    .filter_content{
      display: flex;
      align-items: center;
      background-color: #FF3B84;
      // border-bottom: 1px solid #FFD4E4;
      // box-shadow: 0px 0px 5px #FF72A6;
      .filter_class{
        flex: 1;
        padding: .6rem 0;
        text-align: center;
        font-size: .7rem;
        color: white;
        cursor: pointer;
        .class_list {
          position: absolute;
          top: 2rem;
          left: 0;
          width: 100%;
          height: 100px;
          background: red;
        }
        & i{
          display: inline-block;
          vertical-align: middle;
          transition: all 0.2s;
          font-size: .6rem;
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
          top: 2rem;
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
              & input[type="number"]{
                width: 3.5rem;
                height: 1.5rem;
                line-height: 1.5rem;
                border-radius: 2px;
                padding: 0 .25rem;
                text-align: center;
              }
            }
            .category{
              .c_h2{
                height: 2rem;
                line-height: 2rem;
              }
              .c_ul{
                .c_li{
                  float: left;
                  width: 33.33%;
                  height: 2.2rem;
                  line-height: 1.75rem;
                  padding: 0 .2rem .4rem;
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
              margin-top: 1rem;
              & .bt{
                flex: 1;
                & button{
                  width: 100%;
                  height: 1.9rem;
                  line-height: 1.9rem;
                  border-radius: 2px;
                  font-size: .6rem;
                }
              }
              .l_button{
                padding-right: .5rem;
                & button{
                  background: #f5f5f5;
                  color: #666;
                }
              }
              .r_button{
                padding-left: .5rem;
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
  .border_bottom{
    width: 100%;
    height: 1px;
    background: #FFD4E4;
    box-shadow: 0px 0px 5px #FF72A6;
  }
  .goods_content{
    margin-top: .25rem;
    background: #f2f2f2;
    .goods_main{
      .goods_box{
        .goods_list{
          width: 49.333%;
          float: left;
          background: white;
          margin-bottom: 1.222%;
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
                position: absolute;
                top: 0;
                left: 0;
              }
            }
            .goods_info{
              background: white;
              .info{
                margin: .25rem .5rem 0 .5rem;
                height: 1.8rem;
                line-height: .9rem;
                font-size: .58rem;
                display: box;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
              }
              .goods_price{
                padding: 0rem .5rem;
                .price{
                  font-size: .64rem;
                  display: inline-block;
                  padding: 0rem 0;
                  color: red;
                }
                & del{
                  display: block;
                  height: 1.2rem;
                  line-height: 1.2rem;
                  font-size: .58rem;
                }
              }
            }
          }
        }
      }
      
    }
  }
}
  
</style>