
const net = require('net');
const users = [];

let server = net.createServer((socket) => {

  socket.setEncoding('utf8');
  // console.log(socket.remotePort);
  server.getConnections(function(count){
    console.log(`${socket.remotePort} connected. There are ${count} users chatting.`);
  });

  users.push(socket);

  socket.on('data', function (data) {
    process.stdout.write(`${socket.remotePort}: ${data}`);
    users.forEach(function(eachUser){
      eachUser.write(`${socket.remotePort}: ${data}`);
    });
  });

  process.stdin.on('data', (cmd)=>{
    users.forEach(function(eachUser){
      eachUser.write(`[admin]: ${cmd}`);
    });
  });

  socket.on('end', ()=>{
    server.getConnections(function(count){
      console.log(`${socket.remotePort} disconnected. There are ${count} users chatting.`);
    });
  });
});

server.listen(6969, '52.39.137.72', ()=>{
  console.log(`opened server on`, server.address());
});