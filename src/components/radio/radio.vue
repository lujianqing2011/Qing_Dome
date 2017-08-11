<template>
<div class="radio-module">
  <label 
    v-for=" (list,index) in goodsRadio " 
    name="radio"
    :class="{on: index === select}"
    @click="selectRadio(index)">{{list.name}}
  </label>
</div>
</template>

<script>

export default{
  props: {
    goodsRadio: {
      type: Array
    },
    goodsRadio: {
      type: Array
    }
  },
  mounted(){
    this.select = 0
  },
  watch: {
    'select'() {
      this.$emit('on-change',this.goodsRadio[this.select])
    }
  },
  methods: {
    selectRadio(index) {
      this.select = index
    }
  },
  data(){
    return{
      select: Number
    }
  }
}

</script>

<style lang="sass">

.on
  background: red

.radio-module
  font-size: 0
  & label[name="radio"]
    display: inline-block
    border: 1px solid white
    padding: 1rem
    font-size: 1.4rem
    margin: .5rem 1rem .5rem 0
    color: white
    border-radius: .4rem


</style>