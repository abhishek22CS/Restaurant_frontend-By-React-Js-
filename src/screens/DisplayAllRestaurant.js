import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  Avatar,
  Grid,
  TextField,
  Button,
  Select,
  FormHelperText,
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
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles({
  rootdisplay: {
    width: "auto",
    height: "100vh",
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
export default function DisplayAllRestaurant() {
  var classes = useStyles();
  const [listRestaurant, setListRestaurant] = useState([]);
  const [open, setOpen] = useState(false);
  ////////////////////Restaurant Data////////
  const [states, setStates] = useState([]);
  const [Cities, setCities] = useState([]);
  const [restaurantId, setRestaurantid] = useState("");

  const [stateid, setStateId] = useState("");
  const [cityid, setCityId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [url, setUrl] = useState("");
  const [fssai, setFssai] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [gstType, setGstType] = useState("");
  const [fileFssai, setFileFssai] = useState({ url: "", bytes: "" });
  const [fileShopAct, setFileShopAct] = useState({ url: "", bytes: "" });
  const [fileLogo, setFileLogo] = useState({ url: "", bytes: "" });
  const [tempFile, setTempFile] = useState({fssai:'',shopAct:'',logo:''})

  const [address, setAdress] = useState("");
  const [resError, setResError] = useState({});
  const [btnStatus,setBtnStatus]=useState({fssai:false,shopAct:false,logo:false})


  

  const handleError = (error, input, message) => {
    setResError((prevState) => ({
      ...prevState,
      [input]: { error: error, message: message },
    }));
    console.log("CC", resError);
  };
  const validation = () => {
    var submitRecord = true;
    if (restaurantName.trim().length == 0) {
      handleError(true, "restaurantName", "Pls Input Restaurant Name");

      submitRecord = false;
    }
    if (ownerName.trim().length == 0) {
      handleError(true, "ownerName", "Pls Input Owner Name");

      submitRecord = false;
    }
    if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber)) {
      handleError(true, "mobileNumber", "Pls Input Correct Mobile Number");

      submitRecord = false;
    }
    if (
      !emailId ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)
    ) {
      handleError(true, "emailId", "Pls Input Correct Email Address");

      submitRecord = false;
    }

    if (!address) {
      handleError(true, "address", "Pls Input Address");

      submitRecord = false;
    }

    if (!stateid) {
      handleError(true, "stateid", "Pls Select State");

      submitRecord = false;
    }
    if (!fileFssai.url) {
      handleError(true, "fileFssai", "Pls Upload Fssai");

      submitRecord = false;
    }
    return submitRecord;
  };


  const handleCancel=(imgStatus)=>
  {
    if(imgStatus==1)
    {
      setBtnStatus((prev)=>({...prev,fssai:false}))

    setFileFssai({url:tempFile.fssai,bytes:''})
    }
     else if(imgStatus==2)
    {
      setBtnStatus((prev)=>({...prev,shopAct:false}))

    setFileFssai({url:tempFile.fssai,bytes:''})
    }
   else if(imgStatus==3)
    {
      setBtnStatus((prev)=>({...prev,logo:false}))

    setFileFssai({url:tempFile.fssai,bytes:''})
    }
    
  }
  const editImage=async(imgStatus)=>
  {
    if(imgStatus==1)
    { 

var formData=new FormData()
formData.append('restauranid',restaurantId)
formData.append('filefssai',fileFssai.bytes)
var result=await postData('restaurants/restaurant_edit_fssai',formData)
if (result.status) {
  Swal.fire({
    icon: "success",
    title: "Restaurant Registration",
    text: result.message,
    position:'top-end',
    timer: 5000,
    showConfirmButton: false,
    toast:true
  });

  //setBtnStatus(false)
  //fetchAllRestaurant()

 // setOpen(false)

} else {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: result.message,
  });
  setBtnStatus((prev)=>({...prev,fssai:false}))
}
}
else if(imgStatus==2)
{ 
var formData=new FormData()
formData.append('restaurantid',restaurantId)
formData.append('fileshopact',fileShopAct.bytes)
var result=await postData('restaurants/restaurant_edit_shopact',formData)
if(result.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Restaurant Registration',
    text: result.message,
    position:'top-end',
    timer: 5000,
    showConfirmButton: false,
    toast:true
    
  })
  
}
else
{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: result.message,
    position:'top-end',
    timer: 5000,
    showConfirmButton: false,
    toast:true
  })
 
}

