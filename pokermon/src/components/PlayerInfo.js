import { Grid, Typography } from "@mui/material";
import React from "react";
import "../style/style.css";

const PlayerInfo = ({
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
      <Typography className="text" style={{ fontWeight: "bold" }}>
        Player{index}
      </Typography>
      <Typography className="text">{currentCash}</Typography>
      <Typography className="text">{currentBet}</Typography>
      <Typography className="text">{wonCash}</Typography>
      <Typography className="text">{pocketCards}</Typography>
      <Typography className="text">{isPlaying}</Typography>
      {isAllIn && <Typography className="text">ALL IN</Typography>}
    </Grid>
  );
};

export default PlayerInfo;
