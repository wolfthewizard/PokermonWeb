import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../style/style.css";

const mockedTableList = [
  { id: 0, name: "table1", players: 3 },
  { id: 1, name: "table2", players: 7 },
  { id: 2, name: "table3", players: 8 },
  { id: 3, name: "table4", players: 0 },
];

const TablePage = () => {
  const navigate = useNavigate();
  const [openTables, setOpenTables] = useState([]);
  const [addTableDialogOpen, setAddTableDialogOpen] = useState(false);
  const [addedTableName, setAddedTableName] = useState("");

  const refreshOpenTables = () => {
    setOpenTables(mockedTableList);
  };

  useEffect(refreshOpenTables, []);

  return (
    <Box
      style={{
        height: "100vh",
        backgroundColor: "#ff00aa",
        overflow: "hidden",
        backgroundImage: "url(/table_list_bg.png)",
        backgroundSize: "cover",
      }}
    >
      <Box
        style={{
          width: "50%",
          margin: "auto",
          marginTop: 200,
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setAddTableDialogOpen(true)}
          >
            Create Table
          </Button>
          <Button variant="contained" onClick={refreshOpenTables}>
            Refresh Tables
          </Button>
        </Box>
        <Table component={Paper} style={{ opacity: 0.8 }}>
          <TableBody style={{ backgroundColor: "#404040" }}>
            {openTables.map((tableObj, index) => {
              const buttonDisabled = tableObj.players === 8;
              return (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Typography className="text">{tableObj.name}</Typography>
                  </TableCell>
                  <TableCell className="text" align="center">
                    <Typography className="text">
                      {tableObj.players}/8 players
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      style={
                        buttonDisabled
                          ? { borderColor: "#888", color: "#888" }
                          : { borderColor: "white", color: "white" }
                      }
                      variant="outlined"
                      disabled={buttonDisabled}
                      onClick={() => navigate(`/game/${tableObj.id}`)}
                    >
                      Join
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Dialog
          open={addTableDialogOpen}
          onClose={() => setAddTableDialogOpen(false)}
        >
          <DialogTitle>Create new table</DialogTitle>
          <DialogContent>
            <TextField
              value={addedTableName}
              placeholder="Table name"
              onChange={({ target: { value } }) => setAddedTableName(value)}
              autoFocus
              fullWidth
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddTableDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                // getAxiosInstance()
                //   .post("/api/tables/create", { name: addedTableName })
                //   .then(() => console.log("successfully added new table"))
                //   .catch((error) =>
                //     console.error(
                //       `an error occured during adding new table: ${error}`
                //     )
                //   );
                setAddedTableName("");
                setAddTableDialogOpen(false);
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default TablePage;
