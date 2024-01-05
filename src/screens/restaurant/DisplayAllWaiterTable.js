import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import {
  Grid,
  TextField,
  Button,
  Select,
  FormHelperText,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Swal from "sweetalert2";
import Heading from "../../components/heading/Heading";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";

const useStyles = makeStyles({
  rootdisplay: {
    width: "auto",
    height: "90vh",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxdisplay: {
    width: "75%",
    height: "auto",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
  },

  root: {
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: "auto",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function DisplayAllWaiterTable() {
  var classes = useStyles();
  var admin = JSON.parse(localStorage.getItem("ADMIN"));

  const navigate = useNavigate();
  const [listWaiterTable, setListWaiterTable] = useState([]);
  const [open, setOpen] = useState(false);

  const [waiters, setWaiters] = useState([]);
  const [tables, setTables] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [waiterId, setWaiterId] = useState("");
  const [tableId, setTableId] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [waiterTableId, setWaiterTableId] = useState("");
  const [waiterTableError, setWaiterTableError] = useState("");

  const handleError = (error, input, message) => {
    setWaiterTableError((prevState) => ({
      ...prevState,
      [input]: { error: error, message: message },
    }));
  };

  const validation = () => {
    var submitRecord = true;
    if (!restaurantId) {
      handleError(true, "restaurantId", "Please Input Restaurant Id");
      submitRecord = false;
    }

    if (!waiterId) {
      handleError(true, "waiterId", "Please Input Waiter Id");
      submitRecord = false;
    }

    if (!tableId) {
      handleError(true, "tableId", "Please Input Table Number Id");
      submitRecord = false;
    }

    if (!currentDate) {
      handleError(true, "currentDate", "Please Input Correct Date");
      submitRecord = false;
    }

    return submitRecord;
  };

  const fetchAllWaiterTable = async () => {
    var result = await postData("waiter/fetch_all_waiter", {
      restaurantid: admin.restaurantid,
    });
    setWaiters(result.data);
    // alert(JSON.stringify(result.data));
  };

  const fetchAllTables = async () => {
    var result = await postData("tablebooking/fetch_all_tablebook", {
      restaurantid: admin.restaurantid,
    });

    setTables(result.data);
  };

  const fetchAllWaiterTableNitin = async () => {
    var result = await getData("waitertable/fetch_all_waitertable", {
      restaurantid: admin.restaurantid,
    });
    setListWaiterTable(result.data);
    // alert(JSON.stringify(result));
  };

  useEffect(function () {
    fetchAllWaiterTable();
    fetchAllWaiterTableNitin();
  }, []);

  useEffect(function () {
    fetchAllTables();
  }, []);

  const fillWaiterTable = () => {
    return waiters.map((item) => {
      return <MenuItem value={item.waiterid}>{item.waitername}</MenuItem>;
    });
  };

  const fillTables = () => {
    return tables.map((item) => {
      return <MenuItem value={item.tableid}>{item.tableno}</MenuItem>;
    });
  };

  const handleWaiterChange = (event) => {
    setWaiterId(event.target.value);
  };

  const handleTableChange = (event) => {
    setTableId(event.target.value);
  };

  const handleSubmit = async () => {
    if (validation()) {
      const body = {
        restaurantid: restaurantId,
        waiterid: waiterId,
        tableid: tableId,
        currentdate: currentDate,
        waitertableid: waiterTableId,
      };

      var result = await postData("waitertable/waitertable_edit_data", body);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Waiter Table Registration",
          text: result.message,
          position: "center",
          timer: 5000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
          position: "center",
          timer: 5000,
          showConfirmButton: false,
        });
      }
    }
  };

  const fetchAll = async () => {
    var result = await getData("waitertable/fetch_all_waitertable");
    // setListWaiterTable(result.data)
  };

  const handleEdit = (rowData) => {
    setRestaurantId(rowData.restaurantid);
    setWaiterId(rowData.waiterid);
    setTableId(rowData.tableid);
    setCurrentDate(rowData.currentdate);
    setWaiterTableId(rowData.waitertableid);

    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    fetchAll();
  };

  const showDataInDialog = () => {
    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heading title={"Waiter Table Registeration"} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setRestaurantId(event.target.value)}
                onFocus={() => handleError(false, "restaurantId", "")}
                error={waiterTableError?.restaurantId?.error}
                helperText={waiterTableError?.restaurantId?.message}
                label="Restaurant Id"
                value={restaurantId}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Waiter</InputLabel>
                <Select
                  onChange={handleWaiterChange}
                  onFocus={() => handleError(false, "waiterId", "")}
                  error={waiterTableError?.waiterId?.error}
                  helperText={waiterTableError?.waiterId?.message}
                  value={waiterId}
                  label="Waiter"
                >
                  <MenuItem>-Select Waiter-</MenuItem>
                  {fillWaiterTable()}
                </Select>
                <FormHelperText error>
                  {waiterTableError?.waiterId?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Table Number Id</InputLabel>
                <Select
                  onChange={handleTableChange}
                  onFocus={() => handleError(false, "tableId", "")}
                  error={waiterTableError?.tableId?.error}
                  helperText={waiterTableError?.tableId?.message}
                  value={tableId}
                  label="Table Number Id"
                >
                  <MenuItem>-Select Table Number Id-</MenuItem>
                  {fillTables()}
                </Select>
                <FormHelperText error>
                  {waiterTableError?.tableNoId?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setCurrentDate(event.target.value)}
                onFocus={() => handleError(false, "currentDate", "")}
                error={waiterTableError?.currentDate?.error}
                helperText={waiterTableError?.currentDate?.message}
                label=" Current Date"
                value={currentDate}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleSubmit} variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth>
                Reset
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const showDialogForEdit = () => {
    return (
      <Dialog maxWidth={"lg"} open={open}>
        <DialogContent>{showDataInDialog()}</DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Update</Button>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(function () {
    fetchAll();
  }, []);

  const handleDelete = async (rowData) => {
    Swal.fire({
      title: "Do you want to delete the record?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const body = { waitertableid: rowData.waitertableid };
        const result = await postData("waitertable/waitertable_delete", body);
        if (result.status) {
          Swal.fire("Deleted!", "", result.message);
          fetchAll();
        } else Swal.fire("Fail!", "", result.message);
      } else if (result.isDenied) {
        Swal.fire("Table Booking not Deleted", "", "info");
      }
    });
  };

  const handleAdd = () => [];

  function displayAll() {
    return (
      <MaterialTable
        title="Waiter List"
        columns={[
          { title: "RestaurantId", field: "restaurantid" },
          { title: "Waiter Name", field: "waitername" },
          {
            title: "Table No",
            render: (rowData) => (
              <>
                <div>
                  {rowData.floor},Table {rowData.tableno}
                </div>
              </>
            ),
          },
          { title: "Table ID", field: "tableid" },
          { title: "Current Date", field: "currentdate" },
        ]}
        data={listWaiterTable}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Edit Waiter Table Registeration",
            onClick: (event, rowData) => handleEdit(rowData),
          },
          {
            icon: DeleteIcon,
            tooltip: "Delete Waiter Table Registeration",
            onClick: (event, rowData) => handleDelete(rowData),
          },
          {
            icon: AddIcon,
            tooltip: "Add Waiter Table Registeration",
            isFreeAction: true,
            onClick: (event, rowData) =>
              navigate("/admindashboard/waitertableinterface"),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.rootdisplay}>
      <div className={classes.boxdisplay}>{displayAll()}</div>
      {showDialogForEdit()}
    </div>
  );
}
