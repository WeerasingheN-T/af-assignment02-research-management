import React,{useState} from 'react';
import './HLogin.css';
import axios from 'axios';
import {useHistory,Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import researchTool6 from "../ResearchTools/researchTool6.jpg";

function HLogin({setLoginStaff}) {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [StaffList,setStafflist]=useState([]);

    const history = useHistory();

    var array;
    var res3;
    var res1;
    
        const login=async(e)=>{

          e.preventDefault();
          const res= await fetch("http://localhost:8071/staffRegister/login",{
            method:"POST",
            headers:{
               "Content-Type":"application/json", 
            }
          }); 
          
          const data=await res.json();
          console.log(data);
  
          if(res.status===200||data){
            alert("Login succes");
            setLoginStaff(data.user);

            const res4= await fetch(`http://localhost:8071/staffRegister/get/${email}`,{
            method:"GET",
            headers:{
               "Content-Type":"application/json", 
            }
          }); 

          const data1=await res4.json();
          console.log(data1);

          if(res4.status===200||data1){

            setStafflist(data1);

               
           array=Object.entries(data1);
           res3=Object.values(array);
           res1=Object.values(res3[1]);
           console.log(res1[1]);
           res1.map((data)=>{
                history.push(`/ViewStaff/${data._id}`);
                return <Redirect to={`/ViewStaff/${data._id}`} /> 
               })
          }

          else{
            alert(err.message);
          }
          }
        else{
          alert(err.message);
        }
      }


return (
 <>
<div className="base-container">
    
    <div className="containerblock4">
    <div className="header">LOGIN</div>    
    <div className="image">
        <img src={researchTool6} />
    </div>    
    <form onSubmit={login}>    
    
    <div className="content">
    
    <div className="form">
        <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="text" placeholder="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className="lefcontent">fogotton password?</div>
    </div>
   </div> 
   <div className="footer">
       <button type="submit" className="btnn">
           Login
       </button>
   </div>
   </form>
  </div>

  <div className="lines"></div>

</div>
 </>
    );
  }


export default HLogin;