import React, { useState } from 'react';
import './AllRegister.css';
import axios from 'axios';
import {useHistory,Redirect} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col} from 'react-bootstrap';
import researchTool6 from "../ResearchTools/researchTool6.jpg";

const AllRegister=()=> {

  const [newStaff,setNewStaff]=useState(
    {
  staffFirstName:'',
  staffLastName:'',
  staffId:'',
  imageFiles:'',
  staffPosition:'',
  staffEmail:'',
  staffPassword:'',
  ConfirmPassword:'',
    }
  );

  const history=useHistory();


  const parseData=(e)=>{

    if(newStaff.staffPassword!=newStaff.ConfirmPassword){
    alert("Password and confirm password are not match")
  }

  else{
    e.preventDefault();
    const data =new FormData();
    data.append('staffFirstName',newStaff.staffFirstName);
    data.append('staffLastName',newStaff.staffLastName);
    data.append('staffId',newStaff.staffId);
    data.append('imageFiles',newStaff.imageFiles);
    data.append('staffPosition',newStaff.staffPosition);
    data.append('staffEmail',newStaff.staffEmail);
    data.append('staffPassword',newStaff.staffPassword);

    axios.post("http://localhost:8071/staffRegister/add", data).then(()=>{

      alert("Staff Member is added");
      history.push('/HLogin');
      <Redirect to={'/HLogin'} /> 
      }).catch((err)=>{
        alert(err);
      })
    }
  }

    const handleChange = (e) => {
      setNewStaff({...newStaff, [e.target.name]: e.target.value});
   }

  const handlePhoto = (e) => {
      setNewStaff({...newStaff, imageFiles: e.target.files[0]});
   } 

return (
 <>

<div className="base-container">
  
  <div className="image1">
  <img src={researchTool6} />
  </div>
 <div className="containerblock">
<form onSubmit={parseData}>
 <h3>Register for Research Projects Staff Members</h3>

<Row>
  <Col>
<div className="form-group">
 <label>First name</label>
 <input type="text" name="staffFirstName" className="form-control" id="staffFirstName" placeholder="First name" value={newStaff.staffFirstName} onChange={handleChange} required/>
 </div>
</Col>
<Col>
<div className="form-group">
 <label>Last name</label>
 <input type="text" name="staffLastName" className="form-control" id="staffLastName" placeholder="Last name" value={newStaff.staffLastName} onChange={handleChange} required/>
 </div>
 </Col>
</Row>

<Row>
  <Col>
<div className="form-group">
 <label>Staff Id</label>
 <input type="text" name="staffId" className="form-control" id=" staffId" placeholder="Staff id" value={newStaff.staffId} onChange={handleChange} required/>
</div>
</Col>
<Col>
<div className="form-group">
 <label>Profile Photo </label>
 <input type="file" name="imageFiles" className="form-control" id="imageFiles" placeholder="Profile Photo" onChange={handlePhoto} required/>
</div>
</Col>

</Row>

<Row>
  <Col>
<div className="form-group">
 <label>Position</label>
 <select className="select" name="staffPosition" id="staffPosition" value={newStaff.staffPosition} onChange={handleChange} required>
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
 <input type="email" name="staffEmail" className="form-control" id="staffEmail" placeholder="Email"  pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={newStaff.staffEmail} onChange={handleChange} required/>
</div>
</Col>

</Row>

<Row>
<Col>
<div className="form-group">
 <label>Password</label>
 <input type="password" name="staffPassword" className="form-control" id="staffPassword" placeholder="Password" value={newStaff.staffPassword} onChange={handleChange} required/>
</div>
</Col>
 <Col>
<div className="form-group">
 <label>Confirm Password</label>
 <input type="password" name="ConfirmPassword" className="form-control" id="ConfirmPassword" placeholder="Confirm password" value={newStaff.ConfirmPassword} onChange={handleChange} required/>
</div>
</Col>
</Row>

<Row>
  
<div>
 <input type="checkbox" className="ck-control"/>I agree to Terms and Conditions of this Research Projects
</div>

</Row>

<div className="footer">
<button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
    <p className="forgot-password text-right">
    Already registered <a href="/HLogin">log in?</a>
    </p>
    </div>
</form>
</div>
<div className="lines"> </div>
</div>

 </>
    );
  }


export default AllRegister;