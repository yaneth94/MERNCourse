import React, { Component } from "react";
import { findPeople, followUser } from "./apiUser";
import { isAuthenticated } from "../auth";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class FindPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: "",
      open: false,
    };
  }

  init = () => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    return findPeople(userId, token)
      .then((data) => {
        if (data.err) {
          console.log("ERROR");
          this.setState({
            error: "Error",
          });
        } else {
          this.setState({
            users: data.users,
          });
          // console.log(this.state.users);
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.init();
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    followUser(userId, token, user._id).then((data) => {
      if (data.err) {
        this.setState({ error: data.err });
      } else {
        let toFollow = this.state.users;
        // delete in the array of users
        toFollow.splice(i, 1);
        // replace in the state
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`,
        });
      }
    });
  };

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, i) => (
        <div className="card col-md-4" key={i}>
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`${process.env.REACT_APP_API_URL}/api/user/photo/${
              user._id
            }?${new Date().getTime()}`}
            //src={`${DefaultProfile}`}
            onError={(i) => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
          />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-raised btn-primary btn-sm"
            >
              View Profile
            </Link>
            <button
              onClick={() => this.clickFollow(user, i)}
              className="btn btn-raised btn-info float-right btn-sm"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, open, followMessage } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Find People</h2>
        {open && <div className="alert alert-success">{followMessage}</div>}

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
