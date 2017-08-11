<template>
<section v-show="showAlert" class="pop-up">
  <div class="inquiry-alert">
    <div class="alert-layer">
      <p class="alertText">{{alertText}}</p>
      <div class="inquiry clearfix">
        <div class="left"><button @click.prevent="closeTip()" >取消</button></div>
        <slot name="yes"></slot>
        <!-- <div name="yes" class="right"><button @click.prevent>确定</button></div> -->
      </div>
    </div>
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
  methods: {
    closeTip() {
      this.$emit('closeTip');
    }
  }
}
  
</script>

<style lang="scss" scoped>
@keyframes tipMove{
   0%   { transform: scale(1) }
   35%  { transform: scale(.8) }
   70%  { transform: scale(1.1) }
   100% { transform: scale(1) }
}
.pop-up{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
  .inquiry-alert{
    width: 70%;
    height: 6.5rem;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.8);
    padding: .75rem 1rem;
    animation: tipMove .4s;
    .alert-layer{
      position: relative;
      height: 100%;
      .inquiry{
        width: 100%;
        position: absolute;
        bottom: 0;
        display: flex;
        & .left, & .right{
          display: inline-block;
          flex: 1;
          text-align: center;
          color: white;
          font-size: .9rem;
          padding: 0rem .25rem;
          box-sizing: border-box;
          & button{
            background: #6f6f6f;
            color: white;
            display: block;
            width: 100%;
            height: 1.9rem;
            border-radius: 6px;
          }
        }
        & .right{
          & button{
            background: #00C318;
          } 
        }
      }
      .alertText{
        font-size: 1rem;
        text-align: center;
        color: white;
        padding: .5rem 0;
        line-height: 1.1rem;
      }
    }
  }
}
  
</style>