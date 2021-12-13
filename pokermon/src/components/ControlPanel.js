import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import "../style/style.css";
import { Box } from "@mui/system";
import PlayingCard from "./PlayingCard";
import { makeStyles } from "@mui/styles";
import { getAxiosInstance } from "../axios";

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
  playerId,
  gameId,
  pocketCards,
  disabled,
  cashToCall,
  canRaise,
  yourTurn,
  turnPlayerIndex,
  currentCash,
  currentBet,
}) => {
  const classes = useStyles();
  const [betAmountString, setBetAmountString] = useState("");

  const validateBetAmount = () => {
    const isNumber =
      !isNaN(betAmountString) && !isNaN(parseInt(betAmountString));
    if (!isNumber) {
      return false;
    }
    const betAmount = parseInt(betAmountString);
    const isInCorrectInterval =
      betAmount >= cashToCall && (canRaise || betAmount <= cashToCall);
    return isInCorrectInterval;
  };

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
            {yourTurn ? "Your Turn" : `Player${turnPlayerIndex}'s turn`}
          </Typography>
        </Box>
        <Box style={{ paddingBottom: 10 }}>
          <PlayingCard number={pocketCards && pocketCards[0]} size={160} />
          <PlayingCard number={pocketCards && pocketCards[1]} size={160} />
        </Box>
        <Box style={{ paddingBottom: 30 }}>
          <Typography style={{ color: "white", fontSize: 16 }}>
            Your cash: {currentCash}
          </Typography>
          <Typography style={{ color: "white", fontSize: 16 }}>
            Your bet: {currentBet}
          </Typography>
        </Box>
        <Box>
          <Typography style={{ color: "white", height: 30 }}>
            {!disabled &&
              ((canRaise ? "Minimum bet: " : "You have to bet exactly ") +
                cashToCall.toString() ||
                "0")}
          </Typography>
        </Box>
        <Box style={{ paddingBottom: 10 }}>
          <TextField
            value={betAmountString}
            onChange={({ target: { value } }) => setBetAmountString(value)}
            label="Amount"
            variant="outlined"
            className={classes.root}
            inputProps={{ style: { color: "white" } }}
            error={!disabled && !validateBetAmount()}
          />
          <Button
            disabled={disabled || !validateBetAmount()}
            variant="contained"
            className="text"
            style={{ height: "100%" }}
            onClick={() => {
              setBetAmountString("");
              getAxiosInstance()
                .post(
                  `/api/game/bet/${gameId}`,
                  {
                    value: parseInt(betAmountString),
                  },
                  {
                    headers: {
                      playerId,
                    },
                  }
                )
                .catch((error) =>
                  console.log(`an error occured while betting: ${error}`)
                );
            }}
          >
            Bet
          </Button>
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              disabled={disabled}
              variant="contained"
              className="text"
              onClick={() => {
                getAxiosInstance()
                  .post(
                    `/api/game/fold/${gameId}`,
                    {},
                    {
                      headers: {
                        playerId,
                      },
                    }
                  )
                  .catch((error) =>
                    console.log(`an error occured while folding: ${error}`)
                  );
              }}
            >
              Fold
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={disabled}
              variant="contained"
              className="text"
              onClick={() => {
                getAxiosInstance()
                  .post(
                    `/api/game/check/${gameId}`,
                    {},
                    {
                      headers: {
                        playerId,
                      },
                    }
                  )
                  .catch((error) =>
                    console.log(`an error occured while checking: ${error}`)
                  );
              }}
            >
              Check
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlPanel;
