import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap'


const ResetPassword = (props) => {
    //state goes here
    let [resetPassword,setResetPassword] = useState({
        "resetPassword":"",
        "confirmPassword":"",
        "token":props.match.params.token,
        "errors":{}
    })


    //handler goes here
    const changeHandler = (e) => {
        let {name,value} = e.target;
        setResetPassword({
            ...resetPassword,
            [name]:value
        })
    }

    const changePassword = (e)=>{
        e.preventDefault();

        axios.post(process.env.REACT_APP_URL+"resetPassword",resetPassword)
        .then((response)=>{
            if(response.data.success == true)
            {
                window.location.href = "/login"
            }
            else
            {
                setResetPassword({
                    ...resetPassword,
                    ["errors"]:{"random":response.data.message}
                })
            }
        })
        .catch((err)=>{
            setResetPassword({
                ...resetPassword,
                ["errors"]:{"random":"Please follow the whole process."}
            })
            console.log(err);
        })
    }


    return (
        <React.Fragment>
            <Container>
                <Row className="bg__reset">
                    <Col lg={4} className="d-none d-md-block d-lg-block"></Col>
                    <Col lg={4}>
                        <h5 className="text-center"> Reset My Password </h5>
                        <form method ="post" onSubmit={changePassword}>
                            <div className="form-group">
                                <label> New Password </label>
                                <input type="password" className="form-control" name="resetPassword" value={resetPassword.resetPassword} onChange={(e)=>{changeHandler(e)}} placeholder="Enter New Password" required/>
                            </div>
                            <div className="form-group">
                                <label> Confirm Password </label>
                                <input type="password" className="form-control" name="confirmPassword" value={resetPassword.confirmPassword} onChange={(e)=>{changeHandler(e)}} placeholder="Re-Enter Password" required/>
                            </div>
                            {resetPassword['errors']['random']&& (<p className="text-center"> <small style={{color:"red"}}> *{resetPassword['errors']['random']} </small></p>)}
                            <div className="text-center">
                                <button className="btn btn-primary btn-md w-50" type="submit" name="resetPassword"> Reset Password </button>
                            </div>
                        </form>
                    </Col>
                    <Col lg={4} className="d-none d-md-block d-lg-block"></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ResetPassword
