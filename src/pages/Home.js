import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';
import Header from '../components/Header';
import { resetUser } from '../redux/actions';

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 0,
      questions: [],
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

    this.setState({
      question: 0,
      questions: api.results,
    });
  }

  render() {
    const { questions, question } = this.state;

    const answers = shuffleArray(questions.length > 0 ? [
      { answer: questions[question].correct_answer, correct: true },
      ...questions[question].incorrect_answers.map((ia) => (
        { answer: ia, correct: false }
      )),
    ] : []);

    console.log(answers);

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
                    data-testid={ answer.correct
                      ? 'correct-answer'
                      : `wrong-answer-${i}` }
                  >
                    {answer.answer}
                  </button>
                ))}
              </ul>
            </>
          ) : ''
        }
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Home);
