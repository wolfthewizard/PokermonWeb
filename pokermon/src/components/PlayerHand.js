import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../style/style.css";
import PlayingCard from "./PlayingCard";

const PlayerHand = ({
  index,
  isPlaying,
  isAllIn,
  currentCash,
  currentBet,
  wonCash,
  pocketCards,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      {wonCash !== null && wonCash !== undefined ? (
        <Typography className="text">won: {wonCash}</Typography>
      ) : (
        <Typography className="text">bet: {currentBet}</Typography>
      )}
      {!isPlaying && <Typography className="text">PASS</Typography>}
      {isAllIn && <Typography className="text">ALL IN</Typography>}
      <Box>
        <PlayingCard number={pocketCards[0]} />
        <PlayingCard number={pocketCards[1]} />
      </Box>
    </Grid>
  );
};

export default PlayerHand;
