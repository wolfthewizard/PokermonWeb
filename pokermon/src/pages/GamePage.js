import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import PokerTable from "../components/PokerTable";
import { useCookies } from "react-cookie";
import { getAxiosInstance } from "../axios";

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

  const [gameData, setGameData] = useState({ tableCards: [], players: [] });
  const [cookies, _, removeCookie] = useCookies([]);
  const playerId = cookies["pokermon-uuid"];
  const tablePosition = cookies["pokermon-table-position"];

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
        onClick={() => {
          getAxiosInstance()
            .post(
              `/api/tables/leave/${gameId}`,
              {},
              {
                headers: {
                  playerId: playerId,
                },
              }
            )
            .then(() => {
              removeCookie("pokermon-uuid", { sameSite: true });
              removeCookie("pokermon-table-position", { sameSite: true });
              navigate(-1);
            })
            .catch((error) =>
              console.log(`an error occured while leaving the table: ${error}`)
            );
        }}
      >
        Leave Table
      </Button>
    </Box>
  );
};

export default GamePage;
