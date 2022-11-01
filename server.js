const express = require('express');
const app = express();
const _appName = "web-chat";
const _port = 3000;
console.log('starting at port', _port);

app.use(express.static(__dirname))
app.listen(3000, () => {
  console.log(`${_appName} node server started at ${_port}`);
});
