var express = require('express')
var app = express()
var path = require('path')
var morgan = require('morgan')

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '\\..\\src\\')));
app.use('/vendor', express.static(path.join(__dirname, '\\..\\vendor\\')));

app.listen(8080, function() {
	console.log('listening on port 8080...');
})
