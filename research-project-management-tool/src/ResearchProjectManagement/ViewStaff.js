import React,{useState,useEffect} from 'react';
import './ViewStaff.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col} from 'react-bootstrap';
import {useHistory} from "react-router";
import { useParams } from 'react-router-dom';
import Su3 from '../ResearchTools/Su3.jpg';
import { Route} from "react-router-dom";
import {ResearchFaculty,Header} from "../ResearchProjectManagement"

function ViewStaff() {

    const {id}=useParams("");

    const [StaffList,setStafflist]=useState([]);

    var array;
    var res;
    var res1;

    const history=useHistory();

    useEffect(()=>{

      const getStaff=async()=>{
        const res= await fetch(`http://localhost:8071/staffRegister/get/staffMember/${id}`,{
          method:"GET",
          headers:{
             "Content-Type":"application/json", 
          }
        }); 
        
        const data=await res.json();
        console.log(data);

        if(res.status===200||data){
          setStafflist(data);
        }

        else{
          alert(err.message);
        }
      }
      getStaff();

       },[]);

       const deleteStaff=async(_id)=>{
        const res2=await fetch(`http://localhost:8071/staffRegister/delete/${_id}`,{
  
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
        });
  
        const deleteData=await res2.json();
        console.log(deleteData);
  
        if(res2.status===500||!deleteData){
          console.log("error");
        }
  
        else{
          alert("Account deleted");
          history.push("/");
          return <Redirect to='/'/>
        }
      }


       var viewItems_HTMLTABLE="";

       if (!Array.isArray(StaffList)) {

      array=Object.entries(StaffList);
      res=Object.values(array);
      res1=Object.values(res[1]);
      console.log(res1[1]);

      viewItems_HTMLTABLE=
        res1.map((data)=>{

          if (typeof(data.imageFiles) !== 'undefined') {

        return(

          <div key={data._id} className="padding">
          <div className="col-md-20">
              <div className="card"> <img className="card-img-top" src={Su3}/>
                  <div className="card-body little-profile text-center">
                      <div className="pro-img"><img src={require(`../Photos/${data.imageFiles}`).default}/></div>
                      <h3 className="m-b-0">{data.staffFirstName}&emsp;{data.staffLastName}</h3>
                      <p className="text-center h12 fw-bold mb-3 mx-1 mx-md-3 mt-6">{data.staffPosition}</p> 
                      <div className="row text-center m-t-20" id="dates2">
                      <div className="col-lg-4 col-md-4 m-t-20">
                        <p className="text-center h5 fw-bold mb-3 mx-1 mx-md-3 mt-6">Staff Id-</p>
                        <p className="text-center h5 fw-bold mb-3 mx-1 mx-md-3 mt-6">Faculty-</p>
                        <p className="text-center h5 fw-bold mb-3 mx-1 mx-md-3 mt-6">Email-</p>
                        <p className="text-center h5 fw-bold mb-3 mx-1 mx-md-3 mt-6">UserName-</p>
                    </div>
                    <div class="col-lg-4 col-md-4 m-t-20">
                        <p className="text-center h5 fw mb-3 mx-1 mx-md-3 mt-6">{data.staffId}</p>
                        <p className="text-center h5 fw mb-3 mx-1 mx-md-3 mt-6">Faculty of Computing</p>
                        <p className="text-center h5 fw mb-3 mx-1 mx-md-3 mt-6">{data.staffEmail}</p>
                        <p className="text-center h5 fw mb-3 mx-1 mx-md-3 mt-6">{data.staffEmail}</p>
                    </div>
                    <div>
                        <a href={`/EditStaff/${data._id}`}><button className="btnn1">Edit</button></a>
                        <button className="btnn2" onClick={()=>deleteStaff(data._id)}>Delete</button>
                    </div>
                      </div>
                  </div>
              </div>
          </div>
          <div>
            <a href={`/SupOperations/${data.staffPosition}/${'Faculty of Computing'}`}><button className="btnn1">Directly redirect to Faculty of Computing &#9658;</button></a>
          </div>
            <Route path={`/ResearchFaculty/${data.staffPosition}`} exact component={() => <ResearchFaculty />} />
            <Route path={`/Header/${data.staffPosition}`} exact component={() => <Header />} />
      </div>

        );
       }
         
      });

    }

    else
    viewItems_HTMLTABLE="loading"

    
    
return (
 <>

<div className="images9">

{viewItems_HTMLTABLE}

</div>

<div className="lines1"></div>
 </>
 );
    
}

export default ViewStaff;