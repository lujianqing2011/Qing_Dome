<template>
<section v-show="showAlert" class="pop-up">
  <div class="pop-box">
    <p class="alertText">{{alertText}}</p>
  </div>
</section>

</template>

<script>

//<pop-box :show-alert="showAlert" :alert-text="alertText" @closeTip="closeTip()"></pop-box>
//引用此弹框时，给引用的父组件添加该事件(这是子组件触发的自定义事件)
// closeTip() {
//   this.showAlert = false
// }

export default{
  props:["showAlert","alertText"],
  watch: {
    'showAlert'(){
      if(this.showAlert){
        this.closeTip()
      }
    }
  },
  methods: {
    closeTip() {
      let setTime = setTimeout(() => {
        this.$emit('closeTip');
        return
      },1500);
    }
  }
}
  
</script>

<style lang="scss" scoped>

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

// @keyframes tipMove{
//    0%   { transform: scale(1) }
//    35%  { transform: scale(.8) }
//    70%  { transform: scale(1.1) }
//    100% { transform: scale(1) }
// }
@keyframes tipMove{
   0%   { transform: translateY(-4.4rem) }
   35%  { transform: translateY(8px) }
   100% { transform: translateY(0) }
}
.pop-up{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .pop-box{
    background: rgba(0, 0, 0, 0.8);
    border-radius: 2px;
    position: absolute;
    animation: tipMove .4s;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1000;
    width: 100%;
    height: 54px/$ppr;
    line-height: 54px/$ppr;
    .alertText{
      font-size: 1.4rem;
      text-align: center;
      color: white;
    }
  }
  
}
  
</style>