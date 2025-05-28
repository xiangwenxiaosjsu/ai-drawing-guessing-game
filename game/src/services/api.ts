const API_BASE_URL = 'http://localhost:3001';

export interface RecognitionResult {
  result: string;
  confidence: number;
}

export const recognizeDrawing = async (canvas: HTMLCanvasElement): Promise<RecognitionResult> => {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to convert canvas to blob');
      }

      const formData = new FormData();
      formData.append('image', blob, 'drawing.png');

      try {
        const response = await fetch(`${API_BASE_URL}/api/recognize`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        resolve(result);
      } catch (error) {
        console.error('API call failed:', error);
        throw error;
      }
    }, 'image/png');
  });
};