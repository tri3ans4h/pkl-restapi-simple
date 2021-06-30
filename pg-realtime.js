const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//koneksi postgresql
const {Pool, Client} = require('pg');
const config = {
	user : 'postgres',
	host : 'localhost',
	database : 'akademik',
	password : 'apri180488',
	port : 5432
}
const pool  = new Pool(config);
let pgClient  = new Client(config);
pgClient.connect(err => {
	if(err){
		console.error('connection error',err.stack)
	}else{
		console.log('connected');
	}
});
//venom bot
const venom = require('venom-bot');
venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
 function start(client) {
	pgClient.query('LISTEN kirim_notif');
	pgClient.on('notification',function(msg){
		let json = null;
		try{
			json = JSON.parse(msg.payload);
			//console.log(json)
			//
			client
			.sendText('6282282029700@c.us', msg.payload)
			.then((result) => {
			  //console.log('Result: ', result); //return object success
			})
			.catch((erro) => {
			  console.error('Error when sending: ', erro); //return object error
			});
		}catch(error){
			console.log(error);
		}
	})	
}