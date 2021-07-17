import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';

export const UpdateDelete = (props) => {
    let [products, setProduct] = useState([])
    let [auth, setAuth] = useState({
        "config": {
            "headers": {
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
    });



    useEffect(() => {
        axios.get("http://localhost:90/product/Productshowall")
            .then((response) => {
                if (response.data.success === true) {
                    setProduct(
                        response.data.data
                    )
                }
            })
    }, [])



    return (

        <React.Fragment>
            <Container>
                <Row className="bg-white">
                    {
                        products.map((product) => {
                            return (
                                <Col lg={6} className="mt-2 mb-2">
                                    <div class="dropdown">
                                    <Card className="CardProduct" style={{cursor:"pointer"}} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="productImg">
                                            <Card.Img variant="top" src={`http://localhost:90/${product.pimage}`} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="text-center">{product.pname}</Card.Title>
                                            <p><strong>Available Stock:</strong>{product.availableStock}</p>
                                            <p><strong>Price:</strong>{product.newPrice > 0 ?
                                                (
                                                    <>
                                                        <span> Rs {product.newPrice}</span>  <span style={{ textDecoration: "line-through" }}>Rs{product.pprice}</span>
                                                    </>
                                                ) :
                                                (
                                                    <span>Rs {product.pprice}</span>
                                                )
                                            }</p>
                                            <p><strong>Discount:</strong>{product.discount}%</p>
                                            <p><strong>Brand:</strong>{product.pBrand}</p>


                                        </Card.Body>


                                    </Card>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button style={{border:"none",background:"none"}}data-toggle="modal" data-target={`#updateProduct${product._id}`}className="dropdown-item">Update</button>
                                            <button style={{border:"none",background:"none"}}data-toggle="modal" data-target={`#deleteProduct${product._id}`}className="dropdown-item">Delete</button>
                                        </div>
                                    </div>
                                    <UpdateModal item={product}key={product._id}/>
                                    <DeleteModal item={product}key={product._id}/>
                                 
                                </Col>
                               
                            )
                        })
                    }
                    <Col>

                    </Col>
                </Row>
            </Container>
        </React.Fragment>


    )
}
export default UpdateDelete;
