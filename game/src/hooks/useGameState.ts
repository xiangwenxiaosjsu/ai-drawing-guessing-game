import { useState } from 'react';

interface GameState {
  phase: 'waiting' | 'drawing' | 'guessing' | 'result';
  result?: string;
  isCorrect?: boolean;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'waiting'
  });

  const startDrawing = () => {
    setGameState({ phase: 'drawing' });
  };

  const startGuessing = () => {
    setGameState({ phase: 'guessing' });
  };

  const setResult = (result: string, isCorrect: boolean) => {
    setGameState({
      phase: 'result',
      result,
      isCorrect
    });
  };

  const resetGame = () => {
    setGameState({ phase: 'waiting' });
  };

  return {
    gameState,
    startDrawing,
    startGuessing,
    setResult,
    resetGame
  };
};