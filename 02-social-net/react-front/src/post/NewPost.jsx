import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createPost } from "./apiPost";
import DefaultProfile from "../images/avatar.jpg";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false,
    };
  }
  componentDidMount() {
    //use of formdata
    this.postData = new FormData();
    this.setState({
      user: isAuthenticated().user,
    });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
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
    this.postData.set(name, value);
    this.setState({
      [e.target.name]: value,
      fileSize,
    });
  };
  clickSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      //mandando los datos del formulario para que admita archivos
      createPost(userId, token, this.postData).then((data) => {
        if (data.err) {
          this.setState({ error: data.err });
        } else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            photo: "",
            redirectToProfile: true,
          });
        }
      });
    }
  };
  newPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          //onChange={this.handleChange("photo")}
          type="file"
          name="photo"
          onChange={this.handleChangeInput}
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          //onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          name="title"
          onChange={this.handleChangeInput}
          value={title}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          //onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          name="body"
          onChange={this.handleChangeInput}
          value={body}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Create Post
      </button>
    </form>
  );
  render() {
    const {
      title,
      body,
      photo,
      user,
      error,
      loading,
      redirectToProfile,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a new post</h2>
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

        {this.newPostForm(title, body)}
      </div>
    );
  }
}

export default NewPost;
