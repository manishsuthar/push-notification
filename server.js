var express = require('express');
var app = express();
var webPush = require('web-push');
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors())
app.set('port', 2000);
app.use(express.static(__dirname + '/'));
const vapidKeys = webPush.generateVAPIDKeys();
app.use(bodyParser.json())
process.env.GCM_API_KEY = 'BESI7CzUZkA1yG1ssqrpkP73c3wrrbLzVaaEdWDLIch83mUuVCOaHnCPw8BmT0WZsvlXybOuZ10tdFMqZ7uIeo4';
webPush.setGCMAPIKey(process.env.GCM_API_KEY);

app.post('/register', function(req, res) {
  // A real world application would store the subscription info.
  res.sendStatus(201);
});

app.post('/sendNotification', function(req, res) {

  //console.log(req.body)

  // webPush.sendNotification({'endpoint':req.body.endpoint,keys: {p256dh: req.body.key,auth: req.body.authSecret}}, 
  //   payload: JSON.stringify({'title': req.body.title,'icon': req.body.icon,'body': req.body.body,'url': req.body.link})
  //   )
  //   .then(function() {
  //     console.log("sent push")
  //     res.sendStatus(201);
  //   }, function(err) {
  //     console.log('webpusherr', err);
  //   });

    var pushSubscription = {'endpoint':req.body.endpoint,keys: {p256dh: req.body.key,auth: req.body.authSecret}};
    var payload =  new Buffer(JSON.stringify({'title': req.body.title,'icon': req.body.icon,'body': req.body.body,'url': req.body.link}),'utf8');
    var options = { gcmAPIKey: 'AIzaSyD3l6lSJLd8PLabNyhL89K2_LztzWYaPvU',
                    TTL: 60
                  };
    webPush.sendNotification(
        pushSubscription,
        payload,
        options
      ).then(function(){ 
        res.sendStatus(201);
      },function(err){
        console.log('webpusherr', err);
      })
   // res.sendStatus(201);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});