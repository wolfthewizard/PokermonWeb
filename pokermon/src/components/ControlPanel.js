import React from "react";
import { Button, Grid } from "@mui/material";
import "../style/style.css";

const ControlPanel = ({ disabled, cashToCall, canRaise }) => {
  return (
    <Grid>
      <Button variant="contained" className="text">
        Fold
      </Button>
      <Button variant="contained" className="text">
        Check
      </Button>
      <Button variant="contained" className="text">
        Bet
      </Button>
    </Grid>
  );
};

export default ControlPanel;
