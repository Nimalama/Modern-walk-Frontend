import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import {MdAddCircle } from 'react-icons/md';
import { AiFillMinusCircle } from 'react-icons/ai'
import swal from 'sweetalert';
import Book from './book'


const Mylist = (props) => {
    let [cart, setCart] = useState([]);
    let [auth, setAuth] = useState({
        "config": {
            "headers": {
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
    });
    useEffect(() => {
        axios.get("http://localhost:90/retrieve/myBookings", auth.config)
            .then((response) => {
                console.log(response)
                if (response.data.success == true) {
                    setCart(
                        response.data.data
                    )
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const minusClick = (event,val) =>{
        var qty = document.querySelector(`.productQuantity${val._id}`);
        var price = document.querySelector(`.price${val._id}`);
        var avStock = document.querySelector(`.avStock${val._id}`);
        var myQuantity = parseInt(qty.innerHTML);
        var myPrice = parseInt(price.innerHTML);
      
        var singlePrice = myPrice/myQuantity;
        var avs = parseInt(avStock.innerHTML);
        if(myQuantity > 1)
        {
            myQuantity-=1;
            avs+=1;
            axios.post("http://localhost:90/update/booking",{pid:val._id,qty:myQuantity},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    qty.innerHTML = myQuantity;
                    avStock.innerHTML = avs;
                    price.innerHTML = singlePrice*myQuantity
                    swal(
                        {
                            title:"Success",
                            text:response.data.message,
                            icon:"success"
                        }
                    )
                    window.location.reload();
                }
                else
                {
                    swal(
                        {
                            title:"Error",
                            text:response.data.message,
                            icon:"error"
                        }
                    )
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }

    }

    const plusClick = (event,val)=>{
        var qty = document.querySelector(`.productQuantity${val._id}`);
        var avStocks = document.querySelector(`.avStock${val._id}`);
        var price = document.querySelector(`.price${val._id}`);
        var myQuantity = parseInt(qty.innerHTML);
        
        var myPrice = parseInt(price.innerHTML);
        var singlePrice = myPrice/myQuantity;
        var avStock = parseInt(val.product_id.availableStock);
        var avs = parseInt(avStocks.innerHTML);
        
        if(avStock > 0)
        {
            avs-=1;
           
            myQuantity+=1;
            axios.post("http://localhost:90/update/booking",{pid:val._id,qty:myQuantity},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    qty.innerHTML = myQuantity;
                    price.innerHTML = singlePrice*myQuantity
                    avStocks.innerHTML = avs;
                    swal(
                        {
                            title:"Success",
                            text:response.data.message,
                            icon:"success"
                        }
                    )
                    window.location.reload();
                }
                else
                {
                    swal(
                        {
                            title:"Error",
                            text:response.data.message,
                            icon:"error"
                        }
                    )
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }

    }


    

   
    const deleteBooking = (e, id) => {
        console.log(id);
        axios.post("http://localhost:90/delete/booking", { pid: id }, auth.config)
            .then((response) => {
                console.log(response)
                if (response.data.success == true) {
                    swal(
                        {
                            title: "Success",
                            text: response.data.message,
                            icon: "success"
                        }
                    )
                    window.location.reload();
                }
                else {
                    swal(
                        {
                            title: "Error",
                            text: response.data.message,
                            icon: "error"
                        }
                    )
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }



    return (
        <>
            <React.Fragment>
                <Container fluid className="mt-2 mb-2">
                    <Row>
                        

                        {
                            cart.map((product) => {
                                return (
                                    <Col lg={3}>
                                        <Card className="CardProducts" style={{ cursor: "pointer" }}>
                                            <div className="productImage">
                                                <Card.Img variant="top" src={`http://localhost:90/${product.product_id.pimage}`} />
                                            </div>
                                            <Card.Body>
                                                <Card.Title className="text-center">{product.product_id.pname}</Card.Title>
                                                <p className="text-center"><strong>Brand</strong>  {product.product_id.pBrand}</p>
                                             
                                                <p className="text-center"><strong>Available Stock: </strong> <span className={`avStock${product._id}`}> {product.product_id.availableStock}</span>  </p>
                                                <p className="text-center"><strong>Price: </strong>Rs<span className={`price${product._id}`}> {product.price}</span></p>
                                                <p className="text-center mb-4"><strong>Quantity: </strong> <AiFillMinusCircle style={{ fontSize: "32px", color: "pink" }} onClick={(event) => { minusClick(event, product) }} />  <span className={`productQuantity${product._id}`}> {product.quantity} </span> <MdAddCircle style={{ fontSize: "32px", color: "pink" }} onClick={(event) => { plusClick(event, product) }} /> </p>

                                            </Card.Body> 
                                              
                                            <div className="text-center mt-4 mb-2">
                                            <button className="btn btn-success btn-md w-25" data-toggle="modal" data-target={`#book${product._id}`} > Booking </button>
                                            <Book data={product}/>
                                                <button className="btn btn-danger btn-md w-25" name="delete__booking" onClick={(event)=>{deleteBooking(event,product._id)}}> Delete </button>
                                            </div>
                                            
                                                                                 </Card>
                                    </Col>

                                )
                            })
                        }
                    </Row>
                </Container>
            </React.Fragment>
        </>
    )
}
export default Mylist;
