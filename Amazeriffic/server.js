var express = require("express");
ToDosController = require("./client/controllers/todos_controller.js"),
http = require("http");
mongoose = require("mongoose"),
app = express();
var toDos = require('./client/todos.json');
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/amazeriffic');
http.createServer(app).listen(3000);
app.get("/todos", ToDosController.index);
app.post("/todos", ToDosController.create);
