var port = 3000;
var http=require('http');
var express=require('express');
var app = express();

var server = http.createServer(app).listen(3000, function() {  
  console.log('Server On puerto 3000');
});

var io = require('socket.io').listen(server);  

app.get('/',function(req,res){
res.sendfile('index.html');

})
//Modulo 
var Twit = require('twit');  

//Keys para acceder a la api de Twitter

var T = new Twit({  
  consumer_key: 'T6nFO3fHOv0AH8xKkfOvAY68p',
  consumer_secret: 'K3mDWeGsOuQncZ9ez5wd8S6UH4qrJ8nZP5Dc5ly2t2JqhPaXOY',
  access_token: '158932605-Pw4VJXLsYk8TvQotHGQ1QTIDLmLWRbfnTYxQomNc',
  access_token_secret: 'mKFL68qw3ZvwSj5VX1IfcOW9NUnaeHE9VEmdhL2HOYUNY'
});


//Filtro para los Tweets
var stream = T.stream('statuses/filter', { track: 'Messi' })


io.sockets.on('connection', function (socket) {      
	  stream.on('tweet', function(data) {	
	         		
	  		io.sockets.emit('tweet',{
	  			image:data.user.profile_image_url_https,
	  			twet:data.text
	  		});
	   
	  });

 });