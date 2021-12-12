import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../style/style.css";
import PlayingCard from "./PlayingCard";

const PlayerHand = ({
  isEndOfHand,
  isPlaying,
  isAllIn,
  currentBet,
  wonCash,
  pocketCards,
  reverse,
  isPresent,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction={reverse ? "column" : "column-reverse"}
    >
      {isPresent &&
        (isEndOfHand ? (
          <Typography className="text">won: {wonCash}</Typography>
        ) : (
          <Typography className="text">bet: {currentBet}</Typography>
        ))}
      {isPresent && !isPlaying && (
        <Typography className="text">FOLD</Typography>
      )}
      {isPresent && isAllIn && <Typography className="text">ALL IN</Typography>}
      {isPresent && (
        <Box>
          <PlayingCard number={pocketCards && pocketCards[0]} />
          <PlayingCard number={pocketCards && pocketCards[1]} />
        </Box>
      )}
    </Grid>
  );
};

export default PlayerHand;
