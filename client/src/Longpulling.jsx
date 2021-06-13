import React, { useEffect, useState } from 'react';

const Longpulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const subscribe = async () => {
        try{
            const resp = await fetch('http://localhost:5000/get-messages');
            const message = await resp.json();
            setMessages(state => [...state, message]);
            subscribe();
        } catch(err){
            setTimeout(() => {
                subscribe()
            }, 500);
        }
    };

    useEffect(() => {
        subscribe();
    }, []);

    const sendMessage = async () => {
        const resp = await fetch('http://localhost:5000/new-messages', {
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

export default Longpulling;