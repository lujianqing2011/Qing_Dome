<template>

<div class="evaluate">
  <div class="evaluate-type">
    <span class="type-bt all" :class="{'on':selectTypeBt === 2}" @click="select(2,$event)" > {{desc.all}} {{goodsComment.length}}</span>
    <span class="type-bt positive" :class="{'on':selectTypeBt === 1 }" @click="select(1,$event)" > {{desc.positive}} {{positive.length}}</span>
    <span class="type-bt negative" :class="{'on':selectTypeBt === 0 }" @click="select(0,$event)" > {{desc.negative}} {{negative.length}}</span>
  </div>
  <div class="switch">
    <span class="screen-icon" @click="toggleContent()" :class="{'on':selectCentent}">√</span>
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
        <img v-for="img in item.pic" v-if="img" :src="img">
      </div>
    </li>
  </ul>
</div>

</template>

<script>

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default{
  methods: {
    select(type, event) {
      this.selectTypeBt = type
      console.log(type)
    },
    toggleContent(event) {
      this.selectCentent = !this.selectCentent
    },
    needShow(type, pic) {
      if (this.selectCentent && !pic.length){   //显示有图片的评论
        return false
      }
      if (this.selectTypeBt === ALL){
        return true
      }else {
        return type === this.selectTypeBt
      }
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
      selectCentent: false
      // selectCentent: this.onlyContent
    }
  }
}

</script>

<style lang="scss" scoped>

.evaluate {

  .evaluate-type {
    padding: 0rem .5rem;
    & .type-bt {
      display: inline-block;
      padding: .5rem;
      color: white;
      font-size: .6rem;
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
    padding: 1rem 0;
    border-bottom: 1px solid #ececec;
    padding: .5rem;
    .screen-icon {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      border-radius: 50%;
      font-size: .6rem;
      color: white;
      background: #a0a0a0;
      margin-right: .25rem;
      &.on {
        background: #36CA56;
      }
    }
    .switch-screen {
      display: inline-block;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: .6rem;
    }
  }
  .content {
    padding: .5rem;
    .content-li {
      padding: .6rem 0 .6rem 0;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
      .user-message {
        height: 1.5rem;
        font-size: 0;
        & img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          display: inline-block;
        }
        & .user-name {
          display: inline-block;
          font-size: .6rem;
          line-height: 1.5rem;
          vertical-align: top;
          margin-left: .6rem;
        }
        & .user-time {
          display: inline-block;
          float: right;
          line-height: 1.5rem;
          font-size: .6rem;
        }
      }
      .user-evaluate {
        padding: .25rem .25rem .25rem 0rem;
        line-height: 1.2rem;
        font-size: .6rem;
      }
      .user-img {
        padding-left: .15rem;
        & img {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #eee;
          margin-right: .4rem;
        }
      }
    }
  }
}






</style>