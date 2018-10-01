var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 
var modelo = require("server/modelo.js");

var juego = new Juego();

app.get("/",function(request,response){
	response.send("hola");
});


console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);