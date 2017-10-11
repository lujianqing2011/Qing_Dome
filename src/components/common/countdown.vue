<template>
  <div class="time">
    <span class="alike hour-s">{{timeH}}</span>
    <span class="alike-b">:</span>
    <span class="alike minute">{{timeM}}</span>
    <span class="alike-b">:</span>
    <span class="alike seconds">{{timeS}}</span>
  </div>
</template>
<script>
export default{
  data() {
    return {
      timeD: 0,
      timeH: 0,
      timeM: 0,
      timeS: 0,
      setTime: '2017/11/30,23:05:00'
    }
  },
  mounted() {
    this.timeLimit();
  },
  methods: {
    timeLimit() {    //秒杀商品的倒计时
      let nowtime = new Date(); // 当前时间
      let endtime = new Date(this.setTime); // 结束时间
      let lefttime= parseInt((endtime.getTime() - nowtime.getTime())/1000);
      if(lefttime <= 0){
        lefttime = 0
      }
      this.timeD = parseInt(lefttime / (24 * 60 * 60));  //天数
      this.timeH = parseInt(lefttime / (60 * 60) % 24);  //小时
      this.timeM = parseInt(lefttime / 60 % 60);  //分钟
      this.timeS = parseInt(lefttime % 60);  //秒数

      this.timeH = this.checkTime(this.timeH);
      this.timeM = this.checkTime(this.timeM);
      this.timeS = this.checkTime(this.timeS);

      if(lefttime <= 0) {
        console.log(this.timeD+'天'+this.timeH+'小时'+this.timeM+'分'+this.timeS+'秒');
        return
      }else{
        setTimeout(this.timeLimit,1000);
      }
    },
    checkTime(i) {  //秒杀商品的时间（s,m），小于10时，为数字前面添加0
      if(i < 10) {
        i = "0" + i;
      }
      return i
    }
  }
}
  

</script>

<style lang="scss">

$ppr: 12px/1rem; // 样式的rem按照12px进行转换

.time {
  color: #000;
  font-size: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  .alike{
    font-size: 1.2rem;
    border: 1px solid #ececec;
    border-radius: 2px;
    padding: 5px/$ppr;
    color: #000;
  }
  .alike-b {
    font-size: 1.2rem;
    margin: 0 5px/$ppr;
  }
}
  
</style>