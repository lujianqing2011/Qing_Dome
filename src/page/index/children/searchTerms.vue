<template>
<section class="search-terms-page">
  <header-top goBack="true">
    <section slot="seek" class="header-seek">
      <input type="text" class="seek-input" v-model="searchTitle" placeholder="请输入要搜索的商品" >
    </section>
    <section slot="search" class="search_bt" @click="searchButton()">搜索</section>
  </header-top>
  <section class="lately_seek">
    <div class="seek_title">
      <h2 class="title">最近搜索</h2>
    </div>
    <ul class="seek_word clearfix">
      <li v-for="title in searchHistory" @click="searcLately(title)">{{title}}</li>
    </ul>
    <div class="seek_null" v-if=" searchHistory.length === 0 ">您还没有搜索记录哦！</div>
  </section>
  <section class="clear_button" @click="clearSeek()">清除记录</section>
  <pop-box :show-alert="showAlert" :alert-text="alertText" @closeTip="closeTip()"></pop-box>
  <inquiry-alert :show-alert="showPop" :alert-text="alertText" @closeTip="closeTip()" >
    <div slot="yes" class="right"><button @click.prevent = "delectSetStore()">确定</button></div>
  </inquiry-alert>
</section>
</template>

<script>

import headerTop from 'src/components/header/head';
import popBox from 'src/components/common/popbox';
import inquiryAlert from 'src/components/common/inquiryAlert';
import {setStore, getStore, removeStore} from 'src/config/storage';

export default{
  components: {
    headerTop,
    popBox,
    inquiryAlert
  },
  mounted() {
    if(getStore('searchHistory')){    //检测有没有搜索纪录
      this.searchHistory = JSON.parse(getStore('searchHistory'))
    }
  },
  methods: {
    searchButton() {    //点击搜索
      if(this.searchTitle){
        let keyTitle = this.searchTitle.trim();
        this.$router.push({ path:'/searchGood', query:{key:keyTitle} })   //传递关键字
        let screenSearch = this.searchHistory.indexOf(keyTitle);
        if(screenSearch === -1){  //重复的搜索关键词不添加,-1表示不重复
          this.searchHistory.push(keyTitle);
          setStore('searchHistory', this.searchHistory)
        }
      }else{
        this.showAlert = true;
        this.alertText="请输入要搜索的关键字";
      }
    },
    searcLately(item) {   //点击搜索记录的词语
      let keyTitle = item;
      this.$router.push({path:'/searchGood', query:{key:keyTitle}})   //传递关键字
    },
    clearSeek() {   //点击清除搜索记录
      if(this.searchHistory.length){
        this.alertText="是否清除搜索记录";
        this.showPop = true;
      }
    },
    closeTip() {      //隐藏遮罩层和弹出框
      this.showAlert = false;
      this.showPop = false;
    },
    delectSetStore() {  //确定删除搜索记录
      removeStore('searchHistory');
      this.closeTip();
      window.location.reload();   //刷新当前页面
    }
  },
  data(){
    return{
      searchTitle: '',
      showAlert: false,
      showPop: false,
      alertText: '',
      searchHistory: []
    }
  }
}
  
</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.header-logo{
  width: 100%;
  height: 54px/$ppr;
  background: url('../../../components/header/d1mcw-logo.png') no-repeat center center;
  background-size: 75%;
}
.header-seek{
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  & > a{
    width: 100%;
  }
  &:before {
    content: ' ';
    width: 22px/$ppr;
    height: 22px/$ppr;
    background: url('../../../components/header/icon_seek.png') no-repeat center center;
    background-size: 100%;
    position: absolute;
    left: 8px/$ppr;
    top: 0;
    bottom: 0;
    z-index: 99;
    margin: auto 0;
  }
  .seek-input {
    display: block;
    width: 100%;
    height: 40px/$ppr;
    border-radius: 2rem;
    padding: 0 10px/$ppr 0 36px/$ppr;
    flex: 1;
    font-size: 1.4rem;
    font-weight: 700;
    box-sizing: border-box;
    border: 1px solid #EAEAEA;
    margin: auto;
    font-family: "Microsoft Yahei";
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    &::-webkit-input-placeholder{
      color: #c3c3c3;
    }
  }
}
.search_bt{
  font-size: 1.4rem;
  & a{
    color: white;
  }
}
.search-terms-page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f2f2f2;
  z-index: 999;
  .lately_seek{
    padding: 0 10px/$ppr;
    .seek_title{
      height: 50px/$ppr;
      line-height: 50px/$ppr;
      .title{
        font-size: 1.2rem;
      }
    }
    .seek_word{
      & li{
        float: left;
        padding: 8px/$ppr 20px/$ppr;
        font-size: 1.4rem;
        background: white;
        margin: 0 10px/$ppr 10px/$ppr 0;
        border-radius: 20rem;
      }
    }
    .seek_null{
      text-align: center;
      font-size: 1.2rem;
      color: #757575;
    }
  }
  .clear_button{
    font-size: 1.6rem;
    width: 200px/$ppr;
    padding: 10px/$ppr 0;
    text-align: center;
    color: #383838;
    border-radius: 20rem;
    border: solid 1px #8C8C8C;
    margin: 20px/$ppr auto 0;
  }
}
  
</style>