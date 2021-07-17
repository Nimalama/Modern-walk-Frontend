import { Component, state, changeHandler, submitData, fileHandler } from "react"
import axios from 'axios';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import swal from 'sweetalert'
import '../style.css'


class AddProduct extends Component {
    state = {
        pname: '',
        pprice: 0,
        pdesc: '',
        pimage: null,
        pdiscount: '0',
        availableStock: '',
        pBrand: '',
        category: 'Male',
        config: {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitData = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('pname', this.state.pname)
        data.append('pprice', this.state.pprice)
        data.append('pdesc', this.state.pdesc)
        data.append('pimage', this.state.pimage)
        data.append('pdiscount', this.state.pdiscount)
        data.append('availableStock', this.state.availableStock)
        data.append('pBrand', this.state.pBrand)
        data.append('category', this.state.category)
        console.log(data);
        axios.post('http://localhost:90/product/insert', data, this.state.config)
            .then((response) => {
                if (response.data.success === true) {
                    swal({
                        "title": "Successfully Added",
                        "text": response.data.message,
                        "icon": "success"
                    })


                    window.location.href = "/"
                }
                else {

                    swal({
                        "title": "Error",
                        "text": response.data.message,
                        "icon": "error"


                    })
                }

                console.log(response)
            })
    }

    fileHandler = (e) => {
        e.preventDefault();
        this.setState({
            pimage: e.target.files[0]

        })
    }
    render() {
        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <form method="post" className="p-3 mt-2" style={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.5)" }}>
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input type="text" className="form-control" name="pname" value={this.state.pname} onChange={this.changeHandler} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Price</label>
                                    <input type="text" className="form-control" name="pprice" value={this.state.pprice} onChange={this.changeHandler} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Description</label>
                                    <textarea type="text" className="form-control" name="pdesc" value={this.state.pdesc} onChange={this.changeHandler} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Image</label>
                                    <input type="file" className="form-control-file" name="pimage" onChange={this.fileHandler} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Discount</label>
                                    <input type="text" className="form-control" name="pdiscount" value={this.state.pdiscount} onChange={this.changeHandler} required />
                                </div>
                                <div className="form-group">
                                    <label>Product availableStock</label>
                                    <input type="text" className="form-control" name="availableStock" value={this.state.availableStock} onChange={this.changeHandler} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Brand</label>
                                    <input type="text" className="form-control" name="pBrand" value={this.state.pBrand} onChange={this.changeHandler} required />
                                </div>
                                <div className="form-group">
                                    <label>Product category</label>
                                    <select name="category" className="form-control" onChange={this.changeHandler} >
                                        <option name="Male">Male</option>
                                        <option name="Female">Female</option>
                                    </select>

                                </div>

                                <div className="text-center">
                                    <button className="btn btn-primary btn-md" type="submit" name="Submit" onClick={this.submitData}>Submit</button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment >
        )
    }
}
export default AddProduct;