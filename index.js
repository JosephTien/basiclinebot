/*
 * this is a basic linebot testing by Joseph
 */
//基礎設定
var debug = false;
var linebot = require('linebot');
var express = require('express');
var bot = linebot({
  channelId: '1534208524',
  channelSecret: '97750d767488ced3eb09a1b0c7b8e692',
  channelAccessToken: 'H5laQFbXOW3zqOChoZgVc+esH4GIfCLvjEibiON+KGG/F0tPD/U4L8+f83KTcbeTE4gDejbWBgPtScaj2hciMwgrv1Vxo/x5MJTNLWFubaI38thKYmuAe7mDn2ypuar0LPZBoWgnoxrkiKHoP4Wv5AdB04t89/1O/w1cDnyilFU='
});
//執行Bot
mybot();
//啟動server
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
/**************************************/
function mybot(){
  bot.on('message', function(event) {
    if (event.message.type = 'text') {
      var msg = inst(event);
      event.reply(msg).then(function(data) {
        // success 
        if(debug)console.log(msg);
      }).catch(function(error) {
        // error 
        if(debug)console.log('error');
      });
    }
  });
}
function inst(event){
  var str = event.message.text;
  var strs = str.split(' ');
  try {
    if(strs[0].toLowerCase()==="timer"){
      var left = "";
      for(var i=2;i<strs.length;i++){
        left = left + " " + strs[i];
      }
      /**/
      //setMsgTimer(event.source.userId, parseInt(strs[1]), left)
      setTimeout(function(){
        repeatMsg(event.source.userId, left, 10, 1)
      },parseInt(strs[1])*1000);
      /**/
      return "done!";
    }else{
      return '"'+str+'" is not a valid instruction...';
    }
  }catch(err){
    return '"'+str+'" is not a valid instruction...';
  }
}

function setMsgTimer(userId, sec, msg){
  setTimeout(function(){
    bot.push(userId,msg);
  },sec*1000);
}
function repeatMsg(userId, msg, times, interval){
  if(times<=0)return;
  bot.push(userId,msg);
  setTimeout(function(){
    repeatMsg(userId, msg, times-1, interval)
  },interval*1000);
}