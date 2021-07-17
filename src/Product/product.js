import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';



const Product = (props) => {
  
    let [category, setcategory] = useState("Male");
    let [clothing, setclothing] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:90/product/showall", { category: category })
            .then((response) => {
                if (response.data.success === true) {
                    setclothing(response.data.data)
                }
                else {
                    setclothing([])
                }
            })
    }, [category])
    const changeHandler = (e) => {
        setcategory(e.target.value)
    }
    var token = localStorage.getItem("token")

    const loginUser = (event) => {
        window.location.href = "/login"
    }
    return (
        <React.Fragment>
            <Container fluid className="mt-2 mb-2">
                <Row>
                    
                    <Col lg={4} className="d-none d-md-block"></Col>
                    <Col lg={4} className="mb-3">
                        <select className="form-control" onChange={event => { changeHandler(event) }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                    </Col>

                    <Col lg={4} className="d-none d-md-block"></Col>
                    {
                        clothing.length > 0 ?
                            (
                                clothing.map((product) => {
                                    return (
                                        <Col lg={3}>
                                            <Card className="CardProducts" style={{ cursor: "pointer" }}>
                                                <div className="productImage">
                                                    <Card.Img variant="top" src={`http://localhost:90/${product.pimage}`} />
                                                </div>
                                                <Card.Body>
                                                    <Card.Title className="text-center">{product.pname}</Card.Title>
                                                    <p><strong>Brand</strong>  {product.pBrand}</p>
                                                    <p><strong>Available Stock:</strong>  {product.availableStock}</p>
                                                    <p><strong>Price:</strong> {product.newPrice > 0 ?
                                                        (
                                                            <>
                                                                <span> Rs {product.newPrice}</span>  <span style={{ textDecoration: "line-through" }}>Rs{product.pprice}</span>
                                                                <span><small>({product.discount}%)</small></span>
                                                            </>
                                                        ) :
                                                        (
                                                            <span>Rs {product.pprice}</span>
                                                        )
                                                    }</p>
                                                    <div>
                                                        {
                                                            token ?
                                                                (
                                                                    <Link to={`/singleproduct/` + product._id}><FaCartPlus style={{ float: "right", color: "black" }} /></Link>
                                                                ) :
                                                                (
                                                                    <p style={{ float: "black" }} onClick={(event) => { loginUser(event) }}><FaCartPlus style={{ float: "right", color: "black" }} /></p>
                                                                )
                                                        }

                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            ) :

                            (
                                <Col lg={12}>
                                    <p className="text-center mt-2 mb-2"> No Clothes Found </p>
                                </Col>
                            )

                    }

                </Row>

            </Container>

        </React.Fragment>
    )
}

export default Product;


