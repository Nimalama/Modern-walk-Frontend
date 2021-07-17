import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';


const SingleProduct = (props) => {
    let [product, setProduct] = useState({})
    let [auth, setAuth] = useState({
        "config": {
            "headers": {
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
    })

    useEffect(() => {
        axios.get("http://localhost:90/product/single/" + props.match.params.pid)
            .then((response) => {
                setProduct(
                    response.data.data
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }, [product])

    const addToCart = (e) => {
        axios.post("http://localhost:90/book/clothing", { "product_id": props.match.params.pid, "quantity": 1, "delivery_address": "Not Added", "delivery_number": "Not Added" }, auth.config)
            .then((response) => {
                if (response.data.success == true) {
                    swal({
                        title: "Success",
                        "text": response.data.message,
                        "icon": "success"
                    })
                    window.location.href = "/Product"
                }
                else {
                    swal({
                        title: "Error",
                        "text": response.data.message,
                        "icon": "error"
                    })
                }
            })
            .catch((err) => {
                console.log(err);

            })
    }


    return (
        <React.Fragment>
            <Container>
                <Row className="product__wrapper">
                    <Col lg={6}>
                        <div className="product__img">
                            <img src={`http://localhost:90/${product.pimage}`} alt="product" className="d-block" />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <h5 className="text-center mt-2"><strong>{product.pname}</strong></h5>
                        <table className="table  mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Brand</th>
                                    <td> {product.pBrand}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Product Description</th>
                                    <td> {product.pdesc}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Avaiable Stock</th>
                                    <td> {product.availableStock}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Product discount</th>
                                    <td> {product.discount}</td>
                                </tr>
                                
                                <tr>
                                    <th scope="col">Product Price</th>
                                    <td> {product.pprice}</td>
                                </tr>

                            </thead>
                        </table>
                    </Col>
                    <Col lg={12}>
                        <button className="btn btn-outline-primary" name="addToCart" type="button" style={{ float: "right", color: "green" }} onClick={(event) => { addToCart(event) }}> Add To Cart </button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default SingleProduct
