import React, { useState,useEffect } from 'react';
import './AllRegister.css';
import axios from 'axios';
import {useHistory,Redirect} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import researchTool6 from "../ResearchTools/researchTool6.jpg";

const EditStaff=()=> {

    const {id}=useParams("");

    const [EditStaff,setEditStaff]=useState({
      staffFirstName:'',
      staffLastName:'',
      staffId:'',
      staffPosition:'',
      staffEmail:''
  });
  
  const histoy=useHistory();
  
  const setStaff=(e)=>{
    console.log(e.target.value);
    const {name,value}=e.target;
    setEditStaff((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }
  
  const getMembers=async()=>{
  
    const res=await fetch(`http://localhost:8071/staffRegister/get/staffMember/${id}`,{
      method:"GET",
      headers:{
      "Content-Type":"application/json", 
      }
    });
  
    const data=await res.json();
    console.log(data);
  
    if(res.status===500||!data){
      console.log("error");
    }
  
    else{
      const arr=Object.entries(data);
      const res=Object.values(arr);
      const res1=Object.values(res[1]);
      setEditStaff(res1[1]);
      console.log(res1[1]);
    }
  
  }
  
  useEffect(()=>{
  
    getMembers();
  },[]);
  
  const editStaff=async(e)=>{
    e.preventDefault();
  
    const {_id,staffFirstName,staffLastName,staffId,staffPosition,staffEmail}=EditStaff;
  
    const res2=await fetch(`http://localhost:8071/staffRegister/update/${_id}`,{
  
      method:"PUT",
      headers:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify({
          staffFirstName,staffLastName,staffId,staffPosition,staffEmail
      })
    });
  
    const data2=await res2.json();
    console.log(data2);
  
    if(res2.status===200||data2){
      alert("Staff member is updated");
      histoy.push(`/ViewStaff/${id}`);
      return <Redirect to={`/ViewStaff/${id}`}/>
    }
  
    else{
      alert("Error with update");
    }
  }
  
return (
 <>

<div className="base-container">
  
  <div className="image1">
  <img src={researchTool6} />
  </div>
 <div className="containerblock">
<form onSubmit={editStaff}>
 <h3>Edit Staff Member</h3>

  <div className="lines"> </div>

<Row>
<Col>
<div className="form-group">
 <label>Id</label>
 <input type="text" name="_id" className="form-control" id="_id" placeholder="Id" value={EditStaff._id} required/>
 </div>
</Col>
  <Col>
<div className="form-group">
 <label>First name</label>
 <input type="text" name="staffFirstName" className="form-control" id="staffFirstName" placeholder="First name" value={EditStaff.staffFirstName} onChange={setStaff} required/>
 </div>
</Col>
</Row>

<Row>
<Col>
<div className="form-group">
 <label>Last name</label>
 <input type="text" name="staffLastName" className="form-control" id="staffLastName" placeholder="Last name" value={EditStaff.staffLastName} onChange={setStaff} required/>
 </div>
 </Col>
  <Col>
<div className="form-group">
 <label>Staff Id</label>
 <input type="text" name="staffId" className="form-control" id=" staffId" placeholder="Staff id" value={EditStaff.staffId} onChange={setStaff} required/>
</div>
</Col>

</Row>

<Row>
  <Col>
<div className="form-group">
 <label>Position</label>
 <select className="select" name="staffPosition" id="staffPosition" value={EditStaff.staffPosition} required>
   <option value=""></option>
   <option value="Supervisor">Supervisor</option>
   <option value="Co-supervisor">Co-supervisor</option>
   <option value="Panel Member">Panel Member</option>
   <option value="Other Staff">Other Staff</option>
 </select>
</div>
</Col>
<Col>
<div className="form-group">
 <label>Email</label>
 <input type="email" name="staffEmail" className="form-control" id="staffEmail" placeholder="Email"  pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={EditStaff.staffEmail} onChange={setStaff} required/>
</div>
</Col>

</Row>

<Row>
  
<div>
 <input type="checkbox" className="ck-control"/>I agree to Terms and Conditions of this Research Projects
</div>

</Row>

 <div className="footer">
  <button type="submit" className="btn btn-dark btn-lg btn-block">Edit</button>
 </div>

 <br/>

</form>
</div>
<div className="lines"> </div>
</div>

 </>
    );
  }


export default EditStaff;