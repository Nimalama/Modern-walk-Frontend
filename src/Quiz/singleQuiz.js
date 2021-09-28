import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Col,Row} from 'react-bootstrap'

const SingleQuiz = (props) => {
    const {} = props;

    //state goes here
    let [quiz,setQuiz] = useState({});
    let [seconds,setSeconds] = useState(0);
    let [index,setIndex] = useState(0);
    let [start,setStart] = useState(false);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"fetchSingleQuiz/"+props.match.params.quizId,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setQuiz(
                    response.data.data
                )
                seconds = response.data.quizTime;
            }
            else
            {
                setQuiz({});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    useEffect(()=>{
        
            setInterval(()=>{
             
                if(seconds > 0)
                {
                    setSeconds(
                        seconds--
                    )
                   
                }
               
            },1000)

        
    },[JSON.stringify(quiz)])

    let questions = [];
    let answers = [];
    let realAnswers = [];


        if(quiz)
        {
            questions = quiz.questions&& quiz.questions.map((val)=>{return val});
            answers = quiz.answers&& quiz.answers.map((val)=>{return val});
            realAnswers = quiz.realAnswer&& quiz.realAnswer.map((val)=>{return val});
        }
    
    
    
    
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="quizContainer">
                            {
                                quiz?
                                (
                                    <>
                                        <h5 className="text-center mb-3" style={{fontWeight:"bolder",color:"#4b1cac",fontSize:"32px"}}> Good Luck </h5>
                                        <p style={{fontWeight:"bolder"}}> {seconds} seconds remaining </p>
                                        <p className="text-center"> <small style={{color:"black",fontWeight:"bolder"}}> {quiz.paragraph} </small> </p>
                                        
                                           
                                                <div className="text-center">
                                                    <button className="btn btnQuizz" style={{width:"220px"}} type="button" name="startBtn" onClick={()=>{window.location.href=`/quizPlay/${props.match.params.quizId}`}}> Start </button>
                                                </div>
                                            
                                              
                                            
                                        
                                    </>
                                ):
                                <p className="text-center" style={{fontWeight:"bolder",color:"black"}}>  Oops! Cannot Fetch The Quiz. </p>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default SingleQuiz
