import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { readUser } from './apiUser'
import DefaultProfile from '../images/avatar.jpg'
import { Redirect, Link } from 'react-router-dom'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import { listPostUser } from '../post/apiPost'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      error: '',
      following: false,
      posts: []
    }
  }

  // check follow
  checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      console.log(follower._id === jwt.user._id)
      return follower._id === jwt.user._id
    })
    console.log(match)
    return match
  }

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.err) {
        this.setState({
          error: data.err
        })
      } else {
        this.setState({ user: data, following: !this.state.following })
      }
    })
  }

  init = userId => {
    return readUser(userId, isAuthenticated().token)
      .then(data => {
        if (data.err) {
          this.setState({
            redirectToSignin: true
          })
        } else {
          let following = this.checkFollow(data)
          this.setState({
            user: data,
            following
          })
          this.loadPost(data._id)
        }
      })
      .catch(err => console.log(err))
  }
  loadPost = userId => {
    return listPostUser(userId, isAuthenticated().token)
      .then(data => {
        if (data.err) {
          this.setState({
            redirectToSignin: true
          })
        } else {
          this.setState({
            posts: data.posts
          })
        }
      })
      .catch(err => console.log(err))
  }
  componentDidMount () {
    const userId = this.props.match.params.userId
    //console.log(userId);
    this.init(userId)
  }
  /** Para cuando se actualize el profile dentro de el mismo
   * Users profile bases on props change
   */
  componentWillReceiveProps (props) {
    const userId = props.match.params.userId
    //console.log(userId);
    this.init(userId)
  }

  render () {
    const { user, redirectToSignin, following, posts } = this.state
    if (redirectToSignin) return <Redirect to='/signin'></Redirect>
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/api/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : `${DefaultProfile} `
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile</h2>
        <div className='row'>
          <div className='col-md-6'>
            <img
              style={{ height: '15vw', width: '100%', objectFit: 'cover' }}
              className='img-thumbnail'
              src={`${photoUrl}`}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>
          <div className='col-md-6'>
            <div className='lead mt-2'>
              {/*isAuthenticated(). */}
              <p> Hello {user.name}</p>
              <p>Email: {user.email}</p>
              <p> {`Joined ${new Date(user.created).toDateString()} `}</p>
            </div>
            {isAuthenticated().user &&
            isAuthenticated().user._id === user._id ? (
              <div className='d-inline-block'>
                <Link
                  className='btn btn-raised btn-info mr-5'
                  to={`/post/create`}
                >
                  Create Post
                </Link>
                <Link
                  className='btn btn-raised btn-success mr-5'
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={following}
                onButtonClick={this.clickFollowButton}
              />
            )}
            <div>
              {isAuthenticated().user &&
                isAuthenticated().user.role === 'admin' && (
                  <div class='card mt-5'>
                    <div className='card-body'>
                      <h5 className='card-title'>Admin</h5>
                      <p className='mb-2 text-danger'>
                        Edit/Delete as an Admin
                      </p>
                      <Link
                        className='btn btn-raised btn-success mr-5'
                        to={`/user/edit/${user._id}`}
                      >
                        Edit Profile
                      </Link>
                      {/*<DeleteUser userId={user._id} />*/}
                      <DeleteUser />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 mt-5 mb-5'>
            <hr />
            <p className='lead'> {user.about}</p>
            <hr />
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
