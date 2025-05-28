import React from 'react';
import '../styles/GameStatus.css';

interface GameState {
  phase: 'waiting' | 'drawing' | 'guessing' | 'result';
  result?: string;
  isCorrect?: boolean;
}

interface GameStatusProps {
  gameState: GameState;
  onStartDrawing: () => void;
  onSubmitDrawing: () => void;
  onPlayAgain: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({
  gameState,
  onStartDrawing,
  onSubmitDrawing,
  onPlayAgain,
}) => {
  const renderContent = () => {
    switch (gameState.phase) {
      case 'waiting':
        return (
          <div className="game-status waiting">
            <h2>Welcome to AI Drawing Guessing Game!</h2>
            <p>Draw something and let AI guess what it is!</p>
            <button onClick={onStartDrawing} className="start-btn">
              Start Drawing
            </button>
          </div>
        );
      
      case 'drawing':
        return (
          <div className="game-status drawing">
            <h2>Draw Something!</h2>
            <p>Use the tools below to draw, then submit for AI recognition</p>
            <button onClick={onSubmitDrawing} className="submit-btn">
              Submit Drawing
            </button>
          </div>
        );
      
      case 'guessing':
        return (
          <div className="game-status guessing">
            <h2>AI is analyzing your drawing...</h2>
            <div className="loading-spinner"></div>
          </div>
        );
      
      case 'result':
        return (
          <div className={`game-status result ${gameState.isCorrect ? 'correct' : 'incorrect'}`}>
            <h2>{gameState.isCorrect ? '🎉 Great Drawing!' : '🤔 Interesting...'}</h2>
            <p>AI thinks you drew: <strong>{gameState.result}</strong></p>
            <button onClick={onPlayAgain} className="play-again-btn">
              Play Again
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div className="game-status-container">{renderContent()}</div>;
};

export default GameStatus;