setBtnStatus((prev)=>({...prev,shopAct:false}))
}  
else  if(imgStatus==3)
{ 
var formData=new FormData()
formData.append('restaurantid',restaurantId)
formData.append('logo',fileLogo.bytes)
var result=await postData('restaurants/restaurant_edit_logo',formData)
if(result.status)
{
 Swal.fire({
  icon: 'success',
  title: 'Restaurant Registration',
  text: result.message,
  position:'top-end',
  timer: 5000,
  showConfirmButton: false,
  toast:true
 })
 
}
else
{
 Swal.fire({
   icon: 'error',
   title: 'Oops...',
   text: result.message,
   position:'top-end',
   timer: 5000,
   showConfirmButton: false,
   toast:true

 })

}

setBtnStatus((prev)=>({...prev,logo:false}))
}




  }

  const editDeleteButton = (imgStatus) => {
    return (
      <div>
         <Button onClick={()=>editImage(imgStatus)}>Edit</Button>
       <Button onClick={()=>handleCancel(imgStatus)}>Cancel</Button>
      </div>
    );
  };
  

  const fetchAllRestaurant = async () => {
    var result = await getData("restaurants/fetch_all_restaurant");
    setListRestaurant(result.data);
    // alert(JSON.stringify(result.data))
  };

  const fetchAllStates = async () => {
    var result = await getData("statecity/fetch_all_states");

    setStates(result.data);
    // alert(result.message)
  };
  useEffect(function () {
    fetchAllStates();
    fetchAllRestaurant();
  }, []);

  const fillState = () => {
    return states.map((item) => {
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>;
    });
  };
  const fetchAllCities = async (stateid) => {
    var body = { stateid: stateid };
    var result = await postData("statecity/fetch_all_cities", body);
    setCities(result.data);
  };
  const fillCities = () => {
    return Cities.map((item) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>;
    });
  };
  const handleStateChange = (event) => {
    setStateId(event.target.value);
    fetchAllCities(event.target.value);
  };
  const gstChange = (event) => {
    setGstType(event.target.value);
  };
  const handleFssai = (event) => {
    setFileFssai({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
      
    });
    setBtnStatus((prev)=>({...prev,fssai:true}))

  };

  const handleShopact = (event) => {
    setFileShopAct({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus((prev)=>({...prev,shopAct:true}))

  };

  const handleUploadlogo = (event) => {
    setFileLogo({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus((prev)=>({...prev,logo:true}))

  };

  const HandleSubmit = async () => {
    var error = validation();
    console.log("After Submit:", resError);
    if (error) {
      {
        var d = new Date();
        var cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var body = {
          restaurantname: restaurantName,
          ownername: ownerName,
          phonenumber: phoneNumber,
          emailid: emailId,
          mobileno: mobileNumber,
          address: address,
          stateid: stateid,
          cityid: cityid,
          url: url,
          fssai: fssai,
          gstno: gstNo,
          gsttype: gstType,
          updatedat: cd,
          restaurantid: restaurantId,
        };

        var result = await postData("restaurants/restaurant_edit_data", body);
        if (result.status) {
          Swal.fire({
            icon: 'success',
            title: 'Restaurant Registration',
            text: result.message,
            position:'top-end',
            timer: 5000,
            showConfirmButton: false,
            toast:true
          });
          // fetchAllRestaurant();
          // setOpen(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.message,
            position:'top-end',
            timer: 5000,
            showConfirmButton: false,
            toast:true
    
          });
        }


      }
    }
  };
  ////////////////////////////////////////////////////

  const handleEdit = (rowData) => {
    fetchAllCities(rowData.stateid);
    setRestaurantid(rowData.restaurantid);
    setRestaurantName(rowData.restaurantname);
    setOwnerName(rowData.ownername);
    setPhoneNumber(rowData.phonenumber);
    setMobileNumber(rowData.mobileno);
    setEmailId(rowData.emailid);
    setAdress(rowData.adress);
    setStateId(rowData.stateid);
    setCityId(rowData.cityid);
    setUrl(rowData.url);
    setFssai(rowData.fssai);
    setGstNo(rowData.gstno);
    setGstType(rowData.gsttype);
    setFileFssai({
      url: `${serverURL}/images/${rowData.filefssai}`,
      bytes: "",
    });
    setFileLogo({ url: `${serverURL}/images/${rowData.filelogo}`, bytes: "" });
    setFileShopAct({
      url: `${serverURL}/images/${rowData.fileshopact}`,
      bytes: "",
    });
     setTempFile({fssai:`${serverURL}/images/${rowData.filefssai}`,shopAct:`${serverURL}/images/${rowData.fileshopact}`,logo:`${serverURL}/images/${rowData.filelogo}`})

    setOpen(true);
  };

  const handleDialogClose = (rowData) => {
    fetchAllRestaurant()
    setOpen(false);
  };

  const showData = () => {
    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heading title={"Restaurant Register"} />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onFocus={() => handleError(false, "restaurantName", "")}
                error={resError?.restaurantName?.error}
                helperText={resError?.restaurantName?.message}
                onChange={(event) => setRestaurantName(event.target.value)}
                label="Restaurant Name"
                fullWidth
                value={restaurantName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onFocus={() => handleError(false, "ownerName", "")}
                error={resError?.ownerName?.error}
                helperText={resError?.ownerName?.message}
                onChange={(event) => setOwnerName(event.target.value)}
                label="Owner Name"
                fullWidth
                value={ownerName}
              />{" "}
              {/* <TextField onChange={(event)=>setOwnerName(event.target.value)}label=" Owner  Name" fullWidth/> */}
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => setPhoneNumber(event.target.value)}
                label="Phone Number"
                fullWidth
                value={phoneNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onFocus={() => handleError(false, "mobileNumber", "")}
                error={resError?.mobileNumber?.error}
                helperText={resError?.mobileNumber?.message}
                onChange={(event) => setMobileNumber(event.target.value)}
                label="Mobile Number"
                fullWidth
                value={mobileNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onFocus={() => handleError(false, "emaild", "")}
                error={resError?.emailId?.error}
                helperText={resError?.emailId?.message}
                onChange={(event) => setEmailId(event.target.value)}
                label="Email Address"
                fullWidth
                value={emailId}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onFocus={() => handleError(false, "address", "")}
                error={resError?.address?.error}
                helperText={resError?.address?.message}
                onChange={(event) => setAdress(event.target.value)}
                label=" Address"
                fullWidth
                value={address}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>States</InputLabel>
                <Select
                  onFocus={() => handleError(false, "stateid", "")}
                  error={resError?.stateid?.error}
                  helperText={resError?.stateid?.message}
                  label="States"
                  value={stateid}
                  onChange={handleStateChange}
                >
                  <MenuItem>-Select States-</MenuItem>
                  {fillState()}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {resError?.stateid?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>

                <Select
                  label="City"
                  value={cityid}
                  onChange={(event) => setCityId(event.target.value)}
                >
                  <MenuItem>-Select City-</MenuItem>
                  {fillCities()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => setUrl(event.target.value)}
                label="URL"
                fullWidth
                value={url}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => setFssai(event.target.value)}
                label="Fssai Number"
                fullWidth
                value={fssai}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => setGstNo(event.target.value)}
                label="GST Number"
                fullWidth
                value={gstNo}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>GST Type</InputLabel>
                <Select
                  label="Gst Type"
                  value={gstType}
                  onChange={(event) => setGstType(event.target.value)}
                >
                  <MenuItem>-Select Gst Type-</MenuItem>
                  <MenuItem value="5 Star">5 Star-</MenuItem>
                  <MenuItem value="Other">-Other-</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}  >
            
                <Button
                  fullWidth
                  component="label"
                  variant="contained"
                  endIcon={<UploadFile />}
                >
                  <input
                    onFocus={() => handleError(false, "fileFssai", "")}
                    onChange={handleFssai}
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                  />
                  Upload Fssai
                </Button>
                {resError?.fileFssai?.error ? (
                  <div style={{ color: "red", fontSize: "0.8rem", margin: 5 }}>
                    {" "}
                    {resError?.fileFssai?.message}{" "}
                  </div>
                ) : (
                  <></>
                )}
             
                  
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                component="label"
                variant="contained"
                endIcon={<UploadFile />}
              >
                <input
                  onChange={handleShopact}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
                Upload Shop Act
              </Button>
              {/* {resError?.fileShopAct?.error ? (
                  <div style={{ color: "red", fontSize: "0.8rem", margin: 5 }}>
                    {" "}
                    {resError?.fileShopAct?.message}{" "}
                  </div>
                ) : (
                  <></>
                )} */}
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                component="label"
                variant="contained"
                endIcon={<UploadFile />}
              >
                <input
                  onChange={handleUploadlogo}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
                Upload Logo
              </Button>
              {/* {resError?.fileLogo?.error ? (
                  <div style={{ color: "red", fontSize: "0.8rem", margin: 5 }}>
                    {" "}
                    {resError?.fileLogo?.message}{" "}
                  </div>
                ) : (
                  <></>
                )} */}
            </Grid>

            <Grid item xs={4} className={classes.center}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={fileFssai.url}
                sx={{ width: 56, height: 56 }}
              />
                  <div>
                    {btnStatus.fssai?editDeleteButton(1):<></>}
                  </div>

              
            </Grid>

            <Grid item xs={4} className={classes.center}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={fileShopAct.url}
                sx={{ width: 56, height: 56 }}
                
              />
              
              <div>
                    {btnStatus.shopAct?editDeleteButton(2):<></>}
                  </div>

            </Grid>

            <Grid item xs={4} className={classes.center}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={fileLogo.url}
                sx={{ width: 56, height: 56 }}
              />
                <div>
                    {btnStatus.logo?editDeleteButton(3):<></>}
                  </div>

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

  useEffect(function () {
    fetchAllStates();
  }, []);

  const handleDelete=async(rowData)=>{
    Swal.fire({
      title: 'Do you want to delete the record?',
      showDenyButton: true,
     
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={'restaurantid':rowData.restaurantid} 
        var result=await postData('restaurants/restaurant_delete',body)
         if(result.status)      
    {      Swal.fire('Deleted!', '', result.message)
         fetchAllRestaurant()
    }
         else
         Swal.fire('Fail!', '', result.message)

      } else if (result.isDenied) {
        Swal.fire('Restaurant not Delete', '', 'info')
      }
    })

    
  
  }


  function displayall() {
    return (
      <MaterialTable
        title="Restaurant List"
        columns={[
          {
            title: "Restaurant",
            field: "restaurantname",
            render: (rowData) => (
              <>
                <div>{rowData.restaurantname}</div>
              </>
            ),
          },
          {
            title: "Owner",
            field: "ownername",
            render: (rowData) => (
              <>
                <div>{rowData.ownername}</div>
              </>
            ),
          },

          {
            title: "Address",
            field: "adress",
            render: (rowData) => (
              <>
                <div>{rowData.adress}</div>
                <div>
                  {rowData.cityname},{rowData.statename}
                </div>
              </>
            ),
          },
          {
            title: "Contact",
            field: "phonenumber",

            render: (rowData) => (
              <>
                <div>{rowData.phonenumber}</div>
                <div>{rowData.mobileno}</div>
                <div>{rowData.emailid}</div>
              </>
            ),
          },

          {
            title: "Documents",
            field: "Documents",
            render: (rowData) => (
              <>
                <div>SA:/{rowData.gsttype}</div>
                <div>Fssai:{rowData.fssai}</div>
              </>
            ),
          },
          {
            title: "Website",
            render: (rowData) => (
              <div>
                <a href="{rowData.url}">Visit</a>
              </div>
            ),
          },

          {
            title: "Logo",
            render: (rowData) => (
              <div>
                <img
                  src={`${serverURL}/images/${rowData.filelogo}`}
                  style={{ width: 50, height: 50, borderRadius: 10 }}
                />
              </div>
            ),
          },
        ]}
        data={listRestaurant}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Edit Restaurant",
            onClick: (event, rowData) => handleEdit(rowData),
          },
          {
            icon: DeleteIcon,
            tooltip: "Delete User",
            onClick: (event, rowData) => handleDelete(rowData)       
          },
          {
            icon: AddIcon,
            tooltip: 'Add Restaurant',
            isFreeAction: true,
            onClick: (event, rowData) => alert("You want to delete " + rowData.name)
          ,}
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
