import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { getData, serverURL, postData } from "../../services/FetchNodeServices";
import { UseSelector, useDispatch, useSelector } from "react-redux";

export default function FoodComponent(props) {
  var dispatch = useDispatch();
  var foodOrder = useSelector((state) => state.orderData);
  const [listFood, setListFood] = useState([]);
  const [tempListFood, setTempListFood] = useState([]);
  const [order, setOrder] = useState([]);
  const [waiter, setWaiter] = useState([]);

  var admin = JSON.parse(localStorage.getItem("ADMIN"));
  useEffect(
    function () {
      fetchAllFood();
    },
    [props]
  );
  const searchFood = (e) => {
    var temp = tempListFood.filter((item) =>
      item.foodname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setListFood(temp);
  };
  const handleOrder=(item)=>{

    var key=`#${props.floorNo}${props.tableNo}`
    
    try{
      
    var foodlist=foodOrder[key]
    
    try{
      
      foodlist[item.fooditemid].qty=parseInt(foodlist[item.fooditemid].qty)+1
    
    }
    
    catch(e){
    item.qty=1
    foodlist[item.fooditemid]=item
    foodOrder[key]=foodlist
    }
    
    }


    catch(e)
    { 
      var foodlist={}
      item.qty=1
      foodlist[item.fooditemid]=item
      foodOrder[key]={...foodlist}
       
    }
    console.log(foodOrder)
    
    
    dispatch({type:'ADD_ORDER',payload:[key,foodOrder[key]]})
      props.setRefresh(!props.refresh)
    }

  const fetchAllFood = async () => {
    var result = await postData("subcategory/fetch_all_fooditem_categorywise", {
      restaurantid: admin.restaurantid,
      categoryid: props.categoryid,
    }); 
    setListFood(result.data);
    // alert(JSON.stringify(result.data));
    setTempListFood(result.data);
  };
  const showFoodList = () => {
    return listFood.map((item) => {
      return (
        <div>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItemButton
              onClick={() => handleOrder(item)}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={`${serverURL}/images/${item.fileicon}`}
                  sx={{ width: 30, height: 30 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.foodname}
                secondary={
                  item.offerprice > 0 ? (
                    <span>
                      <s>&#8377;{item.price}</s> <b>&#8377;{item.offerprice}</b>
                    </span>
                  ) : (
                    <b>&#8377;{item.price}</b>
                  )
                }
              />
            </ListItemButton>
          </List>
        </div>
      );
    });
  };
  const handleDialogClose = () => {
    props.setOpen(false);
  };
  const showFoodDialog = () => {
    return (
      <Dialog maxWidth={"sm"} open={props.open}>
        <DialogContent>
          <TextField
            onChange={(e) => searchFood(e)}
            fullWidth
            label="Search food items.."
            variant="standard"
          />

          {showFoodList()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {showFoodDialog()}
    </Box>
  );
}
