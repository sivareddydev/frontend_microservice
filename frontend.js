

var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
var app = express()

var guestbookendpoint = 'http://neotriger.tech:8080/api/messages'
var helloendpoint = 'http://neotriger.tech:8080/api/hello/'

var defaultHandling = function(res, next) {
  
  return function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body || '');
    } else {
      next(error)
    }
  }
}


app.use(bodyParser.urlencoded({
  extended : true
}));


app.use('/', express.static('.'))


app.use('/api/health', function(req, res, next) {
   res.send('I am ok');
});


app.post('/api/messages', function(req, res, next) {
  console.log('POST content %s to %s', JSON.stringify(req.body), guestbookendpoint)
  
  request.post({
    'url' : guestbookendpoint,
    'form' : req.body,
    'timeout' : 1500
  }, defaultHandling(res, next))
});

app.get('/api/messages', function(req, res, next) {
  console.log('redirecting GET request to ' + guestbookendpoint)

  request({
    'url' : guestbookendpoint,
    "timeout" : 1500
  }, defaultHandling(res, next))
});

app.get('/api/hello/:name', function(req, res, next) {
  var dest = helloendpoint + req.params.name
  console.log('redirecting GET request to ' + dest)
  
  request({
    'url' : dest,
    'timeout' : 15000
  }, defaultHandling(res, next))
});

var server = app.listen(8080, '0.0.0.0', function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Frontend service running at http://%s:%s", host, port)
});

