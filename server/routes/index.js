var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response) {
    response.render('/client/index.html');
    //response.end();
});

module.exports = router;
