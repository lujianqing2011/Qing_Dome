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
          <li v-for="(item,index) in listProvincial" @click="clickSite(item,index)">{{item}}</li>
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
      this.listCity = []
      this.lectSite = item;
      let rank = city[index].child;
      rank.forEach((item,index)=>{
        this.listCity.push(item.value)
      })
      //this.listCity.push(city[index].child[index].value)
      // for(var i=index; city.length-1>i; i++){
      //   for(var a=0; city[i].child.length-1>a; a++){
      //     console.log(a,city[i].child[a].value)
      //     this.listCity.push(city[i].child[a].value) 
      //   }
      // }

      this.idCity = index;
      this.listCounty = '';       //  清空区县的地址列表
      this.listTown = '';         //  清空镇的地址列表
      this.SelideOn(this.indexing);
    },
    clickCity(item,index) {     //选择市
      // this.navDetail[1] = item
      this.listCity = []
      this.lectCity = item;
      let rank = city[index].child;
      alert(index)
      rank.forEach((item,index)=>{
        console.log(5,item.child)
      })
      // for(var i=index; city.length-2>i; i++){
      //   for(var a=index; city[i].child.length-2>a; a++){
      //     for(var b=index; city[i].child[a].child.length-2>a; a++){
      //       console.log(3,city[i].child[a].child.length)
      //     }
          
      //     //this.listCity.push(city[i].child[a].child[index].value) 
      //   }
      //   //this.listCounty.push(city[i].value) 
      // }
      //this.listCounty = this.County[this.idCity][index];
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
    for(var i=0; city.length>i; i++){
      console.log(city[i])
      this.listProvincial.push(city[i].value) 
    }
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
      listProvincial: [],   //省级
      listCity: [],      ////市列表
      listCounty: [],  //区/县列表
      listTown: [],    //镇/街道
      idCity: null,     //记录市的序列号
      idCounty: null,     //记录区/县的序列号
      indexing: 1,
      // navDetail: ["选择省","选择市","选择区县","选择街道"],
      Provincial: [],
      City: []
      // County:
      // Town:
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
        height: auto;
        overflow-y: scroll;
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