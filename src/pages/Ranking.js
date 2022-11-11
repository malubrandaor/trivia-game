import PropTypes from 'prop-types';
import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Ranking extends React.Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleHome }
        >
          Go Home

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
