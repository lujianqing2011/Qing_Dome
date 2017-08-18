<template>
<div class="add-detail-page">
  <header-top header-title="搜索地址" goBack="true"></header-top>
  <div class="add-detail">
    <ul class="sn-tab" ref="tabLi">
      <li @click="SelideOn(0)">{{lectSite}}</li>
      <li @click="SelideOn(1)">{{lectCity}}</li>
      <li @click="SelideOn(2)">{{lectCounty}}</li>
      <li @click="SelideOn(3)">{{lectTown}}</li>
      <li class="active-tab" ref="tabOn"></li>
      <!-- <li v-for="(item,index) in navDetail" @click="SelideOn(index)">{{item}}</li> -->
      <!-- <li class="active-tab" ref="tabOn"></li> -->
    </ul>
    <div class="sn-tab-content" ref="tabContent" >
      <div class="sn-tab-box">
        <ul class="city-list">
          <li v-for="(item,index) in Provincial" @click="clickSite(item,index)">{{item}}</li>
        </ul>
      </div>
      <div class="sn-tab-box">
        <ul class="city-list">
          <li v-for="(item,index) in listCity" @click="clickCity(item,index)">{{item}}</li>
        </ul>
      </div>
      <div class="sn-tab-box">
        <ul class="city-list">
          <li v-for="(item,index) in listCounty" @click="clickCounty(item,index)">{{item}}</li>
        </ul>
      </div>
      <div class="sn-tab-box">
        <ul class="city-list">
          <li v-for="(item,index) in listTown" @click="clickTown(item,index)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</div>

</template>

<script>

import headerTop from 'src/components/header/head';
import city from 'src/util/city';

