const express = require('express');
const app = express();
const publishMessageRouter = require('./routes/publishMessage');

app.use('/publishMessage', publishMessageRouter);

app.listen(9002, () => {
  console.log('Publish message server is running on port 9002');
});