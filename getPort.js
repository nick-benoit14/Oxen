
//Select Serial Port -> Open Serial Connection -> onData return save to buffer ->export flush buffer

var serialport = require("serialport");
var buffer = [];
var availablePorts = [];




var Connection = function(){

  this.selectPort = function(){

    serialport.list(function(err, ports){
      availablePorts = ports;
    });

    this.openConnection("/dev/ttyACM0", 9600);
  } //->Open Port

  this.openConnection = function(portPath, baudRate){ //setup serial connection

    var SerialPort = serialport.SerialPort; // localize object constructor
    var sp = new SerialPort(portPath, {
      baudrate: baudRate,
      parser: serialport.parsers.readline("\n")
      },
      function(err){if(err)console.log(err);});

    sp.open(function (error) {

      if(error){console.log('failed to open: '+error);} // No data for you
      else{
        console.log('open');
        sp.on('data', function(data) { //on data received save it in buffer
          buffer.push(parseFloat(data)); //Do things with the data
        });
      }
    });
  }
  this.selectPort();
}

//module.exports = Connection;


  exports.setupConnection = function(){Connection();}
  exports.getData = function() {
    var tmp = buffer;
    buffer = [];
    return tmp;
  }
  exports.getPorts = function(){return availablePorts}
