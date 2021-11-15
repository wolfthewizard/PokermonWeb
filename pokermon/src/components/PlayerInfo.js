import { Grid, Typography } from "@mui/material";
import React from "react";
import "../style/style.css";

const PlayerInfo = ({ index, isPlaying, currentCash }) => {
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
      <Typography className="text">{`is playing: ${isPlaying}`}</Typography>
    </Grid>
  );
};

export default PlayerInfo;
