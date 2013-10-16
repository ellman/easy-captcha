
var captcha = require('captcha');

app.use('/captcha.jpg',captcha({width:256,height:60,offset:40, quality:30,attempts:3}));

app.post('/form', captcha.check, function (req,res,next) {
	//returns true is valid - the captcha value must sent in the captch field
	//the error message is in the errDesc key of the captcha object
	res.send(req.session.captcha.valid);
});


    