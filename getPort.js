
//Select Serial Port -> Open Serial Connection -> onData return save to buffer ->export flush buffer

var serialport = require("serialport");
var buffer = [];
var availablePorts = [];


var Connection = function(){

    //initalize Port List
    serialport.list(function(err, ports){availablePorts = ports;});

  this.openConnection = function(selectedPort, baudRate){ //setup serial connection

    var SerialPort = serialport.SerialPort; // localize object constructor
    var sp = new SerialPort(availablePorts[selectedPort].comName, {
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
}

  exports.init = function(){Connection();}
  exports.setupConnection = function(path, rate){openConnection(path, rate);}
  exports.getData = function() {
    var tmp = buffer;
    buffer = [];
    return tmp;
  }
  exports.getPorts = function(){
    Connection();
    return availablePorts;}
