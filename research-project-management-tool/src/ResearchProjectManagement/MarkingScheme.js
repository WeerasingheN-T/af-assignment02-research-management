import React,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap';

const MarkingScheme=() =>{

  const [newMovie,setNewMovie]=useState(
    {
        EvaluationDocumentName:'',
        markingPaper:''
    }
  );

  const sendMovie=(e)=>{
    e.preventDefault();
    const data =new FormData();
    data.append('EvaluationDocumentName',newMovie.EvaluationDocumentName);
    data.append('markingPaper',newMovie.markingPaper);
        
    axios.post("http://localhost:8071/markingScheme/add", data).then(()=>{

      alert("Movie is added");
      }).catch((err)=>{
        alert(err);
      })
    }

    const handleChange = (e) => {
        setNewMovie({...newMovie, [e.target.name]: e.target.value});
    }

  const handlePhoto = (e) => {
      setNewMovie({...newMovie, markingPaper: e.target.files[0]});
  }


return (
 <> 

<div className="base-container1">
<div className="image2">
<div className="containerblock1">

 <form onSubmit={sendMovie} encType="multipart/form-data">
 <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Movie</p>


<Row>

 <Col>
 <div className="form-group">
 <label>ShowDays</label>
 <input type="text" name="EvaluationDocumentName" className="form-control" id="EvaluationDocumentName" placeholder="ShowDays" value={newMovie.EvaluationDocumentName} onChange={handleChange} required/>
</div>
<div className="form-group">
 <label>Movie Banner Image</label>
 <input type="file" name="markingPaper" className="form-control" id="markingPaper" placeholder="Add the movie image" onChange={handlePhoto} required/>
</div>
</Col>
</Row>

<div className="footer">
<button type="submit" className="btn btn-dark btn-lg btn-block">Add Movie</button>
</div>

</form>

</div>
</div>
<div className="lines"></div>
</div>
 </>
    );
  }


export default MarkingScheme;
