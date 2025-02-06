import React,{useState,useEffect} from 'react';
import './AllRegister.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col, Table} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function ViewTopics() {

  const[TpoicsList,setTopicslist]=useState([]);

    useEffect(()=>{

       const getTopics=async()=>{
        const res= await fetch("http://localhost:8071/studentTopic",{
          method:"GET",
          headers:{
             "Content-Type":"application/json", 
          }
        }); 
        
        const data=await res.json();
        console.log(data);

        if(res.status===200||data){
          setTopicslist(data);
        }

        else{
          alert(err.message);
        }
      }
        getTopics();

  },[]);

        const deleteTopic=async(_id)=>{
          const res2=await fetch(`http://localhost:8071/studentTopic/delete/${_id}`,{

          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          }
          });

          const deleteData=await res2.json();
          console.log(deleteData);

          if(res2.status==200||deleteData){
            alert("Topic deleted");
          }

          else{
            alert("Error");
          }
        }

        const sendEmail=async(email)=>{
          axios.get(`http://localhost:8071/studentTopic/sendemail/${email}`).then((res)=>{
            if(res.status==200){
            alert("Confirmation Email is sent");
            }
          }).catch((err)=>{
            alert(err.message);
          })
        }

        var viewItems_HTMLTABLE="";

    if(TpoicsList){

        viewItems_HTMLTABLE=
        TpoicsList.map((data)=>{
        return(
          <tr key={data._id}>
          <th className="Tabletd"><h12 className="pfon">{data.GroupId}</h12></th>
          <th className="Tabletd"><h12 className="pfon">{data.GroupDetails}</h12></th>
          <th className="Tabletd"><h12 className="pfon">{data.LeaderEmail}</h12></th>
          <th className="Tabletd"><h12 className="pfon">{data.ResearchTopic}</h12></th>
          <th className="Tabletd"><th className="Tabletd"><button  onClick={()=>deleteTopic(data._id)} className="btnn1">Rejected</button></th>
          <th className="Tabletd"><button onClick={()=>sendEmail(data.LeaderEmail)} className="btnn2">Accept</button></th></th>
          </tr>

        );
      });
    
    }

    else
    viewItems_HTMLTABLE="loading"


return (
 <> 

<div className="base-containers">
<div className="images6">

<div className="card1">

<table className="images3" id="topic">
<thead>
<tr>
  <th className="Tabletd"><h5 className="text-center fw-bold mb-12 mx-1 mx-md-2 mt-1">Group Id</h5></th>
  <th className="Tabletd"><h5 className="text-center fw-bold mb-12 mx-1 mx-md-2 mt-1">Group Details</h5></th>
  <th className="Tabletd"><h5 className="text-center fw-bold mb-12 mx-1 mx-md-2 mt-1">Leader Email</h5></th>
  <th className="Tabletd"><h5 className="text-center fw-bold mb-12 mx-1 mx-md-2 mt-1">Research Topic</h5></th>
  <th className="Tabletd"><th></th></th>

</tr>
</thead>

<tbody>

 {viewItems_HTMLTABLE}

</tbody>

</table>

<ReactHTMLTableToExcel
    className="btnn1"
    table="topic"
    filename="Accepted Research topics details"
    sheet="sheet"
    buttonText="Download as excel sheet" />

  </div>
 
</div>

<div className="lines1"></div>
</div>
 
 </>
    );
  }


export default ViewTopics;