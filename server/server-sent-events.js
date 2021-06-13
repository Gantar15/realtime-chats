const express = require('express');
const events = require('events');
const cors = require('cors'); 

const PORT = 5000;
const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/connect', (req, resp) => {
    resp.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    });
    emitter.on('newMessage', message => {
        resp.write(`data: ${JSON.stringify(message)} \n\n`);
    });
});

app.post('/new-messages', (req, resp) => {
    const message = req.body;
    emitter.emit('newMessage', message);
    resp.status(200);
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});