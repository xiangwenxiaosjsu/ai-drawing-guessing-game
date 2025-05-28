# AI Drawing Guessing Game

An interactive web game where users draw pictures and AI tries to guess what they drew.

## Features

- **Interactive Drawing Canvas**: Draw with different colors and brush sizes
- **AI Recognition**: Uses OpenAI's GPT-4 Vision to analyze drawings
- **Real-time Feedback**: Get instant results on your drawings
- **Responsive Design**: Works on desktop and mobile devices
- **Undo/Redo**: Full drawing history with keyboard shortcuts

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Custom Canvas implementation
- CSS3 for styling

### Backend
- Node.js with Express
- TypeScript
- OpenAI API integration
- Multer for file uploads
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (optional - will use mock data without it)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xiangwenxiaosjsu/ai-drawing-guessing-game.git
cd ai-drawing-guessing-game
```

2. Install frontend dependencies:
```bash
cd game
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up environment variables:
```bash
cd server
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### Running the Application

1. Start the backend server:
```bash
cd game/server
npm run dev
```

2. Start the frontend development server:
```bash
cd game
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. Click "Start Drawing" to begin
2. Use the toolbar to select colors and brush sizes
3. Draw something on the canvas
4. Click "Submit Drawing" to let AI analyze your artwork
5. See if the AI correctly guessed what you drew!
6. Click "Play Again" to start over

## API Configuration

### With OpenAI API Key
- Add your OpenAI API key to `game/server/.env`
- The app will use GPT-4 Vision for real image recognition

### Without API Key
- The app will work with mock data
- Random results will be generated for testing

## Development

### Project Structure
```
game/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── styles/        # CSS files
│   └── utils/         # Utility functions
├── server/
│   ├── services/      # Backend services
│   └── index.ts       # Express server
└── public/            # Static assets
```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run build` - Compile TypeScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- OpenAI for the GPT-4 Vision API
- React team for the amazing framework
- Vite for the fast build tool