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
import { serverURL, getData, postData } from "../../services/FetchNodeServices";
import Heading from "../../components/heading/Heading";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router-dom";

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
export default function Category() {
    var classes = useStyles();
    var admin = JSON.parse(localStorage.getItem("ADMIN"));
    const navigate=useNavigate()
    const [categoryId, setCategoryId] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [resError, setResError] = useState([]);
    const [open, setOpen] = useState(false);

    const [fileIcon, setFileIcon] = useState({ url: "", bytes: "" });
    const [listCategory,setListCategory]=useState([])
    const [tempFile, setTempFile] = useState({fssai:'',shopAct:'',logo:''})
    const [btnStatus, setBtnStatus] = useState(false);

    
  const fetchAllCategory = async () => {
    var result = await postData("category/fetch_all_category",{restaurantid:admin.restaurantid});
    setListCategory(result.data);
    
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);


  
    const handleimg = (event) => {
      setFileIcon({
        url: URL.createObjectURL(event.target.files[0]),
        bytes: event.target.files[0],
        
      });
      
    setBtnStatus(true)
    };
    //////////////////////////////////////////////////////////////////////////
  
    const handleError = (error, input, message) => {
      setResError((prevState) => ({
        ...prevState,
        [input]: { error: error, message: message },
      }));
      console.log("CC", resError);
    };
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


      const handleCancel=()=>
  {
    setBtnStatus(false)
    setFileIcon({url:tempFile.icon,bytes:''})
  }
  const editImage=async()=>
  {
var formData=new FormData()
// formData.append('restauranid',restaurantId)
formData.append('icon',fileIcon.bytes)
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

  setBtnStatus(false)
  fetchAllCategory();
 //setOpen(false)

} else {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: result.message,
  });
}



  }
  const handle_delete=async(rowData)=>{
    var res = await postData('category/delete_category_data', { categoryid: rowData.categoryid })
alert(res.status)
fetchAllCategory()
  }

  const editDeleteButton = () => {
    return (
      <div>
        <Button onClick={editImage}>Edit</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    );
  };

  const HandleSubmit = async () => {
    var error = validation();
    console.log("After Submit:", resError);
   
        var d = new Date();
        var cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var body = {
          restaurantid: restaurantId,
          categoryid: categoryId,
          categoryname:categoryName,
        updatedat: cd
              }
         
              var result = await postData("category/category_edit_data", body);
        
              if (result.status) {
                Swal.fire({
                  icon: "success",
                  title: "Restaurant Registration",
                  text: result.message,
                });
                fetchAllCategory();
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
            setRestaurantId(rowData.restaurantid)
            setCategoryId(rowData.categoryid)
            setCategoryName(rowData.categoryname)
            // alert(rowData.categoryd)
           setFileIcon({
                url: `${serverURL}/images/${rowData.fileIcon}`,
                bytes: "",
              })
              setTempFile({fssai:`${serverURL}/images/${rowData.fileIcon}`  })

              setOpen(true)
            }
            const handleDialogClose = (rowData) => {
                setOpen(false);
              }

              const showData = () => {

                return (
                    <div className={classes.root}>
                      <div className={classes.box}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <div
                              style={{
                                fontFamily: "Kanit",
                                fontWeight: "bold",
                                fontSize: 20,
                                letterSpacing: 1,
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <img src="logo.png" style={{ width: 60 }} />
                              <div style={{ marginLeft: 15 }}>Category</div>
                            </div>
                          </Grid>
                
                          <Grid item xs={6}>
                            <TextField
                              onFocus={() => handleError(false, "restaurantId", "")}
                              error={resError?.restaurantId?.error}
                              helperText={resError?.restaurantId?.message}
                              onChange={(event) => setRestaurantId(event.target.value)}
                              value={restaurantId}
                              label=" Restaurant ID"
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
                              label="Category Name"
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
                            {
                            resError?.fileIcon?.error?<div style={{color:'red',fontSize:'0.8rem',margin:5}}>{resError?.fileIcon?.message}</div>:<></>
                            }
                          </Grid>
                          <Grid item xs={6} className={classes.center}>
                            <Avatar
                              variant="rounded"
                              alt="Remy Sharp"
                              src={fileIcon.url}
                              sx={{ width: 56, height: 56 }}
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
                        title="Category List"
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
                            title: "Category Name",
                          //  field: "ownername",
                            render: (rowData) => (
                              <>
                                <div>{rowData.categoryname}</div>
                              </>
                            ), 
                          },
                
                          
                          
                 
                           
                
                          {
                            title: "Logo",
                            render: (rowData) => (
                              <div>
                                <img
                                  src={`${serverURL}/images/${rowData.icon}`}
                                  style={{ width: 50, height: 50, borderRadius: 10 }}
                                />
                              </div>
                            ),
                          },
                        ]}
                        data={listCategory}
                        
                        actions={[
                          {
                            icon: AddIcon,
                            tooltip: 'Add Restaurant',
                            isFreeAction: true,
                            onClick: (event, rowData) =>  navigate('/admindashboard/category')
                          },
                          {
                            icon: EditIcon,
                            tooltip: "Edit Restaurant",
                            onClick: (event, rowData) => handleEdit(rowData),
                          },
                          {
                            icon: DeleteIcon,
                            tooltip: "Delete User",
                            onClick: (event, rowData) => handle_delete(rowData)
                             
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