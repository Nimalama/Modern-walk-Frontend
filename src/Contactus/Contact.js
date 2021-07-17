import React, { Component } from 'react';
import { Container, Row ,Col} from 'react-bootstrap'
class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="py-5">
                        <Col>
                        <h2 className="text-center">Contact US</h2>
                        
                        <form className="col-md-9 m-auto">
                            <div className="row">
                                <div className="form-group col-md-6 mb-3">
                                    <label for="inputname">Name</label>
                                    <input type="text" className="form-control mt-1" id="name" name="name" placeholder="Name" />
                                </div>
                                <div className="form-group col-md-6 mb-3">
                                    <label for="inputemail">Email</label>
                                    <input type="email" className="form-control mt-1" id="email" name="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="inputsubject">Subject</label>
                                <input type="text" className="form-control mt-1" id="subject" name="subject" placeholder="Subject" />
                            </div>
                            <div className="mb-3">
                                <label for="inputmessage">Message</label>
                                <textarea className="form-control mt-1" id="message" name="message" placeholder="Message" rows="8"></textarea>
                            </div>
                            <div className="row">
                                <div className="col text-end mt-2">
                                    <button type="submit" className="btn btn-success btn-lg px-3">Submit</button>
                                </div>
                            </div>
                        </form>
                        </Col>
                    </Row>
                </Container>


            </React.Fragment>
        );
    }
}

export default Contact;