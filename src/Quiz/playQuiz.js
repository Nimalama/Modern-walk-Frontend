import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap'
import {useToasts} from 'react-toast-notifications';
import QuizResult from './quizResult'

let questions = [];
let answers = [];
let realAnswers = [];
let userAnswers = [];


const PlayQuiz = (props) => {
    const {} = props;
    const {addToast} = useToasts();
    let [quiz,setQuiz] = useState({});
    let [seconds,setSeconds] = useState(1);
    let [nextDisable,setNextDisable] = useState(true)
    let [submitDisable,setSubmitDisable] = useState(false)
    let [index,setIndex] = useState(0);
    let [myPoint,setPoint] = useState(0);
    let [points,setPoints] = useState(100);
    let [chance,setChance] = useState(0);
    let [myChance,setMyChance] = useState(0);
    let [accurate,setAccurate] = useState("");
    let [finish,setFinish] = useState(false);
    let [randomQuestions,setRandomQuestions] = useState([]);
    let [randomOptions,setRandomOptions] = useState([]);
    let [randomAnswers,setRandomAnswers] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    //effect goes here


    useEffect(async ()=>{
        try{
            let response =  await axios.get(process.env.REACT_APP_URL+"fetchQuiz/"+props.match.params.quizId,auth.config);
            if(response.data.success == true)
            {
                setQuiz(response.data.data);
                setChance(
                    response.data.data.chance
                );
                setMyChance(
                    response.data.data.chance
                );
                setRandomAnswers(
                    response.data.answers
                );
                setRandomOptions(
                    response.data.options
                );
                setRandomQuestions(
                    response.data.questions
                );
                seconds = response.data.quizTime
            }
            else
            {
                setQuiz({});
            }
        }
        catch(err)
        {
            console.log(err);
        }
        
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

    useEffect(()=>{
        let checkBoxes = document.getElementsByName('pickAnswer');
        for(var i of checkBoxes)
        {
            i.checked = false;
        }
    },[index])

   


    if(quiz)
    {
        questions = randomQuestions.length > 0&& randomQuestions.map((val)=>{return val});
        answers = randomOptions.length > 0&& randomOptions.map((val)=>{return val});
        realAnswers = randomAnswers.length > 0 && randomAnswers.map((val)=>{return val});
    }

    const changeHandler = (e) => {
        let answer = e.target.value;
        
        if(userAnswers[index])
        {
            if(userAnswers[index].includes(answer))
            {
                let answerIndex = userAnswers[index].indexOf(answer);
                userAnswers[index].splice(answerIndex,1);
                
            }
            else
            {
                userAnswers[index].push(answer);
                
            }
        }
        else
        {
            userAnswers[index] = [answer];
            
        }
    }

    const submitAnswer = (e)=>{
       
            let realAnswerBox = realAnswers[index];
          
            let checking = 0;
            
            if(userAnswers.length-1 == index) {
                let userAnswer = userAnswers[index]; 
                for(var i of userAnswer)
                {
                    if(!realAnswerBox.includes(i))
                    {
                        checking-=1;
                        break;
                    }
                    else
                    {
                        checking+=1;
                    }
                }
        
                if(checking == realAnswerBox.length)
                {
                    setPoint(
                        myPoint+points
                    )
                    addToast("Correct Answer",{
                        "appearance":"success",
                        "autoDismiss":true
                    })
                    setSubmitDisable(true);
                    setNextDisable(false);
                   
                }
                else
                {
                    setChance(
                        chance = chance-1
                    )
                
                    setPoints(
                        points - parseInt(100 / myChance)
                    )

                    
                
                    addToast("Wrong Answer",{
                        "appearance":"error",
                        "autoDismiss":true
                    })

                    if(chance == 0)
                    {
                        setAccurate(
                            realAnswerBox.join(",")
                        )
                        setSubmitDisable(true);
                        setNextDisable(false)
                        setPoint(
                            myPoint+0
                        )
                      
                    }
                    
                }
         
            }
            else
            {
                addToast("Please choose your answer.",{
                    "appearance":"info",
                    "autoDismiss":true
                })
            }
        
     
    }  

   
    const nextClick = (e)=>{
        setIndex(
            index+1
        );
        setSubmitDisable(false);
        setNextDisable(true);
        setAccurate("");
        setPoints(100);
        setChance(myChance)
    }
    
    
    return (
        <React.Fragment>
            <Container>
                <Row>
                {
                    finish == false?
                    (
                        <Col lg={12}>
                        <div className="quizContainer">
                        <h5 className="text-center mb-3" style={{fontWeight:"bolder",color:"#4b1cac",fontSize:"32px"}}> Good Luck </h5>
                        <p style={{fontWeight:"bolder"}}> {seconds} seconds remaining </p>
                        <p className="text-center" style={{fontWeight:"bolder"}}>  {quiz.paragraph} </p>
                        <p> <strong> Chance: </strong>  {chance} </p>
                        {
                            seconds > 0?
                            (
                            quiz &&
                            (
                                
                                   
                                            <div className="quizBox">
                                                    {
                                                        questions &&
                                                        (
                                                            <>  
                                                                <p className="quizQuestion" style={{fontSize:"18px"}}><strong> Question {index+1}. </strong>  {questions[index]}  </p>
                                                                
                                                                <form method="post">
                                                                    {
                                                                        answers[index].map((val)=>{
                                                                            return(
                                                                                <div>
                                                                                    <input type="checkbox" value={val} id={`${val}${index}`} name="pickAnswer" onChange={(e)=>{changeHandler(e)}}/>
                                                                                    <label className="ml-2" style={{fontWeight:"bold"}} for={`${val}${index}`}> {val} </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    {accurate&& (<p style={{color:"green",fontWeight:"bolder"}} className="text-center"> Correct Answer: {accurate}</p>)}
                                                                    <div>
                                                                        {
                                                                            questions&&
                                                                            (
                                                                                questions.length > index+1?
                                                                                (
                                                                                    <button className="btn btnQuiz" type="button" name="submit" onClick={(e)=>{nextClick(e)}} disabled={nextDisable}> Next </button>
                                                                                )   :
                                                                                (
                                                                                    <button className="btn btnQuiz" type="button" name="submit" onClick={(e)=>{setFinish(!finish)}} disabled={nextDisable}> Finish </button>
                                                                                )
                                                                            )
                                                                        }
                                                                        
                                                                        <button className="btn btnQuiz" type="button" name="submit" onClick={(e)=>{submitAnswer(e)}} disabled={submitDisable}> Submit </button>
                                                                        

                                                                        <div style={{clear:"both"}}></div>
                                                                    </div>
                                                                </form>
                                                            </>
                                                        )
                                                    }
                                                    
                                            </div>
                                   
                            )
                            ):
                            (
                                
                                    questions&&
                                    (
                                        <QuizResult resultPoint={myPoint} questionss={questions.length}></QuizResult>
                                    )
                                
                                
                            )
                        }
                        </div>
                       
                    </Col>
                    ):
                    (
                        <QuizResult resultPoint={myPoint} questionss={questions.length}></QuizResult>
                    )
                }
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default PlayQuiz
