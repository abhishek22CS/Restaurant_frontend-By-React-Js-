import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Snackbar,
  Grid,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import Swal from "sweetalert2";
import Heading from "../../components/heading/Heading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

import { serverURL,getData,postData } from "../../services/FetchNodeServices";

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
    width: "80%",
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

export default function DisplayAllTable() {
  var classes = useStyles();
  var admin = JSON.parse(localStorage.getItem("ADMIN"));

  const navigate=useNavigate()

  const [listTable, setListTable] = useState([]);
  const [open, setOpen] = useState(false);

  const [floor, setFloor] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [numberOfChairs, setNumberOfChairs] = useState("");
  const [tableId, setTableId] = useState("");
  const [tableError, setTableError] = useState("");

  const handleError = (error, input, message) => {
    setTableError((prevState) => ({
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

    if (!tableNumber) {
      handleError(true, "tableNumber", "Please Input Table Number");
      submitRecord = false;
    }

    if (!numberOfChairs) {
      handleError(true, "numberOfChairs", "Please Input Number of Chairs");
      submitRecord = false;
    }

    if (!floor) {
      handleError(true, "floor", "Please Select Floor");
      submitRecord = false;
    }
    return submitRecord;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const body = {
        restaurantid: restaurantId,
        tableno: tableNumber,
        noofchairs: numberOfChairs,
        floor: floor,
        tableid: tableId,
      };

      var result = await postData("tablebooking/table_edit_data", body);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Table Booking Registration",
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

  const fetchAllTable = async () => {
    var result = await postData("tablebooking/fetch_all_tablebook",{restaurantid:admin.restaurantid});
    setListTable(result.data);
  };

  const handleEdit = (rowData) => {
    setRestaurantId(rowData.restaurantid);
    setTableNumber(rowData.tableno);
    setNumberOfChairs(rowData.noofchairs);
    setFloor(rowData.floor);
    setTableId(rowData.tableid);

    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    fetchAllTable();
  };

  const showDataInDialog = () => {
    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Heading title={"Table Registeration"} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setRestaurantId(event.target.value)}
                label="Restaurant Id"
                onFocus={() => handleError(false, "restaurantId", "")}
                error={tableError?.restaurantId?.error}
                helperText={tableError?.restaurantId?.message}
                value={restaurantId}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setTableNumber(event.target.value)}
                label="Table Number"
                onFocus={() => handleError(false, "tableNumber", "")}
                error={tableError?.tableNumber?.error}
                helperText={tableError?.tableNumber?.message}
                value={tableNumber}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setNumberOfChairs(event.target.value)}
                label="Number of Chairs"
                onFocus={() => handleError(false, "numberOfChairs", "")}
                error={tableError?.numberOfChairs?.error}
                helperText={tableError?.numberOfChairs?.message}
                value={numberOfChairs}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Floor</InputLabel>
                <Select
                  onChange={(event) => setFloor(event.target.value)}
                  onFocus={() => handleError(false, "floor", "")}
                  error={tableError?.floor?.error}
                  helperText={tableError?.floor?.message}
                  value={floor}
                  label="Floor"
                >
                  <MenuItem>-Select Floor-</MenuItem>
                  <MenuItem value="Ground Floor">Ground Floor</MenuItem>
                  <MenuItem value="First Floor">First Floor</MenuItem>
                  <MenuItem value="Second Floor">Second Floor</MenuItem>
                  <MenuItem value="Third Floor">Third Floor</MenuItem>
                  <MenuItem value="Fourth Floor">Fourth Floor</MenuItem>
                  <MenuItem value="Fifth Floor">Fifth Floor</MenuItem>
                  <MenuItem value="Sixth Floor">Sixth Floor</MenuItem>
                  <MenuItem value="Seventh Floor">Seventh Floor</MenuItem>
                  <MenuItem value="Eighth Floor">Eighth Floor</MenuItem>
                  <MenuItem value="Ninth Floor">Ninth Floor</MenuItem>
                  <MenuItem value="Tenth Floor">Tenth Floor</MenuItem>
                  <MenuItem value="Roof Top">Roof Top</MenuItem>
                </Select>
                <FormHelperText error>
                  {tableError?.floor?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleSubmit} variant="contained" fullWidth>
                Submit
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
    fetchAllTable();
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
        const body = { tableid: rowData.tableid };
        const result = await postData("tablebooking/table_delete", body);
        if (result.status) {
          Swal.fire("Deleted!", "", result.message);
          fetchAllTable();
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
        title="TableBooking List"
        columns={[
          { title: "RestaurantId", field: "restaurantid" },
          { title: "Table Number", field: "tableno" },
          { title: "Number of Chairs", field: "noofchairs" },
          { title: "Floor", field: "floor" },
        ]}
        data={listTable}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Edit Table Booking",
            onClick: (event, rowData) => handleEdit(rowData),
          },
          {
            icon: DeleteIcon,
            tooltip: "Delete Table Booking",
            onClick: (event, rowData) => handleDelete(rowData),
          },
          {
            icon: AddIcon,
            tooltip: "Add Table Booking",
            isFreeAction: true,
            onClick: (event, rowData) =>  navigate('/admindashboard/tablebookinginterface')
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
