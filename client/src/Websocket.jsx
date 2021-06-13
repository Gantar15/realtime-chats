import React, { useRef, useState } from 'react';

const Websocket = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000');
        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            };
            socket.current.send(JSON.stringify(message));
        };
        socket.current.onmessage = ev => {
            const message = JSON.parse(ev.data);
            setMessages(state => [message, ...state]);
        };
        socket.current.onclose = () => {
            alert('Соединение закрыто -_-');
        };
        socket.current.onerror = () => {
            alert('Ошибка в соединении :(');
        };
    }

    function sendMessage() {
        const messageObj = {
            username,
            message: value,
            id: Date.now(),
            date: Date.now(),
            event: 'message'
        };
        socket.current.send(JSON.stringify(messageObj));
    };


    if(!connected){
        return (
            <div className="center">
                <div className="formLogin">
                    <input 
                        type="text" 
                        value={username} 
                        onInput={ev =>setUsername(ev.target.value)}
                        placeholder="Введите ваше имя" required/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        );
    }

    return (
        <div className="center">
            <div>
                <p className="main-username">
                    Хелоу, <span>{username}</span>
                </p>
                <div className="form">
                    <input 
                        onInput={ev => setValue(ev.target.value)} 
                        type="text" 
                        placeholder="Input your message"/>
                    <button onClick={sendMessage}>send</button>
                </div>
                <div className="messages">
                    {
                        messages.map(mess => (
                            <div key={mess.id}>
                                {
                                    mess.event === 'connection' 
                                        ? <div className="connection-msg-box">Пользователь <span>{mess.username}</span> залетел</div> 
                                        : (<div className="msg-box">
                                            <div className="name-block">
                                                <span className="username">{mess.username}</span>&bull;
                                                <span className="date">{
                                                 new Date(mess.date).toLocaleString("ru", { year: 'numeric', month: 'long', day: 'numeric' })
                                                }</span>
                                            </div>
                                            <p>{mess.message}</p>
                                          </div>)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Websocket;