var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response) {
    response.send('dit is een test');
    response.end();
});

module.exports = router;