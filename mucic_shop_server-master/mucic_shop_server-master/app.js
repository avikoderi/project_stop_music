const express = require("express");
const path = require("path");
const http = require("http");
const fileUpload = require('express-fileupload');
require("./db/mongoConnect");


const {routesInit,corsAccessControl} = require("./routes/config_routes")

const app = express();

app.use(fileUpload({
  useTempFiles:true
}))

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")))

corsAccessControl(app);
routesInit(app);


const server = http.createServer(app);
let port = process.env.PORT || "3004";
server.listen(port);