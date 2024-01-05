import { useState } from "react";
import {Avatar, Grid,TextField,Button,Select,FormHelperText } from "@mui/material";
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import Heading from "../../components/heading/Heading";

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
      width:"52%",
      height:"50%",
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




  export default function TableInterface()
  {
      var classes=useStyles()
      var admin = JSON.parse(localStorage.getItem("ADMIN"));

      const[floor,setFloor]=useState('');
      const[restaurantId,setRestaurantId]=useState(admin.restaurantid);
      const[tableNumber,setTableNumber]=useState('');
      const[numberOfChairs,setNumberOfChairs]=useState('');
      const[tableError,setTableError]=useState('');



      const handleError=(error,input,message)=>{
        setTableError(prevState=>({...prevState,[input]:{'error':error,'message':message}}));
      }


      const validation=()=>
    {
      var submitRecord=true
      if(!restaurantId)
      {
        handleError(true,'restaurantId',"Please Input Restaurant Id")
        submitRecord=false
      }

      if(!tableNumber)
      {
        handleError(true,'tableNumber',"Please Input Table Number")
        submitRecord=false
      }

      if(!numberOfChairs)
      {
        handleError(true,'numberOfChairs',"Please Input Number of Chairs")
        submitRecord=false
      }

      if(!floor)
      {
        handleError(true,'floor',"Please Select Floor")
        submitRecord=false
      }
      return submitRecord
    }



    const handleSubmit=async()=>{
        var error=validation()
        if(error)
        {  
        var formdata=new FormData()
        formdata.append('restaurantid',restaurantId)
        formdata.append('tableno',tableNumber)
        formdata.append('noofchairs',numberOfChairs)
        formdata.append('floor',floor)
        var result=await postData('tablebooking/table_submit',formdata)
        if(result.status)
      {
        Swal.fire({
          icon: 'success',
          title: 'Table Booking Registration',
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

        <Grid container spacing={4}>
        <Grid item xs={12}>
        <Heading title={"Table Registeration"}  myroute={'/admindashboard/displayalltable'}/>
        </Grid>
        <Grid item xs={6}>
        <TextField
        //  onChange={(event)=>setRestaurantId(event.target.value)} label="Restaurant Id"
        // onFocus={()=>handleError(false,'restaurantId','')}
        // error={tableError?.restaurantId?.error}
        // helperText={tableError?.restaurantId?.message}
         fullWidth
         value={restaurantId}
         disabled
         />
        </Grid>
        <Grid item xs={6}>
        <TextField onChange={(event)=>setTableNumber(event.target.value)} label="Table Number"
        onFocus={()=>handleError(false,'tableNumber','')}
        error={tableError?.tableNumber?.error}
        helperText={tableError?.tableNumber?.message}
        fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <TextField  onChange={(event)=>setNumberOfChairs(event.target.value)} label="Number of Chairs"
        onFocus={()=>handleError(false,'numberOfChairs','')}
        error={tableError?.numberOfChairs?.error}
        helperText={tableError?.numberOfChairs?.message}
        fullWidth/>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
        <InputLabel>Floor</InputLabel> 
        <Select onChange={(event)=>setFloor(event.target.value)}
        onFocus={()=>handleError(false,'floor','')}
        error={tableError?.floor?.error}
        helperText={tableError?.floor?.message}
        value={floor}
        label="Floor">
        <MenuItem>-Select Floor-</MenuItem>
        <MenuItem value="Ground Floor">Ground Floor</MenuItem>
        <MenuItem value=" Floor 1">Floor 1</MenuItem>
        <MenuItem value=" Floor 2">Floor 2</MenuItem>
        <MenuItem value=" Floor 3">Floor 3</MenuItem>
        <MenuItem value=" Floor 4">Floor 4</MenuItem>
        <MenuItem value="Floor 5">Floor 5</MenuItem>
        <MenuItem value=" Floor 6">Floor 6</MenuItem>
        <MenuItem value=" Floor 7">Floor 7</MenuItem>
        <MenuItem value=" Floor 8">Floor 8</MenuItem>
        <MenuItem value="Floor 9">Floor 9</MenuItem>
        <MenuItem value=" Floor 10">Floor 10</MenuItem>
        <MenuItem value="Roof Top">Roof Top</MenuItem>

        </Select>
        <FormHelperText>{tableError?.floor?.message}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={6}>
        <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" fullWidth>Reset</Button>
        </Grid>

        </Grid>

        </div>
      </div>)
  }