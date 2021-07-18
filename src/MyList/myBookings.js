import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Container,Row,Col,Card } from 'react-bootstrap';
import {RiEBike2Fill} from 'react-icons/ri'
import {FaHourglassEnd,FaSmileBeam} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import AcceptDeclineModal from '../admin/acceptDeclineModal'

const MyBookings = (props) => {
    const {} = props;
    let [bookings,setBookings] = useState([]);
    
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"myBookings",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setBookings(response.data.data)
            }
            else
            {
                setBookings([])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const checkAndLoadData = (data)=>{
        if(data.deliveryStatus == "Pending" && data.userStatement == "Replacement Needed")
        {
            return (
                <>
                  
                    <p style={{background:"pink",color:"black","fontWeight":"bolder",borderRadius:"6px",clear:"both","textAlign":"center",margin:"10px"}}> Replacement Pending <FaHourglassEnd/>  </p>
                </>
            )
        } 
        else if(data.deliveryStatus == "Pending" && data.userStatement == "Not Provided")
        {
            return (
                <>
                  
                    <p style={{background:"pink",color:"black","fontWeight":"bolder",borderRadius:"6px",clear:"both","textAlign":"center",margin:"10px"}}> Can Delete Booking Before 24 hrs <AiFillDelete/> </p>
                </>
            )
        }
        else if(data.deliveryStatus == "On a way")   
        {
            return(
            <>
            
            <p style={{background:"pink",color:"black","fontWeight":"bolder",borderRadius:"6px",clear:"both","textAlign":"center",margin:"10px"}}> 
            Item is on a way
            {
                data.userStatement == "Replacement Needed"?
                (
                    <> for replacement <RiEBike2Fill/>  </>
                ):
                (
                    <><RiEBike2Fill/> </>
                )
            }
            </p>
            </>
            )
        }

        else if(data.userStatement == "Success")
        {
            return(
                <>
                
                <p style={{background:"pink",color:"black","fontWeight":"bolder",borderRadius:"6px",clear:"both","textAlign":"center",margin:"10px"}}> 
                    Thank you for shopping <FaSmileBeam/>
               
                </p>
                </>
                )
        }

        else if(data.deliveryStatus == "Delivered" && data.userStatement == "Not Provided")
        {
            return (
            <Row style={{padding:"10px",margin:"10px"}}>
                <Col lg={6}>
                    <button type="button" className="btn btn-success btn-md btn-block" name="success" data-toggle="modal" data-target={`#successBooking${data._id}`}> <small>Success</small> </button>
                    <AcceptDeclineModal nomenclature="successBooking" data={data}/>
                </Col>
                <Col lg={6}>
                    <button type="button" className="btn btn-danger btn-md btn-block" name="replacement" data-toggle="modal" data-target={`#replaceBooking${data._id}`}><small> Replacement </small></button>
                    <AcceptDeclineModal nomenclature="replaceBooking" data={data}/>
                </Col>
            </Row>
            )
        }


    }

    return (
        <React.Fragment>
            <h5 className="text-center"> My Bookings </h5>
            {
                bookings.length > 0?
                (
                    <Container>
                        <Row>
                            {
                                 bookings.map((product)=>{
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
                                                <p className="text-center mb-2"> <strong> Booking Code: </strong> <small>{product.bookingCode}</small>  </p>
                                                {
                                                    product.replacements > 0&&
                                                    (
                                                        <p className="text-center mb-2"> <strong> Replacement Counts: </strong> <small>{product.replacements}</small>  </p>
                                                    )
                                                }
                                                {
                                                    product.unreceivedPoints > 0&&
                                                    (
                                                        <p className="text-center mb-2"> <strong> Shipping Missed: </strong> <small>{product.unreceivedPoints}/3 (times)</small>  </p>
                                                    )
                                                }
                                                
                                                {
                                                    checkAndLoadData(product)
                                                }
                                                
                                                </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                   
                ):
                (
                    <p className="text-center" style={{color:"black",fontSize:"21px"}}> No records found. </p>
                )
            }
        </React.Fragment>
    )
}

export default MyBookings
