import React,{useState} from 'react'
import {Container,Row,Col,Table} from 'react-bootstrap'
import './quiz.css'
import useQuiz from './useQuiz'
import {AiFillDelete} from 'react-icons/ai'

let answers = [];
let realAnswer = [];
let questions = [];

const digitizer = (num)=>{
    let n = num;
    if(n < 10)
    {
        n= "0"+n;
    }
    return n;
}

const getFormattedToday = (date)=>{
    return `${date.getFullYear()}-${digitizer(date.getMonth()+1)}-${digitizer(date.getDate())}`
}


let current = new Date();
let minDate = getFormattedToday(current);
current.setDate(current.getDate()+15);
let maxDate = getFormattedToday(current);

const Quiz = (props) => {
    const {} = props;
    const {quizChangeHandler,quizDetail,addQuiz,setQuizDetail} = useQuiz();

    //state goes here
    let [question,setQuestion] = useState("");
    let [answer,setAnswer] = useState("");
    let [correctAnswer,setCorrectAnswer] = useState("");
    let [questionBox,setQuestionBox] = useState([]);
    let [answerBox,setAnswerBox] = useState([]);
    let [correctAnswerBox,setCorrectAnswerBox] = useState([]);
    let [iteration,setIteration] = useState(0);
    let [step,setStep] = useState(1);

   
   
   //handlers
    const addQuestion = (e)=>{
        e.preventDefault();
        questionBox.push(question)
        questions.push(question)
        setQuizDetail({
            ...quizDetail,
            ['questions']:questions
        })
        setQuestion("");
    }

    const addAnswer = (e)=>{
        e.preventDefault();
        answerBox.push(answer)
        setAnswerBox(answerBox);
        answers.push(answer.split("---"));
        setQuizDetail({
            ...quizDetail,
            ['answers']:answers
        })
        setAnswer("");
    }

    const addCorrectAnswer = (e)=>{
        e.preventDefault();
        correctAnswerBox.push(correctAnswer)
        realAnswer.push(correctAnswer.split("---"));
        setQuizDetail({
            ...quizDetail,
            ['realAnswer']:realAnswer
        })
        setCorrectAnswer("");
    }
  
    const removeQuestion = (index)=>{
        questionBox.splice(index,1);
        questions.splice(index,1);
        setQuizDetail({
            ...quizDetail,
            ['questions']:questions
        })
        setQuestionBox(
            questionBox
        )
        setIteration(iteration-1)
    }

    const removeAnswer = (index)=>{
        answerBox.splice(index,1);
        answers.splice(index,1);
        setQuizDetail({
            ...quizDetail,
            ['answers']:answers
        })
        setAnswerBox(
            answerBox
        )
        setIteration(iteration-1)
    }

    const removeCorrectAnswer = (index)=>{
        correctAnswerBox.splice(index,1);
        realAnswer.splice(index,1);
        setQuizDetail({
            ...quizDetail,
            ['realAnswer']:realAnswer
        })
        setCorrectAnswerBox(
            correctAnswerBox
        )
        setIteration(iteration-1)
    }
    
    
    
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                    <div className="quizContainer">
                       <Row>
                            <Col lg={12}>
                                <h5 className="text-center mb-3" style={{fontWeight:"bolder",color:"#4b1cac",fontSize:"32px"}}> Add Quiz Stuff </h5>
                            </Col>
                            {
                                step == 1?
                                (
                                    <>
                                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
            
                                    <Col lg={8}>
                                        <form method = "post">
                                            <div className="form-group">
                                                <label> Paragraph </label>
                                                <textarea className="form-control" name="paragraph" onChange={(e)=>{quizChangeHandler(e)}}>{quizDetail.paragraph}</textarea>
                                                {quizDetail['errors']['paragraph']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['paragraph']}  </small> </p>)}
                                            </div>
                                        </form>
                                    </Col>
                                                                    
                                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    </>
                                ) :
                                step == 2?
                                (
                                   <>
                                   <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    <Col lg={8}>
                                        <form method = "post" onSubmit={addQuestion}>
                                            <div className="form-group">
                                                <label> Question No {questionBox.length + 1} </label>  
                                                <input type="text" className="form-control" name="question" value={question} onChange={(e)=>{setQuestion(e.target.value)}} required></input>
                                                {quizDetail['errors']['questions']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['questions']}  </small> </p>)}
                                            </div>

                                            <div className="text-center">
                                                <button className="btn btn-0 btn-md btnQuizz" type="submit" name="question"> Add Question </button> 
                                            </div>
                                        </form>

                                        {
                                            questionBox.length > 0 &&
                                            (
                                                <Table striped bordered hover className="tableDesign mt-3 mb-3">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th style={{fontWeight: 'bold'}}>QN</th>
                                                            <th>Question</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            questionBox&&
                                                            (
                                                                questionBox.map((val)=>{
                                                                return (
                                                                    <tr className="text-center"> 
                                                                    <td style={{fontWeight: 'bold'}}> {questionBox.indexOf(val)+1}.  </td> 
                                                                    <td> {val} </td>
                                                                    <td> <AiFillDelete onClick={()=>{removeQuestion(questionBox.indexOf(val))}} style={{fontSize:"25px",cursor: "pointer",color:"black"}}/> </td>
                                                                    </tr>
                                                                )
                                                            })
                                                            )   
                                                            
                                                        }
                                                    </tbody>
                                                    </Table>
                                            )
                                        }
                                        </Col>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                   </>
                                ):
                                step == 3?
                                (
                                    <>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                        <Col lg={8}>
                                            <form method = "post" onSubmit={addAnswer}>
                                                <div className="form-group">
                                                    <label> Options For Question {answerBox.length + 1} </label>  
                                                    <input type="text" className="form-control" name="question" value={answer} onChange={(e)=>{setAnswer(e.target.value)}} required></input>
                                                    <span className="mb-1"><small> *Separate options with --- </small></span>
                                                    {quizDetail['errors']['answers']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['answers']}  </small> </p>)}
                                                </div>

                                                <div className="text-center">
                                                    <button className="btn btn-0 btn-md btnQuizz" type="submit" name="answer"> Add Answer </button> 
                                                </div>
                                            </form>
                                            {
                                                answerBox.length > 0 &&
                                                (
                                                    <Table striped bordered hover className="tableDesign mt-3 mb-3">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th style={{fontWeight: 'bold'}}>QN</th>
                                                                <th>Options</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                answerBox&&
                                                                (
                                                                    answerBox.map((val,i)=>{
                                                                    return (
                                                                        <tr className="text-center"> 
                                                                        <td style={{fontWeight: 'bold'}}> {answerBox.indexOf(val)+1}.  </td> 
                                                                        <td> {val} </td>
                                                                        <td> <AiFillDelete onClick={()=>{removeAnswer(i)}} style={{fontSize:"25px",cursor: "pointer",color:"black"}}/> </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                )   
                                                                
                                                            }
                                                        </tbody>
                                                        </Table>
                                                )
                                            }
                                        </Col>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    </>
                                ):
                                step == 4?
                                (
                                    <>
                                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                        <Col lg={8}>
                                            <form method = "post" onSubmit={addCorrectAnswer}>
                                                <div className="form-group">
                                                    <label> Correct Answer For Question {correctAnswerBox.length + 1} </label>  
                                                    <input type="text" className="form-control" name="question" value={correctAnswer} onChange={(e)=>{setCorrectAnswer(e.target.value)}} required></input>
                                                    <span className="mb-1"><small> *Separate multiple answers with --- </small></span>
                                                    {quizDetail['errors']['realAnswer']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['realAnswer']}  </small> </p>)}
                                                </div>

                                                <div className="text-center">
                                                    <button className="btn btn-0 btn-md btnQuizz" type="submit" name="answer"> Add Correct Answer </button> 
                                                </div>
                                            </form>
                                            {
                                                correctAnswerBox.length > 0 &&
                                                (
                                                    <Table striped bordered hover className="tableDesign mt-3 mb-3">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th style={{fontWeight: 'bold'}}>QN</th>
                                                                <th>Answer</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                correctAnswerBox&&
                                                                (
                                                                    correctAnswerBox.map((val,i)=>{
                                                                    return (
                                                                        <tr className="text-center"> 
                                                                        <td style={{fontWeight: 'bold'}}> {correctAnswerBox.indexOf(val)+1}.  </td> 
                                                                        <td> {val} </td>
                                                                        <td> <AiFillDelete onClick={()=>{removeCorrectAnswer(i)}} style={{fontSize:"25px",cursor: "pointer",color:"black"}}/> </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                )   
                                                                
                                                            }
                                                        </tbody>
                                                        </Table>
                                                )
                                            }
                                        </Col>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    </>
                                ):
                                step == 5?
                                (
                                    <>
                                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                        <Col lg={8}>
                                            <form method = "post" onSubmit={addQuiz}>
                                                <div className="form-group">
                                                    <label> Quiz Date </label>  
                                                    <input type="date" className="form-control" max={maxDate} min={minDate} name="startAt" value={quizDetail.startAt} onChange={(e)=>{quizChangeHandler(e)}}></input>
                                                    {quizDetail['errors']['startAt']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['startAt']}  </small> </p>)}
                                                </div>

                                                <div className="form-group">
                                                    <label> Starting Time </label>
                                                    <input type="time" className="form-control" name="startTime" value={quizDetail.startTime} onChange={(e)=>{quizChangeHandler(e)}}></input>
                                                    {quizDetail['errors']['startTime']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['startTime']}  </small> </p>)}
                                                </div>

                                                <div className="form-group">
                                                    <label> Ending Time </label>
                                                    <input type="time" className="form-control" name="endTime" value={quizDetail.endTime} onChange={(e)=>{quizChangeHandler(e)}}></input>
                                                    {quizDetail['errors']['endTime']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['endTime']}  </small> </p>)}
                                                </div>

                                                <div className="form-group">
                                                    <label> Chances Per Question </label>
                                                    <input type="number" min="1" className="form-control" name="chance" value={quizDetail.chance} onChange={(e)=>{quizChangeHandler(e)}}></input>
                                                    {quizDetail['errors']['chance']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['chance']}  </small> </p>)}
                                                </div>
                                                {quizDetail['errors']['random']&& (<p className="text-center"> <small style={{color:"red"}}>  {quizDetail['errors']['random']}  </small> </p>)}
                                                <div className="text-center">
                                                    <button className="btn btn-0 btn-md btnQuizz" type="submit" name="answer"> Add Quiz </button> 
                                                </div>
                                            </form>
                               
                                        </Col>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    </>
                                ):
                                (
                                    <></>
                                )  
                            }
                        
                            <Col lg={12} className="mt-4">
                                {
                                    step == 1 ?
                                    (
                                        <>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step+1)}}>   Next  </button>
                                            <button type="button" className="btn btn-md btnQuiz d-none"  name="firstComponent" onClick={()=>{setStep(step-1)}}>   Previous  </button>  
                                        </>
                                    ):
                                    step == 5 ?
                                    (
                                        <>
                                            <button type="button" className="btn btn-md btnQuiz d-none"  name="firstComponent" onClick={()=>{setStep(step+1)}}>   Next  </button>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step-1)}}>   Previous  </button>  
                                        </>   
                                    ):
                                    (
                                        <>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step+1)}}>   Next  </button>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step-1)}}>   Previous  </button>  
                                        </>
                                    )
                                }
                                
                                <div style={{clear:"both"}}></div>
                            </Col>
                        </Row>
                      
                    </div>
                      
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Quiz
