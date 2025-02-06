import React from 'react';
import './SupOperations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col, Table} from 'react-bootstrap';
import LiChat from '../ResearchTools/LiChat.png';

function LiveChats() {

return (
 <> 

<div id="Chats-Lives" className="chats-Lives">
<a className="Chatmeta-btn text-white" href='/SupChatHandle'><img width="400" src={LiChat} /></a>
</div>
 </>
    );
  }


export default LiveChats;