import React, { Component } from "react";
import { listUser } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: "",
    };
  }

  init = () =>
    listUser()
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

  componentDidMount() {
    this.init();
  }

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, i) => (
        <div className="card col-md-4" key={i}>
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`${DefaultProfile}`}
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
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;