import React, { useState } from 'react';
import './App.css';

type Player = 'X' | 'O' | null;

const initialBoard: Player[] = Array(9).fill(null);

const calculateWinner = (squares: Player[]): Player => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

const Game: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(initialBoard);
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<{ X: number; O: number }>({ X: 0, O: 0 });

    const winner = calculateWinner(board);
    const isDraw = board.every(square => square !== null) && !winner;

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = board.slice();
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);

        if (calculateWinner(newBoard)) {
            setHistory(prevHistory => ({
                ...prevHistory,
                [xIsNext ? 'X' : 'O']: prevHistory[xIsNext ? 'X' : 'O'] + 1,
            }));
        }
    };

    const handleRestart = () => {
        setBoard(initialBoard);
        setXIsNext(true);
    };

    return (
        <div className="game">
            <div className="board">
                {board.map((square, index) => (
                    <button key={index} className="square" onClick={() => handleClick(index)}>
                        {square}
                    </button>
                ))}
            </div>
            <div className="info">
                {winner ? (
                    <p>Winner: {winner}</p>
                ) : isDraw ? (
                    <p>It's a draw!</p>
                ) : (
                    <p>Next player: {xIsNext ? 'X' : 'O'}</p>
                )}
                <button onClick={handleRestart}>Restart Game</button>
                <div className="history">
                    <p>Score History:</p>
                    <p>Player X: {history.X}</p>
                    <p>Player O: {history.O}</p>
                </div>
            </div>
        </div>
    );
};

export default Game;
