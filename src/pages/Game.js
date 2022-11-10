import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';
import Header from '../components/Header';
import { resetUser } from '../redux/actions';

const TIMEOUT_TIME = 30000;

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 0,
      questions: [],
      answers: [],
      selectedAnswer: undefined,
      answerTimeout: false,
    };
  }

  async componentDidMount() {
    const api = await getQuestions(localStorage.getItem('token'));
    const { history, dispatch } = this.props;
    if (api.response_code !== 0) {
      localStorage.removeItem('token');
      dispatch(resetUser());
      return history.push('/');
    }

    const answers = shuffleArray(api.results.length > 0 ? [
      { answer: api.results[0].correct_answer, correct: true },
      ...api.results[0].incorrect_answers.map((ia) => (
        { answer: ia, correct: false }
      )),
    ] : []);

    this.setState({
      question: 0,
      questions: api.results,
      answers,
    });

    setTimeout(() => {
      this.setState({
        answerTimeout: true,
      });
    }, TIMEOUT_TIME);
  }

  handleClickNext = async () => {
    await getQuestions();
    console.log('clicou');
  };

  selectAnswer(index) {
    this.setState({
      selectedAnswer: index,
    });
  }

  borderAnswer(correct) {
    return correct
      ? { border: '3px solid rgb(6, 240, 15)' } : { border: '3px solid red' };
  }

  render() {
    const { selectedAnswer, answers, questions, question, answerTimeout } = this.state;
    const nextButton = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleClickNext }
      >
        Next
      </button>);
    return (
      <div>
        <Header />
        {
          questions.length > 0 ? (
            <>
              <p data-testid="question-category">
                {questions[question].category}
              </p>
              <h1 data-testid="question-text">
                {questions[question].question}
              </h1>
              <ul data-testid="answer-options">
                {answers.map((answer, i) => (
                  <button
                    key={ i }
                    type="button"
                    disabled={ answerTimeout }
                    style={
                      typeof selectedAnswer !== 'undefined'
                        ? this.borderAnswer(answer.correct)
                        : undefined
                    }
                    data-testid={ answer.correct
                      ? 'correct-answer'
                      : `wrong-answer-${i}` }
                    onClick={ () => this.selectAnswer(i) }
                  >
                    {answer.answer}
                  </button>
                ))}
                { selectedAnswer && nextButton }
              </ul>
            </>
          ) : ''
        }
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect()(Game);
