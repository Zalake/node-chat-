var express = require('express');
var router = express.Router();
var config = require('../models/db.js');

router.post('/', function(req,res,next){
	username = req.body.username;
	email= req.body.email;
	password = req.body.password;
	config.pool.getConnection(function(err,conn){
		console.log("inside getConbnection");
		conn.execute(
			"insert into users values('"+username+"','"+email+"','"+password+"')",
			function(err,res){
				if(err){
					console.log(err);
					return;
					conn.release();
				}
				conn.release();
				

		});
		console.log("getting closed");
		
	});
	res.render('index');


});
module.exports=router;