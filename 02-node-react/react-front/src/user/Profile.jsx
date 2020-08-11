import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { readUser } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Redirect, Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
      error: "",
    };
  }

  init = (userId) => {
    return readUser(userId, isAuthenticated().token)
      .then((data) => {
        if (data.err) {
          this.setState({
            redirectToSignin: true,
          });
        } else {
          this.setState({
            user: data,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    //console.log(userId);
    this.init(userId);
  }
  /** Para cuando se actualize el profile dentro de el mismo
   * Users profile bases on props change
   */
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    //console.log(userId);
    this.init(userId);
  }

  render() {
    const { user, redirectToSignin } = this.state;
    if (redirectToSignin) return <Redirect to="/signin"></Redirect>;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "15vw", width: "100%", objectFit: "cover" }}
              className="img-thumbnail"
              src={`${DefaultProfile}`}
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>
          <div className="col-md-6">
            <div className="lead mt-2">
              {/*isAuthenticated(). */}
              <p> Hello {user.name}</p>
              <p>Email: {user.email}</p>
              <p> {`Joined ${new Date(user.created).toDateString()} `}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
