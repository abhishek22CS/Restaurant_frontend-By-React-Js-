import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import {Snackbar,Avatar, 
  Grid,TextField,Button,
  FormHelperText,FormControl,
  FormControlLabel,FormLabel,
  Radio,RadioGroup } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from 'sweetalert2';
import Heading from "../../components/heading/Heading";
import UploadFile from '@mui/icons-material/UploadFile';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


import { serverURL,getData,postData } from "../../services/FetchNodeServices";




const useStyles = makeStyles({
    rootdisplay: {
        width:"auto",
        height:"90vh",
        background:'#dfe4ea',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
      },
      boxdisplay: {
        width:"75%",
        height:"auto",
        borderRadius:10,
        background:'#fff',
        padding:15
        
      },
  
      root: {
        background:'#dfe4ea',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
      },
      box: {
    
        height:"auto",
        borderRadius:10,
        background:'#fff',
        padding:15
        
      },
      center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }
      
      
    });


export default function DisplayAllWaiter()
{
    var classes=useStyles()
    var admin = JSON.parse(localStorage.getItem("ADMIN"));
     const navigate=useNavigate()
     const [listWaiter,setListWaiter]=useState([])
     const [open,setOpen]=useState(false)


    const[restaurantId,setRestaurantId]=useState('');
    const[waiterName,setWaiterName]=useState('');
    const[gender,setGender]=useState('');
    const[dob,setDob]=useState('');
    const[mobileNumber,setMobileNumber]=useState('');
    const[emailId,setEmailId]=useState('');
    const[address,setAddress]=useState('');
    const[picture,setPicture]=useState({url:'',bytes:''});
    const[waiterId,setWaiterId]=useState('');
    const[btnStatus,setBtnStatus]=useState(false);
    const[tempFile,setTempFile]=useState({});
    const[waiterError,setWaiterError]=useState('');


    const handleError=(error,input,message)=>{
        setWaiterError(prevState=>({...prevState,[input]:{'error':error,'message':message}}));
      }


      const validation=()=>
    {
      var submitRecord=true
      if(!restaurantId)
      {
        handleError(true,'restaurantId',"Please Input Restaurant Id")
        submitRecord=false
      }

      if(!waiterName)
      {
        handleError(true,'waiterName',"Please Input Waiter Name")
        submitRecord=false
      }

      if(!gender)
      {
        handleError(true,'gender',"Please Choose Gender")
        submitRecord=false
      }


      if(!dob)
      {
        handleError(true,'dob',"Please Input Date of birth")
        submitRecord=false
      }

      if(!mobileNumber)
      {
        handleError(true,'mobileNumber',"Please Input Correct Mobile Number")
        submitRecord=false
      }

      if(!emailId)
      {
        handleError(true,'emailId',"Please Input Correct Email Address")
        submitRecord=false
      }

      if(!address)
      {
        handleError(true,'address',"Please Input Address ")
        submitRecord=false
      }

      if(!picture.url)
      {
        handleError(true,'picture',"Please Upload Picture")
        submitRecord=false
      }

      return submitRecord
    }


    const handleIcon=(event)=>{
      setPicture({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnStatus(true)
    }



    const handleSubmit=async()=>
      {
        if(validation()){
    const body={'restaurantid':restaurantId,'waitername':waiterName,'gender':gender,'dob':dob,'mobileno':mobileNumber,'emailid':emailId,'address':address,'waiterid':waiterId }

    var result=await postData('waiter/waiter_edit_data',body);
        if(result.status)
        {
          Swal.fire({
            icon: 'success',
            title: 'Waiter Registration',
            text: result.message,
            position:'center',
            timer:5000,
            showConfirmButton:false,
                
            
          })
          
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.message,
            position:'center',
            timer:5000,
            showConfirmButton:false,
                
    
          })
          
        }
        }
      }

       const handleCancel=()=>{
        setBtnStatus(false);
        setPicture(tempFile)
      }
    
      const editImage=async()=>{
        var formData=new FormData()
        formData.append('waiterid',waiterId)
        formData.append('picture',picture.bytes)
    
        var result=await postData('waiter/waiter_edit_picture',formData)
        if(result.status)
        {
          Swal.fire({
            icon: 'success',
            title: 'Picture Update',
            text: result.message,
            position:'center',
            timer:5000,
            showConfirmButton:false,
                
            
          })
          
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.message,
            position:'center',
            timer:5000,
            showConfirmButton:false,
           
    
          })
         
        }
        setBtnStatus(false)
    }
    
      const editDeleteButton=()=>{
        return(<div>
           <Button onClick={editImage}>Edit</Button>
           <Button onClick={handleCancel}>Cancel</Button>
        </div>)
      }

      const fetchAllWaiter=async()=>{
        var result=await postData('waiter/fetch_all_waiter',{restaurantid:admin.restaurantid})
        setListWaiter(result.data)
        // alert(JSON.stringify(result.data))
     
       };

       const handleEdit=(rowData)=>{
        setRestaurantId(rowData.restaurantid);
        setWaiterName(rowData.waitername);
        setGender(rowData.gender);
        setDob(rowData.dob);
        setMobileNumber(rowData.mobileno);
        setEmailId(rowData.emailid);
        setAddress(rowData.address);
        setWaiterId(rowData.waiterid);
        setPicture({url:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempFile({url:`${serverURL}/images/${rowData.picture}`,bytes:''})
        
        setOpen(true); 
      }
    
      const handleDialogClose=()=>{
        setOpen(false);
        fetchAllWaiter()
       }


       const showDataInDialog=()=>{
       return(<div className={classes.root}>
        <div className={classes.box}>

        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Heading title={"Waiter Registeration"}/>
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setRestaurantId(event.target.value)}
        onFocus={()=>handleError(false,'restaurantId','')}
        error={waiterError?.restaurantId?.error}
        helperText={waiterError?.restaurantId?.message}
        label="Restaurant Id" value={restaurantId} fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setWaiterName(event.target.value)}
        onFocus={()=>handleError(false,'waiterName','')}
        error={waiterError?.waiterName?.error}
        helperText={waiterError?.waiterName?.message}
         label="Waiter Name" value={waiterName} fullWidth/>
        </Grid>
        <Grid item xs={6} style={{paddingLeft:21}}>
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label" 
        onFocus={()=>handleError(false,'gender','')}
        error={waiterError?.gender?.error}
        helperText={waiterError?.gender?.message}
       >
        Gender</FormLabel>
       <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
       <FormControlLabel onChange={(event)=>setGender(event.target.value)} value="Male" control={<Radio />} label="Male" />
       <FormControlLabel onChange={(event)=>setGender(event.target.value)} value="Female" control={<Radio />} label="Female" />
       </RadioGroup>
       </FormControl>
       </Grid>

       
        <Grid item xs={6}>
        <TextField onChange={(event)=>setDob(event.target.value)}
        onFocus={()=>handleError(false,'dob','')}
        error={waiterError?.dob?.error}
        helperText={waiterError?.dob?.message}
        label="Date of birth" value={dob} fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setMobileNumber(event.target.value)}
        onFocus={()=>handleError(false,'mobileNumber','')}
        error={waiterError?.mobileNumber?.error}
        helperText={waiterError?.mobileNumber?.message}
        label="Mobile Number" value={mobileNumber} fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setEmailId(event.target.value)}
        onFocus={()=>handleError(false,'emailId','')}
        error={waiterError?.emailId?.error}
        helperText={waiterError?.emailId?.message}
        label="Email Id" value={emailId} fullWidth/>
        </Grid>
        <Grid item xs={12}>
        <TextField onChange={(event)=>setAddress(event.target.value)}
        onFocus={()=>handleError(false,'address','')}
        error={waiterError?.address?.error}
        helperText={waiterError?.address?.message}
         label="Address" value={address} fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <Button component="label" variant="contained" fullWidth endIcon={<UploadFile />}>
        <input onFocus={()=>handleError(false,'picture','')}
         onChange={handleIcon} type="file" hidden accept="image/*" multiple/>
         Upload Picture
        </Button>
        {waiterError?.picture?.error?<FormHelperText error style={{marginLeft:10}}>{waiterError?.picture?.message}</FormHelperText>:<></>}
        </Grid>
        <Grid item xs={12} className={classes.center}>
        <Avatar
         variant="rounded"
         alt="Remy Sharp"
         src={picture.url}
         sx={{ width: 56, height: 56,marginRight:60 }}
         />
         <div>
         {btnStatus?editDeleteButton():<></>}
         </div>
         </Grid>
         <Grid item xs={6}>
        <Button onClick={handleSubmit} variant="contained" fullWidth >Submit</Button>
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" fullWidth>Reset</Button>
        </Grid>
        </Grid>


        </div>
    </div>)

       }




       const showDialogForEdit=()=>{
        return(
         <Dialog maxWidth={'lg'} open={open}>
             <DialogContent >
             {showDataInDialog()}
             </DialogContent>
            <DialogActions>
            <Button onClick={handleSubmit}>Update</Button>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
         </Dialog>
        )}
    
      useEffect(function(){
          fetchAllWaiter()
      },[]);
    
      const handleDelete=async(rowData)=>{
        Swal.fire({
          title: 'Do you want to delete the record?',
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const body={'waiterid':rowData.waiterid}; 
            const result=await postData('waiter/waiter_delete',body)
             if(result.status)      
            {Swal.fire('Deleted!', '', result.message)
            fetchAllWaiter()
             }
             else
             Swal.fire('Fail!', '', result.message)
    
          } else if (result.isDenied) {
            Swal.fire('Table Booking not Deleted', '', 'info')
          }
        })
      }

      const handleAdd=()=>[

      ]
    
      function displayAll() {
        return (
          <MaterialTable
            title="Waiter List"
            columns={[
              { title: 'RestaurantId', field: 'restaurantid' },
              { title: 'Waiter Name', field: 'waitername' },
              { title: 'Gender', field: 'gender' },
              { title: 'DOB', field:'dob' },
              { title: 'Contact',render:rowData=><><div>{rowData.emailid}</div><div>{rowData.mobileno}</div></> },
              { title: 'Address',field:'address' },
              { title: 'Picture',render:rowData=><div><img src={`${serverURL}/images/${rowData.picture}`} style={{width:50,height:50,borderRadius:10}} /></div> },
              
            ]}
            data={listWaiter}        
            actions={[
              {
                icon: EditIcon,
                tooltip: 'Edit Waiter Registeration',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: DeleteIcon,
                tooltip: 'Delete Waiter Registeration',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: AddIcon,
                tooltip: 'Add Waiter Registeration',
                isFreeAction: true,
                onClick: (event, rowData) =>  navigate('/admindashboard/waiters')
              ,}
            ]}
          />
        )
      }
    
       return(
        <div className={classes.rootdisplay}>
          <div className={classes.boxdisplay}>
          {displayAll()}
        </div>
          {showDialogForEdit()}
        </div>
       )



}