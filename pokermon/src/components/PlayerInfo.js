import { Grid, Typography } from "@mui/material";
import React from "react";
import "../style/style.css";

const PlayerInfo = ({
  index,
  isPlaying,
  currentCash,
  isOwnTurn,
  isPresent,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      style={
        isOwnTurn
          ? { backgroundColor: "#444", borderRadius: 10 }
          : !isPlaying
          ? { opacity: 0.2, borderRadius: 10 }
          : {}
      }
    >
      <Typography className="text" style={{ fontWeight: "bold" }}>
        {isPresent && `Player${index}`}
      </Typography>
      <Typography className="text">{isPresent && currentCash}</Typography>
    </Grid>
  );
};

export default PlayerInfo;
