<template>
  <section class="collect_goods_page">
    <header-top header-title="我的收藏" goBack="true"></header-top>
    <section class="collect_goods">
      <ul class="goods_list">
        <li class="goods_items">
          <a class="goods_wrap" href="#"><img class="p_img" src="../../../assets/pic.jpg"></a>
          <div class="goods_info">
            <a class="a_items" href="#">
              <div class="goods_name">nike耐克 男鞋Air max系列跑步鞋运动鞋跑步819300-003_深灰 白 黑,44系列跑步鞋运动鞋跑步819300-003_深灰</div>
            </a>
            <div class="div_detail">
              <div class="div_d left">
                <p>¥5.00</p>
                <p>有货</p>
              </div>
              <div class="div_d right">
                <a href="#">删除</a>
                <a href="#">看相似</a>
              </div>
            </div>
          </div>
        </li>
        <li class="goods_items">
          <a class="goods_wrap" href="#"><img class="p_img" src="../../../assets/pic.jpg"></a>
          <div class="goods_info">
            <a class="a_items" href="#">
              <div class="goods_name">nike耐克 男鞋Air max系列跑步鞋运动鞋跑步819300-003_深灰 白 黑,44系列跑步鞋运动鞋跑步819300-003_深灰</div>
            </a>
            <div class="div_detail">
              <div class="div_d left">
                <p>¥5.00</p>
                <p>有货</p>
              </div>
              <div class="div_d right">
                <a href="#">删除</a>
                <a href="#">看相似</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
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

<style lang="scss" scoped>

.collect_goods_page{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: #fff;
  .collect_goods{
    .goods_list{
      .goods_items{
        position: relative;
        display: flex;
        padding: .5rem;
        border-bottom: 1px solid #eaeaea;
        .goods_wrap{
          display: inline-block;
          .p_img{
            width: 4rem;
            height: 4rem;
          }
        }
        .goods_info{
          width: 100%;
          padding-left: .4rem;
          box-sizing: border-box;
          flex: 1;
          .a_items{
            display: block;
            .goods_name{
              width: 100%;
              height: 1.8rem;
              line-height: .9rem;
              font-size: .6rem;
              color: black;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              word-break: break-all;
            }
          }
          .div_detail{
            display: flex;
            align-items: center;
            margin-top: .25rem;
            .div_d{
              flex: 1;
              width: 4.5rem;
              &.left{
                text-align: left;
                & p{
                  font-size: .6rem;
                  line-height: .8rem;
                  color: red;
                }
              }
              &.right{
                text-align: right;
                & a{
                  display: inline-block;
                  height: 1.2rem;
                  line-height: 1.2rem;
                  border: 1px solid #ccc;
                  padding: 0 0.4rem;
                  font-size: .6rem;
                  border-radius: 2px;
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