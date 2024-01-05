import { useState,useEffect } from "react";
import { Height } from "@mui/icons-material";
import {Avatar, Grid,TextField,Button,Select,FormHelperText} from "@mui/material"
import { makeStyles } from "@mui/styles"
 import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadFile from '@mui/icons-material/UploadFile';
import { serverURL,getData,postData } from "../../services/FetchNodeServices";
import Heading from "../../components/heading/Heading";
import Swal from "sweetalert2";
const useStyles = makeStyles({
  root: {
    width:"auto",
    height:"100%",
    background:'#dfe4ea',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',

  },
 
  box:{
    width:"70%",
    height:"auto",
    borderRadius:10,
    background:'#fff',
    padding:15,
   

  },
  center:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'

  },
  heading:{fontFamily:'Kanit', fontWeight:'bold',fontSize:20,letterSpacing:1, alignItems:'center',
  display:'flex',
}
});
 export default function  RestaurantInterface()
{  
        var classes=useStyles()
        var admin=JSON.stringify(localStorage.getItem('ADMIN'))
    const [states,setStates]=useState([])
    const[Cities,setCities]=useState([])

    const[stateid,setStateId]=useState('')
    const[cityid,setCityId]=useState('')
    const[restaurantName,setRestaurantName]=useState('')
    const[ownerName,setOwnerName]=useState('')
    const[phoneNumber,setPhoneNumber]=useState('')
    const[emailId,setEmailId]=useState('')
    const[mobileNumber,setMobileNumber]=useState('')
    const[url,setUrl]=useState('')
    const[fssai,setFssai]=useState('')
    const[gstNo,setGstNo]=useState('')
    const[gstType,setGstType]=useState('')
    const[fileFssai,setFileFssai]=useState({url:'',bytes:''})
    const[fileShopAct,setFileShopAct]=useState({url:'',bytes:''})
    const[fileLogo,setFileLogo]=useState({url:'',bytes:''})
    const[address,setAdress]=useState('')
    const[resError,setResError]=useState({})
    const [password,setPassword]=useState('')
    const handleReset=()=>{
      setRestaurantName('')
      setOwnerName('')
      setStateId('-Select State-')
      setCityId('-Select City-')
      setAdress('')
      setFileLogo({ url: "", bytes: "" })
   
     }
  const generatePassword=()=>
  {
     var pwd=parseInt((Math.random()*8999)+1000)
     return pwd
  }

    const handleError = (error, input,message) => {
      setResError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
      console.log("CC",resError)
     };
     const validation=()=>
     {  var submitRecord=true
        if(restaurantName.trim().length==0)
        {
         handleError(true,'restaurantName',"Pls Input Restaurant Name")
          
         submitRecord=false
        }
         if(ownerName.trim().length==0)
     {
      handleError(true,'ownerName',"Pls Input Owner Name")
       
      submitRecord=false
     }
     if(!mobileNumber || !(/^[0-9]{10}$/).test(mobileNumber))
     {
      handleError(true,'mobileNumber',"Pls Input Correct Mobile Number")
       
      submitRecord=false
     }
     if(!emailId || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) 
    {
      handleError(true,'emailId',"Pls Input Correct Email Address")
       
      submitRecord=false
    }

    if(!address)
    {
     handleError(true,'address',"Pls Input Address")
      
     submitRecord=false
    }
   
    if(!stateid)
    {
     handleError(true,'stateid',"Pls Select State")
      
     submitRecord=false
    }
    if(!fileFssai.url)
    {
     handleError(true,'fileFssai',"Pls Upload Fssai")
      
     submitRecord=false
    }
    return submitRecord
      }










    const fetchAllStates=async()=>{
        var result = await getData('statecity/fetch_all_states')
     
       setStates(result.data)
  // alert(result.message)

    }
    useEffect(function()
    {
     fetchAllStates() 
    },[])

    const fillState=()=>{
        return states.map((item)=>{
            return <MenuItem value={item.stateid}>{item.statename}</MenuItem>
        })
    }
    const fetchAllCities=async(stateid)=>{
        var body={stateid:stateid}
        var result=await postData('statecity/fetch_all_cities',body)
        setCities(result.data)
    }
    const fillCities=()=>{
        return Cities.map((item)=>
        {
            return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
        })
    }
    const handleStateChange=(event)=>{
        setStateId(event.target.value)
        fetchAllCities(event.target.value)
    }
    const gstChange=(event)=>{
        setGstType(event.target.value)
      
    }
    const handleFssai=(event)=>{
        setFileFssai({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleShopact=(event)=>{
        setFileShopAct({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleUploadlogo=(event)=>{
        setFileLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
  

    const handleSubmit=async()=>
  {  
    var error=validation()
    console.log("After Submit:",resError)   
    if (error)
   {

     
    var formData=new FormData()
    formData.append('restaurantname',restaurantName)
    formData.append('ownername',ownerName)
    formData.append('phonenumber',phoneNumber)
    formData.append('emailid',emailId)
    formData.append('mobileno',mobileNumber)
    formData.append('address',address)
    formData.append('stateid',stateid)
    formData.append('cityid',cityid)
    formData.append('url',url)
    formData.append('fssai',fssai)
    formData.append('gstno',gstNo)
    formData.append('gsttype',gstType)
    formData.append('filelogo',fileLogo.bytes)
    formData.append('fileshopact',fileShopAct.bytes)
    formData.append('filefssai',fileFssai.bytes)
    formData.append('password',generatePassword())

    var d=new Date()
    var cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()

    formData.append('createdat',cd)
    formData.append('updatedat',cd)
    var result=await postData('restaurants/restaurant_submit',formData)
    if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Restaurant Registration',
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
        <Heading title={"Restaurant Register"}/>
            </Grid>
            
            <Grid item xs={6} >
                 
            <TextField
             onFocus={()=>handleError(false,'restaurantName','')}
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
             onFocus={()=>handleError(false,'ownerName','')}
             error={resError?.ownerName?.error}
             helperText={resError?.ownerName?.message}
              onChange={(event) => setOwnerName(event.target.value)}
              label="Owner Name"
              fullWidth
              value={ownerName}
            />   {/* <TextField onChange={(event)=>setOwnerName(event.target.value)}label=" Owner  Name" fullWidth/> */}

            </Grid>
            <Grid item xs={4}>
                <TextField onChange={(event)=>setPhoneNumber(event.target.value)}label="Phone Number" fullWidth/>

            </Grid>
            <Grid item xs={4}>
            <TextField
               onFocus={()=>handleError(false,'mobileNumber','')}
               error={resError?.mobileNumber?.error}
               helperText={resError?.mobileNumber?.message}
              onChange={(event) => setMobileNumber(event.target.value)}
              label="Mobile Number"
              fullWidth
            />
          </Grid>
            <Grid item xs={4}>
            <TextField
              onFocus={()=>handleError(false,'emaild','')}
              error={resError?.emailId?.error}
              helperText={resError?.emailId?.message}
              
              onChange={(event) => setEmailId(event.target.value)}
              label="Email Address"
              fullWidth
            />

            </Grid>
             
            <Grid item xs={12}>
                <TextField  onFocus={()=>handleError(false,'address','')}
              error={resError?.address?.error}
              helperText={resError?.address?.message}onChange={(event)=>setAdress(event.target.value)} label=" Address" fullWidth/>

            </Grid>
            <Grid item xs={4}>
                 <FormControl fullWidth>
                    <InputLabel>States</InputLabel>
                    <Select onFocus={()=>handleError(false,'stateid','')}
                 error={resError?.stateid?.error}
                 helperText={resError?.stateid?.message} 
                label="States" onChange={handleStateChange}>
                        <MenuItem>-Select States-</MenuItem>
                    {fillState()}
                    </Select>
                    <FormHelperText style={{color:'red'}}>{resError?.stateid?.message}</FormHelperText>
               
                 </FormControl>

            </Grid>
            <Grid item xs={4}>
                 <FormControl fullWidth>
                    <InputLabel>City</InputLabel>

                    <Select  label="City" value={cityid}onChange={(event)=>setCityId(event.target.value)}>
                        <MenuItem>-Select City-</MenuItem>
                                         {fillCities()}
   
                    </Select>
                 </FormControl>

            </Grid>
            <Grid item xs={4}>
                <TextField onChange={(event)=>setUrl(event.target.value)}label="URL" fullWidth/>

            </Grid>
            <Grid item xs={4}>
                <TextField onChange={(event)=>setFssai(event.target.value)} label="Fssai Number" fullWidth/>

            </Grid>
            <Grid item xs={4}>
                <TextField onChange={(event)=>setGstNo(event.target.value)}label="GST Number" fullWidth/>

            </Grid>
            <Grid item xs={4}>
                 <FormControl fullWidth>
                    <InputLabel>GST Type</InputLabel>
                    <Select label="Gst Type" value={gstType} onChange={(event)=>setGstType(event.target.value)}>
                        <MenuItem>-Select Gst Type-</MenuItem>
                        <MenuItem value='5 Star'>5 Star-</MenuItem>
                        <MenuItem value='Other'>-Other-</MenuItem>


                        
                    </Select>
                 </FormControl> 

        </Grid>
        <Grid item xs={4}>
        
        <Button fullWidth component="label" variant="contained"  endIcon={<UploadFile/>}>
        <input                onFocus={()=>handleError(false,'fileFssai','')}
                              onChange={handleFssai} hidden accept="image/*" multiple type="file"  />
            Upload Fssai
        </Button>
        {
            resError?.fileFssai?.error?<div style={{color:'red',fontSize:'0.8rem',margin:5}}>{resError?.fileFssai?.message}</div>:<></>
            }

            
        </Grid>
        <Grid item xs={4}>
        
        <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
        <input onChange={handleShopact} hidden
            accept="image/*"
          multiple   type="file"  />
            Upload Shop Act
        </Button>

            
        </Grid>
        <Grid item xs={4}>
        
        <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
        <input onChange={handleUploadlogo} hidden
            accept="image/*"
          multiple  type="file"  />
            Upload Logo
        </Button>

            
        </Grid>

        <Grid item xs={4}className={classes.center}>
        <Avatar
        variant="rounded"
        alt="Remy Sharp"
        src={fileFssai.url}
        sx={{ width: 56, height: 56 }}
      />

        </Grid>

        <Grid item xs={4} className={classes.center}>

        <Avatar
        variant="rounded"
        alt="Remy Sharp"
        src={fileShopAct.url}
        sx={{ width: 56, height: 56 }}
      />
        </Grid>

        <Grid item xs={4}className={classes.center}>
        <Avatar
        variant="rounded"
        alt="Remy Sharp"
        src={fileLogo.url}
        sx={{ width: 56, height: 56 }}
      />
            
        </Grid>
        <Grid item xs={6}>
            <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={handleReset} variant="contained" fullWidth>Reset</Button>
            </Grid>
        </Grid>
        </div>

    </div>)
}