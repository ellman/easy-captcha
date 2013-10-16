const TEXT = 0;
const BUFF = 1;
var attempts = 3;
var defaultOptions = {
    width:256,//set width,default is 256
    height:60,//set height,default is 60
    offset:40,//set text spacing,default is 40
    quality:30,//set pic quality,default is 50
    /*generate:function(){//Custom the function to generate captcha text
         //generate captcha text here
				 text = 'asd'
         return text;//return the captcha text
    }*/
	}

Captcha = module.exports = function (options) {	
	if (!options) options = defaultOptions;
	var captcha = require('ccap')(options);		
	if (options.attempts) attemps = options.attempts

	return function (req,res,next) {
		var generated = captcha.get();	
	  req.session.captcha = {text:generated[TEXT],attempts:0};	  
	  res.end(generated[BUFF]);		
	}
}

Captcha.check = function (req,res,next) {
		
	if (!req.session.captcha) {
		req.session.captcha = {valid:false, errDesc:"No Captcha",attempts:1};
		return next();
	} 

	req.session.captcha.attempts = req.session.captcha.attempts+1;

	if (!req.session.captcha.text) {
		req.session.captcha.valid = false;
		req.session.captcha.errDesc = "No Captcha";
		return next();
	}	

	if (req.session.captcha.attempts > attempts) {
		req.session.captcha.valid = false;
		req.session.captcha.errDesc = "Too many attempts";
		return next();
	}

	if (!req.body || req.session.captcha.text != req.body.captcha) {
		req.session.captcha.valid = false;
		req.session.captcha.errDesc = "Text did not match";		
		return next();
	}	
	
}

