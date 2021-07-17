import React, { Component, logout } from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import logo from '../assets/123456.jpg';


class Header extends Component {

    logout = (e) => {
        localStorage.clear();
        window.location.href = "/login"
    }
    render() {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"))

        return (
            <>
           
   
     
 
                 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/" ><strong className="text-success">Modern Walk</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="mr-auto ml-auto">
                            <NavLink className="nav-link" activeClassName="active" to="/"> Home </NavLink>
                            <NavLink className="nav-link" activeClassName="active" to="/Product"> Product </NavLink>
                            <NavLink className="nav-link" activeClassName="active" to="/AboutUs"> About Us</NavLink>
                            <NavLink className="nav-link" activeClassName="active" to="/booking"> Booking</NavLink>

                            <NavLink className="nav-link" activeClassName="active" to="/Contact"> Contact Us</NavLink>
                            {
                                token ?
                                    (
                                        <NavLink className="nav-link" activeClassName="active" to="/mylist"> My Book</NavLink>
                                    ) :
                                    (
                                        <></>
                                    )
                            }

                            {
                                token ?
                                    (
                                        !user ?
                                            (
                                                <></>
                                            ) :
                                            user.UserType == "Admin" ?
                                                (
                                                    <NavLink className="nav-link" activeClassName="active" to="/admin"> Admin </NavLink>

                                                ) :
                                                (
                                                    <></>
                                                )
                                    ) : (
                                        <></>
                                    )


                            }

                        </Nav>

                        <Nav className="ml-auto">
                            {
                                token ?
                                    (
                                        !user ?
                                            (
                                                <>
                                                    <NavLink className="nav-link" activeClassName="active" to="/login"> Login </NavLink>
                                                    <NavLink className="nav-link" activeClassName="active" to="/register"> Register </NavLink>
                                                </>
                                            ) :
                                            (
                                                <div class="dropleft">
                                                    <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {user.Username}
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <p class="dropdown-item" onClick={this.logout}>Logout</p>

                                                    </div>

                                                </div>
                                            )

                                    ) :
                                    (
                                        <>
                                            <NavLink className="nav-link" activeClassName="active" to="/login"> Login </NavLink>
                                            <NavLink className="nav-link" activeClassName="active" to="/register"> Register </NavLink>

                                        </>
                                    )

                            }

                        </Nav>

                    </Navbar.Collapse>
                </Navbar> 
            </>
        )
    }
}
export default Header;