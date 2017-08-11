<template>
<div>
  <header-top header-title="所有商品" goBack="true" header-nav="true"></header-top>
  <div class="search-good" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="left-box">
    <figure v-show="leftData.length>0" v-for="data in leftData" class="bg-box1" >
      <router-link :to="{path:'/details', query: { id:data.id }}">
        <m-lazy-img :list="data.img"></m-lazy-img>
      </router-link>
    </figure>
    </div>
    <div class="right-box">
      <figure v-show="rightData.length>0" v-for="data in rightData" class="bg-box1" >
        <router-link :to="{path:'/details', query: { id:data.id }}">
          <m-lazy-img :list="data.img"></m-lazy-img>
        </router-link>
      </figure>
    </div>
  </div>
</div>
</template>

<script>

import headerTop from 'src/components/header/head'
import MLazyImg from 'src/components/common/lazyimg'

export default{
  components:{
    headerTop,
    MLazyImg
  },
  data(){
    return{
      loadImg: [],
      leftData: [],
      rightData: [],
      page: 1,
      busy: false
    }
  },
  created() {
  },
  methods: {
    loadMore() {
      // this.$store.commit('UPDATE_LOADING',true)
      this.busy = true
      this.$http.get('/api/results').then((res)=>{
        console.log(res.body)
        const left = res.body.loadImg.filter((list,index)=>{
          return (index + 1) % 2 !== 1
        })
        const right = res.body.loadImg.filter((list,index)=>{
          return (index + 1) % 2 === 1
        })
        this.leftData = this.leftData.concat(left)
        this.rightData = this.rightData.concat(right)
        this.$nextTick(()=>{
          // this.$store.commit('UPDATE_LOADING',false)
          this.busy = false
        })
      })
    }
  }

}


</script>

<style lang="scss">

.search-good{
  display: flex;
}
.left-box{
  flex: 1;
}
.right-box{
  flex: 1;
}
.bg-box1{
  & img{
    width: 100%;
    height: 100%;
  }
}

</style>