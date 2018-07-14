import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthForm extends Component {
  static propTypes = {
    onAuth: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAuth(this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, password } = this.state;
    const { errorMessage } = this.props;

    return (
      <div className="row-fluid">
        <div className="col-sm-4 offset-sm-4">
          <form onSubmit={this.handleSubmit}>
              
            { errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null }

            <label htmlFor="signin-username">E-mail</label>
            <input
              id="signin-username"
              type="text"
              name="username"
              className="form-control"
              placeholder="PassAXA Email"
              autoComplete="off"
              value={username}
              onChange={this.handleChange} />

            <label htmlFor="signin-password">Password</label>
            <input
              id="signin-password"
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={this.handleChange} />

            <br />
            <button type="submit" className="btn btn-ghost">Log in</button>

          </form>
        </div>
      </div>
    );

  }
}

export default AuthForm;
