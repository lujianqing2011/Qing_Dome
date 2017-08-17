<template>

<section class="explain_page">
  <header-top header-title="说明" goBack="true" class="use_color"></header-top>
  <section class="explain_box">
    <state></state>
  </section>
</section>

</template>

<script>

import headerTop from 'src/components/header/head';
import state from 'src/components/state/state';

export default{
  components:{
    headerTop,
    state
  }
}
  
</script>

<style lang="scss">

.explain_page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .explain_box{
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
  
</style>