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

.header-logo{
  width: 100%;
  height: 2.2rem;
  background: url('../../../components/header/d1mcw-logo.png') no-repeat center center;
  background-size: 75%;
}
.header-seek{
  width: 100%;
  height: 2.25rem;
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
    background: url('../../../components/header/icon_seek.png') no-repeat center center;
    background-size: 100%;
    position: absolute;
    left: .4rem;
    top: .7rem;
    z-index: 99;
  }
  .seek-input{
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
.search_bt{
  font-size: .7rem;
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
    padding: 0 .5rem;
    .seek_title{
      height: 2rem;
      line-height: 2rem;
      .title{
        font-size: .6rem;
      }
    }
    .seek_word{
      & li{
        float: left;
        padding: .54rem .9rem;
        font-size: .64rem;
        background: white;
        margin: 0 .5rem .5rem 0;
        border-radius: 20rem;
      }
    }
    .seek_null{
      text-align: center;
      font-size: .6rem;
      color: #757575;
    }
  }
  .clear_button{
    font-size: .68rem;
    width: 10rem;
    padding: .64rem 0;
    text-align: center;
    color: #c7c7c7;
    border-radius: 20rem;
    border: solid 1px #e0e0e0;
    margin: 1.5rem auto 0;
  }
}
  
</style>