var port = process.env.PORT || 3000;

var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(port);

// Heroku setting for long polling - assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

const users = {}
io.on('connection',socket =>{
    socket.on('new-user',name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected',name)
    })
    


    socket.on('send-chat-message',message => {
        socket.broadcast.emit('chat-message',{message:message,name: users[socket.id]})
    })

    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })
})



