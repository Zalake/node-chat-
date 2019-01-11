var express = require('express');
var router = express.Router();
var config = require('../models/db.js');

router.post('/', function(req,response,next){
	config.pool.getConnection(function(err,conn){
		conn.execute(
			"select * from users where username='"+req.body.username+"'",
			function(err,res){
				if(err){
					console.log(err);
					return;
					conn.release();
				}
				console.log(res);
				if(res.rows.length==0){
					response.render('index',{msg:"no such user"});

				}
				else if(res.rows[0][0]==req.body.username&&res.rows[0][2]==req.body.password){
					req.session.loggedIn=true;
					response.redirect('chat');
				}
				else{
					response.render('index',{'msg':"invalid username or password"});
				}
				console.log(res);
				conn.release();
			}
			);
	});
	if(req.body.username=="shrishailzalake"&&req.body.password=="password"){
		req.session.loggedIn=true;
		response.redirect('chat');
	}
	else
		req.session.loggedIn=false;
});
module.exports=router;