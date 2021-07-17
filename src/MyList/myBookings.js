import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Container,Row,Col,Card } from 'react-bootstrap';

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

    const mapData = (data)=>{
        
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
                                                <Card className="CardProducts CardProductsss" style={{ cursor: "pointer" }}>
                                                <div className="productImage">
                                                    <Card.Img variant="top" src={`http://localhost:90/${product.booking_id.product_id.pimage}`} />
                                                </div>
                                                <Card.Body>
                                                    <Card.Title className="text-center">{product.booking_id.product_id.pname}</Card.Title>
                                                </Card.Body> 
                                                
                                                <div className="text-center mt-4 mb-2">
                                               
                                                
                                                </div>
                                                
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
