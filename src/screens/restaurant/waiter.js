import { useState } from "react";
import {Avatar, Grid,TextField,Button,FormHelperText,FormControl,FormControlLabel,FormLabel,Radio,RadioGroup } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2';
import Heading from "../../components/heading/Heading";
import UploadFile from '@mui/icons-material/UploadFile';
import { serverURL,getData,postData } from "../../services/FetchNodeServices";





const useStyles = makeStyles({
    root: {
      width:"auto",
      height:"90vh",
      background:'#dfe4ea',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
      
    },
    box: {
      width:"60%",
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



export default function WaiterInterface()
{
    var classes=useStyles()
    var admin = JSON.parse(localStorage.getItem("ADMIN"));

    const[restaurantId,setRestaurantId]=useState(admin.restaurantid);
    const[waiterName,setWaiterName]=useState('');
    const[gender,setGender]=useState('');
    const[dob,setDob]=useState('');
    const[mobileNumber,setMobileNumber]=useState('');
    const[emailId,setEmailId]=useState('');
    const[address,setAddress]=useState('');
    const[picture,setPicture]=useState({url:'',bytes:''});
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
    }



    const handleSubmit=async()=>{
      var error=validation()
      if(error)
      { 
      var formdata=new FormData()
      formdata.append('restaurantid',restaurantId)
      formdata.append('waitername',waiterName)
      formdata.append('gender',gender)
      formdata.append('dob',dob)
      formdata.append('mobileno',mobileNumber)
      formdata.append('emailid',emailId)
      formdata.append('address',address)
      formdata.append('picture',picture.bytes)
 

      var result=await postData('waiter/waiter_submit',formdata)
      if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Waiter Registration',
        text: result.message, 
      })
    }

    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message,
      })
    }

      }
       
    }



    return(<div className={classes.root}>
        <div className={classes.box}>

        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Heading title={"Waiter Registeration"} myroute={'/admindashboard/displayallwaiter'}/>
        </Grid>
        <Grid item xs={6}>
        <TextField 
        // onChange={(event)=>setRestaurantId(event.target.value)}
        // onFocus={()=>handleError(false,'restaurantId','')}
        // error={waiterError?.restaurantId?.error}
        // helperText={waiterError?.restaurantId?.message}
        // label="Restaurant Id" fullWidth
        value={admin.restaurantid}
        label=" Restaurant ID"
        disabled
        fullWidth
        />
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setWaiterName(event.target.value)}
        onFocus={()=>handleError(false,'waiterName','')}
        error={waiterError?.waiterName?.error}
        helperText={waiterError?.waiterName?.message}
         label="Waiter Name" fullWidth/>
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
        label="Date of birth" fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setMobileNumber(event.target.value)}
        onFocus={()=>handleError(false,'mobileNumber','')}
        error={waiterError?.mobileNumber?.error}
        helperText={waiterError?.mobileNumber?.message}
        label="Mobile Number" fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setEmailId(event.target.value)}
        onFocus={()=>handleError(false,'emailId','')}
        error={waiterError?.emailId?.error}
        helperText={waiterError?.emailId?.message}
        label="Email Id" fullWidth/>
        </Grid>
        <Grid item xs={12}>
        <TextField onChange={(event)=>setAddress(event.target.value)}
        onFocus={()=>handleError(false,'address','')}
        error={waiterError?.address?.error}
        helperText={waiterError?.address?.message}
         label="Address" fullWidth/>
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