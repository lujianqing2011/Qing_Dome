<template>
  <div class="star" :class="starType">
     <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"><a class="half" href=""></a></span>
     <i class="star_grade">{{star}}分</i>
  </div>
</template>

<script>

const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default{
  props:{
    size:{
      type: Number
    },
    score:{
      type: Number
    }
  },
  data(){
    return{
      star: this.score
    }
  },
  computed: {
    starType () {
      return 'star-'+this.size
    },  
    itemClasses (){
      let result = []
      let score = Math.floor(this.score*2)/2
      let hasClass = score % 1 !== 0
      let integer = Math.floor(score)
      if(score > LENGTH){
        score = LENGTH
        hasClass = score % 1 !== 0
        integer = Math.floor(score)
      }
      for(let i=0; i<integer; i++){
        result.push(CLS_ON)
      }
      if(hasClass){
        result.push(CLS_HALF)
      }
      while(result.length<LENGTH){
        result.push(CLS_OFF)
      }
      return result
    }
  }
}

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.star{
  font-size: 0;
  .star-item{
    display: inline-block;
    background-repeat: no-repeat;
    width: 18px/$ppr;
    height: 18px/$ppr;
    margin-right: 5px/$ppr;
    background-size: 18px/$ppr;
    &:last-child{
      margin-right: 0;
    }
    &.on{
      background-image: url('./star36_on@3x.png');
      background-repeat: no-repeat;
    }
    &.half{
      background-image: url('./star36_half@3x.png');
      background-repeat: no-repeat;
    }
    &.off{
      background-image: url('./star36_off@3x.png');
    }
  }
  .star_grade{
    display: inline-block;
    font-size: 1.4rem;
    color: black;
  }
}




</style>