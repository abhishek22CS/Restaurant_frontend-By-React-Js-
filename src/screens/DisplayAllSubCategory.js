import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  Avatar,
  Grid,
  TextField,
  Button,
  Select,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import UploadFile from "@mui/icons-material/UploadFile";
import { serverURL, getData, postData } from "./../services/FetchNodeServices";

import Heading from "./../components/heading/Heading";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

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
  heading: {
    fontFamily: "Kanit",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    alignItems: "center",
    display: "flex",
  },
});
export default function SubCategoryInterface() {
  var classes = useStyles();
  var admin = JSON.parse(localStorage.getItem("ADMIN"));

  const navigate = useNavigate();

  const [foodItemId, setFoodItemId] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [fileIcon, setFileIcon] = useState({ url: "", bytes: "" });
  const [categoryError, setCategoryError] = useState({});
  const [listSubCategory, setListSubCategory] = useState([]);
  const [resError, setResError] = useState({});
  const [categoryNameArray, setCategoryNameArray] = useState([]);

  const [btnStatus, setBtnStatus] = useState({
    fssai: false,
    shopAct: false,
    logo: false,
  });
  const [open, setOpen] = useState(false);
  const [tempFile, setTempFile] = useState({
    fssai: "",
    shopAct: "",
    logo: "",
  });

  const fillCategoryNames = () => {
    return categoryNameArray.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };
  const fetchAllCategoryNames = async () => {
    var result = await postData("category/fetch_all_category", {
      restaurantid: admin.restaurantid,
    });

    setCategoryNameArray(result.data);
  };
  useEffect(function () {
    fetchAllCategoryNames();
    // setRestaurantId(admin.restaurantid)
  }, []);

  const fetchAllSubCategory = async () => {
    var result = await postData("subcategory/fetch_all_subcategory", {
      restaurantid: admin.restaurantid,
    });
    setListSubCategory(result.data);
    alert(JSON.stringify(result))
  };
  
  useEffect(function () {
    fetchAllSubCategory();
  }, []);

  const handleimg = (event) => {
    setFileIcon({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });

    setBtnStatus(true);
  };
  const handleError = (error, input, message) => {
    setResError((prevState) => ({
      ...prevState,
      [input]: { error: error, message: message },
    }));
    console.log("CC", resError);
  };
  const validation = () => {
    var submitRecord = true;
    if (!restaurantId) {
      handleError(true, "restaurantId", "Please Input Restaurant Id");
      submitRecord = false;
    }

    if (!categoryId) {
      handleError(true, "categoryId", "Please Select Category");
      submitRecord = false;
    }

    if (!foodName) {
      handleError(true, "foodName", "Please Input Food Name");
      submitRecord = false;
    }

    if (!foodType) {
      handleError(true, "foodType", "Please Choose Food Type");
      submitRecord = false;
    }

    if (!ingredients) {
      handleError(true, "ingredients", "Please Input Ingredients");
      submitRecord = false;
    }

    if (!price) {
      handleError(true, "price", "Please Input Price");
      submitRecord = false;
    }

    if (!offerPrice) {
      handleError(true, "offerPrice", "Please Input Offer Price");
      submitRecord = false;
    }

    if (!fileIcon.url) {
      handleError(true, "fileIcon", "Please Upload Icon");
      submitRecord = false;
    }

    return submitRecord;
  };
  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleIcon = (event) => {
    setFileIcon({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  ///////////////////////////////////////////////////////////////////////
  //editimge buuton
  const handleCancel = () => {
    setBtnStatus(false);
    setFileIcon({ url: tempFile.icon, bytes: "" });
  };
  const editImage = async () => {
    var formData = new FormData();
    // formData.append('restauranid',restaurantId)
    formData.append("icon", fileIcon.bytes);
    var result = await postData("restaurants/restaurant_edit_fssai", formData);
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "Restaurant Registration",
        text: result.message,
        position: "top-end",
        timer: 5000,
        showConfirmButton: false,
        toast: true,
      });

      setBtnStatus(false);
      fetchAllSubCategory();
      //setOpen(false)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message,
      });
    }
  };

  const editDeleteButton = () => {
    return (
      <div>
        <Button onClick={editImage}>Edit</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    );
  };

  //////////////////////////////////////////////////////

  const HandleSubmit = async () => {
    var error = validation();
    console.log("After Submit:", resError);

    var d = new Date();
    var cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var body = {
      fooditemid: foodItemId,
      restaurantid: restaurantId,
      categoryid: categoryId,
      foodname: foodName,
      foodtype: foodType,
      ingredients: ingredients,
      price: price,
      offerprice: offerPrice,
      // fileicon fileIcon.bytes
    };

    var result = await postData("subcategory/subcategory_edit_data", body);

    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "Restaurant Registration",
        text: result.message,
      });
      fetchAllSubCategory();
      setOpen(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message,
      });
    }

    // }
  };
  const handleEdit = (rowData) => {
    setFoodItemId(rowData.fooditemid);
    setRestaurantId(rowData.restaurantid);
    setCategoryId(rowData.categoryid);
    setFoodName(rowData.foodname);
    setFoodType(rowData.foodtype);
    setIngredients(rowData.ingredients);
    setPrice(rowData.price);
    setOfferPrice(rowData.offerprice);
    // setFoodName(rowData.foodame);

    // alert(rowData.categoryd)
    setFileIcon({
      url: `${serverURL}/images/${rowData.fileicon}`,
      bytes: "",
    });
    setTempFile({ fssai: `${serverURL}/images/${rowData.fileicon}` });

    setOpen(true);
  };
  const handleDialogClose = (rowData) => {
    setOpen(false);
  };

  const showData = () => {
    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heading title={"Food Items"} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setRestaurantId(event.target.value)}
                onFocus={() => handleError(false, "restaurantId", "")}
                error={categoryError?.restaurantId?.error}
                helperText={categoryError?.restaurantId?.message}
                label="Restaurant Id"
                value={restaurantId}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  onChange={handleCategoryChange}
                  onFocus={() => handleError(false, "categoryId", "")}
                  error={categoryError?.categoryId?.error}
                  helperText={categoryError?.categoryId?.message}
                  value={categoryId}
                  label="Category"
                >
                  <MenuItem>-Select Category-</MenuItem>
                  <MenuItem value="300">-Abhishek-</MenuItem>

                  {fillCategoryNames()}
                </Select>
                <FormHelperText>
                  {categoryError?.categoryId?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setFoodName(event.target.value)}
                onFocus={() => handleError(false, "foodName", "")}
                error={categoryError?.foodName?.error}
                helperText={categoryError?.foodName?.message}
                label="Food Name"
                fullWidth
                value={foodName}
              />
            </Grid>

            <Grid item xs={6} style={{ paddingLeft: 100, paddingBottom: 10 }}>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  onFocus={() => handleError(false, "foodType", "")}
                  error={categoryError?.foodType?.error}
                  helperText={categoryError?.foodType?.message}
                >
                  Food Type
                </FormLabel>
                <RadioGroup
                  value={foodType}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    onChange={(event) => setFoodType(event.target.value)}
                    value="Veg"
                    // value={foodType}
                    control={<Radio />}
                    label="Veg"
                  />
                  <FormControlLabel
                    onChange={(event) => setFoodType(event.target.value)}
                    value="Non Veg"
                    //  value={foodType}
                    control={<Radio />}
                    label="Non Veg"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => setIngredients(event.target.value)}
                onFocus={() => handleError(false, "ingredients", "")}
                error={categoryError?.ingredients?.error}
                helperText={categoryError?.ingredients?.message}
                label="Ingredients"
                fullWidth
                value={ingredients}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setPrice(event.target.value)}
                onFocus={() => handleError(false, "price", "")}
                error={categoryError?.price?.error}
                helperText={categoryError?.price?.message}
                label="Price"
                fullWidth
                value={price}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setOfferPrice(event.target.value)}
                onFocus={() => handleError(false, "offerPrice", "")}
                error={categoryError?.offerPrice?.error}
                helperText={categoryError?.offerPrice?.message}
                label="Offer Price"
                fullWidth
                value={offerPrice}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                component="label"
                variant="contained"
                fullWidth
                endIcon={<UploadFile />}
              >
                <input
                  onFocus={() => handleError(false, "fileIcon", "")}
                  onChange={handleIcon}
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                />
                Upload Icon
              </Button>
              {categoryError?.fileIcon?.error ? (
                <FormHelperText>
                  {categoryError?.fileIcon?.message}
                </FormHelperText>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} className={classes.center}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={fileIcon.url}
                sx={{ width: 56, height: 56, marginRight: 80 }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  const showDataForEdit = () => {
    return (
      <Dialog maxWidth={"lg"} open={open}>
        <DialogContent> {showData()}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}> Close</Button>
          <Button onClick={HandleSubmit}> Edit</Button>
        </DialogActions>
      </Dialog>
    );
  };
  function displayall() {
    return (
      <MaterialTable
        title="SubCategory List"
        columns={[
          {
            title: "Restaurant ID",
            field: "restaurantid",
            render: (rowData) => (
              <>
                <div>{rowData.restaurantid}</div>
              </>
            ),
          },
          {
            title: "Category ID Name",
            //  field: "ownername",
            render: (rowData) => (
              <>
                <div>{rowData.categoryname}</div>
              </>
            ),
          },
          {
            title: "Food Name",
            //field: "restaurantid",
            render: (rowData) => (
              <>
                <div>{rowData.foodname}</div>
              </>
            ),
          },
          {
            title: "Food Type",
            //  field: "ownername",
            render: (rowData) => (
              <>
                <div>{rowData.foodtype}</div>
              </>
            ),
          },
          {
            title: "Ingriedents",
            // field: "restaurantid",
            render: (rowData) => (
              <>
                <div>{rowData.ingredients}</div>
              </>
            ),
          },
          {
            title: "Price",
            //  field: "ownername",
            render: (rowData) => (
              <>
                <div>{rowData.price}</div>
              </>
            ),
          },
          {
            title: "Exculcive Offer Price",
            //  field: "ownername",
            render: (rowData) => (
              <>
                <div>{rowData.offerprice}</div>
              </>
            ),
          },

          {
            title: "Logo",
            render: (rowData) => (
              <div>
                <img
                  src={`${serverURL}/images/${rowData.fileicon}`}
                  style={{ width: 50, height: 50, borderRadius: 10 }}
                />
              </div>
            ),
          },
        ]}
        data={listSubCategory}
        actions={[
          {
            icon: AddIcon,
            tooltip: "Add Restaurant",
            isFreeAction: true,
            onClick: (event, rowData) =>
              navigate("/admindashboard/fooditeminterface"),
          },
          {
            icon: EditIcon,
            tooltip: "Edit Restaurant",
            onClick: (event, rowData) => handleEdit(rowData),
          },
          {
            icon: DeleteIcon,
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.name),
          },
        ]}
      />
    );
  }
  return (
    <div className={classes.rootdisplay}>
      <div className={classes.boxdisplay}>{displayall()}</div>
      {showDataForEdit()}
    </div>
  );
}
