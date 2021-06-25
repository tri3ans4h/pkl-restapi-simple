const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const { v4: uuidv4 } = require('uuid');
var CLIENT = [];
wss.on('connection', function connection(ws) {
  ws.on('close', function(){
		//console.log(ws,'Close')
		let idx = null;
		for(let x=0;x < CLIENT.length;x++){
			if(ws.uuid == CLIENT[x].uuid){
				idx = x;
				break;
			}
		}
		CLIENT.splice(idx,1);
		console.log(CLIENT.length)
  })
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
	//console.log(message.req)
	let Msg = null;
	try {
		Msg = JSON.parse(message);
	}
	catch(err) {
	
	}
	
	if(Msg != null){
		//{"req":"join","channel":"chat","username":"abc"}
		if(Msg.req == 'join'){
			ws.username = Msg.username;
			ws.channel.push(Msg.channel);
		}else if(Msg.req == 'send'){
			//{"req":"send","channel":"chat","msg":"hello"}
			//{"req":"send","channel":"chat","msg":"hello","username":"u1"}
			//ws.send('something ');
			let tmpChannel = null;
			let tmpWS = null;
			let found = false;
			for(let x = 0; x< CLIENT.length;x++){
				tmpWS = CLIENT[x];
				found = false;
				for(let y = 0; y< CLIENT[x].channel.length;y++){
					tmpChannel = CLIENT[x].channel[y];
					if(tmpChannel == Msg.channel){
						found = true;
						break;
					}
				}
				if(found){
					if(ws.uuid != tmpWS.uuid){
						if(Msg.username != null || Msg.username != undefined){
							if(Msg.username == tmpWS.username){
								var dtMsg = {"username":ws.username,"msg":Msg.msg}
							tmpWS.send(JSON.stringify(dtMsg))
							}
						}else{
							var dtMsg = {"username":ws.username,"msg":Msg.msg}
							tmpWS.send(JSON.stringify(dtMsg))
						}
						
					}
					console.log(tmpWS.username)
				}
			}
		}
	}
	console.log(Msg);
  });
  ws.uuid = uuidv4();
  ws.channel = [];
  CLIENT.push(ws);
  console.log(CLIENT.length)
  //ws.send('something ');
});

/*





*/