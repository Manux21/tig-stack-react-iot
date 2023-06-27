var express = require('express');
var router = express.Router();

router.get('/',function(request, response, next){
  response.send({
    "humidity": 21,
    "temperature": 21,
    "battery_voltage_mv": 1000
  });
})

module.exports = router;


