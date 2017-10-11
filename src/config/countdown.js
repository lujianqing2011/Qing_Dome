
export const timeLimit = (time) => {    //秒杀商品的倒计时
  let setTime = time
  let nowtime = new Date(); // 当前时间
  let endtime = new Date(setTime); // 结束时间
  let lefttime= parseInt((endtime.getTime() - nowtime.getTime())/1000);
  let d = parseInt(lefttime / (24 * 60 * 60));  //天数
  let h = parseInt(lefttime / (60 * 60) % 24);  //小时
  let m = parseInt(lefttime / 60 % 60);  //分钟
  let s = parseInt(lefttime % 60);  //秒数
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  this.timeD = d;
  this.timeH = h;
  this.timeM = m;
  this.timeS = s;
  console.log(d+'天'+h+'小时'+m+'分'+s+'秒');
  if(lefttime <= 0){
    alert('团购已经结束');
    clearTimeout(loopTime);
    return
  }else{
    let loopTime = setTimeout(this.timeLimit,1000);
  }
}
//秒杀商品的时间（s,m），小于10时，为数字前面添加0
export const checkTime = (i) => { 
    if(i < 10) {
        i = "0" + i;
    }
    return i
}