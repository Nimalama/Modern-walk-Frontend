import { Component } from "react";

import Register from './Register';
import Login from './Login';

import { Route } from 'react-router-dom';
import AddProduct from "../admin/AddProduct";
import Home from './Home';
import Aboutus from '../AboutUs/AboutUs';
import Admin from '../admin/Admin';
import Product from '../Product/product';
import SingleProdcut from '../Product/singleProduct';
import Contact from '../Contactus/Contact'
import Mylist from '../MyList/mylist';
import AddGiveaway from '../admin/AddGiveaway';
import ShowGiveaway from '../admin/ShowGiveaway';
import Book from "../MyList/book";
import MyBookings from "../MyList/myBookings";

class Body extends Component {
  render() {
    return (
      <>
  
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route exact path='/' component={Home} />
          <Route path='/addProduct' component={AddProduct} />
          <Route path='/AboutUs' component={Aboutus} />
          <Route path='/Contact' component={Contact} />
          <Route path='/mylist' component={Mylist}/>
          <Route path='/admin' component={Admin} />
          <Route path="/product" component={Product}/>
          <Route path="/singleProduct/:pid" component={SingleProdcut} />
          <Route path='/booking' component={MyBookings} exact/>
          <Route path='/addgiveaway' component={AddGiveaway}/>
          <Route path='/showgiveaway' component={ShowGiveaway}/>
         


      </>



    )
  }
}
export default Body;