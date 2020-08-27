import React, { Component } from 'react'
import { signin, authenticate } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import SocialLogin from './SocialLogin'

class Signin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToRefer: false,
      loading: false,
      recaptcha: false
    }
  }

  // Another way
  handleChange = name => event => {
    this.setState({ error: '' })
    this.setState({ [name]: event.target.value })
  }

  handleChangeInput = e => {
    this.setState({ error: '' })
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clickSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { email, password } = this.state
    const user = {
      email,
      password
    }
    //console.log("user", user);
    signin(user).then(data => {
      if (data.err) {
        this.setState({
          error: data.err,
          loading: false
        })
      } else {
        //authenticate
        authenticate(data, () => {
          this.setState({
            redirectToRefer: true
          })
        })
      }
    })
  }

  signinForm = (email, password) => {
    return (
      <form>
        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input
            //onChange={this.handleChange("email")}
            onChange={this.handleChangeInput}
            type='email'
            className='form-control'
            value={email}
            name='email'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input
            //onChange={this.handleChange("password")}
            onChange={this.handleChangeInput}
            type='password'
            className='form-control'
            value={password}
            name='password'
          />
        </div>
        <button
          onClick={this.clickSubmit}
          className='btn btn-raised btn-primary'
        >
          Submit
        </button>
      </form>
    )
  }
  render () {
    const { email, password, error, redirectToRefer, loading } = this.state
    if (redirectToRefer) {
      return <Redirect to='/'></Redirect>
    }
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Signin</h2>
        <hr />
        <SocialLogin />
        <hr />
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        {loading ? (
          <div className='jumbotron text-center'>
            <h2>loading</h2>
          </div>
        ) : (
          ''
        )}
        {this.signinForm(email, password)}
        <p>
          <Link to='/forgot-password' className='btn btn-raised btn-danger'>
            {' '}
            Forgot Password
          </Link>
        </p>
      </div>
    )
  }
}

export default Signin
