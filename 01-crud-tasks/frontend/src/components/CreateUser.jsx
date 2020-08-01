import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
  state = {
    users: [],
    stateResponse: false,
    username: "",
  };
  componentDidMount() {
    this.getUsers();
  }
  async getUsers() {
    try {
      let res = await axios.get("http://localhost:4000/api/users");
      this.setState({ users: res.data.users, stateResponse: res.data.ok });
      //console.log(this.state.stateResponse);
    } catch (err) {
      console.log(err);
    }
  }
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
    //console.log(this.state.user);
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.saveUser();
    this.setState({ username: "" });
    this.getUsers();
  };
  async saveUser() {
    try {
      let res = await axios.post("http://localhost:4000/api/users", {
        username: this.state.username,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  deleteUser = async (userId) => {
    const response = window.confirm("are you sure you want to delete it?");
    if (response) {
      try {
        await axios.delete("http://localhost:4000/api/users/" + userId);
      } catch (err) {
        console.log(err);
      }
      this.getUsers();
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={this.state.username}
                  type="text"
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li
                key={user._id}
                className="list-group-item list-group-item-action"
                // para escuchar un doble click y poder eliminar
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default CreateUser;
