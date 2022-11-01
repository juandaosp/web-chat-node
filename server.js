const express = require("express");
const app = express();
const appConfig = require("./serverConfig");
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log(`starting server at port ${appConfig.getPort()}`);

const messages = [
  {name:"Jhon", text: "hi"},
  {name:"Doe", text: "Hello"}
];

app.get("/messages", (_, res) => {
  res.send(messages);
})

app.post("/messages", (req, res) => {
  const message = req.body;
  if(message && message.name !== "" && message.text !== "") {
    console.log("adding message", message);
    messages.push(message);
    io.emit("message", message);
    res.sendStatus(200);
  } else {
    console.error("Error: the message should have name and message", res);
  }
  
})

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.connected);
})

const server = http.listen(appConfig.getPort(), () => {
  console.log(`${appConfig.getAppName()}: node server started at ${server.address().port}`);
});
