import { Component, state, submitUser } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { Container, Row } from 'react-bootstrap';
import { AiFillFacebook, AiFillTwitterCircle, AiOutlineUser, AiFillMail, AiFillPhone, AiFillLock, AiOutlineUserSwitch, AiOutlineDatabase } from 'react-icons/ai';
import { IoLocation } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';

class Register extends Component {
    state = {
        fname: "",
        lname: "",
        Dob: "",
        Address: "",
        Gender: "",
        Nationality: "",
        Phoneno: "",
        Username: "",
        Email: "",
        Password: ""
    }
    submitUser = (e) => {

        e.preventDefault();
        const userdata = {
            fname: this.state.fname,
            lname: this.state.lname,
            Dob: this.state.Dob,
            Address: this.state.Address,
            Gender: this.state.Gender,
            Phoneno: this.state.Phoneno,
            Nationality: this.state.Nationality,
            Username: this.state.Username,
            Email: this.state.Email,
            Password: this.state.Password
        }
        console.log(userdata)
        axios.post("http://localhost:90/users/insert", userdata)
            .then(response => {
                if (response.data.success == true) {
                    swal({
                        "title": "Success",
                        "text": response.data.message,
                        "icon": "success"
                    })
                    window.location.href = "/login"
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
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (


            <Container>
                <Row className=" py-5 mt-4 align-items-center">

                    <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" class="img-fluid mb-3 d-none d-md-block" />
                        <h1>Create an Account</h1>

                    </div>


                    <div class="col-md-7 col-lg-6 ml-auto">
                        <form>
                            <div class="row">


                                <div class="input-group col-lg-6 mb-4">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                                            <AiOutlineUser />
                                        </span>
                                    </div>
                                    <input type="text" placeholder="First Name" class="form-control bg-white border-left-0 border-md" value={this.state.fname} onChange={(event) => { this.setState({ fname: event.target.value }) }} />
                                </div>


                                <div class="input-group col-lg-6 mb-4">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                                            <AiOutlineUser />
                                        </span>
                                    </div>
                                    <input type="text" class="form-control bg-white border-left-0 border-md" placeholder="Last name" value={this.state.lname} onChange={(event) => { this.setState({ lname: event.target.value }) }} />
                                </div>
                                <div class="input-group col-lg-12 mb-4">

                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <IoLocation />
                                    </span>
                                    <input type="text" placeholder="Address" class="form-control bg-white border-md border-left-0 pl-3" value={this.state.Address}
                                        onChange={(event) => { this.setState({ Address: event.target.value }) }} />
                                </div>
                                <div class="input-group col-lg-12 mb-4">

                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <AiOutlineDatabase />
                                    </span>
                                    <input type="text" placeholder="Nationality" class="form-control bg-white border-md border-left-0 pl-3" value={this.state.Nationality}
                                        onChange={(event) => { this.setState({ Nationality: event.target.value }) }} />
                                </div>
                                <div class="input-group col-lg-12 mb-4">

                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <MdDateRange />
                                    </span>
                                    <input type="date" placeholder="Date of birth" class="form-control bg-white border-md border-left-0 pl-3" value={this.state.Dob}
                                        onChange={(event) => { this.setState({ Dob: event.target.value }) }} />
                                </div>



                                <div class="input-group col-lg-12 mb-4">

                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        < AiFillPhone />
                                    </span>
                                    <input type="number" placeholder="Phone Number" class="form-control bg-white border-md border-left-0 pl-3" value={this.state.Phoneno}
                                        onChange={(event) => { this.setState({ Phoneno: event.target.value }) }} />
                                </div>
                                <div class="input-group col-lg-12 mb-4">

                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <AiOutlineUser />
                                    </span>
                                    <input type="text" placeholder="Gender" class="form-control bg-white border-md border-left-0 pl-3" value={this.state.Gender}
                                        onChange={(event) => { this.setState({ Gender: event.target.value }) }} />
                                </div>
                                <div class="input-group col-lg-12 mb-4">

                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <AiOutlineUser />
                                    </span>
                                    <input type="text" name="Username" placeholder="Username" class="form-control bg-white border-md border-left-0 pl-3" value={this.state.Username}
                                        onChange={(event) => { this.setState({ Username: event.target.value }) }} />
                                </div>

                                <div class="input-group col-lg-12 mb-4">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                                            <AiFillMail />
                                        </span>
                                    </div>
                                    <input id="email" type="email" name="email" placeholder="Email Address" class="form-control bg-white border-left-0 border-md" value={this.state.Email} onChange={(event) => { this.setState({ Email: event.target.value }) }} />
                                </div>


                                <div class="input-group col-lg-12 mb-4">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                                            <AiFillLock />
                                        </span>
                                    </div>
                                    <input type="password" name="Password" placeholder="Password" class="form-control bg-white border-left-0 border-md" value={this.state.Password} onChange={(event) => { this.setState({ Password: event.target.value }) }} />
                                </div>


                                <div class="form-group col-lg-12 mx-auto mb-0">
                                    <a href="#" class="btn btn-primary btn-block py-2" onClick={this.submitUser}>
                                        <span class="font-weight-bold">Sign up</span>
                                    </a>
                                </div>


                                <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                    <div class="border-bottom w-100 ml-5"></div>
                                    <span class="px-2 small text-muted font-weight-bold text-muted">OR</span>
                                    <div class="border-bottom w-100 mr-5"></div>
                                </div>


                                <div class="form-group col-lg-12 mx-auto">
                                    <a href="#" class="btn btn-primary btn-block py-2 btn-facebook">
                                        <AiFillFacebook />
                                        <span class="font-weight-bold">Continue with Facebook</span>
                                    </a>
                                    <a href="#" class="btn btn-primary btn-block py-2 btn-twitter">
                                        <AiFillTwitterCircle />
                                        <span class="font-weight-bold">Continue with Twitter</span>
                                    </a>
                                </div>


                                <div class="text-center w-100">
                                    <p class="text-muted font-weight-bold">Already Registered? <a href="/login" class="text-primary ml-2">Login</a></p>
                                </div>

                            </div>
                        </form>
                    </div>
                </Row>
            </Container>



        )
    }
}
export default Register;