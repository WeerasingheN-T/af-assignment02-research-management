import React,{useState,useEffect} from 'react';
import './AllRegister.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col, Table} from 'react-bootstrap';
import Su1 from '../ResearchTools/Su1.jpg';
import { useParams } from 'react-router-dom';

function ResearchFaculty() {

  const {staffPosition}=useParams("");
  const [staffLogin,setLoginStaff] = useState({});

  if(`${staffPosition}`==='Co-supervisor'||'Supervisor'){

return (
 <> 

<div className="images"><img src={Su1}/>
  </div>

<div className="images8">
<div className="images6">

<a href={`/SupOperations/${staffPosition}/${'Faculty of Computing'}`}><button className="facbttn">Faculty of Computing</button></a>

<a href={`/SupOperations/${'Faculty of Engineering'}`}><button className="facbttn">Faculty of Engineering</button></a>

 <a href={`/SupOperations/${'Faculty of Business'}`}><button className="facbttn">Faculty of Business</button></a>
 
 <a href={`/SupOperations/${'Faculty of Humanity'}`}><button className="facbttn">Faculty of Humanity</button></a>
  </div>

  </div>
 
 </>
    );
}

else{
  return <Route path="/HLogin"><HLogin setLoginStaff={setLoginStaff}/></Route> 
}
  }


export default ResearchFaculty;