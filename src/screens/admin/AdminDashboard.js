import { useState } from "react";
import { useStyles } from "./AdminDashboardCss";
import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper } from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';

import Category from "../restaurant/Category";
import DisplayAllCategory from "../restaurant/DisplayAllCategory";
import SubCategoryInterface from "../restaurant/SubCategoryNew";
import DisplayAllFoodItem from "../DisplayAllSubCategory";
import TableBookingInterface from "../restaurant/TableInterface";
import WaiterInterface from "../restaurant/waiter";
import DisplayAllWaiter from "../../screens/restaurant/DisplayAllWaiter";
import WaiterTableInterface from "../../screens/restaurant/WaiterTableInterface";
import DisplayAllWaiterTable from "../../screens/restaurant/DisplayAllWaiterTable";

import { Routes,Route ,Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices";
import DisplayAllTable from "../restaurant/DisplayAllTableInterface";
import FoodBooking from "../FoodBooking/FoodBooking"
import AllSales from "../allsales/AllSales";
// import Chart from "../../components/DashboardComponent/Chart"
import Summary from "./Summary";
export default function AdminDashboard(props)
{
  const classes=useStyles();
  const navigate=useNavigate();
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const handleLogout=()=>
  {

  
  localStorage.clear()
  navigate('/adminlogin')
  }
  return(
    <Box sx={{ flexGrow: 1 }} >
        <AppBar position="sticky"> 
          <Toolbar variant="dense"> 
            <Typography variant="h6" color="inherit" component="div">
              {admin.restaurantname}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spaces={3} style={{paddingInlineStart:5}} >
          <Grid item xs={2.2} >
            <Paper >
              <div className={classes.leftBarStyle}>
                <img src={`${serverURL}/images/${admin.filelogo}`} style={{width:80,height:80}}/> 
                <div className={classes.nameStyle}>{admin.ownername}</div>
                <div className={classes.emailStyle}>{admin.emailid}</div>
                <div className={classes.phoneStyle}>+91{admin.mobileno}</div>
              </div>
              <div className={classes.menuStyle}>
                <List>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/ch')}>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                    </ListItemButton>
                  </ListItem>
                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallfooditem')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Food Item List</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayalltable')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Table List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallwaiter')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Waiter List</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallwaitertable')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>WaiterTable List</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/foodbooking')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>FoodBooking</span>} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/allsales')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>AllSales</span>} />
                    </ListItemButton>
                  </ListItem>



                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div> 
            </Paper>
          </Grid> 
          <Grid item xs={9.8} style={{padding:20}}>
{/* <Summary/> */}
            <Routes>
            <Route path="/" element={<Navigate to="/admindashboard/ch" replace={true} />}/>

              <Route element={<Category/>} path='/category'/>
              <Route element={<DisplayAllCategory/>} path='/displayallcategory'/>
              <Route element={<SubCategoryInterface/>} path='/fooditeminterface'/>
              <Route element={<DisplayAllFoodItem/>} path='/displayallfooditem'/>
              <Route element={<TableBookingInterface/>} path='/tablebookinginterface'/>
              <Route element={<DisplayAllTable/>} path='/displayalltable'/>
              <Route element={<WaiterInterface/>} path='/waiters'/>
              <Route element={<DisplayAllWaiter/>} path='/displayallwaiter'/>
              <Route element={<WaiterTableInterface/>} path='/waitertableinterface'/>
              <Route element={<DisplayAllWaiterTable/>} path='/displayallwaitertable'/>
              <Route element={<FoodBooking/>} path='/foodbooking'/>
              <Route element={<AllSales/>} path='/allsales'/>

              <Route element={<Summary/>} path='/ch'/>




            </Routes> 
          </Grid>
        </Grid>
    </Box>
  )
}