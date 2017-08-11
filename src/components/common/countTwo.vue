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

<style lang="sass">
.count-two
  font-size: 0
  .bt-count
    display: inline-block
    background: red
    width: 2rem
    height: 2rem
    line-height: 2rem
    text-align: center
    border-radius: 50%
    color: white
    font-size: 1.4rem
  .number
    display: inline-block
    padding: 0 .2rem
    font-size: 1.4rem
    & input
      display: inline-block
      width: 3rem
      height: 2rem
      line-height: 2rem
      font-size: 1.4rem
      text-align: center
      outline: none
</style>