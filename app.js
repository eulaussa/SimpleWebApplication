const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const router = new express.Router()

const app = express()
app.use(bodyParser.text())
const port = process.env.PORT || 1234
var storage = []

//checks if the hash value is in the array or not
app.get('/messages/:hash', (req, res) => {
	for (var i = 0; i<storage.length; i++){
		if(storage[i].substring(storage[i].lastIndexOf(",")+1) == req.params.hash){
			console.log(storage[i].substring(0,storage[i].lastIndexOf(",")))
			res.send(storage[i].substring(0,storage[i].lastIndexOf(",")))
			break
		}
	}	
	console.log("hash not found, throw 404")
	res.status(404).end('Error 404')
})

//welcome page
app.get('/', (req,res)=>{
	res.send('<html><head><title>Index</title></head><body>'+
	'<b>Welcome!</b> <a href="/messages">Click to send message</a> '+'</body></body></html>')
}).post('/', (req,res)=>{ res.status(404).end('404') })
app.use(bodyParser.urlencoded({extended:true}))
    .use('/messages', router)
//router to get the message, if it's not added previously, add it to the array
router.get('', (req,res)=>{
	res.send('<html><head><title>Send message</title></head><body>'+
	'<h2>Enter message: </h2>'+	'<form action="/messages" method="POST">'+ 	'<input placeholder="enter a message here" name="message">'+
	'<button type="submit">Submit</button>'+ 	'</form></body></body></html>')
}).post('', (req,res)=>{
	var input = req.body.message
	console.log(input)
	hash = crypto.createHash('sha256').update(input).digest('hex')
	var entry = input + "," + hash
	if (!storage.includes(entry)){
		storage.push(entry)
		console.log(hash)
		res.send('Success')
	}
	else{
		console.log('Existing message')
		res.send('Message already added')
	}
});

app.listen(port, () => console.log('Listening on ' + port + '!'))
