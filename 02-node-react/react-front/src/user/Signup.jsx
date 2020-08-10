import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
      recaptcha: false,
    };
  }

  // Another way
  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleChangeInput = (e) => {
    this.setState({ error: "" });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clickSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };
    //console.log("user", user);
    this.signup(user).then((data) => {
      if (data.err) {
        this.setState({ error: data.err });
      } else {
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
        });
      }
    });
  };

  signup = (user) => {
    return fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
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
          Submit
        </button>
      </form>
    );
  };
  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New account is successfully created, Please Sign In
        </div>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
