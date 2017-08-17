<template>
  <div class="count-two">
    <span class="minus bt-count" @click="minus">-</span>
    <span class="number"><input type="text" v-model="selectNumber" @keyup="keyUp()"></span>
    <span class="add bt-count" @click="add">+</span>
  </div>
</template>

<script>

export default{
  props:{
    min:{
      type: Number,
      default: 1
    },
    max:{
      type: Number,
      default: 20
    }
  },
  data(){
    return{
      selectNumber: this.min
    }
  },
  watch: {
    'selectNumber'(){
      this.$emit('on-change',this.selectNumber)
    }
  },
  mounted(){
  },
  methods:{
    minus(){
      this.selectNumber--
      if(this.selectNumber<this.min){
        this.selectNumber = Number(this.min)
      }
    },
    add(){
      this.selectNumber++
    },
    keyUp(){
      let fix
      if(typeof this.selectNumber === 'string'){
        fix = this.selectNumber.replace(/\D/g,'')
      }else{
        fix = this.selectNumber
      }
      if(this.selectNumber>this.max){
        fix = this.max
      }else if(this.selectNumber === 0){
        this.selectNumber = this.min
      }
      if(!fix) fix = 1
      this.selectNumber = fix
    }
  }
}

  
</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.count-two{
  font-size: 0;
  .bt-count{
    display: inline-block;
    background: #e4e4e4;
    width: 32px/$ppr;
    height: 32px/$ppr;
    line-height: 32px/$ppr;
    text-align: center;
    border-radius: 6px;
    color: white;
    font-size: 1.4rem;
    &:active{
      background: #B9B9B9;
    }
  }
  .number{
    display: inline-block;
    padding: 0 .2rem;
    font-size: 1.8rem;
    & input{
      display: inline-block;
      width: 3rem;
      height: 2rem;
      line-height: 2rem;
      font-size: 1.4rem;
      text-align: center;
      outline: none;
    }
  }
}
</style>