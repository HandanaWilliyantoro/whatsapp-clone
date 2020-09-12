import React from "react";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { UseStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = UseStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Router>
            <Switch>
              <Route path="/rooms/:roomsId">
                <Sidebar />
                <Chat />
              </Route>
              <Route path="/">
                <Sidebar />
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
