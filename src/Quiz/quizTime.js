import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col,Card} from 'react-bootstrap'
import {useToasts} from 'react-toast-notifications'
import {FaHourglassEnd} from 'react-icons/fa';
import {FcExpired} from 'react-icons/fc'
import {RiLoader2Fill} from 'react-icons/ri'


const QuizTime = (props) => {
    const {} = props;
    const {addToast} = useToasts();
    
    //state goes here
    let [quiz,setQuiz] = useState([]);
    let [quizContainer,setQuizC] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })


    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"fetchAllFutureQuiz",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setQuiz(
                    response.data.data
                )
                setQuizC(
                    response.data.quizContainer
                )
            }
            else
            {
                setQuiz([]);
                setQuizC(
                    []
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    //handlers goes here
    const getDetails = (e,id)=>{
        if(quizContainer.includes(id))
        {
            window.location.href = "/quiz/"+id;
        }
        else
        {
            addToast("You have selected a quiz, which does not match appropriate timing.",{
                "appearance":"error",
                "autoDismiss":true
            })
        }
    }   

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="quizContainer">
                            <h5 className="text-center mb-3" style={{fontWeight:"bolder",color:"#4b1cac",fontSize:"32px"}}> Join The Ongoing Quiz </h5>
                            <p style={{fontWeight:"bolder",color:"black"}}> {quiz.length} Quiz Available. </p>  
                            <Row>
                            {
                                quiz.length > 0 &&
                                (
                                    
                                        quiz.map((val)=>{
                                            return (
                                                <>
                                                    <Col lg={3} className="d-none d-md-none d-lg-block"></Col>
                                                    <Col lg={6} className="p-3">
                                                        <Card className="mb-3" onClick={(e)=>{getDetails(e,val._id)}} style={{boxShadow:"3px 4px 5px rgba(0,0,0,0.6)",cursor:"pointer"}}>
                                                            <Card.Body>
                                                                <Card.Title className="mb-3">{val.paragraph.slice(0,40)}....</Card.Title>
                                                                <p> <strong> Starting At: </strong>  <small>{val.startAt}, {val.startTime1} To {val.endTime1}</small> </p>
                                                                <p> <strong> Status: </strong>  {val.status == "Running"? (<RiLoader2Fill/>):val.status == "Pending"? (<FaHourglassEnd/>): val.status == "Expired"?(<FcExpired/>):(<></>)} </p>
                                                                <div className="text-center">
                                                                    <button className="btn btnQuizz mb-1" type="button" name="start"> Attend </button>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col> 
                                                    <Col lg={3} className="d-none d-md-none d-lg-block"></Col>
                                                </>
                                            )
                                        })
                                    
                                   
                                )
                            } 
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default QuizTime
