const ws = require('ws');

const PORT = 5000;
const wss = new ws.Server({
    port: PORT
}, () => console.log(`WS server was starten on ${PORT} port`));

wss.on('connection', ws => {
    ws.on('message', message => {
        message = JSON.parse(message);

        switch(message.event){
            case 'message':
                shareMessage(message);
                break;
            case 'connection':
                shareMessage(message);
                break;
        }
    });
});

function shareMessage(message){
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}