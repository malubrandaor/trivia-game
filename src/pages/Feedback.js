// inicio
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { correctAnswers } = this.props;
    const minimo = 3;
    return (
      <div>
        <Header />
        <main>
          <h2>
            Respostas Certas:
          </h2>
          <h3 data-testid="feedback-total">{correctAnswers}</h3>
          { correctAnswers < minimo ? (
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
  correctAnswers: state.user.correctAnswers,
});

Feedback.propTypes = {
  correctAnswers: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
