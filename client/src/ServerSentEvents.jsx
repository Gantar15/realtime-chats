import React, { useEffect, useState } from 'react';

const ServerSentEvents = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/connect');
        eventSource.onmessage = ev => {
            setMessages(state => [...state, JSON.parse(ev.data)]);
        };
    };

    useEffect(() => {
        subscribe();
    }, []);

    const sendMessage = async () => {
        await fetch('http://localhost:5000/new-messages', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: value,
                id: Date.now()
            })
        });
    };

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input onInput={ev => setValue(ev.target.value)} type="text" placeholder="Input your message"/>
                    <button onClick={sendMessage}>send</button>
                </div>
                <div className="messages">
                    {
                        messages.map(mess => (
                            <div className="message" key={mess.id}>
                                {mess.message}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ServerSentEvents;