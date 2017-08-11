<template>
  <div class="count">
    <span class="minus bt-count" @click="minus">-</span>
    <span class="number"><input type="text" v-model="this.want.number" @keyup="keyUp()"></span>
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
    },
    want:{
      type: Object
    }
  },
  data(){
    return{

    }
  },
  methods:{
    minus(){
      this.want.number--
      if(this.want.number<this.min){
        this.want.number = Number(this.min)
      }
    },
    add(){
      this.want.number++
    },
    keyUp(){
      console.log(this.count)
      let fix
      this.want.number = this.count
      console.log(this.count)
      if(typeof this.count === 'string'){
        console.log(0)
      }else{
        console.log(1)
      }
      // if(typeof this.want.number === 'string'){
      //   alert(0)
      //   fix = Number(this.want.number.replace(/\D/g,''))
      // }else{
      //   fix = this.want.number
      // }
      // if(this.want.number>this.max){
      //   fix = this.max
      // }
      // this.want.number = fix
      // console.log(fix)
    }
  }
}

  
</script>

<style lang="scss" scoped>
.count{
  display: inline-block;
  float: right;
  font-size: 0;
  .bt-count{
    display: inline-block;
    color: #cacaca;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    border-radius: 50%;
    font-size: 1.8rem;
    border: 1px solid #cacaca;
  }
  .number{
    display: inline-block;
    padding: 0 .2rem;
    font-size: 1.4rem;
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