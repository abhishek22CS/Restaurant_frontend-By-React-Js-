import RestaurantInterface from "./screens/restaurant/RestaurantInterface";
//  import SubCategory from "./screens/restaurant/subcategory";
import DisplayAllRestaurant from "./screens/DisplayAllRestaurant";
import SubCategoryNew from "./screens/restaurant/SubCategoryNew";
import Category from "./screens/restaurant/Category";
import DisplayAllCategory from "./screens/restaurant/DisplayAllCategory";
import DisplayAllSubCategory from "./screens/DisplayAllSubCategory";
//import Waiters from "./screens/restaurant/Waiters"
import LoginPage from "./screens/superadmin/LoginPage";
import Dashboard from "./screens/superadmin/Dashboard";
import TableInterface from "./screens/restaurant/TableInterface";
import DisplayAllTable from "./screens/restaurant/DisplayAllTableInterface";
import WaiterInterface from "./screens/restaurant/waiter";
import DisplayAllWaiter from "./screens/restaurant/DisplayAllWaiter";
import WaiterTableInterface from "./screens/restaurant/WaiterTableInterface";
import DisplayAllWaiterTable from "./screens/restaurant/DisplayAllWaiterTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import FoodBooking from "./screens/FoodBooking/FoodBooking";
import Plusminus from "./components/Plusminus/Plusminus";
import AllSales from "./screens/allsales/AllSales";
// import Chart from "../../components/DashboardComponent/Chart"
import Summary from "./screens/admin/Summary";
 function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            element={<RestaurantInterface />}
            path="/restaurantinterface"
          />
          <Route
            element={<DisplayAllRestaurant />}
            path="/displayallrestaurant"
          />
          <Route element={<SubCategoryNew />} path="/subcategory" />
          <Route
            element={<DisplayAllSubCategory />}
            path="/displayallsubcategory"
          />
          <Route element={<DisplayAllCategory />} path="/displayallcategory" />
          <Route element={<Category />} path="/category" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<TableInterface />} path="/do" />
          <Route element={<DisplayAllTable />} path="/du" />
          <Route element={<WaiterInterface />} path="/dp" />
          <Route element={<DisplayAllWaiter />} path="/di" />
          <Route element={<WaiterTableInterface />} path="/dl" />
          <Route element={<DisplayAllWaiterTable />} path="/da" />
          <Route element={<FoodBooking />} path="/foodbook" />

          <Route element={<AllSales/>} path="/allsales" />

          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<AdminDashboard />} path="/admindashboard/*" />
          <Route element={<Plusminus />} path="/plusminus" />
          <Route element={<Summary />} path="/ch" />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
