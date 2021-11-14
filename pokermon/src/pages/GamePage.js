import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import PokerTable from "../components/PokerTable";

const mockedPlayerList = [
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 2137,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
];

const mockedGameResponse = {
  isEndOfHand: true,
  currentPlayerPosition: 0,
  potValue: 0,
  tableCards: [null, null, null, null, null],
  pocketCards: [0],
  players: mockedPlayerList,
  cashToCall: 0,
  canRaise: true,
};

const GamePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const gameId = params.gameId;

  const [gameData, setGameData] = useState({ players: [] });

  const refreshGameData = () => {
    setGameData(mockedGameResponse);
  };

  useEffect(refreshGameData, []);

  return (
    <Box>
      <PokerTable cards={gameData.tableCards} players={gameData.players} />
      <ControlPanel />
      <Button
        className="text btn"
        variant="contained"
        onClick={() => navigate(-1)}
      >
        Leave Table
      </Button>
    </Box>
  );
};

export default GamePage;
