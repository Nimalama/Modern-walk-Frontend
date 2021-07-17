import React from "react";
import { Component } from "react"
import { Container, Row } from "react-bootstrap";
import { BiMap } from 'react-icons/bi';
import { IoCallOutline, IoMailOutline } from 'react-icons/io5';
import { FiTwitter } from 'react-icons/fi'
import { AiFillFacebook, AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai'


class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="bg-dark" id="tempaltemo_footer">
					<Container>
						<Row>

							<div className="col-md-4 pt-5">
								<h2 className="h2 text-success border-bottom pb-3 border-light logo">Modern Walk</h2>
								<ul className="list-unstyled text-light footer-link-list">
									<li>
										<BiMap />
                            Kathmandu, Nepal
                        </li>
									<li>
										<IoCallOutline />
										<a className="text-decoration-none" href="tel:01-5741566">01-5741566</a>
									</li>
									<li>
										<IoMailOutline />
										<a className="text-decoration-none" href="mailto:info@company.com">info@company.com</a>
									</li>
								</ul>
							</div>

							<div className="col-md-4 pt-5">
								<h2 className="h2 text-light border-bottom pb-3 border-light">Products</h2>
								<ul className="list-unstyled text-light footer-link-list">
									<li><a className="text-decoration-none" href="#">Luxury</a></li>
									<li><a className="text-decoration-none" href="#">Sport Wear</a></li>
									<li><a className="text-decoration-none" href="#">Men's Shoes</a></li>
									<li><a className="text-decoration-none" href="#">Women's Shoes</a></li>
									<li><a className="text-decoration-none" href="#">Popular Dress</a></li>
									<li><a className="text-decoration-none" href="#">Sport Shoes</a></li>
								</ul>
							</div>

							<div className="col-md-4 pt-5">
								<h2 className="h2 text-light border-bottom pb-3 border-light">Further Info</h2>
								<ul className="list-unstyled text-light footer-link-list">
									<li><a className="text-decoration-none" href="/home">Home</a></li>
									<li><a className="text-decoration-none" href="/AboutUs">About Us</a></li>
									<li><a className="text-decoration-none" href="/product">Product</a></li>

									<li><a className="text-decoration-none" href="/Contact">Contact</a></li>
								</ul>
							</div>

						</Row>

						<div className="row text-light mb-4">
							<div className="col-12 mb-3">
								<div className="w-100 my-3 border-top border-light"></div>
							</div>
							<div className="col-auto me-auto">
								<ul className="list-inline text-left footer-icons">
									<li className="list-inline-item border border-light rounded-circle text-center">
										<a className="text-light text-decoration-none" target="_blank" href="http://fb.com/"><AiFillFacebook /></a>
									</li>
									<li className="list-inline-item border border-light rounded-circle text-center">
										<a className="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/"><AiOutlineInstagram /></a>
									</li>
									<li className="list-inline-item border border-light rounded-circle text-center">
										<a className="text-light text-decoration-none" target="_blank" href="https://twitter.com/"><FiTwitter /></a>
									</li>
									<li className="list-inline-item border border-light rounded-circle text-center">
										<a className="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/"><AiOutlineLinkedin /></a>
									</li>
								</ul>
							</div>
							<div className="col-auto email">
								<label className="sr-only" for="subscribeEmail">Email address</label>
								<div className="input-group mb-2 ">
									<input type="text" className="form-control bg-white border-light" placeholder="Email address" />
									<div className="input-group-text btn-success">Subscribe</div>
								</div>
							</div>
						</div>
					</Container>

					<div className="w-100 bg-black py-3">
						<div className="container">
							<div className="row pt-2">
								<div className="col-12">
									<p className="text-left text-light">
										Copyright &copy; 2021 Modern Walk
                            | All rights reserved<a rel="sponsored" target="_blank"> Modern Walker</a>
									</p>
								</div>
							</div>
						</div>
					</div>

				</div>

			</React.Fragment>
		)
	}
}
export default Footer;
