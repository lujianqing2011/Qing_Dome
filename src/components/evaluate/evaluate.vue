<template>

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
    <li class="content-li" v-for="item in goodsComment" v-show="needShow(item.type, item.pic)">
      <div class="user-message">
        <img src="../../assets/toux.jpg">
        <span class="user-name">{{item.userName}}</span>
        <span class="user-time">{{item.time}}</span>
      </div>
      <div class="user-evaluate">
        <span>[好评]</span>
        <span>{{item.content}}</span>
      </div>
      <div class="user-img">
        <img v-for="(img,index) in item.pic" v-if="img" :src="img" @click="showBagImg(index)">
      </div>
    </li>
  </ul>
  <div class="bg_black" v-show="showBg"></div>
</div>

</template>

<script>

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default{
  methods: {
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
      this.showBg = true
    }
  },
  mounted(){

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
  props: {
    goodsCommentTwo: {
      type: Array,
      default(){
        return []
      }
    },
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
    },
    goodsComment: {
      type: Array,
      default:[]
    }
  },
  data() {
    return{
      selectTypeBt: this.selectType,
      selectCentent: false,
      showBg: false
      // selectCentent: this.onlyContent
    }
  }
}

</script>

<style lang="scss" scoped>

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

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
      color: #000;
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
  .bg_black{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
  }
}






</style>