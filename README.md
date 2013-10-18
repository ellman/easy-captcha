
easy-captcha tries to make integrating captcha into forms a simple and painless experience. 
## Installation

    $ npm install easy-captcha

## Features

  * Fast generation of captcha image based off of CCAP using c++
  * Middleware to check form submissions
  * Configure number of allowed attemps
  * Overide text generation function

## Basic Example using express and express.session

```js
var express = require('express');
var captcha = require('easy-captcha');

//intiate app
var app = express();

app.configure(function(){
    app.use(express.bodyParser());    
    //need to use sessions to store the captcha information
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'some-secret' }));
    app.use('/captcha.jpg', captcha.generate());
    //Choose the path of the captcha image and intiate captcha with options
});

//sample form with the captcha image.
//the default name for the captcha text is captcha
app.get('/login', function(req, res, next){
		var form = ['<form action="/login" method="post">',
									'<img src="/captcha.jpg"/>',
								'<input type="text" name="captcha"/></form>'];
    res.send(form.join('\n'));
});

//use captcha.check as middleware to check the valid captcha result
app.post('/login', captcha.check, function (req,res,next) {
	//returns true is valid - the captcha value must sent in the captch field
	//the error message is in the errDesc key of the captcha object
	if (!req.session.captcha.valid) return res.send(401, "Captcha does not match");

	res.send("Captcha matched! Well done :)");
});

app.listen(7001);
```
## Configuration Options 

## Thanks
easy-captcha is based on CCAP node module. Many thanks