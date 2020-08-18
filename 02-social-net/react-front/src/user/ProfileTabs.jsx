import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";
import DefaultPost from "../images/mountains.jpg";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;

    return (
      <>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">{followers.length} Followers</h3>
            <hr />
            {followers.map((person, i) => {
              const photoUrl = person._id
                ? `${process.env.REACT_APP_API_URL}/api/user/photo/${
                    person._id
                  }?${new Date().getTime()}`
                : `${DefaultProfile} `;
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                        src={`${photoUrl}`}
                        alt={person.name}
                      />
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">{following.length} Following</h3>
            <hr />
            {following.map((person, i) => {
              const photoUrl = person._id
                ? `${process.env.REACT_APP_API_URL}/api/user/photo/${
                    person._id
                  }?${new Date().getTime()}`
                : `${DefaultProfile} `;
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                        src={`${photoUrl}`}
                        alt={person.name}
                      />
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h3 className="text-primary"> Posts</h3>
            <hr />
            {posts.map((post, i) => {
              const photoUrl = post._id
                ? `${process.env.REACT_APP_API_URL}/api/post/photo/${
                    post._id
                  }?${new Date().getTime()}`
                : `${DefaultPost} `;
              return (
                <div key={i}>
                  <div>
                    <Link to={`/post/${post._id}`}>
                      <img
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        onError={(i) => (i.target.src = `${DefaultPost}`)}
                        src={`${photoUrl}`}
                        alt={post.title}
                      />
                      <div>
                        <p className="lead">{post.title}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ProfileTabs;
