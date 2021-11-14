import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PlayerHand from "./PlayerHand";
import PlayerInfo from "./PlayerInfo";
import PlayingCard from "./PlayingCard";

const PokerTable = ({ players, cards }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box style={{ width: "80%" }}>
        <Grid container>
          {players.slice(0, 4).map((player, i) => (
            <Grid item xs={3}>
              <PlayerInfo
                index={i}
                isPlaying={player.isPlaying}
                isAllIn={player.isAllIn}
                currentCash={player.currentCash}
                currentBet={player.currentBet}
                wonCash={player.wonCash}
                pocketCards={player.pocketCards}
                key={i}
              />
            </Grid>
          ))}
        </Grid>
        <Box
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: "#038664",
            borderRadius: 50,
          }}
        >
          <Grid container>
            {players.slice(0, 4).map((player, i) => (
              <Grid item xs={3}>
                <PlayerHand
                  index={i}
                  isPlaying={player.isPlaying}
                  isAllIn={player.isAllIn}
                  currentCash={player.currentCash}
                  currentBet={player.currentBet}
                  wonCash={player.wonCash}
                  pocketCards
                  key={i}
                />
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Box>
              {cards.map((cardNum) => (
                <PlayingCard number={cardNum} />
              ))}
            </Box>
          </Grid>
          <Grid container>
            {players
              .slice(4, 8)
              .reverse()
              .map((player, i) => (
                <Grid item xs={3}>
                  <PlayerHand
                    index={7 - i}
                    isPlaying={player.isPlaying}
                    isAllIn={player.isAllIn}
                    currentCash={player.currentCash}
                    currentBet={player.currentBet}
                    wonCash={player.wonCash}
                    pocketCards
                    key={i}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Grid container>
          {players
            .slice(4, 8)
            .reverse()
            .map((player, i) => (
              <Grid item xs={3}>
                <PlayerInfo
                  index={7 - i}
                  isPlaying={player.isPlaying}
                  isAllIn={player.isAllIn}
                  currentCash={player.currentCash}
                  currentBet={player.currentBet}
                  wonCash={player.wonCash}
                  pocketCards
                  key={i}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default PokerTable;