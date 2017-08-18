<template>
  <div class="address-page">
    <header-top header-title="收货地址" goBack="true"></header-top>
    <div class="address-box">
      <ul class="address-ul">
        <li class="address-odd" v-for="(item,index) in userAddress">
          <div class="address clearfix">
            <p class="centent">
              <span class="name">{{ item.name }}</span>
              <span class="tel">{{ item.mobile }}</span>
              <span class="detail">
                <em>{{ item.address }}</em>
                <em>{{ item.detail }}</em>
              </span>
            </p>
            <dl class="clearfix set_redact">
              <dt class="chose" :class="{ on:index === currentAddress }" @click="selectAddress(index)">默认地址</dt>
              <dd>
                <router-link :to="{path:'address/addNew', query:{item:item} }">编辑</router-link>
                <!-- <a href="javascript:;" v-link="{name:'address/addNew'}">编辑</a> -->
                <a href="javascript:;" @click="delectAddress(item,index)">删除</a>
              </dd>
            </dl>
          </div>
        </li>
      </ul>
      <div class="null-box"></div>
    </div>
    <div class="add-address">
      <router-link to="/mine/info/address/addNew"><p>+添加地址</p></router-link>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view @changeOn="getChange($event)"></router-view>
    </transition>
    <inquiry-alert :show-alert="showPop" :alert-text="alertText" @closeTip="closeTip()" >
      <div slot="yes" class="right"><button @click.prevent="delectOne()">确定</button></div>
    </inquiry-alert>
  </div>
</template>

<script>

import headerTop from 'src/components/header/head';
import inquiryAlert from 'src/components/common/inquiryAlert'

export default{

  components: {
    headerTop,
    inquiryAlert
  },
  methods: {
    selectAddress(index) {
      this.currentAddress = index;
    },
    delectAddress(item,index) { //弹出删除框
      this.showPop = true;
      this.alertText = '确认删除？';
      this.delectIndex = index;
    },
    delectOne() {   //删除地址
      // let index = this.userAddress.indexOf(this.delectItem); //如果传的是对象的话，就要检查本身在数组的索引
      this.userAddress.splice(this.delectIndex,1);
      this.closeTip();
    },
    closeTip() {
      this.showPop = false;
    },
    getChange(item) {
      this.userAddress.push(item);
    }
  },
  data() {
    return{
      currentAddress: 0,
      showPop: false,
      alertText: null,
      delectIndex: '',
      userAddress: [
        {
          tolerant: false,
          name: '刘强东',
          mobile: 15626202195,
          address: '广东 广州市 白云区 白云区 ',
          detail: '黄石西路'
        },
        {
          tolerant: false,
          name: '马云',
          mobile: 15626202195,
          address: '广东 广州市 白云区 白云区 ',
          detail: '淘宝天猫阿里巴巴街'
        },
        {
          tolerant: false,
          name: '李天佑',
          mobile: 15626202195,
          address: '东北省锦州市锦州郊区 ',
          detail: '36号别墅'
        }
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

.router-slid-enter-active, .router-slid-leave-active {
        transition: all .3s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(50px, 0, 0);
    opacity: 0;
}

.address-page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f2f2f2;
  z-index: 1000;
  .address-box{
    .address-ul{
      .address-odd{
        padding: 10px/$ppr 10px/$ppr 0;
        .address{
          padding: 10px/$ppr 10px/$ppr 5px/$ppr;
          background-color: white;
          border-radius: 4px;
          box-shadow: 1px 1px 5px #e0e0e0;
          .centent{
            font-size: 0;
            & span{
              display: inline-block;
              font-size: $size2;
            }
            .name{
              float: left;
              font-size: $size3;
              font-weight: 700;
            }
            .tel{
              float: right;
              font-size: $size2;
            }
            .detail{
              display: block;
              padding: 6px/$ppr 0;
              clear: both;
              font-size: $size2;
              & em{
                display: block;
                line-height: 24px/$ppr;
                font-size: $size2;
              }
            }
          }
          & dl.set_redact {
            width: 100%;
            border-top: 1px solid #ececec;
            height: 40px/$ppr;
            line-height: 40px/$ppr;
            font-size: $size2;
            & dt{
              float: left;
              width: 55%;
              font-size: $size2;
              box-sizing: border-box;
              padding-left: 32px/$ppr;
              background: url('../../../../assets/icon-meixuanze.png') no-repeat left center;
              background-size: 25px/$ppr;
              &.on{
                background: url('../../../../assets/icon-xuanze.png') no-repeat left center;
                background-size: 25px/$ppr;
              }
            }
            & dd{
              float: right;
              text-align: right;
              font-size: $size2;
              width: 45%;
              & a{
                padding-left: 10px/$ppr;
              }
            }
          }
        }
      }
    }
    .null-box{
      height: 75px/$ppr;
      width: 100%;
    }
  }
  .add-address{
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px/$ppr;
    background: white;
    & p{
      height: 48px/$ppr;
      line-height: 48px/$ppr;
      font-size: $size4;
      text-align: center;
      background: red;
      border-radius: 4px;
    }
    & a{
      color: white;
    }
  }
}

</style>