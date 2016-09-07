var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '81e32a4cc260b79a714c23f4f3e7b1a833332e2f'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' , {"url" : ' ' , "data" : ' '});
});

router.get('/hello', function(req, res, next) {
    var parameters = {
  "text": 'this is bad'
};

alchemy_language.sentiment(parameters, function (err, response) {
     var docs = JSON.stringify(response, null, 2); 
  if (err)
    console.log('error:', err);
  else
    console.log(response);
    res.render('user', {
            "userlist" : response,
            "title" : "express"
        });
 });
});
router.post('/analize', function(req, res, next) {
	
		var parameters = {};
		
		  parameters = {
			 url: req.body.url ,
			 knowledgeGraph: 1
		  };
		  alchemy_language.concepts(parameters, function (error, response) {
			if (error)
			  console.log('error:', error);
			else
			  console.log(JSON.stringify(response, null, 2));
			   res.render('index',{"url" : req.body.url , "data" : response });
		  });
 
});

module.exports = router;
