<template>
  <section class="coupon_page">
    <header-top header-title="我的礼券" goBack="true"></header-top>
    <section class="coupon_content">
      <div class="coupon_box">
        <div class="coupon_box_div">
          <div class="coupon_top">
            <p class="price"><span>¥</span>100.00</p>
            <p class="explain">「100元现金券，仅当日有效」</p>
          </div>
          <div class="coupon_bottom">
            <p class="coupon_bottom_p">
              <span class="iconfont icon_size">&#xe629;</span>
              <span class="status">状&nbsp;&nbsp;&nbsp;态</span>
              <span>已过期</span>
            </p>
            <p class="coupon_bottom_p">
              <span class="iconfont icon_size">&#xe661;</span>
              <span class="status">有效期</span>
              <span>2017-2-10至2017-12-12</span>
            </p>
            <p class="coupon_bottom_p">
              <span class="iconfont icon_size">&#xe640;</span>
              <span class="status">说&nbsp;&nbsp;&nbsp;明</span>
              <span>已过期</span>
            </p>
          </div>
        </div>
        <div class="coupon_box_div">
          <div class="coupon_top on">
            <p class="price"><span>¥</span>100.00</p>
            <p class="explain">「100元现金券，仅当日有效」</p>
          </div>
          <div class="coupon_bottom">
            <p class="coupon_bottom_p">
              <span class="iconfont icon_size">&#xe629;</span>
              <span class="status">状&nbsp;&nbsp;&nbsp;态</span>
              <span>已过期</span>
            </p>
            <p class="coupon_bottom_p">
              <span class="iconfont icon_size">&#xe661;</span>
              <span class="status">有效期</span>
              <span>2017-2-10至2017-12-12</span>
            </p>
            <p class="coupon_bottom_p">
              <span class="iconfont icon_size">&#xe640;</span>
              <span class="status">说&nbsp;&nbsp;&nbsp;明</span>
              <span>已过期</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>

import headerTop from 'src/components/header/head'

export default{
  components: {
    headerTop
  }
}

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.coupon_page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 11;
  background: #f2f2f2;
  .coupon_content{
    .coupon_box{
      padding: 10px/$ppr;
      .coupon_box_div{
        width: 100%;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 10px/$ppr;
        box-shadow: 1px 1px 6px #DEDEDE;
        .coupon_top{
          width: 100%;
          background: #c8c8c8;
          &.on{
            background-color: #FF3B84;
          }
          & .price{
            color: white;
            font-size: 2.4rem;
            padding: 10px/$ppr 10px/$ppr 0 10px/$ppr;
            text-indent: 10px/$ppr;
            & span{
              font-size: 1.4rem;
            }
          }
          & .explain{
            color: white;
            font-size: 1.2rem;
            padding: 0 10px/$ppr 10px/$ppr;
          }
        }
        .coupon_bottom{
          padding: 10px/$ppr;
          & .coupon_bottom_p{
            font-size: 0;
            height: 24px/$ppr;
            line-height: 24px/$ppr;
            & span {
              font-size: 1.2rem;
            }
            & .icon_size{
              font-size: 1.4rem;
              color: #6f6f6f;
            }
            & .status{
              margin: 0 5px/$ppr;
            }
          }
        }
      }
    }
  }
}
  
</style>