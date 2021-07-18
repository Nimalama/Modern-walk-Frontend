import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';



const Task = (props) => {
    const {}=props;
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
    })
 
    const startServer = (e)=>{
        axios.get('http://localhost:90/serverToggle',auth.config)
        .then((response)=>{
 
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card className="cardDesign">

                            <Card.Body>
                                <Card.Title>Start Server</Card.Title>
                                <Card.Text>
                                    Just Wait !!!!Starting the server.
                                </Card.Text>
                                <div className="text-center">
                                    <button className="btn btn-primary btn-md w-50 mt-2" type="button" name="server"onClick={(event)=>startServer(event)}>Start Server</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={12}>
                        <Card className="cardDesign">

                            <Card.Body>
                                <Card.Title>Add Giveaway</Card.Title>
                                <Card.Text>
                                    Add Giveaway
                                </Card.Text>
                                <div className="text-center">
                                    <Link className="btn btn-primary btn-md w-50 mt-2" name="server" to="/addgiveaway" >Add Giveaway</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={12}>
                        <Card className="cardDesign">

                            <Card.Body>
                                <Card.Title>Delivery Work</Card.Title>
                                <Card.Text>
                                   Check the delivery items and deliver it to the appropriate user.
                                </Card.Text>
                                <div className="text-center">
                                    <Link className="btn btn-primary btn-md w-50 mt-2" name="server" to="/deliveryItems" >Deliver</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={12}>
                        <Card className="cardDesign">

                            <Card.Body>
                                <Card.Title>Show Analysis</Card.Title>
                                <Card.Text>
                                   Check analysis of selling.
                                </Card.Text>
                                <div className="text-center">
                                    <Link className="btn btn-primary btn-md w-50 mt-2" name="server" to="/showAnalysis" >Analysis</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Task;


