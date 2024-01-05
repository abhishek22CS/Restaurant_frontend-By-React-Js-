import { useState, useEffect } from "react";
import {
  Avatar,
  Grid,
  TextField,
  Button,
  Select,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import UploadFile from "@mui/icons-material/UploadFile";
import Swal from "sweetalert2";
import Heading from "../../components/heading/Heading";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";

const useStyles = makeStyles({
  root: {
    width: "100auto",
    height: "90vh",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "60%",
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

export default function SubCategoryInterface() {
  var classes = useStyles();
  var admin = JSON.parse(localStorage.getItem("ADMIN"));

  const [categories, setCategories] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [fileIcon, setFileIcon] = useState({ url: "", bytes: "" });
  const [categoryError, setCategoryError] = useState({});
  const [categoryNameArray, setCategoryNameArray] = useState([]);

  const handleError = (error, input, message) => {
    setCategoryError((prevState) => ({
      ...prevState,
      [input]: { error: error, message: message },
    }));
  };

  const fillCategoryNames = () => {
    return categoryNameArray.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };
  const fetchAllCategoryNames = async () => {
    var result = await postData("category/fetch_all_category",{restaurantid:admin.restaurantid});

    setCategoryNameArray(result.data);
  };
  useEffect(function () {
    fetchAllCategoryNames();
    setRestaurantId(admin.restaurantid)
  }, []);

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

  const handleSubmit = async () => {
    var error = validation();
    //   console.log("After Submit:",categoryError)--

    var formdata = new FormData();
    formdata.append("restaurantid", restaurantId);
    formdata.append("categoryid", categoryId);
    formdata.append("foodname", foodName);
    formdata.append("foodtype", foodType);
    formdata.append("ingredients", ingredients);
    formdata.append("price", price);
    formdata.append("offerprice", offerPrice);
    formdata.append("fileicon", fileIcon.bytes);
    var result = await postData("subcategory/subcategory_submit", formdata);
    // alert("HI");
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "Food Registration",
        text: result.message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Heading title={"Food Items"}  myroute={'/admindashboard/displayallfooditem'} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              // onChange={(event) => setRestaurantId(event.target.value)}
              // onFocus={() => handleError(false, "restaurantId", "")}
              // error={categoryError?.restaurantId?.error}
              // helperText={categoryError?.restaurantId?.message}
              value={admin.restaurantid}
              label=" Restaurant ID"
              disabled
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
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  onChange={(event) => setFoodType(event.target.value)}
                  value="Veg"
                  control={<Radio />}
                  label="Veg"
                />
                <FormControlLabel
                  onChange={(event) => setFoodType(event.target.value)}
                  value="Non Veg"
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
