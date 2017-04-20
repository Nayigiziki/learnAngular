var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 
app.get('/data', function (req, res, next) {
	var data = [{
	    "name": "ruben",
	    "age": 32
	  },
	  {
	    "name": "ruben1",
	    "age": 31
	  }];

  res.json({data: data})

})
 
app.listen(8180, function () {
  console.log('CORS-enabled web server listening on port 80')
})