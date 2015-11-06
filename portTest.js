var Connection = require("./getPort.js");
Connection.setupConnection();

setInterval(function(){console.log(Connection.getData());}, 1000);
