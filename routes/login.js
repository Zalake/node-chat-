var express = require('express');
var router = express.Router();

router.post('/', function(req,res,next){
	if(req.body.username=="shrishailzalake"&&req.body.password=="password"){
		req.session.loggedIn=true;
		res.redirect('chat');
	}
	else
		req.session.loggedIn=false;
});
module.exports=router;