     var express=require("express");
	  var bodyParser=require('body-parser');
	var jwt=require('jsonwebtoken');
    var connection = require('./../config');
    module.exports.authenticate=function(req,res){
        var email=req.body.email;
        var password=req.body.password;
		
		console.log("result :", { it: "works" });
        connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
          if (error) {
              res.json({
                status:false,
                message:'there are some error with query'
                })
          }else{
			  console.log(results.length);
            if(results.length >0){
                if(password==results[0].password){
                    var token=jwt.sign(results[0],process.env.SECRET_KEY,{
                        expiresIn:5000
                    });
                    res.json({
                        status:true,
                        token:token
                    })
                }else{
                    res.json({
                      status:false,                  
                      message:"Email and password does not match"
                     });
                }
             
            }
            else{
              res.json({
                  status:false,
                message:"Email does not exits"
              });
            }
          }
        });
    }