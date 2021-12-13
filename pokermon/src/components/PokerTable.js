import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PlayerHand from "./PlayerHand";
import PlayerInfo from "./PlayerInfo";
import PlayingCard from "./PlayingCard";

const PokerTable = ({
  players,
  cards,
  currentPlayerPosition,
  potValue,
  isEndOfHand,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      style={{ marginTop: 20 }}
    >
      <Box style={{ width: "100%" }}>
        <Grid container style={{ marginBottom: 10 }}>
          {players.slice(0, 4).map((player, i) => (
            <Grid item xs={3} key={i}>
              <PlayerInfo
                index={i}
                isPlaying={player?.isPlaying}
                currentCash={player?.currentCash}
                isOwnTurn={currentPlayerPosition === i}
                isPresent={player !== null && player !== undefined}
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
          <Grid
            container
            style={{
              height: 150,
            }}
          >
            {players.slice(0, 4).map((player, i) => (
              <Grid item xs={3} key={i}>
                <PlayerHand
                  index={i}
                  isEndOfHand={isEndOfHand}
                  isPlaying={player?.isPlaying}
                  isAllIn={player?.isAllIn}
                  currentCash={player?.currentCash}
                  currentBet={player?.currentBet}
                  wonCash={player?.wonCash}
                  pocketCards={player?.pocketCards}
                  isPresent={player !== null && player !== undefined}
                />
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            style={{ marginTop: 40, marginBottom: 8, height: 200 }}
          >
            <Box>
              {[...Array(5).keys()]
                .map((i) => (i > cards.length ? null : cards[i]))
                .map((cardNum, i) => (
                  <PlayingCard number={cardNum} key={i} />
                ))}
            </Box>
            <Typography className="text" style={{ fontSize: 32 }}>
              {potValue ? `Pot: ${potValue}` : "⠀"}
            </Typography>
          </Grid>

          <Grid
            container
            style={{
              height: 150,
            }}
          >
            {players
              .slice(4, 8)
              .reverse()
              .map((player, i) => (
                <Grid item xs={3} key={i}>
                  <PlayerHand
                    index={7 - i}
                    isEndOfHand={isEndOfHand}
                    isPlaying={player?.isPlaying}
                    isAllIn={player?.isAllIn}
                    currentCash={player?.currentCash}
                    currentBet={player?.currentBet}
                    wonCash={player?.wonCash}
                    pocketCards={player?.pocketCards}
                    isPresent={player !== null && player !== undefined}
                    reverse
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Grid container style={{ marginTop: 10 }}>
          {players
            .slice(4, 8)
            .reverse()
            .map((player, i) => (
              <Grid item xs={3} key={i}>
                <PlayerInfo
                  index={7 - i}
                  isPlaying={player?.isPlaying}
                  currentCash={player?.currentCash}
                  isOwnTurn={currentPlayerPosition === 7 - i}
                  isPresent={player !== null && player !== undefined}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default PokerTable;
