import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
       
     };
  }
  render() {   
    // const hash = md5(emailG).toString();  
    const { user } = this.props;
    const {  name, emailG, score } = user;
    const hash = md5(emailG).toString();
    return (
      <Header>
        <h1>Trivia Game</h1>
      <div>
        <img
        src={`https://www.gravatar.com/avatar/${hash}`}
        data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2> 
        <h2 data-testid="header-score">
        Pontuação:
        { score }
          </h2> 
      </div>
      </Header>
    );
  }
  
}
const mapStateToProps = (state) => ({
  user: state.user.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    url: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

 export default connect(mapStateToProps)(Header);
