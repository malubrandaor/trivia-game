import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApi } from '../services/api';
import SettingsButton from '../components/SetingsButton';
import { getUserInfo, resetUser } from '../redux/actions';

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

  handleClick = async () => {
    const { nome, email } = this.state;
    const api = await getApi();
    const { history, dispatch } = this.props;
    if (api.response_code !== 0) {
      localStorage.removeItem('token');
      dispatch(resetUser());
      return history.push('/');
    }
    localStorage.setItem('token', api.token);
    dispatch(getUserInfo({ nome, email }));
    history.push('/game');
  };

  handleSettingsButton = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <div>
        <div>
          <SettingsButton handleSettingsButton={ this.handleSettingsButton } />
        </div>
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
