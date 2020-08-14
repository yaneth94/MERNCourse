import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
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
        <Route path="/users" exact component={Users}></Route>
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
        <PrivateRoute
          path="/findpeople"
          exact
          component={FindPeople}
        ></PrivateRoute>
        <PrivateRoute
          path="/post/create"
          exact
          component={NewPost}
        ></PrivateRoute>
      </Switch>
    </div>
  );
}

export default MainRouter;
