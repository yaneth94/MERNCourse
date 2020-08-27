import React, { Component } from "react";
import { listPost } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      error: "",
    };
  }

  init = () =>
    listPost()
      .then((data) => {
        if (data.err) {
          console.log("ERROR");
          this.setState({
            error: "Error",
          });
        } else {
          //console.log(data.posts);
          this.setState({
            posts: data.posts,
          });
        }
      })
      .catch((err) => console.log(err));

  componentDidMount() {
    this.init();
  }

  renderPosts = (posts) => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";

          return (
            <div className="card col-md-4" key={i}>
              <div className="card-body">
                <img
                  src={`${process.env.REACT_APP_API_URL}/api/post/photo/${post._id}`}
                  alt={post.title}
                  onError={(i) => (i.target.src = `${DefaultPost}`)}
                  className="img-thunbnail mb-3"
                  style={{ height: "200px", width: "100%" }}
                />
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 10)}</p>
                <br />
                <p className="font-italic mark">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {!posts.length ? "Loading..." : "Recent Post"}
        </h2>
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
