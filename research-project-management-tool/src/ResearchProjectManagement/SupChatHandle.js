import React,{useState,useEffect} from 'react';
import './SupChatHandle.css';
import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col, Table} from 'react-bootstrap';
import LiChat from '../ResearchTools/LiChat.png';
import SupHChat from './SupHChat';

const socket=io.connect("http://localhost:8071");

function SupChatHandle() {

  const [userName,setUserName]=useState("");
  const [room,setRoom]=useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat=()=>{
      if(userName!=="" && room!==""){

        socket.emit("join_room",room);
        setShowChat(true);
      }
  }

return (
 <> 

<div className="sup">
{!showChat ? (  
<div className="joinChatContainer">

<div className="Live-Chat">
  <img src={LiChat} />
 </div> 

<center><h4>Join the chat</h4></center>
<input type="text" placeholder="User Name" onChange={(event)=>{setUserName(event.target.value)}}/>
<input type="text" placeholder="Room Id" onChange={(event)=>{setRoom(event.target.value)}}/>

<center><button onClick={joinChat}>Join a Chat</button></center>

</div>

) : (

<SupHChat socket={socket} userName={userName} room={room}/>

)}

</div> 
 </>
    );
  }


export default SupChatHandle;