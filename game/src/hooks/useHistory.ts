import { useState, useCallback } from 'react';

type HistoryState = ImageData[];

export const useHistory = (canvas: HTMLCanvasElement | null) => {
  const [history, setHistory] = useState<HistoryState>([]); // History records
  const [currentStep, setCurrentStep] = useState(-1); // Current step

  // Save current state
  const saveState = useCallback(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setCurrentStep(currentStep + 1);
  }, [canvas, history, currentStep]);

  // Undo
  const undo = useCallback(() => {
    if (currentStep <= 0 || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousStep = currentStep - 1;
    if (previousStep >= 0) {
      ctx.putImageData(history[previousStep], 0, 0);
      setCurrentStep(previousStep);
    } else {
      // If no earlier history records, clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCurrentStep(-1);
    }
  }, [canvas, history, currentStep]);

  // Redo
  const redo = useCallback(() => {
    if (currentStep >= history.length - 1 || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nextStep = currentStep + 1;
    ctx.putImageData(history[nextStep], 0, 0);
    setCurrentStep(nextStep);
  }, [canvas, history, currentStep]);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentStep(-1);
  }, []);

  return {
    saveState,
    undo,
    redo,
    clearHistory,
    canUndo: currentStep > -1,
    canRedo: currentStep < history.length - 1,
  };
};
