var express = require('express');
var router = express.Router();
const mqtt = require('mqtt');
const { v4: uuidv4 } = require('uuid');

router.post('/', function(req, res, next) {
  const client = mqtt.connect('mqtt://localhost:1883');

  const onPublish = () => {
    console.log('Message published');
    res.send('Message published');
  };

  client.on('connect', () => {
    console.log('Connected to MQTT broker');

    const message = req.body; // Используйте данные, полученные с клиента
    const payload = JSON.stringify(message);
    client.publish('paper_wifi/test/', payload, onPublish);

    client.end();
  });

  client.on('error', (error) => {
    console.error('Error:', error);
    res.status(500).send('Error publishing message');
  });
});

module.exports = router;