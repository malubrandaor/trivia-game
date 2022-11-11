// inicio
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;

    const minimo = 3;
    return (
      <div>
        <Header />
        <main>
          <h2>Pontuação:</h2>
          <h3 data-testid="feedback-total-score">{score}</h3>
          <h2>
            Respostas Certas:
          </h2>
          <h3 data-testid="feedback-total-question">{assertions}</h3>
          { assertions < minimo ? (
            <li data-testid="feedback-text">Could be better...</li>
          ) : (
            <li data-testid="feedback-text">Well Done!</li>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  correctAnswers: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
