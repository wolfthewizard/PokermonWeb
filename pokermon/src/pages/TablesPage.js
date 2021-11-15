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
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import { getAxiosInstance } from "../axios";
import { useCookies } from "react-cookie";
import { makeStyles } from "@mui/styles";

const mockedTableList = [
  { id: 0, name: "table1", players: 3 },
  { id: 1, name: "table2", players: 7 },
  { id: 2, name: "table3", players: 8 },
  { id: 3, name: "table4", players: 0 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "white",
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

const TablePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openTables, setOpenTables] = useState([]);
  const [addTableDialogOpen, setAddTableDialogOpen] = useState(false);
  const [addedTableName, setAddedTableName] = useState("");
  const [tableNameFilter, setTableNameFilter] = useState("");
  const [filterQueryId, setFilterQueryId] = useState(0);
  const [rawFilterQuery, setRawFilterQuery] = useState("");
  const setCookie = useCookies([])[1];

  const refreshOpenTables = () => {
    getAxiosInstance()
      .get("/api/tables")
      .then(({ data }) => {
        setOpenTables(data);
      })
      .catch((error) =>
        console.error(`an error occured while fetching tables: ${error}`)
      );
  };

  useEffect(refreshOpenTables, []);

  useEffect(() => {
    const startingFilterQueryId = filterQueryId;
    const rawFilterQuery = tableNameFilter;
    setFilterQueryId((prevFilterQueryId) => prevFilterQueryId + 1);
    setTimeout(() => {
      if (startingFilterQueryId === filterQueryId) {
        setRawFilterQuery(rawFilterQuery);
      }
    }, 500);
  }, [tableNameFilter]);

  const filterQueries = rawFilterQuery
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((filterPart) => filterPart.toLowerCase());
  const filteredTables = openTables.filter((tab) =>
    filterQueries.every((fq) => tab.name.toLowerCase().includes(fq))
  );

  return (
    <Box
      style={{
        height: "100vh",
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
          <TextField
            onChange={({ target: { value } }) => setTableNameFilter(value)}
            label="Filter"
            variant="outlined"
            className={classes.root}
            inputProps={{ style: { color: "white" } }}
          />
          <Button variant="contained" onClick={refreshOpenTables}>
            Refresh Tables
          </Button>
        </Box>
        <TableContainer component={Paper} style={{ opacity: 0.8 }}>
          <Table>
            <TableHead />
            <TableBody style={{ backgroundColor: "#404040" }}>
              {filteredTables.map((tableObj, index) => {
                const buttonDisabled = tableObj.players === 8;
                return (
                  <TableRow key={index}>
                    <TableCell align="center" style={{ borderBottom: "none" }}>
                      <Typography className="text">{tableObj.name}</Typography>
                    </TableCell>
                    <TableCell align="center" style={{ borderBottom: "none" }}>
                      <Typography className="text">
                        {tableObj.players}/8 players
                      </Typography>
                    </TableCell>
                    <TableCell align="center" style={{ borderBottom: "none" }}>
                      <Button
                        style={
                          buttonDisabled
                            ? { borderColor: "#888", color: "#888" }
                            : { borderColor: "white", color: "white" }
                        }
                        variant="outlined"
                        disabled={buttonDisabled}
                        onClick={() => {
                          getAxiosInstance()
                            .post(`/api/tables/join/${tableObj.id}`)
                            .then(({ data: { playerId, tablePosition } }) => {
                              setCookie("pokermon-uuid", playerId, {
                                sameSite: true,
                              });
                              setCookie(
                                "pokermon-table-position",
                                tablePosition,
                                { sameSite: true }
                              );
                              navigate(`/game/${tableObj.id}`);
                            })
                            .catch((error) =>
                              console.log(
                                `an error occured while joining a table: ${error}`
                              )
                            );
                        }}
                      >
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddTableDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                getAxiosInstance()
                  .post("/api/tables/create", { name: addedTableName })
                  .then(refreshOpenTables)
                  .catch((error) =>
                    console.error(
                      `an error occured during adding new table: ${error}`
                    )
                  );
                setAddTableDialogOpen(false);
                setAddedTableName("");
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
