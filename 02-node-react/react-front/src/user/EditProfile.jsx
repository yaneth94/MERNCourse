import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { readUser, updateUser } from "./apiUser";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
    };
  }
  init = (userId) => {
    return readUser(userId, isAuthenticated().token)
      .then((data) => {
        if (data.err) {
          this.setState({
            redirectToProfile: true,
          });
        } else {
          this.setState({
            id: data._id,
            name: data.name,
            email: data.email,
            error: "",
          });
          console.log(this.state.name);
        }
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password } = this.state;
    if (name.length === 0) {
      this.setState({ error: "Name is required" });
      return false;
    }
    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
      });
      return false;
    }
    return true;
  };

  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  clickSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      const { name, email, password } = this.state;
      const user = {
        name,
        email,
        // para poder guardar sin necesidad del password
        password: password || undefined,
      };
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      updateUser(userId, token, user).then((data) => {
        if (data.err) {
          this.setState({ error: data.err });
        } else {
          this.setState({
            redirectToProfile: true,
          });
        }
      });
    }
  };
  signupForm = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            //onChange={this.handleChange("name")}
            onChange={this.handleChangeInput}
            type="text"
            className="form-control"
            value={name}
            name="name"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            //onChange={this.handleChange("email")}
            onChange={this.handleChangeInput}
            type="email"
            className="form-control"
            value={email}
            name="email"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            //onChange={this.handleChange("password")}
            onChange={this.handleChangeInput}
            type="password"
            className="form-control"
            value={password}
            name="password"
          />
        </div>
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Update
        </button>
      </form>
    );
  };
  render() {
    const { id, name, email, password, redirectToProfile, error } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default EditProfile;
