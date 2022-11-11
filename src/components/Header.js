import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { nome, emailG, score } = this.props;
    const hash = md5(emailG).toString();
    return (
      <div>
        <h1>Trivia Game</h1>
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            data-testid="header-profile-picture"
            alt="Foto de perfil"
          />
          <h2 data-testid="header-player-name">{ nome }</h2>
          <h2 data-testid="header-score">
            { score }
          </h2>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  nome: state.player.nome,
  emailG: state.player.emailG,
  score: state.player.score,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  emailG: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
