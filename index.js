/*
 * this is a basic linebot testing by Joseph
 */
var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: '1534193517',
  channelSecret: '396ce85776aac89c96ef32bf7de7ff57',
  channelAccessToken: '/i8orRNkILi4hQ4CzOqVzz4n6zva2hY3q+Z8viH+afCsVS/RkxMC733FW71NCa6Mf8Tteaqznt4EpzdxUtyI5jBg8B2haNaw6cCw5unWwQ3vSv8rifx+A+o0pnpBE94zyoG4l0pzxApivOz85iShFAdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
}); 