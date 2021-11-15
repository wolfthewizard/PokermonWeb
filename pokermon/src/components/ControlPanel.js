import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import "../style/style.css";
import { Box } from "@mui/system";
import PlayingCard from "./PlayingCard";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "gray",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
}));

const ControlPanel = ({
  pocketCards,
  disabled,
  cashToCall,
  canRaise,
  yourTurn,
  turnPlayerName,
}) => {
  const classes = useStyles();
  const [betAmountString, setBetAmountString] = useState("");

  return (
    <Box style={{ marginRight: 20 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        style={{
          backgroundColor: "#444",
          borderRadius: 20,
          marginTop: 50,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Box>
          <Typography style={{ color: "white", fontSize: 24 }}>
            {yourTurn ? "Your Turn" : `${turnPlayerName}'s turn'`}
          </Typography>
        </Box>
        <Box style={{ paddingBottom: 40 }}>
          <PlayingCard number={pocketCards[0]} size={160} />
          <PlayingCard number={pocketCards[1]} size={160} />
        </Box>
        <Box>
          <Typography style={{ color: "white" }}>
            Minimum bet: {cashToCall || 0}
          </Typography>
        </Box>
        <Box style={{ paddingBottom: 10 }}>
          <TextField
            onChange={({ target: { value } }) => setBetAmountString(value)}
            label="Amount"
            variant="outlined"
            className={classes.root}
            inputProps={{ style: { color: "white" } }}
          />
          <Button
            disabled={disabled}
            variant="contained"
            className="text"
            style={{ height: "100%" }}
          >
            Bet
          </Button>
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <Button disabled={disabled} variant="contained" className="text">
              Fold
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={disabled} variant="contained" className="text">
              Check
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlPanel;
