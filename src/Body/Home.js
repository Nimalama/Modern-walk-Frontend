import React from "react";
import { Component, state } from "react";
import { Container, Row, Carousel, Card, CardDeck, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Truck from '../assets/truck.png';
import Return from '../assets/icon.png';
import Hours from '../assets/24.png';
import Payment from '../assets/payment.png';
import Offer from '../assets/c5.jpg';
import Are from '../assets/girl.jpg';
import Born from '../assets/born.jpg';
import Black from '../assets/boy.jpg';
import Sweater from '../assets/sweater.jpg';
import Caro from '../assets/qw.jpg';
import Caro2 from '../assets/qwe.jpg';
import Caro3 from '../assets/qwer.jpg';
import axios from "axios";



class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={Caro}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Clothing Store</h3>
                            <p>We have all planned our trips to the clothing store in advance, vividly dreaming about what we would buy once there. Some of us even have sales assistants for friends and have often asked them for a favor or two during peak shopping season (read: festivals and sales).</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src={Caro2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Kapada</h3>
                            <p>Kapadaa is a first Nepali Online Fashion Store/Retail of its kind in Nepal. It offers a  Wide ranges of products from local and international brands. Kapada is primarily focused to offer the varieties of Fashion Clothing, Footwear, Accessories and Gifts of Men, Women, Kids and Infants.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Caro3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Modern Walk</h3>
                            <p>Welcome to Modern Walk.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Container fluid>
                    <Row className="down">
                        <div class="homeimg">
                            <div className="text">
                                <h1>Welcome to </h1>
                                <h2>Modern Walk</h2>
                                <Link to="/Product" className="btn btn-success">Shop Now</Link>
                            </div>
                        </div>
                    </Row>
                </Container>
                <Container className="features-area section_gap">

                    <div className="row features-inner">

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src={Truck} alt="delivery" />
                                </div>
                                <h6>Free Delivery</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src={Return} alt="return policy" />
                                </div>
                                <h6>Return Policy</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src={Hours} alt="24 Hour service" />
                                </div>
                                <h6>24/7 Support</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src={Payment} alt="Secure Payment" />
                                </div>
                                <h6>Secure Payment</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>
                    </div>

                </Container>

                <Container className="category-area">

                    <Row className=" justify-content-center">
                        <div className="col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-lg-8 col-md-8">
                                    <div className="single-deal">
                                        <div className="overlay"></div>
                                        <img className="img-fluid w-100" src={Are} alt="sweater" />
                                        <a href={Are} className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sweater</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay"></div>
                                        <img className="img-fluid w-100" src={Born} alt="tshirt" />
                                        <a href={Born} className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Tshirt</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay"></div>
                                        <img className="img-fluid w-100" src={Black} alt="sweater" />
                                        <a href={Black} className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sweater</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                    <div className="single-deal">
                                        <div className="overlay"></div>
                                        <img className="img-fluid w-100" src={Sweater} alt="Shoes" />
                                        <a href={Sweater} className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Shoes</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-deal">
                                <div className="overlay"></div>
                                <img className="img-fluid w-100" src={Offer} alt="" />
                                <a href={Offer} className="img-pop-up" target="_blank">
                                    <div className="deal-details">
                                        <h6 className="deal-title">SuperSales</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </Row>

                </Container>
               

            </React.Fragment>

        )
    }
}
export default Home;