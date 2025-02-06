import React,{useState,useEffect} from 'react';
import './AllRegister.css'
import axios from 'axios';
import { Document,Page } from 'react-pdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import SupOperations from './SupOperations';
import { useParams } from 'react-router-dom';

function MarkingSchemfiles() {

  const {id}=useParams("");
  const[TopicList,setTopiclist]=useState([]);

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  var arr;
  var res;
  var res1;
  
  useEffect(()=>{

    function getMovies(){
      axios.get(`http://localhost:8071/markingScheme/get/${id}`).then((res)=>{
        setTopiclist(res.data);
      }).catch((err)=>{
        alert(err.message);
      })
    }
    getMovies();

     },[]);

     var viewItems_HTMLTABLE="";

     if (!Array.isArray(TopicList)) {

    arr=Object.entries(TopicList);
    res=Object.values(arr);
    res1=Object.values(res[1]);
    console.log(res1[1]);

    viewItems_HTMLTABLE=
      res1.map((data)=>{
        

      return(
        <Row key={data._id}>
            <Col>{data._id}</Col>
          </Row>
      );
        
    });

  }

  else
  viewItems_HTMLTABLE="loading"
  


return (
 <> 

<div className="images4">

<Table className="images3">

 {viewItems_HTMLTABLE}

  </Table>
 
</div>

 <div className="lines1"></div>
 </>
    );
  }


export default MarkingSchemfiles;