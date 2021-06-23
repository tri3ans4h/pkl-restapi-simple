const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let User = [{"id":"1","nama":"Adi"},{"id":"2","nama":"Budi"},{"id":"3","nama":"Caca"}]
let Accounts = [
{"id":"1","nama":"Adi","username":"adi","password":"adi"},
{"id":"2","nama":"Budi","username":"budi","password":"budi"},
{"id":"3","nama":"Caca","username":"caca","password":"caca"}
]
let SessionAuth = [];
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, DELETE, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Content-Type, Accept, Authorization");
  next();
});

app.post('/user', (req, res) => {
  let sessionUser = null;
  let tmp = [];
  let auth = req.headers['authorization'];
  console.log(auth);
  if(auth != undefined){
	  tmp = auth.split(" ");
	  sessionUser = tmp[1];
  }else{
	  res.status(403);
	  res.json({"msg":"unauthorize"});
	  res.end;
	  return;
  }
  let  check = false;
  
  for(let x=0;x < SessionAuth.length ;x++){
	   console.log(SessionAuth[x])
	  if(SessionAuth[x] == sessionUser){	 
		  check = true;
		  break;
	  }
  }
  if(check){
	res.status(200);
	  res.json(User);
	  res.end;
	  return;
  }else{	  
	  res.status(403);
	  res.json({"msg":"unauthorize"});
	  res.end;
	  return;
  }
});

app.post('/auth', (req, res) => {
	try{
		
		  let username = 	req.body['username'];
		  let password = 	req.body.password;	
		  let check = false;
			for(let x=0;x < Accounts.length ;x++){
				if( Accounts[x].username == username && 
					Accounts[x].password == password){	 
				  check = true;
				  break;
			  }
			}
		if(check){
			SessionAuth.push(username);
			res.status(200);
			res.json({"msg":username});
			res.end;
			return;
		}else{		  
			res.status(403);
			res.json({"msg":"unauthorize"});
			res.end;
			return;		
		}
		  /*
		  if(username=='user' && password == 'user'){	 
			  res.send({
				message: 'Berhasil login'
			  }); 
			  SessionAuth.push(username);
		  }else{
			  res.send({
				message: 'Gagal login'
			  }); 
		  }*/
		  
	}catch(error){
		  res.send({
			message: 'Error'
		  });	
	}
});








app.get('', (req, res) => {
  res.send({
    message: 'Selamat Datang di Api versi 1.1'
  });
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});