export default{
  components: {
    headerTop
  },
  methods: {
    clickSite(item,index) {        //选择省
      // this.navDetail[0] = item
      this.lectSite = item;
      this.listCity = this.City[index];
      this.idCity = index;
      this.listCounty = '';       //  清空区县的地址列表
      this.listTown = '';         //  清空镇的地址列表
      this.SelideOn(this.indexing);
    },
    clickCity(item,index) {     //选择市
      // this.navDetail[1] = item
      this.lectCity = item;
      this.listCounty = this.County[this.idCity][index];
      this.idCounty = index;
      this.SelideOn(this.indexing);

    },
    clickCounty(item,index) {   //选择区/县
      // this.navDetail[2] = item
      this.lectCounty = item;
      this.listTown = this.Town[this.idCity][this.idCounty][index];
      this.SelideOn(this.indexing);
    },
    clickTown(item,index) {         //选择镇/街道
      // this.navDetail[3] = item
      this.lectTown = item;
      let selectSite = {
        thisSite: this.lectSite,
        thisCity: this.lectCity,
        thisCounty: this.lectCounty,
        thisTown: this.lectTown
      }
      this.$emit('change',selectSite);
      this.$router.go(-1);
    },
    SelideOn(i) {
      let tabLi = this.$refs.tabLi.getElementsByTagName('li');
      let tabWidth = this.$refs.tabLi.getBoundingClientRect().width;
      let tabLength = (tabLi.length) - 1;   //4
      let liWidth = tabWidth / tabLength;
      let winWidth = document.body.clientWidth;
      let index = i;    //导航li的索引
      index++;          //地址区的索引(+1是前进一页)
      this.ddClick = false;
      if(index > tabLength){
        i = tabLength - 1;
        index = tabLength;
      }
      this.indexing = index;
      console.log(i)
      console.log(index)
      this.$refs.tabContent.style.transform = `translate3d(${-i * winWidth}px, 0px, 0px)`;
      this.$refs.tabOn.style.transform = `translate3d(${i * liWidth}px, 0px, 0px)`;      
    }
  },
  mounted() {
    let tabDiv = this.$refs.tabContent.getElementsByTagName('div');
    let tabLength = tabDiv.length;
    this.$refs.tabContent.style.width = `${tabLength}00%`;
  },
  data(){
    return{
      lectSite: '选择省',
      lectCity: '选择市',
      lectCounty: '选择区县',
      lectTown: '选择街道',
      listCity: Array,      ////市列表
      listCounty: Array,  //区/县列表
      listTown: Array,    //镇/街道
      idCity: null,     //记录市的序列号
      idCounty: null,     //记录区/县的序列号
      indexing: 1,
      // navDetail: ["选择省","选择市","选择区县","选择街道"],
      Provincial: [
        "北京市","天津市","天津","重庆",
        "河北","山西","内蒙古","北京"
      ],
      City: [
        ["揭阳市","大连","鞍山"],
        ["11长春市","吉林市","四平市"],
        ["33白山市","松原市","白城市"],
        ["44白山市","松原市","白城市"],
        ["55白山市","松原市","白城市"],
        ["66白山市","松原市","白城市"],
        ["77白山市","松原市","白城市"],
        ["88白山市","松原市","白城市"]
      ],
      County:[
        [["惠来县","赵县","栾城"],["沽源县","商义县","阳源县"],["沽源县3","商义县","阳源县"]],
        [["无极限2","赵县2","栾城2"],["沽源县2","商义县2","阳源县2"],["沽源县3","商义县","阳源县"]],
        [["无极限3","赵县3","栾城3"],["沽源县3","商义县3","阳源县3"],["沽源县3","商义县","阳源县"]],
        [["无极限4","赵县3","栾城3"],["沽源县3","商义县3","阳源县3"],["沽源县3","商义县","阳源县"]],
        [["无极限5","赵县3","栾城3"],["沽源县3","商义县3","阳源县3"],["沽源县3","商义县","阳源县"]],
        [["无极限6","赵县3","栾城3"],["沽源县3","商义县3","阳源县3"],["沽源县3","商义县","阳源县"]],
        [["无极限7","赵县3","栾城3"],["沽源县3","商义县3","阳源县3"],["沽源县3","商义县","阳源县"]],
        [["无极限8","赵县3","栾城3"],["沽源县3","商义县3","阳源县3"],["沽源县3","商义县","阳源县"]]
      ],
      Town:[
        [
          [["1100岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["11尚村镇","集港镇","里钩镇"],["11行礼镇","商义县","阳源县"]],
          [["1200岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["11尚村镇","集港镇","里钩镇"],["1000行礼镇","商义县","阳源县"]],
          [["1300岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["11尚村镇","集港镇","里钩镇"],["11行礼镇","商义县","阳源县"]]
        ],
        [
          [["22岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["22尚村镇","集港镇","里钩镇"],["22行礼镇","商义县","阳源县"]],
          [["2200岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["22尚村镇","集港镇","里钩镇"],["22行礼镇","商义县","阳源县"]],
          [["2201岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["22尚村镇","集港镇","里钩镇"],["22行礼镇","商义县","阳源县"]]
        ],
        [
          [["33岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["33尚村镇","集港镇","里钩镇"],["33行礼镇","商义县","阳源县"]],
          [["3300岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["33尚村镇","集港镇","里钩镇"],["33行礼镇","商义县","阳源县"]],
          [["3301岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["33尚村镇","集港镇","里钩镇"],["33行礼镇","商义县","阳源县"]]
        ],
        [
          [["44岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["44尚村镇","集港镇","里钩镇"],["44行礼镇","商义县","阳源县"]],
          [["4400岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["44尚村镇","集港镇","里钩镇"],["44行礼镇","商义县","阳源县"]],
          [["4401岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["44尚村镇","集港镇","里钩镇"],["44行礼镇","商义县","阳源县"]]
        ],
        [
          [["55岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["55尚村镇","集港镇","里钩镇"],["55行礼镇","商义县","阳源县"]],
          [["5500岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["55尚村镇","集港镇","里钩镇"],["55行礼镇","商义县","阳源县"]],
          [["5501岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["55尚村镇","集港镇","里钩镇"],["55行礼镇","商义县","阳源县"]]
        ],
        [
          [["66岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["66尚村镇","集港镇","里钩镇"],["66行礼镇","商义县","阳源县"]],
          [["6600岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["66尚村镇","集港镇","里钩镇"],["66行礼镇","商义县","阳源县"]],
          [["6601岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["66尚村镇","集港镇","里钩镇"],["66行礼镇","商义县","阳源县"]]
        ],
        [
          [["77岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["77尚村镇","集港镇","里钩镇"],["77行礼镇","商义县","阳源县"]],
          [["7701岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["77尚村镇","集港镇","里钩镇"],["77行礼镇","商义县","阳源县"]],
          [["7702岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["77尚村镇","集港镇","里钩镇"],["77行礼镇","商义县","阳源县"]]
        ],
        [
          [["88岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["88尚村镇","集港镇","里钩镇"],["88行礼镇","商义县","阳源县"]],
          [["8801岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["88尚村镇","集港镇","里钩镇"],["88行礼镇","商义县","阳源县"]],
          [["8802岐石镇","华湖镇","神泉镇","傲江镇","东岭镇","周田镇","靖海镇","葵潭镇","前詹镇"],["88尚村镇","集港镇","里钩镇"],["88行礼镇","商义县","阳源县"]]
        ]
      ]
    }
  }
}

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换
$size1: 1rem;
$size2: 1.2rem;
$size3: 1.4rem;
$size4: 1.6rem;

.add-detail-page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  background-color: #f2f2f2;
  .add-detail{
    position: absolute;
    width: 100%;
    top: 54px/$ppr;
    left: 0;
    bottom: 0;
    overflow: hidden;
    .sn-tab{
      display: flex;
      background-color: white;
      border-bottom: 1px solid #dcdcdc;
      position: relative;
      & li{
        flex: 1;
        text-align: center;
        height: 48px/$ppr;
        line-height: 48px/$ppr;
        font-size: $size3;
        &.active-tab{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 25%;
          height: 2px;
          background: red;
          transition: all .3s ease-out;
        }
      }
    }
    .sn-tab-content{
      display: flex;
      position: absolute;
      top: 48px/$ppr;
      left: 0;
      bottom: 0;
      transition: all .3s ease-out;
      overflow-y: auto;
      .sn-tab-box{
        flex: 1;
        height: 100%;
        word-wrap: break-word;
        word-break: break-all;
        .city-list{
          & li{
            height: 48px/$ppr;
            line-height: 48px/$ppr;
            font-size: $size3;
            border-bottom: 1px solid #dcdcdc;
            text-indent: 10px/$ppr;
          }
        }
      }
    }
  }
}

</style>