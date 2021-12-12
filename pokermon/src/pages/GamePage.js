import { Button, Grid } from "@mui/material";
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
    currentCash: 1200,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 1200,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 1200,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 1200,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 1200,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 1200,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 1200,
    currentBet: 300,
    wonCash: null,
    pocketCards: [],
  },
  {
    isPlaying: true,
    isAllIn: false,
    currentCash: 1200,
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
  pocketCards: [10, 42],
  players: mockedPlayerList,
  cashToCall: 0,
  canRaise: true,
};

const GamePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const gameId = params.gameId;

  const [cookies, _, removeCookie] = useCookies([]);
  const playerId = cookies["pokermon-uuid"];
  const tablePosition = cookies["pokermon-table-position"];
  const [gameData, setGameData] = useState({
    tableCards: [],
    players: [],
    currentPlayerPosition: 0,
    potValue: null,
    pocketCards: [],
  });

  const refreshGameData = () => {
    setGameData(mockedGameResponse);
    // getAxiosInstance()
    //     .get(
    //       `/api/game/${gameId}`,
    //       {},
    //       {
    //         headers: {
    //           playerId: playerId,
    //         },
    //       }
    //     )
    //     .then(({ data }) => {
    //       console.log(data);
    //     })
    //     .catch((error) =>
    //       console.log(`an error occured while refreshing game page: ${error}`)
    //     );
  };

  useEffect(refreshGameData, []);

  useEffect(() => {
    const id = setInterval(refreshGameData, 1000);
    return () => clearInterval(id);
  });

  return (
    <Grid container>
      <Grid xs={8} style={{ padding: 20 }}>
        <PokerTable
          cards={gameData.tableCards}
          players={gameData.players}
          currentPlayerPosition={gameData.currentPlayerPosition}
          potValue={gameData.potValue}
        />
      </Grid>
      <Grid xs={4}>
        <ControlPanel
          playerId={playerId}
          gameId={gameId}
          pocketCards={gameData.pocketCards}
          yourTurn={gameData.currentPlayerPosition === tablePosition}
          turnPlayerName={gameData.players[gameData.currentPlayerPosition]}
          currentCash={gameData.players[tablePosition]?.currentCash}
          currentBet={gameData.players[tablePosition]?.currentBet}
          cashToCall={gameData.cashToCall}
          disabled={
            gameData.currentPlayerPosition !== tablePosition ||
            !gameData.players[tablePosition]?.isPlaying ||
            !gameData.players[tablePosition]?.isAllIn
          }
        />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          style={{ paddingTop: 40 }}
        >
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
                  console.log(
                    `an error occured while leaving the table: ${error}`
                  )
                );
            }}
          >
            Leave Table
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GamePage;
