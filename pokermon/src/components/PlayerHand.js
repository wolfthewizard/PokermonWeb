import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../style/style.css";
import PlayingCard from "./PlayingCard";

const PlayerHand = ({
  isPlaying,
  isAllIn,
  currentBet,
  wonCash,
  pocketCards,
  reverse,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction={reverse ? "column" : "column-reverse"}
    >
      {wonCash !== null && wonCash !== undefined ? (
        <Typography className="text">won: {wonCash}</Typography>
      ) : (
        <Typography className="text">bet: {currentBet}</Typography>
      )}
      {!isPlaying && <Typography className="text">FOLD</Typography>}
      {isAllIn && <Typography className="text">ALL IN</Typography>}
      <Box>
        <PlayingCard number={pocketCards[0]} />
        <PlayingCard number={pocketCards[1]} />
      </Box>
    </Grid>
  );
};

export default PlayerHand;
