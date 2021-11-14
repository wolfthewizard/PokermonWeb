import { Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

const cardRanks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace",
];
const cardSuits = ["poke", "great", "ultra", "master"];

const PlayingCard = ({ number }) => {
  const isUncovered = number !== undefined && number !== null;
  const suit = Math.floor(number / 13);
  const rank = number % 13;
  const fileName = isUncovered ? `card_${suit}_${rank}.png` : "card_back.png";
  return (
    <Tooltip
      title={
        isUncovered ? (
          <Typography style={{ fontSize: 24 }}>
            {" "}
            {`${cardRanks[rank]} of ${cardSuits[suit]}`}{" "}
          </Typography>
        ) : (
          ""
        )
      }
    >
      <img style={{ width: 100 }} src={`/playing_cards/${fileName}`} />
    </Tooltip>
  );
};

export default PlayingCard;
