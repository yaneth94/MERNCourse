import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
// agregando la autenticacion obligatoria
import PrivateRoute from "./auth/PrivateRoute";

function MainRouter() {
  return (
    <div>
      <Menu></Menu>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <PrivateRoute
          path="/user/edit/:userId"
          exact
          component={EditProfile}
        ></PrivateRoute>
        <PrivateRoute
          path="/user/:userId"
          exact
          component={Profile}
        ></PrivateRoute>
        <Route path="/users" exact component={Users}></Route>
      </Switch>
    </div>
  );
}

export default MainRouter;
