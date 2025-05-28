import React, { useState, useRef } from 'react'
import Canvas from './components/Canvas'
import ToolBar from './components/ToolBar'
import GameStatus from './components/GameStatus'
import { useGameState } from './hooks/useGameState'
import { recognizeDrawing } from './services/api'
import './App.css'

function App() {
  const [currentColor, setCurrentColor] = useState('#000000')
  const [currentSize, setCurrentSize] = useState(2)
  const [canvasKey, setCanvasKey] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    gameState,
    startDrawing,
    startGuessing,
    setResult,
    resetGame
  } = useGameState()

  const handleClear = () => {
    setCanvasKey(prev => prev + 1)
  }

  const handleStartDrawing = () => {
    handleClear()
    startDrawing()
  }

  const handleSubmitDrawing = async () => {
    if (!canvasRef.current) return
    
    startGuessing()
    try {
      const result = await recognizeDrawing(canvasRef.current)
      setResult(result.result, result.confidence > 0.8)
    } catch (error) {
      console.error('Recognition failed:', error)
      setResult('Recognition failed', false)
    }
  }

  const handlePlayAgain = () => {
    handleClear()
    resetGame()
  }

  const handleCanvasReady = (canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas
  }

  return (
    <div className={`app ${isFullscreen ? 'fullscreen' : 'halfscreen'}`}>
      <div className="screen-controls">
        <button 
          className={`screen-btn ${!isFullscreen ? 'active' : ''}`}
          onClick={() => setIsFullscreen(false)}
        >
          Windowed
        </button>
        <button 
          className={`screen-btn ${isFullscreen ? 'active' : ''}`}
          onClick={() => setIsFullscreen(true)}
        >
          Fullscreen
        </button>
      </div>
      <h1>AI Drawing Guessing Game</h1>
      <GameStatus
        gameState={gameState}
        onStartDrawing={handleStartDrawing}
        onSubmitDrawing={handleSubmitDrawing}
        onPlayAgain={handlePlayAgain}
      />
      <ToolBar
        currentColor={currentColor}
        currentSize={currentSize}
        onColorChange={setCurrentColor}
        onSizeChange={setCurrentSize}
        onClear={handleClear}
      />
      <div className="canvas-container">
        <Canvas
          key={canvasKey}
          width={800}
          height={600}
          color={currentColor}
          lineWidth={currentSize}
          onCanvasReady={handleCanvasReady}
        />
      </div>
    </div>
  )
}

export default App
