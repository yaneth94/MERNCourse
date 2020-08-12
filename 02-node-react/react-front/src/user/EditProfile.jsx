import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { readUser, updateUser } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";

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
      fileSize: 0,
      loading: false,
      about: "",
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
            about: data.about,
          });
          console.log(this.state.name);
        }
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    //use of formdata
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
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
    this.setState({ error: "" });
    const name = e.target.name;
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    const fileSize = name === "photo" ? e.target.files[0].size : 0;
    // uso form data
    this.userData.set(name, value);
    this.setState({
      [e.target.name]: value,
      fileSize,
    });
  };
  clickSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const { name, email, password } = this.state;
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      //mandando los datos del formulario para que admita archivos
      updateUser(userId, token, this.userData).then((data) => {
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
  signupForm = (name, email, password, about) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Profile Photo</label>
          <input
            //onChange={this.handleChange("photo")}
            onChange={this.handleChangeInput}
            type="file"
            accept="image/*"
            name="photo"
            className="form-control"
          />
        </div>
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
          <label className="text-muted">About</label>
          <textarea
            //onChange={this.handleChange("name")}
            onChange={this.handleChangeInput}
            type="text"
            className="form-control"
            value={about}
            name="about"
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
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about,
    } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/api/user/photo/${id}?${new Date().getTime()}`
      : `${DefaultProfile} `;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={(i) => (i.target.src = `${DefaultProfile}`)}
          alt={name}
        />
        {this.signupForm(name, email, password, about)}
      </div>
    );
  }
}

export default EditProfile;
