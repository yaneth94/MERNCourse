import React, { Component } from "react";
import { followUser, unfollowUser } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(followUser);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollowUser);
  };

  render() {
    return (
      <div className="d-inline-block">
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="btn btn-success btn-raised mr-5"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={this.unfollowClick}
            className="btn btn-warning btn-raised"
          >
            UnFollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
