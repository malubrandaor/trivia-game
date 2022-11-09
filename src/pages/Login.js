import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { nome, email } = this.state;
      if (nome.length > 0 && email.length > 0) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  // handleClick = async () => {
  //   const { dispatch } = this.props;
  //   const { name, email } = this.state:

  // }

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="nome">
          Name
          <input
            name="nome"
            type="text"
            data-testid="input-player-name"
            value={ nome }
            id="nome"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            name="email"
            type="text"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ isDisabled }
          onClick={ () => {

          } }
        >
          Play
        </button>
      </form>
    );
  }
}

export default connect()(Login);
