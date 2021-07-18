import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col,Card} from 'react-bootstrap';
import AcceptDeclineModal from './acceptDeclineModal'


const Delivery = (props) => {
    const {} = props;
    //state goes here
    let [deliveryItems,setDelivery] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"bookedData",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setDelivery(
                    response.data.data
                )
            }
            else
            {
                setDelivery([]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <React.Fragment>
            <h5 className="text-center" style={{fontWeight:"bolder",color:"darkblue",textDecoration:"underline",textDecorationStyle:"dotted"}}> Delivery Items </h5>
            {
                deliveryItems.length > 0?(
                    <>
                        <p style={{float:"right"}}> {deliveryItems.length} items on delivery list. </p>
                        <Container>
                        <Row>
                        {
                            deliveryItems.map((product)=>{
                                return (
                                    <Col lg={4}>
                                    <Card className="CardProductsss" style={{ cursor: "pointer" }}>
                                                <div className="productImage">
                                                    <Card.Img variant="top" src={`http://localhost:90/${product.booking_id.product_id.pimage}`} />
                                                </div>
                                              
                                                <Card.Title className="text-center">{product.booking_id.product_id.pname}</Card.Title>
                                                <div>
                                                    <p style={{float:"right",margin:"4px"}}><strong> Price: </strong> <small>Rs {product.price}</small> </p>
                                                    <p style={{margin:"4px"}}><strong> Quantity: </strong> <small>{product.quantity}</small> </p>
                                                </div>

                                                <div>
                                                    <p style={{float:"right",margin:"4px"}}><strong> Phone no1: </strong><small> {product.phoneNo} </small></p>
                                                    <p style={{margin:"4px"}}><strong> Shipment At: </strong><small>{product.address}</small>  </p>
                                                </div>

                                                <div>
                                                    <p style={{float:"right",margin:"4px"}}><strong> Booked At: </strong> <small>{product.booked_at}</small> </p>
                                                    <p style={{margin:"4px"}}><strong> Phone no2: </strong> <small>{product.phoneNo2}</small> </p>
                                                </div>
                                                {
                                                    product.userStatement == "Replacement Needed"&&
                                                    (
                                                        <p className="text-center"> Replacement Work </p>
                                                    )
                                                }
                                                {
                                                    product.unreceivedPoints > 0&&
                                                    (
                                                        <p className="text-center mb-2"> <strong> Shipping Missed: </strong> <small>{product.unreceivedPoints}/3 (times)</small>  </p>
                                                    )
                                                }
                                                
                                                <Row style={{padding:"10px",margin:"10px"}}>
                                                    <Col lg={6}>
                                                        <button type="button" className="btn btn-success btn-md btn-block" data-toggle="modal" data-target={`#acceptBooking${product._id}`} name="Accept"> Accept </button>
                                                        <AcceptDeclineModal nomenclature="acceptBooking" data={product}/>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <button type="button" className="btn btn-danger btn-md btn-block" data-toggle="modal" data-target={`#declineBooking${product._id}`} name="Danger"> Decline </button>
                                                        <AcceptDeclineModal nomenclature="declineBooking" data={product}/>
                                                    </Col>
                                                </Row>
                                                
                                                </Card>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                        </Container>
                    </>
                ):
                (
                    <p className="text-center" style={{fontWeight:"bolder",color:"black"}}> No Items for Delivery </p>
                )
            }
        </React.Fragment>
    )
}

export default Delivery
