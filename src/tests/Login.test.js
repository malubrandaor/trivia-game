import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';

const emailTestId = 'input-gravatar-email';
const nameTestId = 'input-player-name';

describe('Testes da pagina de Login', () => {
  it('Testa se os elementos (2 inputs e botao) estao na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    expect(emailInput).toBeInTheDocument();

    const nameInput = screen.getByTestId(nameTestId);
    expect(nameInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /play/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('Testa se quando o botao deve e nao deve estar habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const nameInput = screen.getByTestId(nameTestId);
    const loginButton = screen.getByRole('button', { name: /play/i });

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'diogo@trybe.com');
    userEvent.type(nameInput, 'Diogo');
    expect(loginButton).toBeEnabled();
  });

  it('Testa se ao clicar no botao settings, a pagina é redirecionada para /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    
    userEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings');
  });
  it('Testa se ao clicar no botao play, a pagina é redirecionada para /home', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /play/i });
    const emailInput = screen.getByTestId(emailTestId);
    const nameInput = screen.getByTestId(nameTestId);

    expect(history.location.pathname).toBe('/');

    userEvent.type(emailInput, 'diogo@trybe.com');
    userEvent.type(nameInput, 'Diogo');    

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);
    
    const time = 3000;
    await new Promise((response) => setTimeout(response, time))
    expect(history.location.pathname).toBe('/home');
  });
  it('Testa se ao clicar em play um fetch é chamado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue('56249bea4d90d1d88dc1cd4518e292799b83bd4d2e722edce2e371ea468f1973'),
    })

    renderWithRouterAndRedux(<App />);
    
    const nameInput = screen.getByTestId(nameTestId);
    const emailInput = screen.getByTestId(emailTestId);
    const loginButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(emailInput, 'diogo@trybe.com');
    userEvent.type(nameInput, 'Diogo');    

    act(() => {
      userEvent.click(loginButton);
    });
    expect(global.fetch).toHaveBeenCalled();
  })
});