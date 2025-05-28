import React from 'react';
import '../styles/ToolBar.css';

interface ToolBarProps {
  currentColor: string;
  currentSize: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onClear: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({
  currentColor,
  currentSize,
  onColorChange,
  onSizeChange,
  onClear,
}) => {
  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#800080', '#FFC0CB', '#A52A2A', '#808080'
  ];

  const sizes = [1, 2, 4, 8, 12, 16];

  return (
    <div className="toolbar">
      <div className="tool-section">
        <label>Color:</label>
        <div className="color-palette">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-btn ${currentColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
              title={color}
            />
          ))}
        </div>
      </div>
      
      <div className="tool-section">
        <label>Brush Size:</label>
        <div className="size-controls">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${currentSize === size ? 'active' : ''}`}
              onClick={() => onSizeChange(size)}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>
      
      <div className="tool-section">
        <button onClick={onClear} className="clear-btn">
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default ToolBar;