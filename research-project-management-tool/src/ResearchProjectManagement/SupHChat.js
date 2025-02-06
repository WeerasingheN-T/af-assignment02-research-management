import React,{useState,useEffect} from 'react';
import './SupChatHandle.css';
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col, Table} from 'react-bootstrap';

const socket=io.connect("http://localhost:8071");

socket.on('connect', function(sock) 
{
   console.log('Connected!');
});

function SupHChat({socket,userName,room}) {

  const [currentChat, setCurrentChat] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendChat = async () => {
    if (currentChat !== "") {
      const chatData = {
        room: room,
        author: userName,
        message:currentChat,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", chatData);
      setMessageList((list) => [...list, chatData]);
      setCurrentChat("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

return (
 <> 

<div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div className="message" id={userName === messageContent.author ? "you" : "other"}>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input type="text" className="inp" value={currentChat} placeholder="Type" onChange={(event) => {setCurrentChat(event.target.value);}}
          onKeyPress={(event) => {
            event.key === "Enter" && sendChat();}}/>
            
        <button onClick={sendChat}>&#9658;</button>
      </div>
    </div>
  

 </>
    );
  }


export default SupHChat;