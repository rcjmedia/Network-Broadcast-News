const net =require('net');
const users = [];


let server = net.createServer((socket) => {

  socket.setEncoding('utf8');
  console.log(socket.remotePort);
  server.getConnections(function(err, count){
  console.log(`${socket.remotePort} connected. There are ${count} users.`);
  });

    users.push(socket);

    socket.on('data', function (data) {
        process.stdout.write(`${socket.remotePort}: ${data}`);
        users.forEach(function(eachUser){
          eachUser.write(`${socket.remotePort}: ${data}`);
        });
      });

  //admin chat entrees
  process.stdin.on('data', (cmd)=>{
    users.forEach(function(eachUser){
      eachUser.write(`[admin]: ${cmd}`);
    });
  });
      
});

server.listen(6969, 'localhost', ()=>{
    console.log(`opened server on`, server.address());
});
