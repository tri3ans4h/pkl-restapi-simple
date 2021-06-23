let stringSimilarity = require("string-similarity");
let KEYWORDS = ['selamat ultah','hbd','happy birthday','selamat ultah yaa'];
let MSG_IN = 'ultah yaa';
let similarity = 0;
let SIM_ARRAY = [];

//console.log(similarity)
const venom = require('venom-bot');

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

//let KEYWORDS = ['selamat ultah','hbd','happy birthday'];
function start(client) {
  client.onMessage((message) => {
	  MSG_IN = message.body;
	 SIM_ARRAY = [];
	 let r =  Analisis(message);
	 if(r == 1){
		  client
        .sendText(message.from, 'Terima Kasih')
        .then((result) => {
          //console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
	 }
	/*  
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
	*/
	
  });
}

function Analisis(msg){
	for(let x=0;x < KEYWORDS.length;x++){
		similarity = stringSimilarity.compareTwoStrings(MSG_IN, KEYWORDS[x]);
		SIM_ARRAY.push(similarity);
	}
	let NMAX = null;
	let IMAX = null;
	for(let x=0;x < SIM_ARRAY.length;x++){
		if(NMAX == null){
			NMAX = SIM_ARRAY[x]
			IMAX = x
		}else{
				if(NMAX <= SIM_ARRAY[x]){
					NMAX = SIM_ARRAY[x]
					IMAX = x
				}
		}
	}
	//console.log(KEYWORDS[IMAX],' ',NMAX);
	if(NMAX > 0.7){ //threshold
	
	console.log(msg.from,' ',msg.body,' result',' Balas Pesan');
	return 1;
	}else{
			console.log(msg.from,' ',msg.body,' result',' Abaikan Pesan');
	return 0;
	}
	
}