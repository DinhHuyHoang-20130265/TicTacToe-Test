import React from 'react';
import Game from './Game';
import './game.css';

function App() {
  return (
      <div className="App">
        <header >
          <h1>Tic-tac-toe</h1>
        </header>

        <div className={'game-container'}>
          <Game />
        </div>
      </div>
  );
}

export default App;
