import React, { useState } from "react";

const TOTAL_CELLS = 25;

export default function FindOGame() {
  const [numOs, setNumOs] = useState(1);
  const [board, setBoard] = useState(Array(TOTAL_CELLS).fill(null));
  const [oPositions, setOPositions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const startGame = () => {
    if (numOs < 1 || numOs >= TOTAL_CELLS) return;

    const positions = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    const shuffled = positions.sort(() => 0.5 - Math.random());
    const selectedOs = shuffled.slice(0, numOs);

    setOPositions(selectedOs);
    setBoard(Array(TOTAL_CELLS).fill(null));
    setGameOver(false);
    setMessage("");
  };

  const handleClick = (index) => {
    if (gameOver || board[index]) return;

    const newBoard = [...board];

    if (oPositions.includes(index)) {
      newBoard[index] = "O";
      const foundOs = newBoard.filter((val) => val === "O").length;
      if (foundOs >= numOs) {
        setMessage("¡Ganaste! Encontraste todas las O.");
        setGameOver(true);
      }
    } else {
      newBoard[index] = "X";
      setMessage("Perdiste. Tocaste una X.");
      setGameOver(true);
    }

    setBoard(newBoard);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Juego: Encontrá la O</h1>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="number"
          min="1"
          max="24"
          value={numOs}
          onChange={(e) => setNumOs(Number(e.target.value))}
          className="p-2 rounded text-black w-24"
        />
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-bold"
        >
          Iniciar Juego
        </button>
      </div>

      {message && <div className="mb-4 text-xl font-semibold">{message}</div>}

      <div className="grid grid-cols-5 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={\`w-16 h-16 text-xl font-bold rounded shadow flex items-center justify-center transition-all duration-200
              \${value === "O" ? "bg-green-400 text-black" :
                value === "X" ? "bg-red-500 text-white" :
                "bg-white/10 hover:bg-white/20"}\`}
          >
            {value || "?"}
          </button>
        ))}
      </div>
    </div>
  );
}
