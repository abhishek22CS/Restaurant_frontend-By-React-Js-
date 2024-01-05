import { useState, useEffect } from "react";
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
import Swal from "sweetalert2";
import Heading from "../../components/heading/Heading";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";

const useStyles = makeStyles({
  root: {
    width: "auto",
    height: "90vh",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "50%",
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

export default function WaiterTableInterface() {
  var classes = useStyles();
  var admin = JSON.parse(localStorage.getItem("ADMIN"));

  const [waiters, setWaiters] = useState([]);
  const [tables, setTables] = useState([]);
  const [floor,setFloor]=useState([]);
  const [floorNo,setFloorNo]=useState('');

  const [restaurantId, setRestaurantId] = useState(admin.restaurantid);
  const [waiterId, setWaiterId] = useState("");
  const [tableId, setTableId] = useState("");
  const [currentDate, setCurrentDate] = useState("");
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
    // alert(setWaiters)
  };
  const fetchAllFloor=async()=>{
    const result=await postData('tablebooking/fetch_all_floor',{restaurantid:admin.restaurantid});
    setFloor(result.data);
 }


  // const fetchAllTables = async () => {
  //   var result = await postData("waitertable/fetch_all_tablebooking", { restaurantid: admin.restaurantid, });
  //   setTables(result.data)
  //   // alert(JSON.stringify(result));
  // };
  const fetchAllTable=async(fn)=>{
    const result=await postData('tablebooking/fetch_all_table_by_floor',{restaurantid:admin.restaurantid,floor:fn});
    setTables(result.data);
 }

  useEffect(function () {
    fetchAllWaiterTable();
    fetchAllFloor()

  }, []);

  useEffect(function () {
    fetchAllTable();
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
  const fillFloor=()=>{
    return floor.map((item)=>{
      return <MenuItem value={item.floor}>{item.floor}</MenuItem>
    });
  }

  const handleWaiterChange = (event) => {
    setWaiterId(event.target.value);
  };

  const handleTableChange = (event) => {
    setTableId(event.target.value);
  };

  const handleSubmit = async () => {
    var error = validation();
    if (error) {
      var formdata = new FormData();
      formdata.append("restaurantid", restaurantId);
      formdata.append("waiterid", waiterId);
      formdata.append("floor",floorNo);
      formdata.append("tableid", tableId);
      formdata.append("currentdate", currentDate);

      var result = await postData("waitertable/waitertable_submit", formdata);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Waiter Table Registration",
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
        });
      }
    }
  };
  const handleFloorChange=(event)=>{
    setFloorNo(event.target.value)
    fetchAllTable(event.target.value)
  
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Heading
              title={"Waiter Table Registeration"}
              myroute={"/admindashboard/displayallwaitertable"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              //  onChange={(event)=>setRestaurantId(event.target.value)}
              // onFocus={()=>handleError(false,'restaurantId','')}
              // error={waiterTableError?.restaurantId?.error}
              // helperText={waiterTableError?.restaurantId?.message}
              label="Restaurant Id"
              fullWidth
              value={restaurantId}
              disabled
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
            <InputLabel>Floor No</InputLabel>
            <Select label={"Floor no"} 
             
               onChange={(event)=>handleFloorChange(event)} 
              value={floorNo}>
              <MenuItem>-Select Floor-</MenuItem>
              {fillFloor()}
              
            </Select>
              
           </FormControl>
        </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Table Number Id</InputLabel>
              <Select
                onChange={handleTableChange}
                onFocus={() => handleError(false, "tableNoId", "")}
                error={waiterTableError?.tableNoId?.error}
                helperText={waiterTableError?.tableNoId?.message}
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
          <Grid item xs={12}>
            <TextField
              onChange={(event) => setCurrentDate(event.target.value)}
              onFocus={() => handleError(false, "currentDate", "")}
              error={waiterTableError?.currentDate?.error}
              helperText={waiterTableError?.currentDate?.message}
              label=" Current Date"
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
}
