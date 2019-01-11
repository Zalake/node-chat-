var config = require('../models/db.js');
var express = require('express');
var router = express.Router();

router.get('/',function(req, res) {

	config.pool.getConnection(function(err,conn){
		console.log("inside getConbnection");
		conn.execute(
			"CREATE TABLE users(username VARCHAR(15) constraint username_pk primary key, email VARCHAR(15) constraint email_uq unique, password VARCHAR(12))",
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
	res.redirect("www.google.com");


});
module.exports = router;