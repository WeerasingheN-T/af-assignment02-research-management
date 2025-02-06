import React from 'react';
import './LoginRegister.css';
import researchTool2 from "../ResearchTools/researchTool2.jpg";
import researchTool1 from "../ResearchTools/researchTool1.jpg";
import researchTool3 from "../ResearchTools/researchTool3.jpg";
import researchTool4 from "../ResearchTools/researchTool4.jpg";
import researchTool5 from "../ResearchTools/researchTool5.jpeg";
import Fs1 from "../ResearchTools/Fs1.jpg";
import FEs1 from "../ResearchTools/FEs1.jpg";
import FS1 from "../ResearchTools/FS1.png";
import Fs2 from "../ResearchTools/Fs2.jpg";

function LoginRegister() {

return (
  <>
<div className="alld">
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
<div className="carousel-inner">
<div className="carousel-item active">
<img src={researchTool2} class="d-block" />
</div>
<div className="carousel-item">
<img src={researchTool1} class="d-block " />
</div>
<div className="carousel-item">
<img src={researchTool3} class="d-block " />
</div>
<div className="carousel-item">
<img src={researchTool4} class="d-block " />
</div>
<div className="carousel-item">
<img src={researchTool5} class="d-block " />
</div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
<span className="carousel-control-prev-icon" aria-hidden="true"></span>
<span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
<span className="carousel-control-next-icon" aria-hidden="true"></span>
<span className="visually-hidden">Next</span>
</button>
 </div>

 
<div className="card-group m-2">
  <div className="card">
    <img src={Fs1}/>
    <div className="card-body">
      <h2 className="card-title">Faculty of Computing</h2>
      <p className="card-text">The SLIIT Faculty of Computing is equipped with a range of courses specialising in various arms of the IT sector.</p>
      <a href='' className="btn btn-secondary">View Faculty</a>
    </div>
  </div>
  <div className="card">
    <img src={FEs1}/>
    <div className="card-body">
      <h2 className="card-title">Faculty of Engineering</h2>
      <p class="card-text">The Faculty of Engineering of SLIIT is the epicenter of engineering education, research and distribution in Sri Lanka.</p>
      <a href='' className="btn btn-secondary">View Faculty</a>
    </div>
  </div>
  <div className="card">
    <img src={FS1}/>
    <div className="card-body">
      <h2 className="card-title">Faculty of Business</h2>
      <p className="card-text">The Faculty of Business within SLIIT build nurturing leaders, managers and IS professionals for a good business industry.</p>
      <a href='' className="btn btn-secondary">View Faculty</a>
    </div>
   </div>
    <div className="card">
    <img src={Fs2}/>
    <div className="card-body">
      <h2 className="card-title">Faculty of Humanities</h2>
      <p className="card-text">The Faculty of Humanities and Sciences strives to develop professionals in the areas of Education, Science, Mathematics, and Nursing.</p>
      <a href='' className="btn btn-secondary">View Faculty</a>
    </div>
   </div>
  </div>

</div>
 </>
    );
  }


export default LoginRegister;