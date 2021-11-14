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
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import { getAxiosInstance } from "../axios";

const mockedTableList = [
  { id: 0, name: "table1", players: 3 },
  { id: 1, name: "table2", players: 7 },
  { id: 2, name: "table2", players: 8 },
  { id: 3, name: "table3", players: 0 },
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
        width: "50%",
        margin: "auto",
        marginTop: 200,
      }}
    >
      <Table component={Paper}>
        <TableBody style={{ backgroundColor: "#404040" }}>
          {openTables.map((tableObj, index) => {
            const buttonDisabled = tableObj.players === 8;
            return (
              <TableRow key={index}>
                <TableCell className="text" align="center">
                  {tableObj.name}
                </TableCell>
                <TableCell className="text" align="center">
                  {tableObj.players}/8 players
                </TableCell>
                <TableCell align="center">
                  <Button
                    className="text btn"
                    style={
                      buttonDisabled
                        ? { borderColor: "#888", color: "#888" }
                        : {}
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
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Button variant="contained" onClick={() => setAddTableDialogOpen(true)}>
          Create Table
        </Button>
      </Box>
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
  );
};

export default TablePage;
