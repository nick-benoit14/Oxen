
//Select Serial Port -> Open Serial Connection -> onData return save to buffer ->export flush buffer

var serialport = require("serialport");




var Connection = function(){

  this.selectPort = function(){} //->Open Port

  this.openConnection = function(portPath, baudRate){ //setup serial connection

    var SerialPort = serialport.SerialPort; // localize object constructor
    var sp = new SerialPort(portPath, {
      baudrate: baudRate,
      parser: serialport.parsers.readline("\n")
    });

    sp.open(function (error) {
      if(error){console.log('failed to open: '+error);} // No data for you
      else{
        console.log('open');
        sp.on('data', function(data) {
          //Do things with the data
        });
      }
    });
    console.log("Opened Connection");
  }

  this.openConnection("/dafsd/", 5600);


}

module.exports = Connection;
