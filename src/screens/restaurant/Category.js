import { useState, useEffect } from "react";
import { Height } from "@mui/icons-material";
import { Avatar, Grid, TextField, Button, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import UploadFile from "@mui/icons-material/UploadFile";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";
import Heading from "../../components/heading/Heading";

import Swal from "sweetalert2";

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
    width: "70%",
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
  heading: {
    fontFamily: "Kanit",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    alignItems: "center",
    display: "flex",
  },
});
export default function Category() {
  var classes = useStyles();
  var admin = JSON.parse(localStorage.getItem("ADMIN"));

  const [categoryId, setCategoryId] = useState([]);
  const [restaurantId, setRestaurantId] = useState(admin.restaurantid);
  const [categoryName, setCategoryName] = useState([]);
  const [resError, setResError] = useState([]);

  const [fileIcon, setFileIcon] = useState({ url: "", bytes: "" });
  const handleSubmit = async () => {
    var error = validation();
    console.log("After Submit:", resError);
    if (error) {
      var formData = new FormData();
      formData.append("restaurantid", restaurantId);
      formData.append("categoryid", categoryId);
      formData.append("categoryname", categoryName);
      formData.append("icon", fileIcon.bytes);
      var d = new Date();
      var cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

      formData.append("createdat", cd);
      formData.append("updatedat", cd);
      var result = await postData("category/category_submit", formData);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Restaurant Registration",
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
  const handleimg = (event) => {
    setFileIcon({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  //////////////////////////////////////////////////////////////////////////

  const handleError = (error, input, message) => {
    setResError((prevState) => ({
      ...prevState,
      [input]: { error: error, message: message },
    }));
    console.log("CC", resError);
  };

  ///////////////////////////////////////////////////////////////////////

  const validation = () => {
    var submitRecord = true;
    if (restaurantId.length == 0) {
      handleError(true, "restaurantId", "Pls Input Restaurant ID");

      submitRecord = false;
    }
    if (categoryName.length == 0) {
      handleError(true, "categoryName", "Pls Input Category Name");

      submitRecord = false;
    }

    if (!fileIcon.url) {
      handleError(true, "fileIcon", "Pls Upload Icon");

      submitRecord = false;
    }
    return submitRecord;
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
            // style={{
            //   fontFamily: "Kanit",
            //   fontWeight: "bold",
            //   fontSize: 20,
            //   letterSpacing: 1,
            //   alignItems: "center",
            //   display: "flex",
            // }}
            >
              <Heading title={"Category Register"} myroute={'/admindashboard/displayallcategory'}/>
              {/* <img src="logo.png" style={{ width: 60 }} />
              <div style={{ marginLeft: 15 }}  myroutes="">Category</div> */}
            </div>
          </Grid>

          <Grid item xs={6}>
            <TextField
              // onFocus={() => handleError(false, "restaurantId", "")}
              // error={resError?.restaurantId?.error}
              // helperText={resError?.restaurantId?.message}
              // onChange={(event) => setRestaurantId(event.target.value)}
              value={admin.restaurantid}
              label=" Restaurant ID"
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              onFocus={() => handleError(false, "categoryName", "")}
              error={resError?.categoryName?.error}
              helperText={resError?.categoryName?.message}
              onChange={(event) => setCategoryName(event.target.value)}
              value={categoryName}
              label=" Category Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              component="label"
              variant="contained"
              endIcon={<UploadFile />}
            >
              <input
                onFocus={() => handleError(false, "fileIcon", "")}
                onChange={handleimg}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
              Upload Icon
            </Button>
            {resError?.fileIcon?.error ? (
              <div style={{ color: "red", fontSize: "0.8rem", margin: 5 }}>
                {resError?.fileIcon?.message}
              </div>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Avatar
              variant="rounded"
              alt="Remy Sharp"
              src={fileIcon.url}
              sx={{ width: 56, height: 56 }}
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
