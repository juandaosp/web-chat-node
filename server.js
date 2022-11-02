import express from 'express';
import { serverConfig } from "./config.js";
import bodyParser from "body-parser";
import * as http from 'http';
import { Server } from "socket.io";
import mongoose from 'mongoose';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HTTPServer = http.Server(app)
const io = new Server(HTTPServer);

app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const Message = mongoose.model("Message", {
  name: String,
  text: String,
});

console.log(`starting server at port ${serverConfig.port}`);

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    serverConfig.uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (e) => {
      console.log("mongoose connected", e);
    }
  );

} catch (err) {
  console.error("could not connect", err);
}

io.on("connection", (socket) => {
  console.log("socket.io loaded: ", socket.connected);
})

const server = HTTPServer.listen(serverConfig.port, () => {
  console.log(`${serverConfig.appName}: node server started at ${server.address().port}`);
});

app.get("/messages", (_, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
  
});

app.get("/messages/:user", (req, res) => {
  const user = req.params.user;
  Message.find({name: user}, (err, messages) => {
    res.send(messages);
  })
  
});

app.post("/messages", async (req, res) => {
  try {
    const message = req.body;
    if(message && message.name !== "" && message.text !== "") {
      const schema = new Message(message);
      const savedMessage = await schema.save();
      console.log("adding message", message);
      io.emit("message", message);
      res.sendStatus(200);
      return savedMessage;
      
    } else {
      res.sendStatus(500);
      console.error("Error: the message should have name and text");
      return res;
    }
  } catch (error) {
    res.sendStatus(500);
    return console.error(error);
  }
  
  
});
