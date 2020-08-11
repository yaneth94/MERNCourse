import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { removeUser } from "./apiUser";
import { signout } from "../auth";

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    removeUser(userId, token).then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        // signout user
        signout(() => console.log("User is deleted"));
        // redirect
        this.setState({ redirect: true });
      }
    });
  };
  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    //console.log(this.props.userId);
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-danger"
      >
        Delete
      </button>
    );
  }
}

export default DeleteUser;
