import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';
import { act } from 'react-dom/test-utils';

const btnPlayAgainId = 'btn-play-again';
const btnRankingId= 'btn-ranking';

describe('Testes da pagina de Login', () => {
  it('Testa se os 2 botoes estao presentes', () => {
    renderWithRouterAndRedux(<Feedback />);

    const btnPlayAgain = screen.getByTestId(btnPlayAgainId);
    expect(btnPlayAgain).toBeInTheDocument();

    const btnRanking = screen.getByTestId(btnRankingId);
    expect(btnRanking).toBeInTheDocument();

  });
  
   it('Testa se ao clicar no botao play again, a pagina é redirecionada para /', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/feedback'); });

    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/')
  });

  it('Testa se ao clicar no botao ranking, a pagina é redirecionada para /ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/feedback'); });

    const btnRanking = screen.getByTestId(btnRankingId);
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking')
  });

  it('Testa se o assertions aparece na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const assertions = screen.getByTestId('feedback-total-question');
    const score = screen.getByTestId('feedback-total-score');

    expect(assertions).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  })  
});