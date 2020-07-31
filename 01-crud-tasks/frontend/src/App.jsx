import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//importando styles de la app
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import CreateNote from "./components/CreateNote";
import NoteList from "./components/NoteList";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <div>
      <Router>
        <Navigation></Navigation>
        <div className="container p-4">
          <Route path="/" exact component={NoteList} />
          <Route path="/create/note" component={CreateNote} />
          <Route path="/create/user" component={CreateUser} />
          <Route path="/edit/note/:id" component={CreateNote} />
        </div>
      </Router>
    </div>
  );
}

export default App;
