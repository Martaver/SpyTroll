//var io = require('socket.io');

var io = require("socket.io")(server);

io.on( 'connection', function() 
    { console.log("Socket connect") 
}); 