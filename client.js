const net = require("net");

const client = net.createConnection(6969, "52.35.253.174", () => {
    console.log("Welcome! You are now chatting!")
    client.on("date", data => {
        console.log(data.toString());
        
    });
    process.stdin.pipe(client);
});

client.on('data', function (receiveData) {
  process.stdout.write(receiveData);
});
