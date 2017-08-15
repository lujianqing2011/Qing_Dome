<template>
<div class="loading-module" v-show="show">
  <div class="shade"></div>
  <div class="loading">
    <span class="the-load"></span>
    <span class="the-load"></span>
    <span class="the-load"></span>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped >

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.loading-module{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  .shade{
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0.6;
  }
  .loading{
    width: 60px/$ppr;
    height: 15px/$ppr;
    position: absolute;
    top: -20%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .the-load{
      display: inline-block;
      width: 15px/$ppr;
      height: 15px/$ppr;
      background: rgb(255, 53, 53);
      border-radius: 5rem;
      float: left;
      margin-right: 5px/$ppr;
      animation-fill-mode: both;
      &:last-child{
        margin-right: 0;
      }
      &:nth-child(1){
        animation: loading 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }
      &:nth-child(2){
        animation: loading 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }
      &:nth-child(3){
        animation: loading 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)  ;    
      }
      @keyframes loading{
        0%{ transform: scale(1); }
        45%{ transform: scale(0.1); }
        80%{ transform: scale(1); }
      }
    }
  }
}
</style>