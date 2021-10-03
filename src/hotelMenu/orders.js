import React,{useState,useEffect} from 'react';
import {Container,Row,Col,Card,Table} from 'react-bootstrap';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useCommon from '../common/useCommon';
import StarRatings  from 'react-star-ratings';
import {useToasts} from 'react-toast-notifications';
import GenerateBill from './generateBill'

let slogans = ["Eat away at hunger.","You can help beat hunger!","We're hungry for donations.","Get in the holiday mood; donate some food."]

const Orders = (props) => {
    const {} = props;
    const {getFormattedTime,getFancyDate} = useCommon();
    const {addToast} = useToasts();

    //state goes here
    let [myOrders,setMyOrders] = useState([]);
    let [deletable,setDeletable] = useState([]);
    let [unqDates,setUnqDate] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    });


    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"fetchMyOrders",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setMyOrders(response.data.data);
                setDeletable(response.data.deletable);
                setUnqDate(response.data.distinctDate);
            }
            else
            {
                setMyOrders([]);
                setDeletable([]);
                setUnqDate([]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    //handlers
    const loadOrders = (date)=>{
        let ordersInDate = myOrders.filter((val)=>{return val.orderFancyDate == date});
        let content = [];

        if(ordersInDate.length > 0)
        {
            for(var i of ordersInDate)
            {
                content.push(
                    <Container className="orderDesign">
                    <Row>
                    <Col lg = {6}>
                        <h5  style={{fontSize:"32px"}}> Order Details </h5>
                        <Slider {...settings}>
                            {
                                i.hotelFoodId.foodPictures.length > 0 &&
                                (
                                    i.hotelFoodId.foodPictures.map((val)=>{
                                         return(
                                            <div className='foodImgg'>
                                                <img src={`${process.env.REACT_APP_URL}${val}`} alt="img" className="d-block"/>
                                            </div>  
                                         )   
                                    })
                                    
                                )
                            }   
                        </Slider>
                        <p className="mt-3"> <strong> Order Time: </strong> {getFormattedTime(i.orderedTime[0],i.orderedTime[1])} </p> 
                          <mark style={{fontWeight:"bolder",background:"#f0f0f0",fontSize:"18px"}}> {slogans[parseInt(Math.random()*slogans.length)]} </mark> 
                          
                        </Col>
                      <Col lg={6}>
                      <div style={{marginTop:"40px"}}>
                      <h1 style={{fontSize:"25px"}}>Hotel Name</h1>
                                <Table className="table table-striped myTable">
                                    <thead>
                                        <tr> 
                                            <th> Food Name </th>
                                            <td> {i.hotelFoodId.foodName} </td>
                                         </tr>
                                        
                                        <tr>
                                            <th>Flavor</th>
                                            <td>{i.hotelFoodId.flavor}</td>
                                        </tr>
                                        <tr>
                                            <th>Quantity</th>
                                            <td>{i.quantity}</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td>{i.hotelFoodId.discountPercent > 0 ? <><span style={{textDecoration: "line-through" }}> Rs {i.hotelFoodId.price * i.quantity} </span> <span> Rs {i.hotelFoodId.newPrice * i.quantity}</span> <span style={{color:'grey'}}> ({i.hotelFoodId.discountPercent}% off) </span>  </> : <> {i.hotelFoodId.price * i.quantity} </>  }</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Status</th>
                                            <td>{i.paymentStatus}</td>
                                        </tr>
                                       
                                    </thead>
                                </Table>  

                                {
                                    i.foodStatus == "Served" && i.orderFancyDate == getFancyDate(new Date())&&
                                    (
                                        <div className="text-center">
                                        <StarRatings
                                            rating={i.foodRating / i.quantity}
                                            starRatedColor="gold" 
                                            starHoverColor='gold'             
                                            numberOfStars={5}
                                            starDimension="35px"
                                            changeRating = {changeRating}
                                            name={`rating-${i._id}`}
                                            />
                                        </div>
                                    )
                                }
                                
                           
                        </div>
                       
                    </Col>
                    <Col lg={12}>
                    {
                                deletable.includes(i._id)?
                                (
                                    <button type="button" className="btn btn-danger btn-md w-0" style={{float: 'right',boxShadow:"2px 2px 6px rgba(0,0,0,0.6)"}} name="delete"> Delete </button>
                                ):
                                (
                                    <button type="button" className="btn btn-success btn-md w-0" style={{float: 'right',boxShadow:"2px 2px 6px rgba(0,0,0,0.6)",backgroundColor:"darkgreen"}} name="status"> {i.foodStatus} </button>
                                )
                            }

                            <div style={{clear:"both"}}></div>  
                    </Col>
                    </Row>
                    </Container>
                )
            }
        }
        else
        {
            content.push(
                
                <p className="text-center col-lg-12" style={{color:"black",fontWeight:"bold"}}> No Orders in the following date.   </p> 
            )
        }

        return content;
    }

    const filterCount = (date)=>{
        return myOrders.filter((val)=>{return val.orderFancyDate == date}).length;
    }

    const changeRating = (newRating,name)=>{
        let orderId = name.split("-")[1];

        axios.put(process.env.REACT_APP_URL+"rateTheFood",{'orderId':orderId,'rating':newRating},auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                addToast(response.data.message,{"appearance":'success','autoDismiss':true});
                window.location.reload();
            }
            else
            {
                addToast(response.data.message,{"appearance":'error','autoDismiss':true})
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        
                        <Row className="mt-4">
                        {
                            unqDates.length > 0?
                            (
                                unqDates.map((val)=>{
                                    return(
                                        <Col lg={12} className="mt-2 mb-5">
                                            <div>
                                                {
                                                    getFancyDate(new Date()) == val &&
                                                    (
                                                        <>
                                                          <button type="button" name="genBill" data-toggle="modal" data-target="#genBill" style={{background:"none",border:"none",color:"black",fontWeight:"bolder",float:'right',textDecoration:"underline",cursor:"pointer"}}> Generate Bill </button>
                                                          <GenerateBill/>
                                                        </>
                                                    )
                                                }
                                               
                                                <h6  style={{color:"black",fontWeight:"bolder"}}> {val} <small>[{filterCount(val)} orders]</small> </h6>
                                            </div>
                                            <Container>
                                            <Row>
                                            {
                                                loadOrders(val).map((val)=>{
                                                    return (
                                                        val
                                                    )
                                                })
                                            }
                                            </Row>
                                            </Container>
                                        </Col>
                                    )
                                })
                            ):
                            (
                                <Col lg={12}>
                                <p className="text-center" style={{color:"black",fontWeight:"bolder"}}> No Order Records Found. </p>
                                </Col>
                            )
                        }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Orders
