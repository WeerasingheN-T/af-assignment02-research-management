import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginRegister,Header,HLogin,AllRegister,ViewStaff,EditStaff,ViewTopics,MarkingScheme,SupOperations,MarkingSchemfiles,ResearchFaculty,SupChatHandle,SupHChat,LiveChats,ResearchFooter} from "./ResearchProjectManagement";

function App() {

  const [staffLogin,setLoginStaff] = useState({});

  return (
    <div className="App">
      <Router> 
        <Header/>
        <Switch>
          <Route path="/" exact component={() => <LoginRegister />} />
          <Route path="/HLogin"><HLogin setLoginStaff={setLoginStaff}/></Route>
          <Route path="/ViewStaff/:id" exact component={() => <ViewStaff />} />
          <Route path="/EditStaff/:id" exact component={() => <EditStaff />} />
          <Route path="/AllRegister" exact component={() => <AllRegister />} />
          <Route path="/ViewTopics" exact component={() => <ViewTopics />} />
          <Route path="/MarkingScheme" exact component={() => <MarkingScheme />} />
          <Route path="/SupOperations/:staffPosition/:name" exact component={() => <SupOperations />} />
          <Route path="/MarkingSchemfiles/:id" exact component={() => <MarkingSchemfiles />} />
          <Route path="/SupChatHandle" exact component={() => <SupChatHandle />} />
          <Route path="/SupHChat" exact component={() => <SupHChat/>} />
          <Route path="/LiveChats" exact component={() => <LiveChats/>} />
          <Route path="/ResearchFaculty/:staffPosition" exact component={() => <ResearchFaculty />} />
          </Switch>
          <ResearchFooter/>
          </Router> 
    </div>
  );
}

export default App;
