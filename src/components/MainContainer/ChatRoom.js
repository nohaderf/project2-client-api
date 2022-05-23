import React, { useState, useRef, useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import Moment from 'react-moment';
import './ChatRoom.css';

var stompClient = null;
function ChatRoom({ closeModal, userInfo, token }) {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: "",
        receiverName: "",
        connected: false,
        message: ""
    });
    const username = userInfo.username;

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth"})
        console.log(userData.message)
    }, [userData.message]);


    const handleKeypress = (e) => {
      if (e.key === 'Enter') {
        connect();
      }
    };

    const connect = (e) => {
        e.preventDefault();
        setUserData({...userData, "username": username});
        let sock = new SockJS('http://localhost:9090/ws');
        stompClient = over(sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true});
        stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
        stompClient.subscribe("/user/"+userData.username+'/private', onPrivateMessageReceived);
        userJoin();
    }

    const userJoin=()=>{
        var chatMessage = {
          senderName: userData.username,
          status:"JOIN"
        };
        stompClient.send("/chat/message", {}, JSON.stringify(chatMessage));
  }

    const onError = (err) => {
        console.log(err);
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
            switch(payloadData.status) {
                case "JOIN":
                    if (!privateChats.get(payloadData.senderName)) {
                        privateChats.set(payloadData.senderName, []);
                        setPrivateChats(new Map(privateChats));
                    }
                    break;
                case "MESSAGE":
                    publicChats.push(payloadData);
                    setPublicChats([...publicChats]);
                    break;
            }
    }

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats))
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            sendPublicMessage();
        }
    }

    const sendPublicMessage = () => {
        if (stompClient) {
            var chatMessage = {
              senderName: userData.username,
              message: userData.message,
              dateTime: new Date(),
              status:"MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/chat/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const handlePrivateEnterKey = (e) => {
        if (e.key === 'Enter') {
            sendPrivateMessage();
        }
    }

    const sendPrivateMessage = () => {
        if (stompClient) {
            let chatMessage={
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                dateTime: new Date(),
                status: "MESSAGE"
            };
            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/chat/private-message', {}, JSON.stringify(chatMessage));
            setUserData({...userData, "message":""})
        }
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    // const handleUsername = () = {
    //     setUserData({...userData, "username": username})
    // }

    return (
        <div className="chat-room-container">
            <div className="chat-room-div">

                <span className="close-btn" onClick={closeModal}>&times;</span>

                { userData.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={ () => {setTab("CHATROOM")}} className={`member ${tab === "CHATROOM" && "active"}`}>General Chatroom</li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={ () => {setTab(name)}} className={`member ${tab === name && "active"}`} key={index}>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {tab === "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {}
                        {publicChats.map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                <div>
                                    <div className="message-data">{chat.message}</div>
                                    <small><Moment fromNow>{chat.dateTime}</Moment></small>
                                </div>
                                {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                            </li>
                        ))}
                        </ul>

                        <div className="send-message">
                        
                            <input 
                                type="text" 
                                className="input-message" 
                                placeholder="enter message (will be seen by everyone)" 
                                value={userData.message} 
                                onChange={handleMessage}
                                onKeyPress={handleEnterKey}
                            />
                            <button type="button" className="send-btn" onClick={sendPublicMessage}>send</button>
                            <i className="fa-solid fa-paperclip-vertical"></i>
                        </div>      
                    </div> }
                    
                    { tab !== "CHATROOM" && <div className="chat-content">
                    { tab === userData.username && 
                        <div className="chat-content">
                            <div className="note-pad-div">
                                <h2>Notice</h2>
                                <ul className="note-div">
                                    <li>Thank you for choosing Health Club!</li>
                                    <li>A health care provider will be with your shortly.</li>
                                    <li>You may leave any general questions for the support team in the 'General Chatroom'.</li>
                                </ul>
                            </div>
                        </div>
                    }
                        <ul className="chat-messages">
                        {[...privateChats.get(tab)].map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && 
                                    <div className="avatar">{chat.senderName}</div>
                                }
                                <div>
                                    <div className="message-data">{chat.message}</div>
                                    <small><Moment fromNow>{chat.dateTime}</Moment></small>
                                </div>
                                
                                {chat.senderName === userData.username && 
                                    <div className="avatar self">{chat.senderName}</div>
                                }
                            </li>
                        ))}
                        </ul>
                        <div className="send-message">
                            <input 
                                type="text" 
                                className="input-message" 
                                placeholder="enter private message"
                                value={userData.message} 
                                onChange={handleMessage}
                                onKeyPress={handlePrivateEnterKey}
                            />
                            <button type="button" className="send-btn" onClick={sendPrivateMessage}>send</button>
                        </div>      
                    </div> }
                </div>
                :
                <div className="register"> 
                    <form onSubmit={connect}>
                        {/* <input
                            id= "user-name"
                            className="username-input"
                            type="text"
                            name="username"
                            placeholder= "Enter username"
                            value={userData.username}
                            onChange={handleUsername}
                            onKeyPress={handleKeypress}
                            required
                        /> */}
                        <button type="submit">Connect</button>
                    </form>
                </div>
            }
            </div>
        </div>
    )
}

export default ChatRoom;